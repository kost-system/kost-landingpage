const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

export interface Room {
  id: string;
  number: string;
  floor: number;
  type: string;
  monthlyPrice: number;
  status: 'available' | 'occupied' | 'maintenance';
  notes?: string;
}

export interface KostSettings {
  kostName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  bankName: string;
  bankAccountNumber: string;
  bankAccountName: string;
  qrisNmid: string;
  qrisMerchantName: string;
  qrisImageUrl: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  tenantId: string;
  roomId: string;
  periodMonth: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
  notes?: string;
  paidAt?: string;
}

export const landingApi = {
  getRooms: async (): Promise<Room[]> => {
    try {
      const res = await fetch(`${API_BASE}/rooms`);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  },
  getSettings: async (): Promise<KostSettings | null> => {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },
  getInvoicesByTenant: async (tenantId: string): Promise<Invoice[]> => {
    try {
      const res = await fetch(`${API_BASE}/invoices?tenantId=${tenantId}`);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  },
  submitPayment: async (data: any) => {
    const res = await fetch(`${API_BASE}/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  checkTenantPhone: async (phone: string) => {
    const res = await fetch(`${API_BASE}/auth/tenant-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Gagal memeriksa nomor telepon');
    return data;
  },
  loginTenant: async (phone: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/tenant-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      const err: any = new Error(data.error || 'Gagal login');
      err.requireSetPassword = data.requireSetPassword;
      err.tenantId = data.tenantId;
      err.name = data.name;
      throw err;
    }
    return data;
  },
  setTenantPassword: async (tenantId: string, password: string, phone?: string) => {
    const res = await fetch(`${API_BASE}/auth/tenant-set-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tenantId, password, phone }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Gagal membuat password');
    return data;
  },
};

