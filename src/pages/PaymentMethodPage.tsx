import React from 'react';
import {
  ArrowLeft,
  QrCode,
  CreditCard,
  Calendar,
  ReceiptText,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { PaymentChannel } from '../types';

interface PaymentMethodPageProps {
  onBackToProfile: () => void;
  onSelectChannel: (channel: PaymentChannel) => void;
}

export const PaymentMethodPage: React.FC<PaymentMethodPageProps> = ({
  onBackToProfile,
  onSelectChannel,
}) => {
  const feeBreakdown = [
    {
      item: 'Sewa Kamar Pokok',
      description: 'Termasuk fasilitas kamar standar',
      amount: 'Rp [Nominal Sewa]',
    },
    {
      item: 'Biaya Utilitas & Listrik',
      description: 'Sesuai meteran KWh kamar berjalan',
      amount: 'Rp [Nominal Utilitas]',
    },
    {
      item: 'Iuran Kebersihan & Lingkungan',
      description: 'Pemeliharaan area komunal',
      amount: 'Rp [Nominal Iuran]',
    },
    {
      item: 'Koneksi Wi-Fi Fiber Optic',
      description: 'Akses tanpa batas kuota',
      amount: '[Termasuk]',
    },
  ];

  return (
    <div className="w-full py-4 sm:py-8 pb-20 sm:pb-12">
      <div className="max-w-3xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        {/* Back Button */}
        <div>
          <button
            onClick={onBackToProfile}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#12483E] bg-white hover:bg-[#EBF3F0] border border-[#12483E]/20 rounded-xl transition-all shadow-2xs cursor-pointer min-h-[36px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Profil</span>
          </button>
        </div>

        {/* Page Title */}
        <div>
          <span className="text-[10px] sm:text-xs font-semibold text-[#12483E] tracking-wider uppercase block">
            Langkah 1 dari 2
          </span>
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1A2220] mt-0.5">
            Pilih Metode Pembayaran
          </h1>
          <p className="text-[11px] sm:text-xs text-[#45524F] mt-0.5">
            Pilih jalur pembayaran otomatis. Sistem akan memverifikasi transaksi tanpa perlu mengunggah bukti transfer.
          </p>
        </div>

        {/* Total Summary Card */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-black/[0.06] shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06]">
            <div>
              <span className="text-[10px] sm:text-[11px] text-[#71807C] block">
                Total Tagihan Sewa
              </span>
              <div className="text-xl sm:text-2xl font-bold text-[#12483E] font-mono tabular-nums mt-0.5">
                Rp [Total Tagihan]
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#45524F]">
              <Calendar className="w-3.5 h-3.5 text-[#12483E]" />
              <span>Jatuh Tempo: <strong>[DD / MM / YYYY]</strong></span>
            </div>
          </div>

          {/* Compact Fee Breakdown */}
          <div className="mt-3 divide-y divide-black/[0.04]">
            {feeBreakdown.map((row, idx) => (
              <div key={idx} className="py-1.5 first:pt-0 flex justify-between text-[11px]">
                <span className="text-[#71807C]">{row.item}</span>
                <span className="font-medium text-[#1A2220] font-mono">{row.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Channels Section */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#1A2220] block">
            Pilih Kanal Pembayaran Tersedia:
          </span>

          {/* Option 1: QRIS Dedicated Page Card */}
          <div
            onClick={() => onSelectChannel('qris')}
            className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-black/[0.08] hover:border-[#12483E] hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#EBF3F0] text-[#12483E] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <QrCode className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#1A2220]">
                      QRIS (Quick Response Code)
                    </h3>
                    <span className="text-[9px] font-semibold text-[#12483E] bg-[#EBF3F0] px-1.5 py-0.2 rounded">
                      Rekomendasi
                    </span>
                  </div>
                  <p className="text-[11px] text-[#45524F] mt-0.5">
                    Scan instan dengan aplikasi m-Banking (BCA, Mandiri, BRI, BNI) atau e-Wallet (GoPay, OVO, DANA, ShopeePay).
                  </p>
                  <span className="text-[10px] text-[#71807C] block mt-1">
                    Bebas biaya admin · Konfirmasi otomatis tanpa unggah bukti
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#FAF9F6] group-hover:bg-[#EBF3F0] text-[#12483E] flex items-center justify-center shrink-0 transition-colors">
                <ChevronRight className="w-4 h-4 stroke-[2]" />
              </div>
            </div>
          </div>

          {/* Option 2: BRIVA Dedicated Page Card */}
          <div
            onClick={() => onSelectChannel('briva')}
            className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-black/[0.08] hover:border-[#12483E] hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#EBF3F0] text-[#12483E] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <CreditCard className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#1A2220]">
                      BRIVA (BRI Virtual Account)
                    </h3>
                    <span className="text-[9px] font-semibold text-blue-800 bg-blue-50 px-1.5 py-0.2 rounded">
                      Transfer Bank
                    </span>
                  </div>
                  <p className="text-[11px] text-[#45524F] mt-0.5">
                    Transfer nomor rekening virtual khusus melalui aplikasi BRImo, ATM BRI, atau transfer antar-bank.
                  </p>
                  <span className="text-[10px] text-[#71807C] block mt-1">
                    Nominal otomatis cocok · Verifikasi instan 24 jam
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#FAF9F6] group-hover:bg-[#EBF3F0] text-[#12483E] flex items-center justify-center shrink-0 transition-colors">
                <ChevronRight className="w-4 h-4 stroke-[2]" />
              </div>
            </div>
          </div>
        </div>

        {/* Security & Automation Notice */}
        <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-black/[0.05] flex items-start gap-2.5 text-xs text-[#71807C]">
          <ShieldCheck className="w-4 h-4 text-[#12483E] shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            Kedua metode pembayaran resmi di atas terhubung langsung dengan sistem pencatatan sewa Senja Living. <strong>Bukti transfer tidak perlu diunggah manual</strong>—sistem langsung menerbitkan bukti pembayaran sukses seketika setelah dana diterima.
          </p>
        </div>
      </div>
    </div>
  );
};
