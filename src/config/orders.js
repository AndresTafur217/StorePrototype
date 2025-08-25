const BASE_URL = 'http://localhost:5000';

export const ORDERS_ENDPOINTS = {
  addOrder: `${BASE_URL}/api/orders/add-order`,
  deleteOrder: `${BASE_URL}/api/orders/:id/delete-order`,
  getOrders: `${BASE_URL}/api/orders`,
}