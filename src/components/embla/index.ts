import EmblaCarousel, { type EmblaOptionsType } from 'embla-carousel'
import AutoHeight from 'embla-carousel-auto-height'
import { addPrevNextBtnsClickHandlers } from './buttons'

const OPTIONS: EmblaOptionsType = { align: 'start', containScroll: 'trimSnaps' };

// Find all slider elements on the page
const emblaNodes = document.querySelectorAll('.embla');

// Iterate over each slider element
emblaNodes.forEach((emblaNode: Element) => {
  const viewportNode = emblaNode.querySelector('.embla__viewport') as HTMLElement;
  const prevBtn = emblaNode.querySelector('.embla__prev') as HTMLElement;
  const nextBtn = emblaNode.querySelector('.embla__next') as HTMLElement;

  // Check if the viewportNode exists before initializing EmblaCarousel
  if (viewportNode) {
    let screenWidth = window.screen.availWidth;
    const emblaApi = EmblaCarousel(viewportNode, OPTIONS, screenWidth < 640 ? [AutoHeight()] : []);

    const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(emblaApi, prevBtn, nextBtn);

    emblaApi.on('destroy', removePrevNextBtnsClickHandlers);
  }
});
