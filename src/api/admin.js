import client from './client';

export function login(payload) {
  return client.post('/api/admin/auth/login', payload).then((response) => response.data);
}

export function fetchMe() {
  return client.get('/api/admin/auth/me').then((response) => response.data.admin);
}

export function fetchDashboard(days = 30) {
  return client.get('/api/admin/dashboard', { params: { days } }).then((response) => response.data);
}

export function fetchAdminOrders(params) {
  return client.get('/api/admin/orders', { params }).then((response) => response.data);
}

export function fetchAdminOrder(id) {
  return client.get(`/api/admin/orders/${id}`).then((response) => response.data.order);
}

export function updateOrderStatus(id, payload) {
  return client.patch(`/api/admin/orders/${id}/status`, payload).then((response) => response.data.order);
}

export function updatePaymentStatus(id, payload) {
  return client.patch(`/api/admin/orders/${id}/payment`, payload).then((response) => response.data.order);
}

export function fetchAdminProducts(params) {
  return client.get('/api/admin/products', { params }).then((response) => response.data);
}

export function fetchAdminProduct(id) {
  return client.get(`/api/admin/products/${id}`).then((response) => response.data.product);
}

export function createProduct(payload) {
  return client.post('/api/admin/products', payload).then((response) => response.data.product);
}

export function updateProduct(id, payload) {
  return client.put(`/api/admin/products/${id}`, payload).then((response) => response.data.product);
}

export function updateAvailability(id, payload) {
  return client.patch(`/api/admin/products/${id}/availability`, payload).then((response) => response.data.product);
}

export function deleteProduct(id) {
  return client.delete(`/api/admin/products/${id}`);
}

export function uploadProductImage(id, file) {
  const body = new FormData();
  body.append('image', file);
  return client.post(`/api/admin/products/${id}/image`, body).then((response) => response.data.product);
}

export function fetchAdminCategories() {
  return client.get('/api/admin/categories').then((response) => response.data.categories);
}

export function createCategory(payload) {
  return client.post('/api/admin/categories', payload).then((response) => response.data.category);
}

export function updateCategory(id, payload) {
  return client.put(`/api/admin/categories/${id}`, payload).then((response) => response.data.category);
}

export function deleteCategory(id) {
  return client.delete(`/api/admin/categories/${id}`);
}

export function uploadCategoryImage(id, file) {
  const body = new FormData();
  body.append('image', file);
  return client.post(`/api/admin/categories/${id}/image`, body).then((response) => response.data.category);
}

export function fetchAdminBanners() {
  return client.get('/api/admin/banners').then((response) => response.data.banners);
}

export function createBanner(payload) {
  return client.post('/api/admin/banners', payload).then((response) => response.data.banner);
}

export function updateBanner(id, payload) {
  return client.put(`/api/admin/banners/${id}`, payload).then((response) => response.data.banner);
}

export function deleteBanner(id) {
  return client.delete(`/api/admin/banners/${id}`);
}

export function uploadBannerImage(id, file) {
  const body = new FormData();
  body.append('image', file);
  return client.post(`/api/admin/banners/${id}/image`, body).then((response) => response.data.banner);
}

export function fetchAdminSettings() {
  return client.get('/api/admin/settings').then((response) => response.data);
}

export function saveSettings(payload) {
  return client.put('/api/admin/settings', payload).then((response) => response.data.settings);
}
