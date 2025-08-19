import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./config/api";
import { useEffect, useState } from "react";

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching from:', API_ENDPOINTS.products);
        
        const res = await fetch(API_ENDPOINTS.products, {
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
          setProducts(data.data);
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

    fetchProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div className="h-max w-full grid grid-cols-6 grid-rows-6 gap-2.5">
            {products.length === 0 ? (
                <p>No hay productos disponibles</p>
            ) : (
                products.map((product) => (
                <div key={product.id} className="border-2 h-product w-full rounded-4xl p-2.5 flex flex-col gap-0.5">
                    <section className="border-2 h-2/3 w-full rounded-t-3xl bg-store-bg2/70 flex justify-center items-center">
                        <h1 className="text-store-text text-2xl">Product 1</h1>
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
                                <strong>
                                    {product.precio}
                                </strong>
                            </article>
                        </div>
                    </section>
                </div>
                ))
            )}            
        </div>
    )
}