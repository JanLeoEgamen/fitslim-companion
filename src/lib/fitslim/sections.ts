/**
 * FitSlim AI™ section configuration.
 *
 * Every wellness section gets its own page AND its own scoped chatbot.
 * The Home page uses `description` + `preview` for the section trailers.
 */

export const SECTION_SLUGS = [
  "nutrition",
  "restaurants",
  "recipes",
  "glp1",
  "exercise",
  "hydration",
  "habits",
] as const;

export type SectionSlug = (typeof SECTION_SLUGS)[number];

export type SectionTopic = {
  emoji: string;
  label: string;
  prompt: string;
};

export type SectionQuickPrompt = {
  emoji: string;
  label: string;
  prompt: string;
};

export type FitSlimSection = {
  slug: SectionSlug;
  path: string;
  label: string;
  shortLabel: string;
  emoji: string;
  tagline: string;
  description: string;
  preview: string[];
  topics: SectionTopic[];
  quickPrompts: SectionQuickPrompt[];
  chatIntro: string;
  placeholder: string;
  safetyNote?: string;
};

export const GLP1_DISCLAIMER =
  "FitSlim AI™ provides educational support only. It does not prescribe medication, change dosages, diagnose side effects, or replace provider guidance. Contact your provider for any medical concerns.";
export const SECTIONS: FitSlimSection[] = [
  {
    slug: "nutrition",
    path: "/nutrition",
    label: "Nutrition",
    shortLabel: "Nutrition",
    emoji: "🥗",
    tagline: "Balanced plates, protein, fiber and simple swaps.",
    description:
      "Practical nutrition education — meal ideas, protein and fiber-focused meals, grocery lists, meal prep, portion guidance, healthy swaps, cultural foods, budget-friendly meals, and smarter restaurant choices.",
    preview: [
      "Meal ideas, protein & fiber-focused meals",
      "Grocery lists, meal prep & portion education",
      "Healthy swaps, cultural & budget-friendly meals",
    ],
    topics: [
      { emoji: "🥗", label: "Meal ideas", prompt: "Give me healthy meal ideas for the week." },
      { emoji: "🍳", label: "Protein-focused meals", prompt: "Give me protein-focused meal ideas." },
      { emoji: "🌾", label: "Fiber-friendly meals", prompt: "Suggest fiber-friendly meals." },
      { emoji: "🛒", label: "Grocery lists", prompt: "Build me a grocery list." },
      { emoji: "🍱", label: "Meal prep", prompt: "Help me get started with meal prep." },
      { emoji: "⚖️", label: "Portion education", prompt: "Teach me about portion sizes." },
      { emoji: "🔄", label: "Healthy swaps", prompt: "Give me healthy swaps for common foods." },
      { emoji: "🌍", label: "Cultural food suggestions", prompt: "Suggest cultural food ideas that fit my goals." },
      { emoji: "💰", label: "Budget-friendly meals", prompt: "Give me budget-friendly meal ideas." },
      {
        emoji: "🍽️",
        label: "Healthier restaurant choices",
        prompt: "How do I choose healthier options at restaurants?",
      },
    ],
    quickPrompts: [
      { emoji: "🍳", label: "High-protein breakfast", prompt: "Give me a high-protein breakfast I can make in 10 minutes." },
      { emoji: "🥗", label: "Plan my meals", prompt: "Help me plan healthy meals this week." },
      { emoji: "🛒", label: "Grocery list", prompt: "Create my grocery list." },
      { emoji: "⚖️", label: "Portion basics", prompt: "Teach me about portion sizes." },
    ],
    chatIntro: "Ask about meals, protein, fiber, grocery lists, meal prep, portions, and swaps.",
    placeholder: "Ask about meal ideas, protein, fiber, portions, or meal prep...",
  },
  {
    slug: "restaurants",
    path: "/restaurants",
    label: "Restaurants",
    shortLabel: "Restaurants",
    emoji: "🍽️",
    tagline: "Ordering strategies for any type of menu.",
    description:
      "Confidence anywhere you eat out — what to order, healthier fast-food picks, protein-forward options, lower-sugar beverages, travel dining guidance, and dining out while on a weight-management plan.",
    preview: [
      "What to order at restaurants & fast food",
      "Protein-forward options & lower-sugar drinks",
      "Travel dining guidance on any weight plan",
    ],
    topics: [
      { emoji: "🧾", label: "What to order", prompt: "Help me decide what to order at a restaurant." },
      { emoji: "🍔", label: "Healthier fast-food choices", prompt: "What are healthier fast-food choices?" },
      { emoji: "💪", label: "Protein-forward options", prompt: "Give me protein-forward restaurant options." },
      { emoji: "🥤", label: "Lower-sugar beverages", prompt: "What are lower-sugar beverage ideas when dining out?" },
      { emoji: "✈️", label: "Travel dining guidance", prompt: "Give me dining guidance for travel." },
      {
        emoji: "🩺",
        label: "On a weight-management plan",
        prompt: "How do I dine out while on a weight-management plan?",
      },
    ],
    quickPrompts: [
      { emoji: "🌮", label: "Order at Mexican", prompt: "Help me order at a Mexican restaurant." },
      { emoji: "🍔", label: "Fast-food picks", prompt: "What should I order at fast food?" },
      { emoji: "🥤", label: "Lower-sugar drinks", prompt: "Give me lower-sugar beverage ideas." },
      { emoji: "✈️", label: "Travel dining", prompt: "How do I eat well while traveling?" },
    ],
    chatIntro: "Ask about ordering strategies, fast food, beverages, travel dining, or weight plans.",
    placeholder: "Ask what to order, healthy fast food, or lower-sugar drinks...",
  },
  {
    slug: "recipes",
    path: "/recipes",
    label: "Recipes",
    shortLabel: "Recipes",
    emoji: "🍳",
    tagline: "Quick, everyday recipes you'll actually make.",
    description:
      "Simple, high-protein, and low-glycemic recipes — plus family-friendly meals, meal-prep recipes, and breakfast, lunch, dinner, and snack ideas you can make without a fuss.",
    preview: [
      "Simple, high-protein & low-glycemic meals",
      "Family-friendly & meal-prep recipes",
      "Breakfast, lunch, dinner, and snacks",
    ],
    topics: [
      { emoji: "👨‍🍳", label: "Simple recipes", prompt: "Give me simple recipes." },
      { emoji: "💪", label: "High-protein meals", prompt: "Give me high-protein recipes." },
      { emoji: "🌾", label: "Low-glycemic ideas", prompt: "Suggest low-glycemic meal ideas." },
      { emoji: "👨‍👩‍👧", label: "Family-friendly meals", prompt: "Give me family-friendly meal ideas." },
      { emoji: "🍱", label: "Meal-prep recipes", prompt: "Give me meal-prep recipes." },
      { emoji: "🍽️", label: "Breakfast, lunch, dinner, snacks", prompt: "Give me breakfast, lunch, dinner, and snack ideas." },
    ],
    quickPrompts: [
      { emoji: "⏱️", label: "10-minute recipe", prompt: "Give me a quick high-protein recipe in 10 minutes." },
      { emoji: "🍳", label: "High-protein dinner", prompt: "Show me a high-protein dinner." },
      { emoji: "🍱", label: "Meal prep", prompt: "What can I meal prep this week?" },
      { emoji: "👨‍👩‍👧", label: "Family dinners", prompt: "Give me family-friendly dinner ideas." },
    ],
    chatIntro: "Ask about quick recipes, high-protein meals, meal prep, or family-friendly dinners.",
    placeholder: "Ask for a recipe, meal idea, or meal-prep plan...",
  },
  {
    slug: "glp1",
    path: "/glp1",
    label: "GLP-1 Education",
    shortLabel: "GLP-1",
    emoji: "💉",
    tagline: "General education to pair with your provider's guidance.",
    description:
      "Clear, general education on GLP-1 medications — eating while medicated, hydration and protein reminders, common provider discussion topics, educational explanations of nausea and appetite changes, and when to contact your care team.",
    preview: [
      "General medication education & provider topics",
      "Eating, hydration & protein reminders",
      "Explaining nausea, appetite changes & when to call",
    ],
    topics: [
      { emoji: "💊", label: "General medication education", prompt: "Give me general education about GLP-1 medications." },
      { emoji: "🩺", label: "Topics for your provider", prompt: "What are common topics to discuss with my provider?" },
      { emoji: "🍽️", label: "Eating while on GLP-1", prompt: "How should I think about eating while using GLP-1 medication?" },
      { emoji: "💧", label: "Hydration & protein reminders", prompt: "Remind me about hydration and protein while using GLP-1." },
      { emoji: "📞", label: "When to contact the care team", prompt: "When should I contact my care team?" },
      {
        emoji: "🤢",
        label: "Nausea & appetite education",
        prompt: "Explain nausea, appetite changes, and nutrition education.",
      },
    ],
    quickPrompts: [
      { emoji: "🍽️", label: "Gentle meal ideas", prompt: "Give me gentle meal ideas while my appetite is low." },
      { emoji: "🩺", label: "Questions for my provider", prompt: "What should I ask my provider about GLP-1?" },
      { emoji: "💧", label: "Hydration & protein", prompt: "How can I stay hydrated and hit protein?" },
      { emoji: "📞", label: "When to call", prompt: "When should I contact my care team?" },
    ],
    chatIntro: "General education for your GLP-1 journey — never a replacement for your provider.",
    placeholder: "Ask about eating, hydration, protein, or provider topics...",
    safetyNote: GLP1_DISCLAIMER,
  },
  {
    slug: "exercise",
    path: "/exercise",
    label: "Exercise & Movement",
    shortLabel: "Exercise",
    emoji: "🚶",
    tagline: "Beginner-friendly movement you can sustain.",
    description:
      "Beginners welcome — walking plans, strength training ideas, low-impact exercise, stretching and mobility, exercise motivation, and gentle activity reminders that fit busy days.",
    preview: [
      "Beginner walking plans & strength ideas",
      "Low-impact, stretching & mobility",
      "Motivation and movement reminders",
    ],
    topics: [
      { emoji: "🚶", label: "Beginner walking plans", prompt: "Create a beginner walking plan." },
      { emoji: "🏋️", label: "Strength training ideas", prompt: "Give me strength training ideas for beginners." },
      { emoji: "🧘", label: "Low-impact exercise", prompt: "Give me low-impact exercise ideas." },
      { emoji: "🤸", label: "Stretching & mobility", prompt: "Give me stretching and mobility ideas." },
      { emoji: "🔥", label: "Exercise motivation", prompt: "How do I stay motivated to exercise?" },
      { emoji: "⏰", label: "Activity reminders", prompt: "Give me activity reminders for staying consistent." },
    ],
    quickPrompts: [
      { emoji: "🚶", label: "Walking plan", prompt: "Create a beginner walking plan." },
      { emoji: "🏋️", label: "Strength basics", prompt: "Give me strength training ideas for beginners." },
      { emoji: "🧘", label: "Stretching", prompt: "Give me stretching and mobility ideas." },
      { emoji: "🔥", label: "Motivation", prompt: "How do I stay motivated to exercise?" },
    ],
    chatIntro: "Ask about walking plans, strength, stretching, or making movement stick.",
    placeholder: "Ask about walking, strength, stretching, or motivation...",
  },
  {
    slug: "hydration",
    path: "/hydration",
    label: "Hydration",
    shortLabel: "Hydration",
    emoji: "💧",
    tagline: "Practical ways to drink more water each day.",
    description:
      "Simple hydration education, flavorful beverage ideas without added sugar, easy reminders, and tips for travel, exercise, and busy days — so staying hydrated feels automatic, not annoying.",
    preview: [
      "Hydration education & beverage ideas",
      "Reminders that actually stick",
      "Tips for travel, exercise & busy days",
    ],
    topics: [
      { emoji: "📚", label: "Hydration education", prompt: "Teach me the basics of hydration." },
      { emoji: "🥤", label: "Beverage ideas", prompt: "Give me beverage ideas besides plain water." },
      { emoji: "⏰", label: "Reminders", prompt: "How can I remember to drink water?" },
      {
        emoji: "🧳",
        label: "Travel, exercise & busy days",
        prompt: "Give me hydration tips for travel, exercise, and busy days.",
      },
    ],
    quickPrompts: [
      { emoji: "💧", label: "Daily routine", prompt: "Build me a simple hydration routine." },
      { emoji: "🥤", label: "No-sugar flavor", prompt: "Give me flavor ideas without sugar." },
      { emoji: "⏰", label: "Reminders", prompt: "How can I remember to drink water?" },
      { emoji: "✈️", label: "Travel hydration", prompt: "How do I stay hydrated while traveling?" },
    ],
    chatIntro: "Ask about hydration basics, beverages, reminders, or busy-day strategies.",
    placeholder: "Ask about hydration tips, flavor ideas, or reminders...",
  },
  {
    slug: "habits",
    path: "/habits",
    label: "Healthy Habits",
    shortLabel: "Habits",
    emoji: "🌱",
    tagline: "Small routines that stack into big change.",
    description:
      "Build lasting healthy routines — goal setting, habit tracking, motivation, sleep routines, stress management, mindful eating, and long-term maintenance that survives real life.",
    preview: [
      "Goal setting, tracking & motivation",
      "Sleep routines, stress & mindful eating",
      "Long-term maintenance that lasts",
    ],
    topics: [
      { emoji: "🎯", label: "Goal setting", prompt: "Help me set health goals." },
      { emoji: "📊", label: "Habit tracking", prompt: "Help me track my habits." },
      { emoji: "🔥", label: "Motivation", prompt: "Help me stay motivated." },
      { emoji: "😴", label: "Sleep routines", prompt: "Help me build a sleep routine." },
      { emoji: "🧘", label: "Stress management", prompt: "Help me manage stress." },
      { emoji: "🍽️", label: "Mindful eating", prompt: "Teach me mindful eating." },
      { emoji: "♻️", label: "Long-term maintenance", prompt: "Help me with long-term maintenance." },
    ],
    quickPrompts: [
      { emoji: "🎯", label: "Set a goal", prompt: "Help me set a realistic health goal." },
      { emoji: "🌅", label: "Morning routine", prompt: "Help me build a morning routine." },
      { emoji: "😴", label: "Wind-down", prompt: "Help me build a better evening routine." },
      { emoji: "🧘", label: "Stress", prompt: "Help me manage stress." },
    ],
    chatIntro: "Ask about goals, habits, sleep, stress, or mindful eating.",
    placeholder: "Ask about goals, habits, sleep, or stress...",
  },
];

export const SECTIONS_BY_SLUG: Record<SectionSlug, FitSlimSection> = SECTIONS.reduce(
  (acc, section) => {
    acc[section.slug] = section;
    return acc;
  },
  {} as Record<SectionSlug, FitSlimSection>,
);

export type ConversationKey = SectionSlug | "general";
