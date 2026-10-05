import { ApiResponse } from '../../types/api.js';
import { mockStore } from './mockDataStore.js';
import { featureFlagsStore } from './featureFlagsStore.js';
import { activityLogsStore } from './activityLogsStore.js';
import { userStore } from './userStore.js';

const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

function resolveUserRoutes<T>(endpoint: string, method: string, body: any): ApiResponse<T> | null {
  if (endpoint === '/users' && method === 'GET') {
    return { success: true, data: userStore.list() as unknown as T, message: 'OK' };
  }
  if (endpoint === '/users' && method === 'POST') {
    return { success: true, data: userStore.create(body) as unknown as T, message: 'Created' };
  }
  if (endpoint.startsWith('/users/') && method === 'PATCH') {
    const id = endpoint.split('/')[2];
    const uRaw = localStorage.getItem('user');
    const u = uRaw ? JSON.parse(uRaw) : null;
    return { success: true, data: userStore.update(id, body, u?.id) as unknown as T, message: 'Updated' };
  }
  if (endpoint.includes('/reset-password') && method === 'POST') {
    return { success: true, data: { id: endpoint.split('/')[2] } as unknown as T, message: 'Password reset' };
  }
  return null;
}

function resolveSystemRoutes<T>(endpoint: string, method: string, body: any): ApiResponse<T> | null {
  if (endpoint === '/feature-flags' || endpoint === '/feature-flags/public') {
    return { success: true, data: featureFlagsStore.list() as unknown as T, message: 'OK' };
  }
  if (endpoint.startsWith('/feature-flags/') && method === 'PATCH') {
    const key = endpoint.split('/')[2];
    const updated = featureFlagsStore.toggle(key, body.isEnabled);
    return { success: true, data: updated as unknown as T, message: 'Updated' };
  }
  if (endpoint.startsWith('/activity-logs')) {
    return { success: true, data: activityLogsStore.list() as unknown as T, message: 'OK' };
  }
  return null;
}

function resolveMachineRoutes<T>(endpoint: string, method: string, body: any): ApiResponse<T> | null {
  if (endpoint === '/home/machines' && method === 'GET') {
    return { success: true, data: mockStore.getHeroMachines() as unknown as T, message: 'OK' };
  }
  if (endpoint === '/home/machines' && method === 'POST') {
    return { success: true, data: mockStore.saveHeroMachine(body) as unknown as T, message: 'Created' };
  }
  if (endpoint.startsWith('/home/machines/') && method === 'PATCH') {
    const id = endpoint.split('/')[3];
    return { success: true, data: mockStore.saveHeroMachine({ id, ...body }) as unknown as T, message: 'Updated' };
  }
  if (endpoint.startsWith('/home/machines/') && method === 'DELETE') {
    const id = endpoint.split('/')[3];
    mockStore.deleteHeroMachine(id);
    return { success: true, data: { id } as unknown as T, message: 'Deleted' };
  }
  if (endpoint === '/home/machines/reorder' && method === 'POST') {
    return { success: true, data: mockStore.reorderHeroMachines(body.orders) as unknown as T, message: 'Reordered' };
  }
  return null;
}

function resolveMockRoute<T>(endpoint: string, options: RequestInit = {}): ApiResponse<T> | null {
  const method = (options.method || 'GET').toUpperCase();
  const body = options.body ? JSON.parse(options.body as string) : {};

  if (endpoint.startsWith('/users')) return resolveUserRoutes<T>(endpoint, method, body);
  if (endpoint.startsWith('/feature-flags') || endpoint.startsWith('/activity-logs')) {
    return resolveSystemRoutes<T>(endpoint, method, body);
  }
  if (endpoint.startsWith('/home/machines')) return resolveMachineRoutes<T>(endpoint, method, body);

  if (endpoint.startsWith('/public/home') || endpoint === '/home') {
    const data = mockStore.getHomeData();
    data.featureFlags = featureFlagsStore.getMap();
    data.maintenanceMode = !!data.featureFlags['maintenance_mode'];
    return { success: true, data: data as unknown as T, message: 'OK' };
  }
  if (endpoint.startsWith('/public/products') || (endpoint.startsWith('/products') && method === 'GET')) {
    if (endpoint.includes('/') && endpoint.split('/').length > 2) {
      const slug = endpoint.split('/').pop() || '';
      return { success: true, data: mockStore.getProductBySlug(slug) as unknown as T, message: 'OK' };
    }
    const prods = mockStore.getProducts();
    const data = endpoint.startsWith('/public') ? prods : { items: prods, total: prods.length };
    return { success: true, data: data as unknown as T, message: 'OK' };
  }
  if (endpoint === '/products' && method === 'POST') {
    return { success: true, data: mockStore.saveProduct(body) as unknown as T, message: 'Created' };
  }
  if (endpoint.startsWith('/products/') && method === 'PATCH') {
    const id = endpoint.split('/')[2];
    return { success: true, data: mockStore.saveProduct({ id, ...body }) as unknown as T, message: 'Updated' };
  }
  if (endpoint.startsWith('/products/') && method === 'DELETE') {
    const id = endpoint.split('/')[2];
    mockStore.deleteProduct(id);
    return { success: true, data: { id } as unknown as T, message: 'Deleted' };
  }
  if (endpoint.includes('/toggle') && method === 'POST') {
    const key = endpoint.split('/')[3];
    return { success: true, data: mockStore.toggleSection(key) as unknown as T, message: 'Toggled' };
  }
  if (endpoint.includes('/reorder') && method === 'POST') {
    return { success: true, data: mockStore.reorderSections(body.orders) as unknown as T, message: 'Reordered' };
  }
  if (endpoint.startsWith('/home/hero') && (method === 'POST' || method === 'PATCH')) {
    return { success: true, data: mockStore.saveHero(body) as unknown as T, message: 'Saved' };
  }
  if (endpoint.startsWith('/settings') && method === 'PATCH') {
    return { success: true, data: mockStore.saveSettings(body) as unknown as T, message: 'Saved' };
  }
  if (endpoint.startsWith('/quotes/public') && method === 'POST') {
    return { success: true, data: mockStore.submitQuote(body) as unknown as T, message: 'Submitted' };
  }
  if (endpoint.startsWith('/quotes') && method === 'GET') {
    const items = mockStore.getQuotes();
    return { success: true, data: { items, total: items.length } as unknown as T, message: 'OK' };
  }
  return null;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;
  const headers = new Headers(options.headers || {});
  const token = localStorage.getItem('token');
  if (token && !headers.has('Authorization')) headers.set('Authorization', `Bearer ${token}`);
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');

  try {
    const response = await fetch(url, { credentials: 'include', ...options, headers });
    const text = await response.text();
    if (text.startsWith('<!doctype html>') || text.startsWith('<!DOCTYPE html>')) {
      const mock = resolveMockRoute<T>(endpoint, options);
      if (mock) return mock;
      throw new Error('Endpoint tidak ditemukan');
    }
    // DIUBAH: tangani respons kosong dan respons error dari server
    if (!text.trim()) {
      throw new Error('Server tidak merespons. Pastikan backend berjalan di http://localhost:5000');
    }
    const data: ApiResponse<T> = JSON.parse(text);
    if (!response.ok || data.success === false) {
      throw new Error(data.message || `Permintaan gagal (${response.status})`);
    }
    return data;
  } catch (err) {
    const mock = resolveMockRoute<T>(endpoint, options);
    if (mock) return mock;
    throw err;
  }
}