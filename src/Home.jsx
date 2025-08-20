import { Content } from "./Content";
import { Menu } from "./Menu";

export function Home() {
  return(
    <div className="max-w-dvw h-dvh flex overflow-hidden bg-gradient-to-tr from-emerald-400 via-blue-800 to-purple-600">
      <div className="size-10xl -left-95 -top-90 rounded-full bg-black/15 absolute"></div>
      <div className="size-9xl -left-85 -top-80 rounded-full bg-white/15 absolute"></div>
      <section className="w-30 m-5 rounded-full bg-store-bg2/70 z-10 overflow-hidden"><Menu/></section>
      <section className="flex-1 p-5 m-5 rounded-7xl bg-store-bg2/70 z-10 overflow-hidden"><Content/></section>
    </div>
  )
}