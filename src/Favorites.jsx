import { API_ENDPOINTS } from "./config/api";
import { useEffect, useState } from "react";

export function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No hay token, inicia sesión primero");
        }

        const res = await fetch(API_ENDPOINTS.favorites, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error ${res.status}: ${errorText}`);
        }

        const data = await res.json();

        if (data.success && data.data) {
          setFavorites(data.data);
        } else {
          throw new Error("Formato de respuesta inesperado");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <p>Cargando guardados...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="h-full w-max flex gap-2.5 items-center justify-between">
      {favorites.length === 0 ? (
        <p>No hay guardados disponibles</p>
      ) : (
        favorites.map((favorite) => (
          <article
            key={favorite.id}
            className="h-full w-max px-2.5 rounded-2xl flex justify-center items-center bg-store-details"
          >
            <strong>
              {favorite.producto ? favorite.producto.nombre : "Producto eliminado"}
            </strong>
          </article>
        ))
      )}
    </div>
  );
}