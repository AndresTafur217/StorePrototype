import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./config/api";
import { useEffect, useState } from "react";

export function Types() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        console.log('Fetching from:', API_ENDPOINTS.types);
        
        const res = await fetch(API_ENDPOINTS.types, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Response status:', res.status);
        console.log('Response headers:', res.headers);

        if (!res.ok) {
          const errorText = await res.text();
          console.error('Error response:', errorText);
          throw new Error(`Error ${res.status}: ${errorText}`);
        }

        const data = await res.json();
        console.log('Response data:', data);

        if (data.success && data.data) {
          setTypes(data.data);
        } else {
          throw new Error('Formato de respuesta inesperado');
        }
      } catch (err) {
        console.error('Fetch error:', err); // Debug
        setError(err.message);
      } finally {
        setLoading(false);
      }
      };

    fetchTypes();
  }, []);

  if (loading) return <p>Cargando types...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="h-full w-max flex gap-2.5 items-center justify-between">
      {types.length === 0 ? (
        <p>No hay tipos disponibles</p>
      ) : (
        types.map((type) => (
          <article key={type.id} className="h-full w-max px-2.5 rounded-2xl flex justify-center items-center bg-store-items2">
            <strong>{type.nombre}</strong>
          </article>
        ))
      )}
    </div>
  )
}