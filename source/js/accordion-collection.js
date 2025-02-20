const initAccordionCollection = () => {
  const accordionCollection = document.querySelectorAll('.accordion-item-js');

  accordionCollection.forEach((accordion) => {
    const input = accordion.querySelector('input');

    input.addEventListener('input', () => {
      accordion.classList.toggle('accordion-item--active');
    });
  });
};

initAccordionCollection();
