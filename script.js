// Apparition progressive des éléments au scroll
document.addEventListener("DOMContentLoaded", () => {
  const scrollElements = document.querySelectorAll(".scroll-appear");

  const elementInView = (el, offset = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight - offset);
  };

  const displayScrollElement = (element) => {
    element.classList.add("visible");
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 100)) {
        displayScrollElement(el);
      }
    });
  };

  window.addEventListener("scroll", handleScrollAnimation);
  handleScrollAnimation(); // pour ceux déjà visibles
});