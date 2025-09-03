import { Areas } from "./Areas";
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
  return(
    <div className="h-max w-full flex flex-col gap-7.5 items-center">
      <section className="w-full h-90 p-5 overflow-hidden">
        <Slide />
      </section>
      <section className="w-full h-20 p-2.5 overflow-x-auto scrollbar">
        <Types />
      </section>
      <section className="w-full h-20 p-2.5 overflow-x-auto scrollbar">
        <Areas />
      </section>
      <section className="w-full">
        <Products />
      </section>
    </div>
  )
}