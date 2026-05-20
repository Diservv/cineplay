import { useEffect } from "react";

export function useEmbedProtection() {
  useEffect(() => {
    const originalOpen = window.open;

    window.open = () => null;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.target === "_blank") {
        const href = anchor.href || "";
        const isInternal = href.startsWith(window.location.origin);

        if (!isInternal) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      window.open = originalOpen;
      document.removeEventListener("click", handleClick, true);
    };
  }, []);
}
