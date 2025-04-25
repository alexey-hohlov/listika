import type { Directive } from 'vue';

export const clickOutside: Directive = {
  mounted(el: HTMLElement, binding) {
    const handler = (event: MouseEvent) => {
      console.log('directive!')
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };

    (el as any).__clickOutsideHandler__ = handler;
    (el as any).__clickOutsideTimeout__ = setTimeout(() => {
      document.addEventListener('click', handler, true);
    }, 0);
  },

  unmounted(el: HTMLElement) {
    clearTimeout((el as any).__clickOutsideTimeout__);
    document.removeEventListener('click', (el as any).__clickOutsideHandler__, true);
    delete (el as any).__clickOutsideHandler__;
    delete (el as any).__clickOutsideTimeout__;
  },
};
