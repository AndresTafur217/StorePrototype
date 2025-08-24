import { Outlet } from "react-router-dom";
import { Menu } from "./Menu";
import { Contact } from "./Contact";

export function Layout() {
  return (
    <div className="max-w-dvw h-dvh flex overflow-hidden bg-gradient-to-tr from-emerald-400 via-blue-800 to-purple-600">
      <div className="size-10xl -left-95 -top-90 rounded-full bg-black/15 absolute"></div>
      <div className="size-9xl -left-85 -top-80 rounded-full bg-white/15 absolute"></div>

      <section className="w-30 m-5 rounded-full bg-store-bg2/70 z-50 overflow-hidden">
        <Menu />
      </section><section className="flex-1 p-5 m-5 rounded-7xl bg-store-bg2/70 z-10 overflow-hidden">
        <div className="h-full w-full p-5 rounded-6xl bg-store-bg2/70">
          <div className="h-full w-full p-5 rounded-6xl overflow-y-auto scrollbar-none">
              <div className="w-full flex flex-col gap-7.5 items-center">
              <section className="w-full p-5 rounded-b-6xl">
                  <Outlet /> 
              </section>
              <section className="w-full p-2.5 overflow-hidden">
                  <Contact />
              </section>
              </div>
          </div>
        </div>
      </section>
    </div>
  );
}