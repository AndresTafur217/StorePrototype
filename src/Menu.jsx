export function Menu() {
    return(
        <div className="h-full p-2.5 flex flex-col justify-between items-center">
            <div className="size-25 justify-center items-center rounded-full bg-store-items"></div>
            <section className="w-full px-3.5 flex flex-col gap-6 justify-evenly items-center">
                <article className="size-12 max-w-full mx-2.5 rounded-full bg-store-items2 text-store-details">
                    <a href="" className="h-full w-full flex justify-center items-center">
                        <svg width="30" height="30">
                            <use xlinkHref="/sprite.svg#search" />"
                        </svg>
                    </a>
                </article>
                <article className="w-full h-18 rounded-full bg-store-items">
                    <a href="" className="h-full w-full flex justify-center items-center">
                        <svg width="50" height="50">
                            <use xlinkHref="/sprite.svg#laptop-phone" />"
                        </svg>
                    </a>
                </article>
                <article className="w-full h-18 rounded-full bg-store-items">
                    <a href="" className="h-full w-full flex justify-center items-center">
                        <svg width="50" height="50">
                            <use xlinkHref="/sprite.svg#bookmark" />"
                        </svg>
                    </a>
                </article>
                <article className="w-full h-18 rounded-full bg-store-items">
                    <a href="" className="h-full w-full flex justify-center items-center">
                        <svg width="50" height="50">
                            <use xlinkHref="/sprite.svg#car" />"
                        </svg>
                    </a>
                </article>
                <article className="w-full h-18 rounded-full bg-store-items">
                    <a href="" className="h-full w-full flex justify-center items-center">
                        <svg width="50" height="50">
                            <use xlinkHref="/sprite.svg#invoice" />"
                        </svg>
                    </a>
                </article>
                <article className="size-12 max-w-full mx-2.5 rounded-full bg-store-items2 text-store-details">
                    <a href="" className="h-full w-full flex justify-center items-center">
                        <svg width="40" height="40">
                            <use xlinkHref="/sprite.svg#history" />"
                        </svg>
                    </a>
                </article>
            </section>
            <section className="w-full flex flex-col gap-6 justify-evenly items-center">
                <article className="w-10 h-10 max-w-full m-5 rounded-full text-store-text">
                    <a href="" className="h-full w-full flex justify-center items-center">
                        <svg width="40" height="40">
                            <use xlinkHref="/sprite.svg#settings" />"
                        </svg>
                    </a>
                </article>
                <article className="size-25 justify-center items-center rounded-full bg-store-items">
                    <a href="" className="h-full w-full flex justify-center items-center">
                        <svg width="60" height="60">
                            <use xlinkHref="/sprite.svg#person" />"
                        </svg>
                    </a>
                </article>
            </section>
        </div>
    )
}