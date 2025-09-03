import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login";

export function AuthToken({ to, children }) {
  const [showLogin, setShowLogin] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const navigate = useNavigate();

  // Función para verificar si el token es válido
  const validateToken = async (token) => {
    try {
      // Hacer una petición a tu API para verificar el token
      const response = await fetch('http://localhost:5000/api/users/validate-token', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      return response.ok;
    } catch (error) {
      console.error('Error validando token:', error);
      return false;
    }
  };

  // Función para decodificar JWT y verificar expiración (alternativa client-side)
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error decodificando token:', error);
      return true; // Si hay error, considerar token inválido
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setIsValidating(true);
    
    const token = localStorage.getItem("token");

    if (!token) {
      setIsValidating(false);
      setShowLogin(true);
      return;
    }

    // Verificación client-side rápida
    if (isTokenExpired(token)) {
      localStorage.removeItem("token"); // Limpiar token expirado
      setIsValidating(false);
      setShowLogin(true);
      return;
    }

    // Verificación server-side (opcional pero recomendada)
    const isValid = await validateToken(token);
    
    if (isValid) {
      navigate(to);
    } else {
      localStorage.removeItem("token"); // Limpiar token inválido
      setShowLogin(true);
    }
    
    setIsValidating(false);
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    navigate(to);
  };

  return (
    <>
      <a
        href={to}
        onClick={handleClick}
        className={`h-full w-full flex justify-center items-center ${
          isValidating ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        {isValidating ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Validando...</span>
          </div>
        ) : (
          children
        )}
      </a>

      {showLogin && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-store-bg2/80 p-6 rounded-4xl shadow-2xl w-96">
            <Login
              onClose={() => setShowLogin(false)}
              onSuccess={handleLoginSuccess}
            />
          </div>
        </div>
      )}
    </>
  );
}