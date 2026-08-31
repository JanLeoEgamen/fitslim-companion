/**
 * Minimal ambient types for the Web Speech `SpeechRecognition` API.
 *
 * The bundled TypeScript DOM lib pins down the *result* types
 * (SpeechRecognitionAlternative / SpeechRecognitionResult / ResultList) but not
 * the `SpeechRecognition` interface, its events, or the constructor global, so
 * we declare the pieces ChatInput uses. Chrome and Edge expose it unprefixed;
 * Safari exposes it as `webkitSpeechRecognition`. Requires a secure context.
 */

export {};

declare global {
  interface SpeechRecognitionEvent {
    /** Index of the first result that changed since the previous event. */
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    readonly error: string;
  }

  interface SpeechRecognition {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    onresult: ((this: SpeechRecognition, event: SpeechRecognitionEvent) => void) | null;
    onend: ((this: SpeechRecognition, event: Event) => void) | null;
    onerror: ((this: SpeechRecognition, event: SpeechRecognitionErrorEvent) => void) | null;
    start: () => void;
    stop: () => void;
    abort: () => void;
  }

  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}
