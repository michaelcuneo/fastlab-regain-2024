let observer: IntersectionObserver;

const getObserver = () => {
  if (observer) return;

  observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.dispatchEvent(new CustomEvent('isVisible'));
        }
      });
    }
  );
}

export const lazyLoad = (element: HTMLElement) => {
  getObserver();

  observer.observe(element);

  return {
    destroy() {
      observer.unobserve(element);
    }
  }
}
