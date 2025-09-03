import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./config/api";
import { AuthToken } from "./auth/AuthToken";
import { useFavorites } from "./hooks/useFavorites";

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  // Usar el hook de favoritos
  const {
    favorites,
    loading: favLoading,
    error: favError,
    message: favMessage,
    isProductInFavorites,
    toggleFavorite,
    loadFavorites,
    clearMessages
  } = useFavorites();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const resProducts = await fetch(API_ENDPOINTS.products);
        if (!resProducts.ok) throw new Error(`Error ${resProducts.status}`);
        const dataProducts = await resProducts.json();
        
        if (dataProducts.success && dataProducts.data) {
          setProducts(dataProducts.data);
        } else {
          throw new Error("Formato de respuesta inesperado");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };    
    // Cargar productos y favoritos
    fetchProducts();
    loadFavorites();
  }, [loadFavorites]);

  const handleFavoriteClick = async (productId) => {
    try {
      await toggleFavorite(productId);
    } catch (err) {
      console.error("Error al manejar favorito:", err);
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  // paginación
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="flex flex-col gap-4">
      {currentProducts.length === 0 || isHome ? (null) : (
      <div className="w-full h-max flex flex-row flex-wrap gap-2.5 justify-start items-center p-2.5">
        <div className="border border-gray-400 w-max h-max py-1 px-2.5 rounded-xl cursor-pointer 
          transition-all ease-in-out hover:scale-105 hover:bg-store-details hover:border-gray-950 
          hover:shadow-2xl">filtros</div>
        <div className="border border-gray-400 w-max h-max py-1 px-2.5 rounded-xl cursor-pointer 
          transition-all ease-in-out hover:scale-105 hover:bg-store-items2 hover:border-gray-950 
          hover:shadow-2xl">Area</div>
        <div className="border border-gray-400 w-max h-max py-1 px-2.5 rounded-xl cursor-pointer 
          transition-all ease-in-out hover:scale-105 hover:bg-store-items2 hover:border-gray-950 
          hover:shadow-2xl">Tipo</div>
        <div className="border border-gray-400 w-max h-max py-1 px-2.5 rounded-xl cursor-pointer 
          transition-all ease-in-out hover:scale-105 hover:bg-store-items2 hover:border-gray-950 
          hover:shadow-2xl">Especificaciones</div>
        <div className="border border-gray-400 w-max h-max py-1 px-2.5 rounded-xl cursor-pointer 
          transition-all ease-in-out hover:scale-105 hover:bg-store-items2 hover:border-gray-950 
          hover:shadow-2xl">Vendedor</div>
      </div>)}
      <div className="h-max w-full flex flex-row flex-wrap gap-2.5 justify-center items-center">
        {currentProducts.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          currentProducts.map((product) => {
            const isInFavorites = isProductInFavorites(product.id);
            
            let mensajeStock = "";
            if (product.stock === 0) {
              mensajeStock = "agotado";
            } else if (product.stock <= 10) {
              mensajeStock = "Últimas unidades";
            }

            return (
              <div
                key={product.id}
                className="size-product rounded-4xl p-2.5 flex flex-col gap-1.5 bg-store-bg2/50 shadow-lg"
              >
                <section className="h-2/3 w-full rounded-t-3xl bg-store-bg2/70 overflow-hidden relative">
                  {/* Imagen principal */}
                  {product.imagenes?.[0] ? (
                    <img
                      src={product.imagenes[0].url}
                      alt={product.imagenes[0].alt || product.nombre}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                      Sin imagen
                    </div>
                  )}

                  {mensajeStock && (
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                      {mensajeStock}
                    </div>
                  )}

                  <div 
                    className={`absolute right-0 bottom-0 border p-1 m-3 rounded-full cursor-pointer transition-colors ${
                      isInFavorites 
                        ? 'border-red-600 text-red-600 hover:text-red-800 hover:border-red-800' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    <AuthToken 
                      to="/favorites" 
                      className="h-full w-full flex justify-center items-center"
                    >
                      <div 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleFavoriteClick(product.id);
                        }}
                        className={favLoading ? 'opacity-50 pointer-events-none' : ''}
                      >
                        <svg width="25" height="25">
                          <use xlinkHref={isInFavorites ? "/sprite.svg#removebm" : "/sprite.svg#addbm"} />
                        </svg>
                      </div>
                    </AuthToken>
                  </div>
                </section>
                <section className="h-1/3 w-full p-1 rounded-b-3xl bg-store-bg2/70 flex flex-col gap-1 overflow-hidden">
                  <div className="w-full h-max overflow-x-auto scrollbar">
                    <article className="w-max h-max">{product.nombre}</article>
                  </div>
                  <div className="w-full h-2/3 flex flex-row gap-0.5 justify-between">
                    <div className="w-2/3 h-full overflow-y-auto scrollbar-none">
                      <article className="w-2/3">{product.descripcion}</article>
                    </div>
                    <article className="w-1/3 h-full rounded-2xl flex items-center justify-center bg-store-details">
                      <strong>{product.precio}</strong>
                    </article>
                  </div>
                </section>
              </div>
            );
          })
        )}
      </div>

      {(favMessage || favError) && (
        <div className="fixed top-4 right-4 flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50">
          <div className={`flex items-center justify-between w-full h-12 sm:h-14 rounded-lg px-[10px] ${
            favError ? 'bg-red-100 border border-red-300' : 'bg-store-items/90'
          }`}>
            <div className="flex gap-2 justify-between items-center">
              <div className={`p-1 rounded-lg ${
                favError 
                  ? 'text-red-600 bg-red-200' 
                  : 'text-emerald-600 bg-store-bg2/60 backdrop-blur-xl'
              }`}>
                <svg className="size-6">
                  <use xlinkHref={favError ? "/sprite.svg#error" : "/sprite.svg#check"} />
                </svg>
              </div>
              <p className="text-black">{favMessage || favError}</p>
            </div>
            <button 
              onClick={clearMessages}
              className="text-gray-800 hover:bg-white/5 p-1 rounded-md"
            >
              <svg className="size-5">
                <use xlinkHref="/sprite.svg#close" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {isHome ? (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate("/productos")}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            Ver más productos
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            className="p-2 rounded-full transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-black/20"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <svg width="20" height="20">
              <use xlinkHref="/sprite.svg#arrowl" />
            </svg>
          </button>
          <span className="">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="p-2 rounded-full transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-black/20"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >            
            <svg width="20" height="20">
              <use xlinkHref="/sprite.svg#arrowr" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}