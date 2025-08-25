import { Link } from "react-router-dom";
import { AuthToken } from "./auth/AuthToken";

export function Menu() {
  return (
    <div className="h-full p-2.5 flex flex-col justify-between items-center">
      <div className="size-25 justify-center items-center rounded-full bg-store-items">
        <Link to="/" className="h-full w-full flex justify-center items-center">            
        </Link>
      </div>

      <section className="w-full px-3.5 flex flex-col gap-6 justify-evenly items-center">
        <article className="size-12 max-w-full mx-2.5 rounded-full bg-store-items2 text-store-details transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-500">
          <Link to="/buscar" className="h-full w-full flex justify-center items-center">
            <svg width="30" height="30">
              <use xlinkHref="/sprite.svg#search" />
            </svg>
          </Link>
        </article>

        <article className="w-full h-18 rounded-full bg-store-items transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-500">
          <Link to="/productos" className="h-full w-full flex justify-center items-center">
            <svg width="50" height="50">
              <use xlinkHref="/sprite.svg#laptop-phone" />
            </svg>
          </Link>
        </article>

        <article className="w-full h-18 rounded-full bg-store-items transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-500">
          <AuthToken to="/guardados" className="h-full w-full flex justify-center items-center">
            <svg width="50" height="50">
              <use xlinkHref="/sprite.svg#bookmark" />
            </svg>
          </AuthToken>
        </article>

        <article className="w-full h-18 rounded-full bg-store-items transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-500">
          <AuthToken to="/pedidos" className="h-full w-full flex justify-center items-center">
            <svg width="50" height="50">
              <use xlinkHref="/sprite.svg#car" />
            </svg>
          </AuthToken>
        </article>

        <article className="w-full h-18 rounded-full bg-store-items transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-500">
          <AuthToken to="/pendientes" className="h-full w-full flex justify-center items-center">
            <svg width="50" height="50">
              <use xlinkHref="/sprite.svg#invoice" />
            </svg>
          </AuthToken>
        </article>

        <article className="size-12 max-w-full mx-2.5 rounded-full bg-store-items2 text-store-details transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-500">
          <AuthToken to="/historial" className="h-full w-full flex justify-center items-center">
            <svg width="40" height="40">
              <use xlinkHref="/sprite.svg#history" />
            </svg>
          </AuthToken>
        </article>
      </section>

      <section className="w-full flex flex-col gap-6 justify-evenly items-center">
        <article className="w-10 h-10 max-w-full m-5 rounded-full text-store-text transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-500">
          <AuthToken to="/ajustes" className="h-full w-full flex justify-center items-center">
            <svg width="40" height="40">
              <use xlinkHref="/sprite.svg#settings" />
            </svg>
          </AuthToken>
        </article>

        <article className="size-25 justify-center items-center rounded-full bg-store-items transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-500">
          <AuthToken to="/perfil" className="h-full w-full flex justify-center items-center">
            <svg width="60" height="60">
              <use xlinkHref="/sprite.svg#person" />
            </svg>
          </AuthToken>
        </article>
      </section>
    </div>
  );
}
