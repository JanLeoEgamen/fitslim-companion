import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Distance from the bottom (px) that still counts as "at the latest message".
 * Above this threshold we consider the user to be reading older history and
 * stop auto-scrolling (and start offering the "jump to latest" affordance).
 */
const NEAR_BOTTOM_THRESHOLD = 120;

/**
 * Scroll-position tracking for a chat list.
 *
 * `ref` must be attached to the chat's scroll container (the element with
 * `overflow-y-auto`). The hook reports whether the user is near the bottom and
 * exposes `scrollToBottom` for the smart auto-scroll + "jump to latest" FAB.
 */
export function useChatScroll<El extends HTMLElement>() {
  const ref = useRef<El | null>(null);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [showJumpToLatest, setShowJumpToLatest] = useState(false);

  const handleScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    const near = distance <= NEAR_BOTTOM_THRESHOLD;
    setIsNearBottom(near);
    setShowJumpToLatest(!near);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "auto") => {
    const el = ref.current;
    if (!el) return;
    if (behavior === "smooth") {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    } else {
      el.scrollTop = el.scrollHeight;
    }
  }, []);

  return { ref, isNearBottom, showJumpToLatest, scrollToBottom };
}
