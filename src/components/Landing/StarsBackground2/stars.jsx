import { useEffect } from "react";

export default function StarsBackground2() {
  useEffect(() => {
    const starContainer = document.getElementById("stars");
    if (!starContainer) return;

    const numStars = 150;
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.top = Math.random() * 100 + "%";
      star.style.left = Math.random() * 100 + "%";
      const size = Math.random() * 2 + 1;
      star.style.width = size + "px";
      star.style.height = size + "px";
      star.style.animationDuration = Math.random() * 2 + 1 + "s";
      starContainer.appendChild(star);
    }
  }, []);

  return <div id="star"></div>; // container das estrelas
}