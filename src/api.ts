const API_BASE = 'http://localhost:5000/api';

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
  submitPayment: async (data: any) => {
    const res = await fetch(`${API_BASE}/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
