import { Areas } from "./Areas";
import { Slide } from "./Slide";
import { Types } from "./Types";

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
    <div className="h-full p-5 flex flex-col gap-7.5 items-center flex-1 rounded-6xl bg-store-bg2/70 z-10">
      <section className="w-full h-1/2 p-5 overflow-hidden">
        <Slide />
      </section>
      <section className="w-full h-20 p-2.5 overflow-hidden">
        <Types />
      </section>
      <section className="w-full h-20 p-2.5 overflow-hidden">
        <Areas />
      </section>
    </div>
  )
}