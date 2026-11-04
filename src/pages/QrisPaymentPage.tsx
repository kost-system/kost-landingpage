import React, { useState } from 'react';
import {
  ArrowLeft,
  QrCode,
  Download,
  Copy,
  Check,
  Smartphone,
  RefreshCw,
  Info,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

interface QrisPaymentPageProps {
  onBackToMethods: () => void;
  onPaymentSuccess: () => void;
}

export const QrisPaymentPage: React.FC<QrisPaymentPageProps> = ({
  onBackToMethods,
  onPaymentSuccess,
}) => {
  const [copiedNmid, setCopiedNmid] = useState<boolean>(false);
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [checkMessage, setCheckMessage] = useState<string | null>(null);

  const handleCopyNmid = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedNmid(true);
    setTimeout(() => setCopiedNmid(false), 2000);
  };

  const handleDownloadQr = () => {
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2500);
  };

  const handleCheckQris = () => {
    setIsChecking(true);
    setCheckMessage(null);
    setTimeout(() => {
      setIsChecking(false);
      setCheckMessage('Pengecekan jaringan QRIS: Menunggu konfirmasi dari aplikasi perbankan Anda.');
      setTimeout(() => setCheckMessage(null), 4000);
    }, 1000);
  };

  return (
    <div className="w-full py-4 sm:py-8 pb-20 sm:pb-12">
      <div className="max-w-3xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        {/* Back Button */}
        <div>
          <button
            onClick={onBackToMethods}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#12483E] bg-white hover:bg-[#EBF3F0] border border-[#12483E]/20 rounded-xl transition-all shadow-2xs cursor-pointer min-h-[36px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Pilih Metode Lain</span>
          </button>
        </div>

        {/* Page Title */}
        <div>
          <span className="text-[10px] sm:text-xs font-semibold text-[#12483E] tracking-wider uppercase block">
            Kanal QRIS Nasional
          </span>
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1A2220] mt-0.5">
            Pembayaran via QRIS
          </h1>
          <p className="text-[11px] sm:text-xs text-[#45524F] mt-0.5">
            Pindai kode QRIS di bawah ini dengan aplikasi m-Banking atau dompet digital Anda.
          </p>
        </div>

        {/* Main QRIS Display Section */}
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-black/[0.06] shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Left: QR Code Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[240px] sm:max-w-[260px] bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-black/[0.1] shadow-2xs flex flex-col items-center text-center">
                {/* Header */}
                <div className="w-full border-b border-black/[0.08] pb-1.5 mb-2 flex items-center justify-between px-1">
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold text-red-600 text-xs sm:text-sm tracking-tighter">QRIS</span>
                    <span className="text-[8px] sm:text-[9px] text-[#71807C] font-semibold">· Standar Nasional</span>
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-bold text-[#1A2220] bg-stone-100 px-1 py-0.2 rounded">GPN</span>
                </div>

                <span className="text-[11px] sm:text-xs font-bold text-[#1A2220] block leading-tight">
                  [Senja Living Residence]
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#71807C] font-mono block mt-0.5">
                  NMID: [ID1020000xxxx]
                </span>

                {/* SVG QR Code */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 my-2.5 p-2 bg-white rounded-lg sm:rounded-xl border border-black/[0.08] shadow-2xs relative flex items-center justify-center">
                  <svg viewBox="0 0 140 140" className="w-full h-full text-[#1A2220]" fill="currentColor">
                    <rect x="10" y="10" width="35" height="35" fill="none" stroke="currentColor" strokeWidth="6" rx="3" />
                    <rect x="20" y="20" width="15" height="15" rx="2" />
                    <rect x="95" y="10" width="35" height="35" fill="none" stroke="currentColor" strokeWidth="6" rx="3" />
                    <rect x="105" y="20" width="15" height="15" rx="2" />
                    <rect x="10" y="95" width="35" height="35" fill="none" stroke="currentColor" strokeWidth="6" rx="3" />
                    <rect x="20" y="105" width="15" height="15" rx="2" />
                    <rect x="90" y="90" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="4" rx="2" />
                    <rect x="97" y="97" width="8" height="8" />

                    <rect x="52" y="12" width="6" height="6" />
                    <rect x="64" y="12" width="6" height="6" />
                    <rect x="76" y="12" width="6" height="6" />
                    <rect x="52" y="24" width="6" height="6" />
                    <rect x="64" y="32" width="6" height="6" />
                    <rect x="76" y="24" width="6" height="6" />
                    <rect x="52" y="44" width="6" height="6" />
                    <rect x="64" y="44" width="6" height="6" />
                    <rect x="76" y="44" width="6" height="6" />
                    
                    <rect x="12" y="52" width="6" height="6" />
                    <rect x="24" y="52" width="6" height="6" />
                    <rect x="36" y="52" width="6" height="6" />
                    <rect x="12" y="64" width="6" height="6" />
                    <rect x="24" y="72" width="6" height="6" />
                    <rect x="36" y="64" width="6" height="6" />
                    
                    <rect x="95" y="52" width="6" height="6" />
                    <rect x="107" y="52" width="6" height="6" />
                    <rect x="119" y="52" width="6" height="6" />
                    <rect x="95" y="64" width="6" height="6" />
                    <rect x="107" y="72" width="6" height="6" />
                    <rect x="119" y="64" width="6" height="6" />

                    <rect x="52" y="95" width="6" height="6" />
                    <rect x="64" y="95" width="6" height="6" />
                    <rect x="76" y="95" width="6" height="6" />
                    <rect x="52" y="107" width="6" height="6" />
                    <rect x="64" y="119" width="6" height="6" />
                    <rect x="76" y="107" width="6" height="6" />
                    <rect x="119" y="95" width="6" height="6" />
                    <rect x="119" y="119" width="6" height="6" />

                    <rect x="55" y="55" width="30" height="30" fill="white" rx="6" stroke="#12483E" strokeWidth="2" />
                    <text x="70" y="74" fontSize="13" fontWeight="bold" fill="#12483E" textAnchor="middle">S</text>
                  </svg>
                </div>

                <div className="w-full pt-1.5 border-t border-black/[0.06]">
                  <span className="text-[9px] sm:text-[10px] text-[#71807C] block">Total Tagihan:</span>
                  <span className="text-sm sm:text-base font-bold text-[#12483E] font-mono tabular-nums block">
                    Rp [Total Tagihan]
                  </span>
                  <span className="text-[9px] text-[#71807C] block mt-0.5">Bebas Biaya Admin</span>
                </div>
              </div>

              {/* Download / Copy Buttons */}
              <div className="flex items-center gap-2 mt-2.5">
                <button
                  onClick={handleDownloadQr}
                  className="px-2.5 py-1 text-[11px] font-semibold text-[#12483E] bg-[#EBF3F0] hover:bg-[#DEEBE6] rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  {isDownloaded ? (
                    <>
                      <Check className="w-3 h-3 text-[#12483E]" />
                      <span>Tersimpan</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3 h-3" />
                      <span>Unduh QR</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleCopyNmid('ID1020000xxxx')}
                  className="px-2.5 py-1 text-[11px] font-semibold text-[#45524F] bg-white border border-black/[0.08] hover:bg-[#FAF9F6] rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  {copiedNmid ? (
                    <>
                      <Check className="w-3 h-3 text-[#12483E]" />
                      <span>Disalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Salin NMID</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Steps & Status */}
            <div className="lg:col-span-7 space-y-3">
              <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[#FAF9F6] border border-black/[0.06]">
                <h4 className="text-xs font-bold text-[#1A2220] flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-[#12483E]" />
                  <span>Petunjuk Pembayaran QRIS:</span>
                </h4>

                <ol className="mt-2 space-y-1.5 text-[11px] text-[#45524F]">
                  <li className="flex items-start gap-1.5">
                    <span className="font-bold text-[#12483E] shrink-0">1.</span>
                    <span>Buka aplikasi <strong>m-Banking</strong> atau <strong>e-Wallet</strong> pilihan Anda.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="font-bold text-[#12483E] shrink-0">2.</span>
                    <span>Pilih menu <strong>Pindai / Scan QRIS</strong> lalu arahkan kamera ke kode di samping.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="font-bold text-[#12483E] shrink-0">3.</span>
                    <span>Pastikan nama merchant: <strong>[Senja Living Residence]</strong>.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="font-bold text-[#12483E] shrink-0">4.</span>
                    <span>Periksa total bayar <strong>Rp [Total Tagihan]</strong> lalu masukkan PIN Anda.</span>
                  </li>
                </ol>
              </div>

              {/* Supported Apps List */}
              <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#FAF9F6] border border-black/[0.05] text-[10px] text-[#71807C]">
                <span className="font-semibold text-[#1A2220] block mb-1">
                  Mendukung Seluruh Aplikasi Perbankan & Dompet Digital:
                </span>
                <div className="flex flex-wrap gap-1 text-[9px] sm:text-[10px]">
                  <span className="px-1.5 py-0.5 bg-white border border-black/[0.06] rounded text-[#1A2220]">BCA Mobile</span>
                  <span className="px-1.5 py-0.5 bg-white border border-black/[0.06] rounded text-[#1A2220]">Livin' Mandiri</span>
                  <span className="px-1.5 py-0.5 bg-white border border-black/[0.06] rounded text-[#1A2220]">BRImo</span>
                  <span className="px-1.5 py-0.5 bg-white border border-black/[0.06] rounded text-[#1A2220]">BNI Mobile</span>
                  <span className="px-1.5 py-0.5 bg-white border border-black/[0.06] rounded text-[#1A2220]">GoPay</span>
                  <span className="px-1.5 py-0.5 bg-white border border-black/[0.06] rounded text-[#1A2220]">OVO</span>
                  <span className="px-1.5 py-0.5 bg-white border border-black/[0.06] rounded text-[#1A2220]">DANA</span>
                  <span className="px-1.5 py-0.5 bg-white border border-black/[0.06] rounded text-[#1A2220]">ShopeePay</span>
                </div>
              </div>

              {/* Network Check Simulation */}
              <div>
                <button
                  onClick={handleCheckQris}
                  disabled={isChecking}
                  className="px-3 py-1.5 text-xs font-semibold text-[#12483E] bg-white border border-[#12483E]/20 hover:bg-[#EBF3F0] rounded-lg transition-all inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-60 shadow-2xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
                  <span>{isChecking ? 'Memeriksa status QRIS...' : 'Cek Status Transaksi'}</span>
                </button>

                {checkMessage && (
                  <div className="mt-2 p-2 bg-amber-50 border border-amber-200/80 rounded-lg text-[10px] text-amber-900 flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <span>{checkMessage}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PRIMARY ACTION: Selesai Bayar -> Langsung Menuju Halaman Bukti Sukses */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#12483E]/20 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="text-xs font-bold text-[#1A2220] block">
                Sudah menyelesaikan pemindaian QRIS?
              </span>
              <span className="text-[11px] text-[#71807C] block mt-0.5">
                Konfirmasi pembayaran untuk menerbitkan bukti kwitansi resmi.
              </span>
            </div>

            <button
              onClick={onPaymentSuccess}
              className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#12483E] hover:bg-[#0A2E28] active:scale-[0.98] rounded-xl transition-all shadow-2xs inline-flex items-center justify-center gap-2 cursor-pointer min-h-[42px]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Saya Sudah Membayar via QRIS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
