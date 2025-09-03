import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "./config/api";

export function Slide() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const resProducts = await fetch(API_ENDPOINTS.products);
        if (!resProducts.ok) throw new Error(`Error ${resProducts.status}`);
        const dataProducts = await resProducts.json();

        if (dataProducts.success && dataProducts.data) {
          // ordenar por fecha de creación DESC
          const sorted = [...dataProducts.data].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          // tomar los últimos 5 productos
          const lastFive = sorted.slice(0, 5);

          // duplicar los mismos 5 para efecto carrusel
          const duplicated = [...lastFive, ...lastFive];

          setProducts(duplicated);
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

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="h-full w-max overflow-hidden flex flex-row gap-5 items-center animate-slider">
      {products.map((p, i) => {
        const firstImage = p.imagenes?.[0];
        return (
          <article
            key={p.id + "-" + i}
            className="border h-full w-140 rounded-4xl flex flex-col justify-center items-center p-4"
          >
            {firstImage ? (
              <img
                src={firstImage.url}
                alt={firstImage.alt || p.nombre}
                className="w-48 h-48 object-contain mb-3 rounded-xl"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center bg-gray-200 text-gray-500 rounded-xl">
                Sin imagen
              </div>
            )}
            <h3 className="font-bold">{p.nombre}</h3>
          </article>
        );
      })}
    </div>
  );
}
