import client from './client';

export function fetchSettings() {
  return client.get('/api/settings').then((response) => response.data.settings);
}

export function fetchHome() {
  return client.get('/api/home').then((response) => response.data);
}

export function fetchCategories() {
  return client.get('/api/categories').then((response) => response.data.categories);
}

export function fetchProducts(params) {
  return client.get('/api/products', { params }).then((response) => response.data);
}

export function fetchProduct(slug) {
  return client.get(`/api/products/${slug}`).then((response) => response.data.product);
}

export function createOrder(payload) {
  return client.post('/api/orders', payload).then((response) => response.data);
}

export function reopenWhatsapp(orderId, payload) {
  return client.post(`/api/orders/${orderId}/whatsapp`, payload).then((response) => response.data);
}

export function trackEvent(payload) {
  return client.post('/api/analytics/events', payload).catch(() => null);
}
