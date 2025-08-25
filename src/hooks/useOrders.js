import { useState, useCallback } from "react";
import { FAVORITES_ENDPOINTS } from "../config/favorites";

export function useOrders() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Función para verificar si el token ha expirado
  const isTokenExpired = useCallback((token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }, []);

  // Cargar favoritos del usuario
  const loadFavorites = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || isTokenExpired(token)) {
        setFavorites([]);
        return;
      }

      setLoading(true);
      const response = await fetch(FAVORITES_ENDPOINTS.getFavorites, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setFavorites(data.data);
        }
      }
    } catch (favError) {
      console.log("Error cargando favoritos:", favError);
    } finally {
      setLoading(false);
    }
  }, [isTokenExpired]);

  // Verificar si un producto está en favoritos
  const isProductInFavorites = useCallback((productId) => {
    return favorites.some(fav => fav.productoId === productId);
  }, [favorites]);

  // Obtener el ID del favorito si existe
  const getFavoriteId = useCallback((productId) => {
    const favorite = favorites.find(fav => fav.productoId === productId);
    return favorite ? favorite.id : null;
  }, [favorites]);

  // Agregar producto a favoritos
  const addToFavorites = useCallback(async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No hay token, inicia sesión primero");
      }

      setLoading(true);
      setError("");

      const response = await fetch(FAVORITES_ENDPOINTS.addBM, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.data) {
        // Agregar a la lista de favoritos
        setFavorites((prev) => [...prev, data.data]);
        setMessage(data.message);
        setTimeout(() => setMessage(""), 3000);
        return data.data;
      } else {
        throw new Error("Formato de respuesta inesperado");
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Remover producto de favoritos
  const removeFromFavorites = useCallback(async (favoriteId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No hay token, inicia sesión primero");
      }

      setLoading(true);
      setError("");

      const response = await fetch(`${FAVORITES_ENDPOINTS.deleteBM.replace(':id', favoriteId)}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        // Remover de la lista de favoritos
        setFavorites((prev) => prev.filter(fav => fav.id !== favoriteId));
        setMessage(data.message);
        setTimeout(() => setMessage(""), 3000);
        return true;
      } else {
        throw new Error("Formato de respuesta inesperado");
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Función toggle (agregar/remover) basada en el estado actual
  const toggleFavorite = useCallback(async (productId) => {
    if (isProductInFavorites(productId)) {
      const favoriteId = getFavoriteId(productId);
      return await removeFromFavorites(favoriteId);
    } else {
      return await addToFavorites(productId);
    }
  }, [isProductInFavorites, getFavoriteId, removeFromFavorites, addToFavorites]);

  // Limpiar mensajes
  const clearMessages = useCallback(() => {
    setError("");
    setMessage("");
  }, []);

  return {
    // Estados
    favorites,
    loading,
    error,
    message,
    
    // Funciones de consulta
    isProductInFavorites,
    getFavoriteId,
    
    // Funciones de acción
    loadFavorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearMessages,
  };
}