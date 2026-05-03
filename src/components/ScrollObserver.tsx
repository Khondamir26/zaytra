"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    /* Small delay so the new page's DOM is fully painted before we query */
    const timer = setTimeout(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

      /* Immediately reveal elements already visible in the viewport */
      els.forEach((el) => {
        const { top, bottom } = el.getBoundingClientRect();
        if (top < window.innerHeight && bottom > 0) {
          el.classList.add("in-view");
        }
      });

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in-view");
            } else {
              /* Only hide elements that are still below the fold (not yet seen).
                 Elements that scrolled above the viewport stay visible. */
              const top = (e.target as HTMLElement).getBoundingClientRect().top;
              if (top > window.innerHeight) {
                e.target.classList.remove("in-view");
              }
            }
          });
        },
        { threshold: 0.08 }
      );

      els.forEach((el) => observer!.observe(el));
    }, 80);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname]); /* Re-run on every page navigation */

  return null;
}
