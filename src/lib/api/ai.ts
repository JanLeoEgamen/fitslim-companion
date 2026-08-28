import { createServerFn } from "@tanstack/react-start";
import { generateReply, type ChatAction } from "../fitslim/ai";

export type AiChatMessage = { role: "user" | "assistant"; content: string };

const MAX_HISTORY = 14;

const SYSTEM_PROMPT = `You are FitSlim AI™, an educational health and wellness companion app. You give practical, encouraging, non-clinical guidance about nutrition, meal planning, recipes, protein and fiber-focused meals, grocery lists, restaurant choices, travel wellness, hydration, exercise and movement, healthy habits, sleep, stress, mindful eating, and general GLP-1 medication education.

Rules you must follow:
- Keep answers warm, clear, practical, confident, and non-judgmental.
- You are educational support only. You do not replace a doctor, nurse, pharmacist, or therapist.
- Never diagnose, prescribe, dose, or interpret lab results. For medication, dosage, symptoms, suspected conditions, or anything urgent, advise contacting their care team.
- If the user mentions a medical emergency such as chest pain, trouble breathing, severe bleeding, fainting, or self-harm, tell them to contact emergency services immediately.
- Be concise and scannable. Use short paragraphs and simple bullets where helpful. Use light markdown.
- Do not fabricate medical facts. If unsure, say so and encourage a provider conversation.`;

type AiResponse = { ok: boolean; text: string; actions?: ChatAction[] };
export type { AiResponse };

/**
 * Server function that calls the configured AI chatbot backend (Cloudflare
 * Workers AI or any OpenAI-compatible /chat/completions endpoint, incl. local
 * Ollama). Degrades gracefully to the on-device canned reply engine if the
 * provider is missing or errors, so the app never breaks.
 */
export const chatWithAi = createServerFn({ method: "POST" })
  .validator((d: { messages: AiChatMessage[]; section: string }) => d)
  .handler(async ({ data }) => {
    const baseUrl = process.env["AI_BASE_URL"];
    const model = process.env["AI_MODEL"];

    if (!baseUrl || !model) return aiFallback(data);

    const apiKey = process.env["AI_API_KEY"];
    try {
      const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...data.messages.slice(-MAX_HISTORY),
      ];

      const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(apiKey ? { authorization: `Bearer ${apiKey}` } : {}),
        },
        body: JSON.stringify({ model, messages, max_tokens: 1400, temperature: 0.3 }),
        signal: AbortSignal.timeout(30_000),
      });

      if (!res.ok) throw new Error(`AI provider returned ${res.status}`);

      const json = (await res.json()) as {
        result?: unknown;
        choices?: unknown;
      };
      const { text, truncated } = extractContent(json);
      if (!text) throw new Error("AI provider returned no content");

      return { ok: true, text: finalize(text, truncated) } satisfies AiResponse;
    } catch (error) {
      console.error("[fitslim-ai] provider failed, using fallback engine:", error);
      return aiFallback(data);
    }
  });

function extractContent(json: unknown): { text: string; truncated: boolean } {
  if (typeof json !== "object" || json === null) return { text: "", truncated: false };
  const record = json as Record<string, unknown>;
  let truncated = false;

  // Cloudflare Workers AI format: { result: { response, ... }, success, errors }
  const result = record["result"];
  if (result && typeof result === "object") {
    const response = (result as Record<string, unknown>)["response"];
    if (typeof response === "string") return { text: response, truncated };
  }

  // OpenAI-compatible format: { choices: [{ message: { content }, finish_reason }] }
  const choices = record["choices"];
  if (Array.isArray(choices) && choices[0] && typeof choices[0] === "object") {
    const choice = choices[0] as Record<string, unknown>;
    truncated = choice["finish_reason"] === "length";
    const message = choice["message"];
    if (message && typeof message === "object") {
      const content = (message as Record<string, unknown>)["content"];
      if (typeof content === "string") return { text: content, truncated };
    }
  }
  return { text: "", truncated };
}

/**
 * Guard against answers that got cut off at the token cap: trim to a clean
 * sentence boundary and, if we know the model hit the length limit, note that the
 * user can ask to go deeper. Never leaves a dangling half-word.
 */
function finalize(text: string, truncated: boolean): string {
  const cleaned = text.trim();
  if (!cleaned) return cleaned;

  const cutOff = truncated || /[^\s.,!?;:)\]}$%]$\s*[A-Za-z0-9]$/.test(cleaned);
  if (cutOff) {
    // Drop an unfinished trailing word, then make sure we end on a period.
    const sentence = cleaned.replace(/\s*[^.!?;:)]*$/, "").replace(/\s+$/, "");
    const end = sentence ? sentence : cleaned;
    return `${end}. Want me to go deeper on any of these? I can break down any section for you.`;
  }

  return cleaned;
}

function aiFallback(data: { messages: AiChatMessage[]; section: string }): AiResponse {
  const lastUser = [...data.messages]
    .reverse()
    .find((m) => m.role === "user");
  const reply = generateReply(
    lastUser?.content ?? "",
    data.section as Parameters<typeof generateReply>[1],
  );
  const out: AiResponse = { ok: false, text: reply.text };
  if (reply.actions) out.actions = reply.actions;
  return out;
}