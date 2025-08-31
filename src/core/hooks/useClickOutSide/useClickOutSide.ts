import { useEffect } from "react";

/**
 * Custom hook to detect clicks or touches outside a referenced element.
 *
 * @template T - Type of the HTML element being referenced
 * @param ref - React ref object pointing to the element
 * @param handler - Function to call when a click outside is detected
 * @param whenActive - Boolean to enable or disable the listener (default: true)
 */
function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  whenActive = true
): void {
  useEffect(() => {
    if (!whenActive) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (!ref.current || ref.current.contains(target)) return;
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, whenActive]);
}

export default useClickOutside;
