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
      className="flex flex-col gap-4 w-full mx-auto"
    >
      <h2 className="text-xl w-full border-b p-2.5 font-bold text-center">Iniciar Sesión</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded-1xl text-center focus:text-left hover:scale-101 transition-all ease-in-out"
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded-1xl text-center focus:text-left hover:scale-101 transition-all ease-in-out"
        required
      />

      <button 
        type="submit" 
        disabled={isLoading}
        className="bg-blue-800 w-1/2 mx-auto text-white p-2 rounded-1xl transition-all ease-in-out hover:scale-105 hover:bg-blue-900 disabled:opacity-50"
      >
        {isLoading ? "Ingresando..." : "Ingresar"}
      </button>

      <button
        type="button"
        onClick={onClose}
        className="bg-gray-600 w-1/3 mx-auto text-white p-2 rounded-1xl transition-all ease-in-out hover:bg-gray-700 hover:scale-105"
      >
        Cancelar
      </button>
    </form>
  );
}
