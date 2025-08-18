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
        const res = await fetch(API_ENDPOINTS.areas);

        if (!res.ok) {
          throw new Error("Error al obtener los areas");
        }

        const data = await res.json();

        // tu API devuelve un objeto con { success, data, message }
        setAreas(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  if (loading) return <p>Cargando areas...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="h-full w-full overflow-x-auto flex flex-row gap-2.5 items-center justify-between">
      {areas.map((a) => (
        <article key={a.id} className="border-2 h-full w-full rounded-2xl"><strong>{a.nombre}</strong></article>
      ))}
      {/* <article className="border-2 h-full w-full rounded-2xl"></article>
      <article className="border-2 h-full w-full rounded-2xl"></article>
      <article className="border-2 h-full w-full rounded-2xl"></article>
      <article className="border-2 h-full w-full rounded-2xl"></article>
      <article className="border-2 h-full w-full rounded-2xl"></article>           
      <article className="border-2 h-full w-full rounded-2xl"></article>
      <article className="border-2 h-full w-full rounded-2xl"></article>
      <article className="border-2 h-full w-full rounded-2xl"></article>
      <article className="border-2 h-full w-full rounded-2xl"></article>
      <article className="border-2 h-full w-full rounded-2xl"></article>
      <article className="border-2 h-full w-full rounded-2xl"></article>
      <article className="border-2 h-full w-full rounded-2xl"></article> */}
    </div>
  )
}