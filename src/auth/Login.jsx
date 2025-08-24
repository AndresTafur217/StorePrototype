import { useState } from "react";
import { USERS_ENDPOINTS } from "../config/users";

export function Login({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    setIsLoading(true);
    try {
      const res = await fetch(USERS_ENDPOINTS.signin, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contraseña: password }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Error en inicio de sesión");
      }

      // Verificar que el token existe antes de guardarlo
      if (data.data?.token) {
        localStorage.setItem("token", data.data.token);
        alert("✅ Sesión iniciada");
          onClose();
      } else {
        throw new Error("No se recibió token del servidor");
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm mx-auto"
    >
      <h2 className="text-xl font-bold text-center">Iniciar Sesión</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <button 
        type="submit" 
        disabled={isLoading}
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "Ingresando..." : "Ingresar"}
      </button>

      <button
        type="button"
        onClick={onClose}
        className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
      >
        Cancelar
      </button>
    </form>
  );
}
