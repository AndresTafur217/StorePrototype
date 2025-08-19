import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./config/api";
import { useEffect, useState } from "react";

export function Areas() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        console.log('Fetching from:', API_ENDPOINTS.areas);
        
        const res = await fetch(API_ENDPOINTS.areas, {
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
          setAreas(data.data);
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

    fetchAreas();
  }, []);

  if (loading) return <p>Cargando areas...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="h-full w-max flex gap-2.5 items-center justify-between">
      {areas.length === 0 ? (
        <p>No hay áreas disponibles</p>
      ) : (
        areas.map((area) => (
          <article key={area.id} className="h-full w-max px-2.5 rounded-2xl flex justify-center items-center bg-store-details">
            <strong>{area.nombre}</strong>
          </article>
        ))
      )}
    </div>
  );
}