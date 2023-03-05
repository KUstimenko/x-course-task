import React, { useEffect } from "react";
import Typed from "typed.js";

function TypedText() {
  useEffect(() => {
    const options = {
      strings: ["OOPS!", "No results", "😥", "OOPS! No results 😥"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    };
    const typed = new Typed(".typing", options);
    return () => {
      typed.destroy();
    };
  }, []);
  return <span className="typing"></span>;
}

export default TypedText;
