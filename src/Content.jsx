import { Areas } from "./Areas";
import { Contact } from "./Contact";
import { Products } from "./Products";
import { Slide } from "./Slide";
import { Types } from "./Types";
import React, { useRef, useEffect } from 'react';

export function Content() {
  document.addEventListener('DOMContentLoaded', function() {
      const marquee = document.querySelector('.marquee');
      if (marquee) {
          const containerWidth = marquee.parentElement.offsetWidth;
          const contentWidth = marquee.scrollWidth;
          const totalDistance = containerWidth + contentWidth;

          // Velocidad en píxeles por segundo (ajústala según prefieras)
          const speed = 40;
          const duration = totalDistance / speed;

          marquee.style.animationDuration = duration + 's';
      }
  });
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      // Prevenir el scroll vertical por defecto
      e.preventDefault();
      
      // Convertir el scroll vertical en horizontal
      const scrollAmount = e.deltaY;
      scrollContainer.scrollLeft += scrollAmount;
    };

    // Agregar el event listener
    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup
    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);
  const scrollContainersRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainersRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      // Prevenir el scroll vertical por defecto
      e.preventDefault();
      
      // Convertir el scroll vertical en horizontal
      const scrollAmount = e.deltaY;
      scrollContainer.scrollLeft += scrollAmount;
    };

    // Agregar el event listener
    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup
    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);
  return(
    <div className="h-full w-full p-5 rounded-6xl bg-store-bg2/70">
      <div className="h-full w-full p-5 rounded-6xl overflow-y-auto scrollbar-none">
        <div className="h-max w-full flex flex-col gap-7.5 items-center">
          <section className="w-full h-90 p-5 overflow-hidden">
            <Slide />
          </section>
          <section ref={scrollContainerRef} className="w-full h-20 p-2.5 overflow-x-auto scrollbar">
            <Types />
          </section>
          <section ref={scrollContainersRef} className="w-full h-20 p-2.5 overflow-x-auto scrollbar">
            <Areas />
          </section>
          <section className="w-full p-2.5">
            <Products />
          </section>
          <section className="w-full p-2.5 overflow-hidden">
            <Contact />
          </section>
        </div>
      </div>
    </div>
  )
}