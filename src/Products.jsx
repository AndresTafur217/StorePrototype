import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "./config/api";
import { FAVORITES_ENDPOINTS } from "./config/favorites";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthToken } from "./auth/AuthToken";

export function Products() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");  

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 30;

  const location = useLocation();   // <- Detecta la ruta actual
  const navigate = useNavigate();

  const isHome = location.pathname === "/"; // true si está en "/"
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.products);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();

        if (data.success && data.data) {
          setProducts(data.data);
        } else {
          throw new Error("Formato de respuesta inesperado");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addFavorites = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No hay token, inicia sesión primero");
      }

      const res = await fetch(FAVORITES_ENDPOINTS.addBM, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }), // 👈 el backend espera esto
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();

      if (data.success && data.data) {
        setFavorites((prev) => [...prev, data.data]);
        setMessage(data.message);
      } else {
        throw new Error("Formato de respuesta inesperado");
      }
    } catch (err) {
      setError(err.message);
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
      {/* Lista de productos */}
      <div className="h-max w-full grid grid-cols-5 grid-rows-6 gap-2.5">
        {currentProducts.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          currentProducts.map((product) => (
            <div
              key={product.id}
              className="border-2 h-product w-full rounded-4xl p-2.5 flex flex-col gap-0.5"
            >
              <section className="border-2 h-2/3 w-full rounded-t-3xl bg-store-bg2/70 overflow-hidden">
                <div className="border p-1 m-3 float-right rounded-full add-bm cursor-pointer" onClick={() => addFavorites(product.id)}>
                  <AuthToken className="h-full w-full flex justify-center items-center">
                    <svg width="30" height="30">
                      <use xlinkHref="/sprite.svg#addbm" />
                    </svg>
                  </AuthToken>
                </div>
              </section>
              <section className="border-2 h-1/3 w-full p-1 rounded-b-3xl bg-store-bg2/70 flex flex-col gap-1 overflow-hidden">
                <div className="w-full h-max overflow-x-auto scrollbar">
                  <article className="w-max h-max">{product.nombre}</article>
                </div>
                <div className="w-full h-2/3 flex flex-row gap-0.5 justify-between">
                  <div className="w-2/3 h-full overflow-y-auto scrollbar-none">
                    <article className="w-2/3">{product.descripcion}</article>
                  </div>
                  <article className="border-2 w-1/3 h-full rounded-2xl flex items-center justify-center">
                    <strong>{product.precio}</strong>
                  </article>
                </div>
              </section>
            </div>
          ))
        )}
      </div>

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
        <div className="flex justify-center items-center gap-4 mt-4 border">
          <button
            className="px-4 py-2 border"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ⬅
          </button>
          <span className="border">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="px-4 py-2 border"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            ➡
          </button>
        </div>
      )}
    </div>
  );
}
