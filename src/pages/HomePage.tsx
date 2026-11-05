import React from 'react';
import {
  Bath,
  Wind,
  Wifi,
  ShieldCheck,
  UtensilsCrossed,
  Car,
  MapPin,
  ExternalLink,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  User,
} from 'lucide-react';
import { PhotoSlider } from '../components/PhotoSlider';
import { PhotoSlide } from '../types';
import { landingApi, Room, KostSettings } from '../api';

import facadeImg from '../assets/images/kost_modern_facade_1792641908559.jpg';
import bedroomImg from '../assets/images/kost_bedroom_interior_1792642350837.jpg';
import kitchenImg from '../assets/images/kost_communal_kitchen_1792642350971.jpg';
import bathroomImg from '../assets/images/kost_ensuite_bathroom_1792642351458.jpg';

interface HomePageProps {
  onOpenContact: () => void;
  onNavigateToProfile: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenContact,
  onNavigateToProfile,
}) => {
  const [selectedRoomIndex, setSelectedRoomIndex] = React.useState<number>(0);
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [settings, setSettings] = React.useState<KostSettings | null>(null);

  React.useEffect(() => {
    landingApi.getRooms().then(setRooms);
    landingApi.getSettings().then(setSettings);
  }, []);

  const photoSlides: PhotoSlide[] = [
    {
      id: 'facade',
      imageSrc: facadeImg,
      title: 'Tampak Depan & Taman Masuk',
      subtitle: 'Fasilitas Eksterior',
      alt: 'Tampak depan arsitektur bangunan Senja Living dengan tanaman tropis dan pencahayaan hangat',
    },
    {
      id: 'bedroom',
      imageSrc: bedroomImg,
      title: 'Interior Kamar Tidur & Meja Kerja',
      subtitle: 'Kenyamanan Istirahat',
      alt: 'Interior kamar tidur minimalis modern dengan ranjang kayu dan jendela matahari',
    },
    {
      id: 'kitchen',
      imageSrc: kitchenImg,
      title: 'Dapur Bersama & Ruang Santai',
      subtitle: 'Area Komunal Terbuka',
      alt: 'Dapur bersama yang bersih dan rapi dengan meja makan dan bar kopi',
    },
    {
      id: 'bathroom',
      imageSrc: bathroomImg,
      title: 'Kamar Mandi Dalam & Sanitasi',
      subtitle: 'Privasi & Kebersihan',
      alt: 'Kamar mandi dalam dengan shower kaca dan cermin berpendar modern',
    },
  ];

  const facilities = [
    {
      icon: Bath,
      name: 'Kamar Mandi Dalam',
      description: 'Water heater, shower modern, kloset duduk, dan cermin sanitasi.',
    },
    {
      icon: Wind,
      name: 'Penyejuk Ruangan (AC)',
      description: 'Unit pendingin udara inverter hemat energi di setiap kamar.',
    },
    {
      icon: Wifi,
      name: 'Wi-Fi Fiber Optic',
      description: 'Koneksi internet tanpa batas untuk kebutuhan kerja & belajar.',
    },
    {
      icon: ShieldCheck,
      name: 'Keamanan 24 Jam',
      description: 'Akses kartu magnetik (smart access), kamera CCTV terintegrasi.',
    },
    {
      icon: UtensilsCrossed,
      name: 'Dapur & Ruang Komunal',
      description: 'Kulkas bersama, dispenser air minum, kompor, dan area santai.',
    },
    {
      icon: Car,
      name: 'Area Parkir Terlindung',
      description: 'Parkir khusus sepeda motor & mobil dalam pagar perimeter.',
    },
  ];

  const standardRooms = rooms.filter(
    (r) => r.type.toLowerCase().includes('standar') || !r.type.toLowerCase().includes('deluxe')
  );
  const deluxeRooms = rooms.filter((r) => r.type.toLowerCase().includes('deluxe'));

  const minStandardPrice = standardRooms.length > 0 ? Math.min(...standardRooms.map((r) => r.monthlyPrice)) : 1500000;
  const availableStandardCount = standardRooms.filter((r) => r.status === 'available').length;

  const minDeluxePrice = deluxeRooms.length > 0 ? Math.min(...deluxeRooms.map((r) => r.monthlyPrice)) : 2200000;
  const availableDeluxeCount = deluxeRooms.filter((r) => r.status === 'available').length;

  const formatPrice = (val: number) => {
    return 'Rp ' + val.toLocaleString('id-ID');
  };

  const roomTiers = [
    {
      id: 'standar',
      tierTitle: 'Kamar Tipe Standar',
      dimensions: '3 × 4 Meter',
      description: 'Pilihan fungsional untuk hunian personal yang tenang dan nyaman.',
      ratePlaceholder: `${formatPrice(minStandardPrice)} / bulan`,
      depositPlaceholder: formatPrice(500000),
      features: [
        'Kamar mandi dalam dengan shower',
        'AC inverter hemat daya',
        'Ranjang spring bed single (120×200)',
        'Meja kerja minimalis & kursi ergonomis',
        'Lemari pakaian 2 pintu & cermin',
        'Jendela sirkulasi udara alami',
      ],
      availabilityStatus: availableStandardCount > 0 ? `Tersedia (${availableStandardCount} unit)` : 'Penuh (Waiting List)',
    },
    {
      id: 'deluxe',
      tierTitle: 'Kamar Tipe Deluxe',
      dimensions: '4 × 4.5 Meter',
      description: 'Ruang lebih luas dengan pencahayaan alami optimal dan balkon.',
      ratePlaceholder: `${formatPrice(minDeluxePrice)} / bulan`,
      depositPlaceholder: formatPrice(1000000),
      features: [
        'Kamar mandi dalam + pemanas air (water heater)',
        'AC 1 PK & ventilasi ganda',
        'Ranjang spring bed queen (160×200)',
        'Area kerja terpisah & rak penyimpanan',
        'Smart TV monitor siap pakai',
        'Akses balkon santai pribadi',
      ],
      availabilityStatus: availableDeluxeCount > 0 ? `Tersedia (${availableDeluxeCount} unit)` : 'Konfirmasi Pengelola',
    },
  ];

  const locationPoints = [
    { label: 'Stasiun / Halte Transportasi Terdekat', distance: '± 5 Menit' },
    { label: 'Kawasan Perkantoran & Sentra Bisnis', distance: '± 10 Menit' },
    { label: 'Minimarket & Supermarket 24 Jam', distance: '± 2 Menit (Jalan Kaki)' },
    { label: 'Pusat Kuliner & Kafe Kerja', distance: '± 3 Menit' },
    { label: 'Rumah Sakit & Klinik Pratama', distance: '± 7 Menit' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full pt-2 pb-6 sm:pt-6 sm:pb-12">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-center">
            {/* Hero Text Column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#12483E] mb-2 tracking-wide">
                <span>Hunian Eksklusif</span>
                <span aria-hidden="true">·</span>
                <span>Calon & Penghuni Aktif</span>
              </div>

              <h1 className="text-xl sm:text-3xl lg:text-[38px] font-bold tracking-tight text-[#1A2220] leading-snug sm:leading-[1.2] text-balance">
                Hunian Modern, Bersih, dan Tenang untuk Kualitas Hidup Anda.
              </h1>

              <p className="mt-2.5 sm:mt-3.5 text-xs sm:text-sm text-[#45524F] leading-relaxed max-w-xl">
                Arsitektur minimalis yang memaksimalkan sirkulasi udara, pencahayaan alami, serta kenyamanan istirahat harian Anda.
              </p>

              {/* Action Buttons */}
              <div className="mt-4 sm:mt-6 flex flex-row items-center gap-2.5">
                <button
                  onClick={onOpenContact}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:px-5 sm:py-2.5 text-xs font-semibold text-white bg-[#12483E] hover:bg-[#0A2E28] active:scale-[0.98] rounded-xl transition-all shadow-2xs cursor-pointer min-h-[40px]"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Hubungi Pengelola</span>
                </button>

                <button
                  onClick={onNavigateToProfile}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:px-4 sm:py-2.5 text-xs font-semibold text-[#12483E] bg-[#EBF3F0] hover:bg-[#DEEBE6] active:scale-[0.98] rounded-xl transition-all cursor-pointer min-h-[40px]"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profil Penghuni</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-5 pt-4 border-t border-black/[0.06] grid grid-cols-3 gap-2 sm:gap-4 text-left">
                <div>
                  <span className="block text-[10px] sm:text-xs font-medium text-[#71807C]">Lingkungan</span>
                  <span className="block text-xs sm:text-sm font-semibold text-[#1A2220] mt-0.5">Bebas Bising</span>
                </div>
                <div>
                  <span className="block text-[10px] sm:text-xs font-medium text-[#71807C]">Kebersihan</span>
                  <span className="block text-xs sm:text-sm font-semibold text-[#1A2220] mt-0.5">Rutin Dirawat</span>
                </div>
                <div>
                  <span className="block text-[10px] sm:text-xs font-medium text-[#71807C]">Akses Gerbang</span>
                  <span className="block text-xs sm:text-sm font-semibold text-[#1A2220] mt-0.5">Kunci Mandiri</span>
                </div>
              </div>
            </div>

            {/* Hero Slider Column */}
            <div className="lg:col-span-6 flex flex-col">
              <PhotoSlider slides={photoSlides} />
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="w-full py-8 sm:py-12 border-t border-black/[0.06] bg-white">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-5 sm:mb-7">
            <span className="text-[10px] sm:text-xs font-semibold text-[#12483E] tracking-wider uppercase block">
              Fasilitas Utama
            </span>
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1A2220] mt-0.5">
              Standar Kenyamanan Menyeluruh
            </h2>
            <p className="text-xs sm:text-sm text-[#45524F] mt-1">
              Dirancang ringkas, fungsional, dan higienis untuk mendukung aktivitas istirahat dan privasi Anda.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <div
                  key={index}
                  className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FAF9F6] border border-black/[0.06] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#EBF3F0] text-[#12483E] flex items-center justify-center mb-2.5">
                    <Icon className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#1A2220] mb-0.5 line-clamp-1">
                    {facility.name}
                  </h3>
                  <p className="text-[11px] text-[#45524F] leading-snug line-clamp-2 sm:line-clamp-none">
                    {facility.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rental Pricing Section */}
      <section className="w-full py-8 sm:py-12 bg-[#FAF9F6] border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-7 gap-3">
            <div>
              <span className="text-[10px] sm:text-xs font-semibold text-[#12483E] tracking-wider uppercase block">
                Pilihan Kamar & Biaya Sewa
              </span>
              <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1A2220] mt-0.5">
                Informasi Harga Sewa
              </h2>
              <p className="text-xs sm:text-sm text-[#45524F] mt-0.5">
                Transparansi skema sewa dan spesifikasi kamar.
              </p>
            </div>

            <div className="inline-flex p-1 bg-[#EBEAE5] rounded-xl self-start sm:self-auto">
              {roomTiers.map((tier, idx) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedRoomIndex(idx)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedRoomIndex === idx
                      ? 'bg-white text-[#12483E] shadow-2xs'
                      : 'text-[#45524F] hover:text-[#1A2220]'
                  }`}
                >
                  {tier.tierTitle}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {roomTiers.map((tier, idx) => {
              const isSelected = selectedRoomIndex === idx;
              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedRoomIndex(idx)}
                  className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#12483E] shadow-xs ring-1 ring-[#12483E]/20'
                      : 'border-black/[0.07] hover:border-black/[0.15]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[11px] font-medium text-[#71807C]">
                        Dimensi Ruang {tier.dimensions}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-[#1A2220] mt-0.5">
                        {tier.tierTitle}
                      </h3>
                      <p className="text-[11px] text-[#45524F] mt-0.5">
                        {tier.description}
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-[#12483E] shrink-0">
                      {tier.availabilityStatus}
                    </span>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-[#FAF9F6] border border-black/[0.05] my-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] font-medium text-[#71807C]">
                        Tarif Sewa
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#12483E] font-mono tabular-nums">
                        {tier.ratePlaceholder}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-black/[0.04] text-[10px] sm:text-[11px] text-[#71807C]">
                      <span>Deposit Jaminan (Dapat Dikembalikan)</span>
                      <span className="font-medium text-[#1A2220] font-mono tabular-nums">
                        {tier.depositPlaceholder}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <span className="text-[11px] font-semibold text-[#1A2220] block">
                      Fasilitas Termasuk dalam Kamar:
                    </span>
                    <ul className="space-y-1 sm:space-y-1.5">
                      {tier.features.map((item, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-[11px] text-[#45524F]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#12483E] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-black/[0.06] flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] text-[#71807C]">
                      Cicilan sewa bulanan
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenContact();
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-[#12483E] bg-[#EBF3F0] hover:bg-[#DEEBE6] rounded-lg transition-colors cursor-pointer"
                    >
                      Tanya Ketersediaan
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="w-full py-8 sm:py-12 bg-white border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
            <div className="lg:col-span-5">
              <span className="text-[10px] sm:text-xs font-semibold text-[#12483E] tracking-wider uppercase block">
                Akses & Jarak
              </span>
              <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1A2220] mt-0.5">
                Lokasi Kost Strategis
              </h2>
              <p className="text-xs text-[#45524F] mt-1 leading-relaxed">
                Terletak di lingkungan residensial yang aman, dekat dengan transportasi dan fasilitas umum.
              </p>

              <div className="mt-4 p-3.5 rounded-xl bg-[#FAF9F6] border border-black/[0.06]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#12483E] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#1A2220] block">
                      Alamat Lengkap Hunian
                    </span>
                    <p className="text-[11px] text-[#45524F] mt-0.5 leading-relaxed">
                      {settings?.address || 'Jl. Flamboyan No. 12, Senayan, Jakarta Selatan'}
                    </p>
                    <span className="text-[10px] text-[#71807C] block mt-1">
                      Properti Resmi: {settings?.kostName || 'Senja Living'} · Akses 24 Jam
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3.5">
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12483E] hover:underline cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Petunjuk Arah via WhatsApp</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FAF9F6] border border-black/[0.06]">
                <h3 className="text-xs sm:text-sm font-bold text-[#1A2220] mb-3">
                  Perkiraan Jarak Tempuh Sekitar
                </h3>
                <div className="divide-y divide-black/[0.06]">
                  {locationPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-[11px]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#12483E]" />
                        <span className="font-medium text-[#1A2220]">
                          {point.label}
                        </span>
                      </div>
                      <span className="font-semibold text-[#12483E] shrink-0 font-mono tabular-nums">
                        {point.distance}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-xl bg-white border border-black/[0.06] text-center">
                  <div className="py-3 flex flex-col items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#12483E] mb-1 stroke-[1.5]" />
                    <span className="text-xs font-semibold text-[#1A2220]">
                      Representasi Peta Digital Kost
                    </span>
                    <span className="text-[10px] text-[#71807C] mt-0.5 max-w-xs">
                      Akses jalan lebar, bebas banjir, dan penerangan jalan memadai.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="w-full py-6 sm:py-8 bg-[#FAF9F6] border-t border-black/[0.06] text-[11px] text-[#71807C] pb-20 sm:pb-8">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-[#12483E] text-white flex items-center justify-center font-bold text-[10px]">
                S
              </div>
              <span className="font-bold text-[#1A2220]">Senja Living</span>
              <span aria-hidden="true">·</span>
              <span>Prototype Website Kost</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-[#1A2220] transition-colors cursor-pointer"
              >
                Beranda
              </button>
              <button
                onClick={onNavigateToProfile}
                className="hover:text-[#1A2220] transition-colors cursor-pointer"
              >
                Profil Penghuni
              </button>
              <button
                onClick={onOpenContact}
                className="hover:text-[#1A2220] transition-colors cursor-pointer font-medium text-[#12483E]"
              >
                Kontak
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-black/[0.04] text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-1 text-[10px]">
            <p>© {new Date().getFullYear()} Senja Living. Hak Cipta Dilindungi.</p>
            <p>Prototype UI Frontend Tanpa Data Dummy Fiktif.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
