import { Contact } from "./Contact";
import { Content } from "./Content";
import React, { useRef, useEffect } from 'react';

export function Body() {  
  return(
    <div className="h-full w-full p-5 rounded-6xl bg-store-bg2/70">
      <div className="h-full w-full p-5 rounded-6xl overflow-y-auto scrollbar-none">
        <div className="w-full flex flex-col gap-7.5 items-center">
          <section className="w-full p-5 rounded-b-6xl">
            <Content />
          </section>
          <section className="w-full p-2.5 overflow-hidden">
            <Contact />
          </section>
        </div>
      </div>
    </div>
  )
}