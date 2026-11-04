import React, { useState } from 'react';
import {
  CheckCircle2,
  Download,
  Check,
  User,
  Home,
  FileText,
  Calendar,
  CreditCard,
  QrCode,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { PaymentChannel } from '../types';

interface PaymentSuccessPageProps {
  paymentChannel: PaymentChannel;
  onGoToProfile: () => void;
  onGoToHome: () => void;
}

export const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({
  paymentChannel,
  onGoToProfile,
  onGoToHome,
}) => {
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);

  const handleDownloadReceipt = () => {
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2500);
  };

  const channelLabel = paymentChannel === 'qris'
    ? 'QRIS Standar Nasional (Scan QR)'
    : 'BRIVA (BRI Virtual Account)';

  const channelIcon = paymentChannel === 'qris'
    ? QrCode
    : CreditCard;

  const ChannelIconComponent = channelIcon;

  return (
    <div className="w-full py-6 sm:py-10 pb-20 sm:pb-14">
      <div className="max-w-xl mx-auto px-3.5 sm:px-6 space-y-5">
        {/* Success Banner Hero */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EBF3F0] text-[#12483E] flex items-center justify-center mx-auto shadow-xs border border-[#12483E]/20 animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
          </div>

          <span className="text-[10px] sm:text-xs font-semibold text-[#12483E] tracking-wider uppercase block">
            Status Transaksi Berhasil
          </span>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A2220]">
            Pembayaran Berhasil Diterima!
          </h1>

          <p className="text-xs text-[#45524F] max-w-sm mx-auto leading-relaxed">
            Terima kasih, tagihan sewa kamar Anda telah diverifikasi secara otomatis dan tercatat lunas dalam sistem Senja Living.
          </p>
        </div>

        {/* Digital Official Receipt Card */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white border border-black/[0.08] shadow-xs space-y-4 relative overflow-hidden">
          {/* Receipt Header Badge */}
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
            <div>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#12483E] tracking-wider uppercase block">
                Kwitansi Digital Resmi
              </span>
              <span className="text-xs font-semibold text-[#1A2220] block">
                Senja Living Management
              </span>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-semibold text-[#12483E] bg-[#EBF3F0] px-2 py-0.5 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>[LUNAS / TERVERIFIKASI]</span>
            </div>
          </div>

          {/* Receipt Data Rows */}
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-black/[0.03]">
              <span className="text-[#71807C]">Nomor Transaksi</span>
              <span className="font-semibold text-[#1A2220] font-mono">[TRX-2026-XXXX]</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-black/[0.03]">
              <span className="text-[#71807C]">Waktu Pelunasan</span>
              <span className="font-medium text-[#1A2220] font-mono">[DD / MM / YYYY - 21.30 WIB]</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-black/[0.03]">
              <span className="text-[#71807C]">Metode Pembayaran</span>
              <span className="font-semibold text-[#1A2220] inline-flex items-center gap-1">
                <ChannelIconComponent className="w-3.5 h-3.5 text-[#12483E]" />
                <span>{channelLabel}</span>
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-black/[0.03]">
              <span className="text-[#71807C]">Penghuni</span>
              <span className="font-semibold text-[#1A2220]">[Nama Penghuni]</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-black/[0.03]">
              <span className="text-[#71807C]">Unit Kamar</span>
              <span className="font-semibold text-[#12483E]">Kamar [Nomor Kamar] · [Tipe Kamar]</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-black/[0.03]">
              <span className="text-[#71807C]">Periode Sewa</span>
              <span className="font-medium text-[#1A2220]">[Bulan Berjalan & Tahun]</span>
            </div>
          </div>

          {/* Total Paid Block */}
          <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-black/[0.05] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#71807C] block">Jumlah Total Dilunasi</span>
              <span className="text-base sm:text-lg font-bold text-[#12483E] font-mono tabular-nums block">
                Rp [Total Tagihan]
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#71807C] block">Biaya Layanan</span>
              <span className="text-xs font-semibold text-[#1A2220] block">Rp 0 (Gratis)</span>
            </div>
          </div>

          {/* Security Note */}
          <p className="text-[10px] text-[#71807C] text-center pt-1">
            Kwitansi digital ini sah dan diterbitkan secara elektronik oleh Senja Living tanpa memerlukan tanda tangan basah.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {/* Download Receipt Button */}
          <button
            onClick={handleDownloadReceipt}
            className="w-full py-2.5 sm:py-3 px-4 text-xs sm:text-sm font-semibold text-[#12483E] bg-[#EBF3F0] hover:bg-[#DEEBE6] active:scale-[0.99] rounded-xl transition-all inline-flex items-center justify-center gap-2 cursor-pointer min-h-[42px]"
          >
            {isDownloaded ? (
              <>
                <Check className="w-4 h-4 text-[#12483E]" />
                <span>Kwitansi PDF Berhasil Disimpan</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Unduh Bukti Pembayaran Resmi (PDF)</span>
              </>
            )}
          </button>

          {/* Return Navigation Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={onGoToProfile}
              className="py-2.5 px-3 text-xs font-semibold text-white bg-[#12483E] hover:bg-[#0A2E28] active:scale-[0.99] rounded-xl transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px] shadow-2xs"
            >
              <User className="w-3.5 h-3.5" />
              <span>Lihat Profil</span>
            </button>

            <button
              onClick={onGoToHome}
              className="py-2.5 px-3 text-xs font-semibold text-[#45524F] bg-white border border-black/[0.08] hover:bg-[#FAF9F6] active:scale-[0.99] rounded-xl transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Ke Beranda</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
