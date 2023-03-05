import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);
    return () => clearTimeout(timer);
  });
}
