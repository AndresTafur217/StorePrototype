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
        const res = await fetch(API_ENDPOINTS.types);

        if (!res.ok) {
          throw new Error("Error al obtener los types");
        }

        const data = await res.json();

        // tu API devuelve un objeto con { success, data, message }
        setTypes(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  if (loading) return <p>Cargando types...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="h-full w-full overflow-x-auto flex flex-row gap-2.5 items-center justify-between">
      {types.map((t) => (
        <article key={t.id} className="border-2 h-full w-full rounded-2xl"><strong>{t.nombre}</strong></article>
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