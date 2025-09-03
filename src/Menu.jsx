import { Link } from "react-router-dom";
import { AuthToken } from "./auth/AuthToken";

export function Menu() {
  return (
    <div className="h-full p-2.5 flex flex-col justify-between items-center">
      <div className="size-25 justify-center items-center rounded-full">
        <Link to="/" className="h-full w-full flex justify-center items-center">      
          <img src="/RobotB.svg" alt="Store"  className="size-4/5"/>
        </Link>
      </div>

      <section className="w-full px-3.5 flex flex-col gap-6 justify-evenly items-center">
        <article className="size-12 max-w-full mx-2.5 rounded-full bg-store-items2 
          text-store-details transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-500">
          <Link to="/buscar" className="h-full w-full flex justify-center items-center">
            <svg width="30" height="30">
              <use xlinkHref="/sprite.svg#search" />
            </svg>
          </Link>
        </article>

        <article className="w-full h-18 rounded-full bg-store-items text-gray-950 transition-all 
          hover:bg-store-items/70 hover:scale-105 hover:text-store-bg2">
          <Link to="/productos" className="h-full w-full flex justify-center items-center">
            <svg width="50" height="50">
              <use xlinkHref="/sprite.svg#laptop-phone" />
            </svg>
          </Link>
        </article>

        <article className="w-full h-18">
          <AuthToken to="/guardados">
            <div className="h-full w-full flex justify-center items-center rounded-full bg-store-items 
              text-gray-950 transition-all hover:bg-store-items/70 hover:scale-105 hover:text-store-bg2">
              <svg width="50" height="50">
                <use xlinkHref="/sprite.svg#bookmark" />
              </svg>
            </div>
          </AuthToken>
        </article>

        <article className="w-full h-18">
          <AuthToken to="/pedidos">
            <div className="h-full w-full rounded-full flex justify-center items-center bg-store-items 
              text-gray-950 transition-all hover:bg-store-items/70 hover:scale-105 hover:text-store-bg2">
              <svg width="50" height="50">
                <use xlinkHref="/sprite.svg#car" />
              </svg>
            </div>
          </AuthToken>
        </article>

        <article className="w-full h-18">
          <AuthToken to="/pedidos-realizados">
            <div className="h-full w-full rounded-full flex justify-center items-center bg-store-items 
              text-gray-950 transition-all hover:bg-store-items/70 hover:scale-105 hover:text-store-bg2">
              <svg width="50" height="50">
                <use xlinkHref="/sprite.svg#invoice" />
              </svg>
            </div>
          </AuthToken>
        </article>

        <article className="size-12 max-w-full mx-2.5">
          <AuthToken to="/historial">
            <div className="h-full w-full flex justify-center items-center rounded-full bg-store-items2 
              text-store-details transition-all hover:bg-store-items/70 hover:scale-105 hover:text-store-bg2">
              <svg width="40" height="40">
                <use xlinkHref="/sprite.svg#history" />
              </svg>
            </div>
          </AuthToken>
        </article>
      </section>

      <section className="w-full flex flex-col gap-6 justify-evenly items-center">
        <article className="w-10 h-10 max-w-full m-5">
          <AuthToken to="/ajustes">
            <div className="h-full w-full flex justify-center items-center rounded-full text-store-text 
              transition-transform ease-in-out hover:scale-105 hover:bg-gray-500">
              <svg width="40" height="40">
                <use xlinkHref="/sprite.svg#settings" />
              </svg>
            </div>
          </AuthToken>
        </article>

        <article className="size-25 justify-center items-center">
          <AuthToken to="/perfil">
            <div className="h-full w-full flex justify-center items-center rounded-full bg-store-items 
              text-gray-950 transition-transform ease-in-out hover:scale-105 hover:bg-store-items/70 hover:text-store-bg2">
              <svg width="60" height="60">
                <use xlinkHref="/sprite.svg#person" />
              </svg>
            </div>
          </AuthToken>
        </article>
      </section>
    </div>
  );
}
