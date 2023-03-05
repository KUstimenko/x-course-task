import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 2000);
    return () => clearTimeout(timer);
  });
}
