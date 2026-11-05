export type CurrentPage =
  | 'beranda'
  | 'profil'
  | 'pilih-metode'
  | 'pembayaran-sukses';

export type ActiveTab = 'beranda' | 'profil';

export type PaymentChannel = 'qris' | 'briva' | 'midtrans';

export interface PhotoSlide {
  id: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  alt: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  iconName: 'wifi' | 'bath' | 'wind' | 'shield' | 'car' | 'utensils';
}

export interface RoomOption {
  id: string;
  tierName: string;
  dimensions: string;
  features: string[];
  pricePlaceholder: string;
  availabilityLabel: string;
}

export interface BillingDetailItem {
  id: string;
  label: string;
  amountPlaceholder: string;
  note?: string;
}

export interface BillingHistoryItem {
  id: string;
  periodLabel: string;
  paymentDateLabel: string;
  amountPlaceholder: string;
  statusLabel: string;
}
