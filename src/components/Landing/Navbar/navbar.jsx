import { useEffect } from "react";

export default function NavbarEffect() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".navbar");
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null; // não renderiza nada, só aplica efeito
}