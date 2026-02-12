"use client";

import { useEffect } from "react";

export default function ScrollAnimationProvider() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          intersectionObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animationClasses = [
      "scroll-fade-in",
      "scroll-fade-in-left",
      "scroll-fade-in-right",
      "scroll-scale-in",
      "scroll-blur-in"
    ];

    const selector = animationClasses.map(c => `.${c}`).join(", ");

    // Функция для наблюдения за элементом
    const observeElement = (el: Element) => {
      if (!el.classList.contains("visible")) {
        intersectionObserver.observe(el);
      }
    };

    // Наблюдаем за текущими элементами
    document.querySelectorAll(selector).forEach(observeElement);

    // MutationObserver для отслеживания новых элементов (решает race condition)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            // Проверяем сам элемент
            if (animationClasses.some(c => node.classList.contains(c))) {
              observeElement(node);
            }
            // Проверяем дочерние элементы
            node.querySelectorAll(selector).forEach(observeElement);
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
