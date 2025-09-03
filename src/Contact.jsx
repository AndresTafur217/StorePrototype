export function Contact() {
  return (
    <div className="bg-store-bg w-full h-125 rounded-4xl pt-7 overflow-hidden flex flex-col items-center justify-center">
      <section className="w-3/5 py-5 h-83 flex-1 m-5 flex flex-col flex-wrap overflow-hidden rounded-4xl bg-store-bg2 shadow-lg">
        <div className="w-full h-full px-3 text-justify columns-1 md:columns-2 gap-5">
          <p className="break-inside-avoid">
            Nosotros Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos praesentium 
            quis pariatur. Hic nobis ipsam, laborum cupiditate tempore, rerum blanditiis quibusdam 
            voluptate dolore earum velit. Qui laborum numquam dolor! Molestias.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti possimus odit tenetur modi 
            vel architecto, autem libero veritatis aspernatur, nostrum voluptas eligendi? Quo at, 
            ratione dolor exercitationem eligendi animi eos!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium est accusamus veniam 
            debitis ducimus omnis earum eum consequatur ipsam autem aspernatur fuga, inventore nemo 
            tempora eveniet adipisci in blanditiis. Amet.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique, nihil voluptatibus 
            perspiciatis suscipit odio voluptate in totam minima temporibus esse quae qui nisi iusto 
            beatae natus recusandae minus pariatur odit!
          </p>
        </div>
      </section>
      <section className="w-full h-25 flex flex-row gap-5 items-center justify-center overflow-hidden bg-store-items">
        <article className="size-15 rounded-full flex justify-center items-center text-gray-950 transition-all 
          hover:bg-black/20 hover:scale-105 hover:text-store-bg2">
          <a href="">
            <svg className="size-10">
              <use xlinkHref="/sprite.svg#phone" />
            </svg>
          </a>
        </article>
        <article className="size-15 rounded-full flex justify-center items-center text-gray-950 transition-all 
          hover:bg-black/20 hover:scale-105 hover:text-store-bg2">
          <a href="">
            <svg className="size-10">
              <use xlinkHref="/sprite.svg#whatsapp" />
            </svg>
          </a>
        </article>
        <article className="size-15 rounded-full flex justify-center items-center text-gray-950 transition-all 
          hover:bg-black/20 hover:scale-105 hover:text-store-bg2">
          <a href="">
            <svg className="size-10">
              <use xlinkHref="/sprite.svg#instagram" />
            </svg>
          </a>
        </article>
        <article className="size-15 rounded-full flex justify-center items-center text-gray-950 transition-all 
          hover:bg-black/20 hover:scale-105 hover:text-store-bg2">
          <a href="">
            <svg className="size-10">
              <use xlinkHref="/sprite.svg#x" />
            </svg>
          </a>
        </article>
        <article className="size-15 rounded-full flex justify-center items-center text-gray-950 transition-all 
          hover:bg-black/20 hover:scale-105 hover:text-store-bg2">
          <a href="">
            <svg className="size-10">
              <use xlinkHref="/sprite.svg#tiktok" />
            </svg>
          </a>
        </article>
        <article className="size-15 rounded-full flex justify-center items-center text-gray-950 transition-all 
          hover:bg-black/20 hover:scale-105 hover:text-store-bg2">
          <a href="">
            <svg className="size-10">
              <use xlinkHref="/sprite.svg#gmail" />
            </svg>
          </a>
        </article>
        <article className="size-15 rounded-full flex justify-center items-center text-gray-950 transition-all 
          hover:bg-black/20 hover:scale-105 hover:text-store-bg2">
          <a href="">
            <svg className="size-10">
              <use xlinkHref="/sprite.svg#youtube" />
            </svg>
          </a>
        </article>
      </section>
    </div>
  )
}