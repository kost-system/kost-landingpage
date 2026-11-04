# Kost Landing Page

Website publik dan portal penghuni untuk pencarian kamar, informasi fasilitas, simulasi harga, serta pembayaran tagihan sewa kos secara online.

## 🚀 Fitur Utama
- **Katalog Kamar & Fasilitas**: Galeri foto modern, daftar fasilitas kos, informasi tipe kamar, dan ketersediaan unit real-time.
- **Lokasi & Kontak**: Peta lokasi strategis dan integrasi tombol hubungi pengelola via WhatsApp.
- **Portal Penyewa**:
  - Pengecekan status tagihan sewa kamar.
  - Pembayaran online melalui QRIS atau Virtual Account / Transfer Bank.
  - Konfirmasi bukti pembayaran dan resi elektronik.
- **Responsif & Mobile-First**: Tampilan optimal untuk perangkat desktop maupun smartphone dilengkapi bottom navigation bar.

## 🛠️ Tech Stack
- **Framework**: Vite + React 19
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS
- **Icon**: Lucide React
- **Komunikasi Data**: REST API Client terhubung ke `kost_backend` (`http://localhost:5000/api`)

## 📦 Menjalankan Proyek

### 1. Instalasi Dependensi
```bash
npm install --legacy-peer-deps
```

### 2. Jalankan Mode Development
```bash
npx vite --port 3001 --host 0.0.0.0
```
Buka browser di: `http://localhost:3001`

### 3. Build Production
```bash
npm run build
npm run preview
```
