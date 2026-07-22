import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router doesn't reset scroll position on navigation (it's an SPA —
 * no real page reload happens). Without this, clicking a nav link while
 * scrolled down on one page keeps you scrolled down on the next page too.
 * This component watches the route and scrolls back to the top whenever
 * the pathname changes.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
};

export default ScrollToTop;