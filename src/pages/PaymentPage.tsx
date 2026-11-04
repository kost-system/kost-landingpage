import React, { useState } from 'react';
import {
  ArrowLeft,
  ReceiptText,
  Calendar,
  CreditCard,
  QrCode,
  UploadCloud,
  CheckCircle2,
  Clock,
  Copy,
  Check,
  FileCheck,
  Trash2,
  Download,
  ShieldCheck,
  X,
  Smartphone,
  RefreshCw,
  Info,
} from 'lucide-react';

interface PaymentPageProps {
  onBackToProfile: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ onBackToProfile }) => {
  // Prototype status viewer to allow inspecting all designed states
  const [activePaymentStatus, setActivePaymentStatus] = useState<'unpaid' | 'pending' | 'paid'>('unpaid');
  
  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bank'>('qris');
  const [selectedBank, setSelectedBank] = useState<'bca' | 'mandiri' | 'bni'>('bca');
  const [copiedBankNumber, setCopiedBankNumber] = useState<boolean>(false);
  const [copiedNmid, setCopiedNmid] = useState<boolean>(false);
  const [isCheckingQris, setIsCheckingQris] = useState<boolean>(false);
  const [qrisCheckMessage, setQrisCheckMessage] = useState<string | null>(null);
  const [isQrisDownloaded, setIsQrisDownloaded] = useState<boolean>(false);

  // File upload UI state (pure frontend representation)
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFileSize, setUploadedFileSize] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setUploadedFileSize(`${(file.size / 1024).toFixed(1)} KB`);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFileName(null);
    setUploadedFileSize(null);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedBankNumber(true);
    setTimeout(() => setCopiedBankNumber(false), 2000);
  };

  const handleCopyNmid = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedNmid(true);
    setTimeout(() => setCopiedNmid(false), 2000);
  };

  const handleSimulateCheckQris = () => {
    setIsCheckingQris(true);
    setQrisCheckMessage(null);
    setTimeout(() => {
      setIsCheckingQris(false);
      setQrisCheckMessage('Sistem memeriksa: Belum ada transaksi masuk untuk kode QR ini. Silakan selesaikan scan di aplikasi perbankan Anda.');
      setTimeout(() => setQrisCheckMessage(null), 5000);
    }, 1200);
  };

  const handleDownloadQris = () => {
    setIsQrisDownloaded(true);
    setTimeout(() => setIsQrisDownloaded(false), 2500);
  };

  const bankDetails = {
    bca: {
      bankName: 'Bank Central Asia (BCA)',
      accountNumber: '[Nomor Rekening BCA]',
      accountHolder: '[Nama Pengelola Kost]',
    },
    mandiri: {
      bankName: 'Bank Mandiri',
      accountNumber: '[Nomor Rekening Mandiri]',
      accountHolder: '[Nama Pengelola Kost]',
    },
    bni: {
      bankName: 'Bank Negara Indonesia (BNI)',
      accountNumber: '[Nomor Rekening BNI]',
      accountHolder: '[Nama Pengelola Kost]',
    },
  };

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

  const billingHistory = [
    {
      id: 'hist-1',
      periodLabel: '[Periode Bulan Lalu]',
      dueDate: '[DD / MM / YYYY]',
      paymentDate: '[DD / MM / YYYY]',
      amount: 'Rp [Total Tagihan]',
      status: '[Lunas]',
    },
    {
      id: 'hist-2',
      periodLabel: '[Periode 2 Bulan Lalu]',
      dueDate: '[DD / MM / YYYY]',
      paymentDate: '[DD / MM / YYYY]',
      amount: 'Rp [Total Tagihan]',
      status: '[Lunas]',
    },
  ];

  return (
    <div className="w-full py-4 sm:py-8 pb-20 sm:pb-12">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        {/* Top Back Navigation to Profile */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onBackToProfile}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#12483E] bg-white hover:bg-[#EBF3F0] border border-[#12483E]/20 rounded-xl transition-all shadow-2xs cursor-pointer min-h-[36px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Profil</span>
          </button>

          {/* Prototype visual state switcher */}
          <div className="flex items-center gap-1 p-0.5 sm:p-1 bg-[#EBEAE5] rounded-lg sm:rounded-xl text-xs">
            <span className="text-[10px] font-medium text-[#71807C] px-1.5 hidden sm:inline">
              Status UI:
            </span>
            <button
              onClick={() => setActivePaymentStatus('unpaid')}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] font-semibold rounded-md sm:rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activePaymentStatus === 'unpaid'
                  ? 'bg-white text-amber-800 shadow-2xs'
                  : 'text-[#45524F] hover:text-[#1A2220]'
              }`}
            >
              Belum Bayar
            </button>
            <button
              onClick={() => setActivePaymentStatus('pending')}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] font-semibold rounded-md sm:rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activePaymentStatus === 'pending'
                  ? 'bg-white text-sky-800 shadow-2xs'
                  : 'text-[#45524F] hover:text-[#1A2220]'
              }`}
            >
              Verifikasi
            </button>
            <button
              onClick={() => setActivePaymentStatus('paid')}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] font-semibold rounded-md sm:rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activePaymentStatus === 'paid'
                  ? 'bg-white text-[#12483E] shadow-2xs'
                  : 'text-[#45524F] hover:text-[#1A2220]'
              }`}
            >
              Lunas
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div>
          <span className="text-[10px] sm:text-xs font-semibold text-[#12483E] tracking-wider uppercase block">
            Halaman Pembayaran
          </span>
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1A2220] mt-0.5">
            Pembayaran Tagihan Sewa
          </h1>
          <p className="text-[11px] sm:text-xs text-[#71807C] mt-0.5">
            Selesaikan tagihan sewa kamar berjalan melalui kanal resmi QRIS Dinamis atau Transfer Bank.
          </p>
        </div>

        {/* 1. Ringkasan Total Tagihan & Status */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-black/[0.06] shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-black/[0.06] gap-2.5">
            <div>
              <div className="text-[11px] text-[#71807C] flex items-center gap-1.5">
                <span>Invoice: [INV/YYYY/MM/—]</span>
                <span aria-hidden="true">·</span>
                <span>Kamar [Nomor Kamar]</span>
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-[#1A2220] mt-0.5">
                Periode Penagihan [Bulan Berjalan]
              </h3>
            </div>

            <div className="flex items-center gap-1.5">
              {activePaymentStatus === 'unpaid' && (
                <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-800">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>[Status: Belum Terbayar]</span>
                </div>
              )}
              {activePaymentStatus === 'pending' && (
                <div className="flex items-center gap-1 text-[11px] font-semibold text-sky-800">
                  <Clock className="w-3.5 h-3.5 text-sky-700" />
                  <span>[Status: Menunggu Verifikasi]</span>
                </div>
              )}
              {activePaymentStatus === 'paid' && (
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#12483E]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#12483E]" />
                  <span>[Status: Pembayaran Lunas]</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <span className="text-[11px] font-medium text-[#71807C] block">
                Total Tagihan Berjalan
              </span>
              <div className="text-xl sm:text-2xl font-bold text-[#12483E] mt-0.5 font-mono tabular-nums">
                Rp [Total Tagihan]
              </div>
              <span className="text-[10px] text-[#71807C] block mt-0.5">
                Bebas biaya admin via QRIS Dinamis
              </span>
            </div>

            <div className="p-3 sm:p-3.5 rounded-lg sm:rounded-xl bg-[#FAF9F6] border border-black/[0.06]">
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-[#12483E] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-semibold text-[#1A2220] block">
                    Batas Waktu Jatuh Tempo
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#1A2220] block mt-0.5 font-mono tabular-nums">
                    [DD / MM / YYYY] · 23.59 WIB
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Rincian Biaya */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-black/[0.06] shadow-2xs">
          <div className="flex items-center gap-2 pb-3 border-b border-black/[0.06]">
            <ReceiptText className="w-4 h-4 text-[#12483E]" />
            <h3 className="text-xs sm:text-sm font-bold text-[#1A2220]">
              Rincian Biaya Sewa & Komponen
            </h3>
          </div>

          <div className="mt-3 divide-y divide-black/[0.05]">
            {feeBreakdown.map((row, idx) => (
              <div
                key={idx}
                className="py-2.5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 text-xs"
              >
                <div>
                  <span className="font-semibold text-[#1A2220] block">
                    {row.item}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#71807C] block">
                    {row.description}
                  </span>
                </div>
                <span className="font-medium text-[#1A2220] sm:text-right font-mono tabular-nums mt-0.5 sm:mt-0 text-[11px] sm:text-xs">
                  {row.amount}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-black/[0.08] flex items-center justify-between text-xs font-bold text-[#1A2220]">
            <span>Total Tagihan</span>
            <span className="text-sm sm:text-base text-[#12483E] font-mono tabular-nums">
              Rp [Total Tagihan]
            </span>
          </div>
        </div>

        {/* 3. Area Informasi Pembayaran: QRIS & Transfer Bank */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-black/[0.06] shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/[0.06] gap-2.5">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs sm:text-sm font-bold text-[#1A2220]">
                  Metode Pembayaran
                </h3>
                <span className="text-[9px] sm:text-[10px] font-semibold text-[#12483E] bg-[#EBF3F0] px-1.5 py-0.5 rounded">
                  QRIS & Transfer
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#71807C] mt-0.5">
                Pilih scan QRIS instan atau transfer rekening bank
              </p>
            </div>

            <div className="inline-flex p-0.5 sm:p-1 bg-[#F0EFEB] rounded-lg sm:rounded-xl self-start sm:self-auto">
              <button
                onClick={() => setPaymentMethod('qris')}
                className={`px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-md sm:rounded-lg transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-1 ${
                  paymentMethod === 'qris'
                    ? 'bg-white text-[#12483E] shadow-2xs'
                    : 'text-[#45524F] hover:text-[#1A2220]'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>QRIS</span>
              </button>
              <button
                onClick={() => setPaymentMethod('bank')}
                className={`px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-md sm:rounded-lg transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-1 ${
                  paymentMethod === 'bank'
                    ? 'bg-white text-[#12483E] shadow-2xs'
                    : 'text-[#45524F] hover:text-[#1A2220]'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Transfer Bank</span>
              </button>
            </div>
          </div>

          {/* TAB 1: QRIS */}
          {paymentMethod === 'qris' && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                {/* QRIS Card Frame */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div className="w-full max-w-[230px] sm:max-w-[260px] bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-black/[0.1] shadow-2xs flex flex-col items-center text-center">
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

                    <div className="w-36 h-36 sm:w-44 sm:h-44 my-2 p-2 bg-white rounded-lg sm:rounded-xl border border-black/[0.08] shadow-2xs relative flex items-center justify-center">
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

                    <div className="w-full pt-1 border-t border-black/[0.06]">
                      <span className="text-[9px] sm:text-[10px] text-[#71807C] block">Total QRIS:</span>
                      <span className="text-xs sm:text-sm font-bold text-[#12483E] font-mono tabular-nums block">
                        Rp [Total Tagihan]
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2.5">
                    <button
                      onClick={handleDownloadQris}
                      className="px-2.5 py-1 text-[11px] font-semibold text-[#12483E] bg-[#EBF3F0] hover:bg-[#DEEBE6] rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      {isQrisDownloaded ? (
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

                {/* QRIS Steps & Status */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[#FAF9F6] border border-black/[0.06]">
                    <h4 className="text-xs font-bold text-[#1A2220] flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-[#12483E]" />
                      <span>Langkah Pembayaran via QRIS</span>
                    </h4>

                    <ol className="mt-2 space-y-1.5 text-[11px] text-[#45524F]">
                      <li className="flex items-start gap-1.5">
                        <span className="font-bold text-[#12483E] shrink-0">1.</span>
                        <span>Buka aplikasi <strong>m-Banking</strong> atau <strong>e-Wallet</strong> Anda.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="font-bold text-[#12483E] shrink-0">2.</span>
                        <span>Pilih tombol <strong>Pindai / Scan QRIS</strong>.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="font-bold text-[#12483E] shrink-0">3.</span>
                        <span>Pastikan nama merchant: <strong>[Senja Living Residence]</strong>.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="font-bold text-[#12483E] shrink-0">4.</span>
                        <span>Masukkan nominal tagihan: <strong>Rp [Total Tagihan]</strong> dan konfirmasi.</span>
                      </li>
                    </ol>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#FAF9F6] border border-black/[0.05] text-[10px] text-[#71807C]">
                    <span className="font-semibold text-[#1A2220] block mb-1">
                      Mendukung Aplikasi Perbankan & Dompet Digital:
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

                  <div className="pt-0.5">
                    <button
                      onClick={handleSimulateCheckQris}
                      disabled={isCheckingQris}
                      className="px-3 py-1.5 text-xs font-semibold text-[#12483E] bg-white border border-[#12483E]/20 hover:bg-[#EBF3F0] rounded-lg transition-all inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-60 shadow-2xs"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isCheckingQris ? 'animate-spin' : ''}`} />
                      <span>{isCheckingQris ? 'Memeriksa...' : 'Cek Status QRIS'}</span>
                    </button>

                    {qrisCheckMessage && (
                      <div className="mt-2 p-2 bg-amber-50 border border-amber-200/80 rounded-lg text-[10px] text-amber-900 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>{qrisCheckMessage}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Transfer Bank */}
          {paymentMethod === 'bank' && (
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {(['bca', 'mandiri', 'bni'] as const).map((bankKey) => {
                  const isSelected = selectedBank === bankKey;
                  return (
                    <button
                      key={bankKey}
                      onClick={() => setSelectedBank(bankKey)}
                      className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#12483E] bg-[#EBF3F0]/60 ring-1 ring-[#12483E]/20'
                          : 'border-black/[0.06] bg-[#FAF9F6] hover:border-black/[0.12]'
                      }`}
                    >
                      <span className="text-[11px] font-bold text-[#1A2220] block uppercase">
                        {bankKey}
                      </span>
                      <span className="text-[9px] text-[#71807C] block">
                        Rekening Resmi
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-3 sm:p-3.5 rounded-lg sm:rounded-xl bg-[#FAF9F6] border border-black/[0.06] space-y-2">
                <div>
                  <span className="text-[10px] font-medium text-[#71807C] block">
                    Nama Bank
                  </span>
                  <span className="text-xs font-bold text-[#1A2220] block">
                    {bankDetails[selectedBank].bankName}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1.5 border-t border-black/[0.04]">
                  <div>
                    <span className="text-[10px] font-medium text-[#71807C] block">
                      Nomor Rekening Tujuan
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#12483E] font-mono tabular-nums block">
                      {bankDetails[selectedBank].accountNumber}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(bankDetails[selectedBank].accountNumber)}
                    className="px-2.5 py-1 text-[11px] font-semibold text-[#12483E] bg-white border border-[#12483E]/20 hover:bg-[#EBF3F0] rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedBankNumber ? (
                      <>
                        <Check className="w-3 h-3 text-[#12483E]" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-1.5 border-t border-black/[0.04]">
                  <span className="text-[10px] font-medium text-[#71807C] block">
                    Atas Nama Rekening
                  </span>
                  <span className="text-xs font-semibold text-[#1A2220] block">
                    {bankDetails[selectedBank].accountHolder}
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-[#71807C]">
                Sertakan catatan: <strong>[Kamar No. XX - Nama Penghuni]</strong> pada transfer perbankan Anda.
              </p>
            </div>
          )}
        </div>

        {/* 4. Unggah Bukti Transfer & Konfirmasi Pembayaran */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-black/[0.06] shadow-2xs">
          <div className="flex items-center gap-2 pb-3 border-b border-black/[0.06]">
            <UploadCloud className="w-4 h-4 text-[#12483E]" />
            <h3 className="text-xs sm:text-sm font-bold text-[#1A2220]">
              Unggah Bukti Transfer / Resi QRIS
            </h3>
          </div>

          <div className="mt-3 space-y-3">
            <p className="text-[11px] text-[#45524F]">
              Setelah transaksi selesai, unggah bukti untuk verifikasi oleh administrasi kost.
            </p>

            {!uploadedFileName ? (
              <label className="border-2 border-dashed border-black/[0.12] hover:border-[#12483E]/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center text-center bg-[#FAF9F6] transition-colors cursor-pointer group">
                <input
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white border border-black/[0.06] text-[#12483E] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-5 h-5 stroke-[1.8]" />
                </div>
                <span className="text-xs font-semibold text-[#1A2220] block">
                  Pilih Berkas Bukti / Screenshot QRIS
                </span>
                <span className="text-[10px] text-[#71807C] block mt-0.5">
                  JPG, PNG, atau PDF (Maksimal 5 MB)
                </span>
              </label>
            ) : (
              <div className="p-3 rounded-lg sm:rounded-xl bg-[#EBF3F0] border border-[#12483E]/20 flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white text-[#12483E] flex items-center justify-center shrink-0">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-xs font-semibold text-[#1A2220] block truncate">
                      {uploadedFileName}
                    </span>
                    <span className="text-[10px] text-[#71807C] block">
                      {uploadedFileSize} · Siap dikonfirmasi
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleRemoveFile}
                  className="p-1.5 text-stone-500 hover:text-rose-600 rounded-lg hover:bg-white/60 transition-colors cursor-pointer"
                  title="Hapus berkas"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="pt-1">
              <button
                onClick={() => setShowConfirmModal(true)}
                className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-[#12483E] hover:bg-[#0A2E28] active:scale-[0.99] rounded-xl transition-all shadow-2xs inline-flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Kirim Konfirmasi Pembayaran</span>
              </button>
              <p className="text-[10px] text-[#71807C] text-center mt-1.5">
                Komponen frontend antarmuka pengguna tanpa integrasi backend sungguhan.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Riwayat Tagihan Sederhana */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-black/[0.06] shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#1A2220]">
                Riwayat Tagihan Sederhana
              </h3>
              <p className="text-[10px] sm:text-[11px] text-[#71807C] mt-0.5">
                Daftar pelunasan periode sebelumnya
              </p>
            </div>
          </div>

          <div className="mt-3 divide-y divide-black/[0.06]">
            {billingHistory.map((item) => (
              <div
                key={item.id}
                className="py-2.5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[#1A2220] text-xs">
                      {item.periodLabel}
                    </span>
                    <span className="font-semibold text-[#12483E] text-[11px]">
                      {item.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#71807C] mt-0.5">
                    Tanggal Bayar: {item.paymentDate}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#1A2220] font-mono tabular-nums text-xs">
                    {item.amount}
                  </span>
                  <button
                    onClick={() => setShowReceiptModal(true)}
                    className="px-2 py-0.5 text-[10px] font-medium text-[#12483E] bg-[#FAF9F6] border border-black/[0.08] hover:bg-[#EBF3F0] rounded-md sm:rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>Resi</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs"
          >
            <div className="w-full max-w-sm bg-white rounded-xl sm:rounded-2xl border border-black/[0.08] p-4 shadow-xl text-center">
              <div className="w-10 h-10 rounded-full bg-[#EBF3F0] text-[#12483E] flex items-center justify-center mx-auto mb-2.5">
                <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1A2220]">
                Konfirmasi Unggah Bukti
              </h4>
              <p className="text-[11px] text-[#45524F] mt-1 leading-relaxed">
                {uploadedFileName
                  ? `Berkas "${uploadedFileName}" siap dalam komponen antarmuka frontend.`
                  : 'Tombol konfirmasi interaktif siap menghubungkan bukti pembayaran.'}
              </p>
              <div className="mt-2 p-2 bg-[#FAF9F6] rounded-lg text-[10px] text-[#71807C] text-left">
                <div>• Metode: {paymentMethod === 'qris' ? 'QRIS Dinamis' : 'Transfer Bank'}</div>
                <div>• Total Tagihan: Rp [Total Tagihan]</div>
                <div>• Status: UI diverifikasi</div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="w-full py-2 text-xs font-semibold text-white bg-[#12483E] hover:bg-[#0A2E28] rounded-lg transition-colors cursor-pointer"
                >
                  Tutup Dialog
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Receipt Modal */}
        {showReceiptModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs"
          >
            <div className="w-full max-w-sm bg-white rounded-xl sm:rounded-2xl border border-black/[0.08] p-4 shadow-xl">
              <div className="flex items-center justify-between pb-2.5 border-b border-black/[0.06]">
                <h4 className="text-xs sm:text-sm font-bold text-[#1A2220]">
                  Kwitansi Pelunasan Sewa
                </h4>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="p-1 rounded-lg text-[#71807C] hover:bg-black/[0.04]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 space-y-2 text-xs text-[#45524F]">
                <div className="p-2.5 bg-[#FAF9F6] rounded-lg border border-black/[0.05] space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span>Nomor Resi:</span>
                    <span className="font-mono">[RCV/YYYY/MM/—]</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Penghuni:</span>
                    <span>[Nama Penghuni]</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unit:</span>
                    <span>Kamar [Nomor Kamar]</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Metode:</span>
                    <span>QRIS / Transfer Bank</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-semibold text-[#12483E]">[Lunas]</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-black/[0.04] font-bold text-[#1A2220]">
                    <span>Nominal:</span>
                    <span>Rp [Total Tagihan]</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#12483E] hover:bg-[#0A2E28] rounded-lg transition-colors cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
