import React, { useState } from 'react';
import {
  ArrowLeft,
  CreditCard,
  Copy,
  Check,
  CheckCircle2,
  Calendar,
  Smartphone,
  ShieldCheck,
  Building2,
} from 'lucide-react';

interface BrivaPaymentPageProps {
  onBackToMethods: () => void;
  onPaymentSuccess: () => void;
}

export const BrivaPaymentPage: React.FC<BrivaPaymentPageProps> = ({
  onBackToMethods,
  onPaymentSuccess,
}) => {
  const [copiedBriva, setCopiedBriva] = useState<boolean>(false);
  const [activeGuideTab, setActiveGuideTab] = useState<'brimo' | 'atm' | 'bank_lain'>('brimo');

  const brivaNumber = '[12800 8821 0000 xxxx]';

  const handleCopyBriva = () => {
    navigator.clipboard?.writeText(brivaNumber.replace(/[[\] ]/g, ''));
    setCopiedBriva(true);
    setTimeout(() => setCopiedBriva(false), 2000);
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
            Bank Rakyat Indonesia
          </span>
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1A2220] mt-0.5">
            Pembayaran BRIVA (Virtual Account)
          </h1>
          <p className="text-[11px] sm:text-xs text-[#45524F] mt-0.5">
            Gunakan kode virtual account unik di bawah ini untuk transfer langsung melalui BRImo, ATM, atau antar bank.
          </p>
        </div>

        {/* Main BRIVA Detail Card */}
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-black/[0.06] shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-xs">
                BRI
              </div>
              <div>
                <span className="text-xs font-bold text-[#1A2220] block">
                  BRIVA (BRI Virtual Account)
                </span>
                <span className="text-[10px] text-[#71807C] block">
                  Nomor Akun Tagihan Resmi Kost
                </span>
              </div>
            </div>

            <span className="text-[10px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md">
              Verifikasi Otomatis
            </span>
          </div>

          {/* Virtual Account Box */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF9F6] border border-black/[0.06] space-y-2">
            <span className="text-[10px] sm:text-[11px] font-medium text-[#71807C] block">
              Nomor Virtual Account BRIVA
            </span>

            <div className="flex items-center justify-between gap-2">
              <span className="text-base sm:text-xl font-bold text-[#12483E] font-mono tracking-wide tabular-nums">
                {brivaNumber}
              </span>

              <button
                onClick={handleCopyBriva}
                className="px-3 py-1.5 text-xs font-semibold text-[#12483E] bg-white border border-[#12483E]/20 hover:bg-[#EBF3F0] rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {copiedBriva ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#12483E]" />
                    <span>Disalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Nomor</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-2 border-t border-black/[0.04] grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-[#71807C] block">Nama Pelanggan</span>
                <span className="font-semibold text-[#1A2220] block">[Nama Penghuni]</span>
              </div>
              <div>
                <span className="text-[10px] text-[#71807C] block">Unit Kamar</span>
                <span className="font-semibold text-[#1A2220] block">Kamar [Nomor Kamar]</span>
              </div>
            </div>
          </div>

          {/* Amount and Due date info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
            <div>
              <span className="text-[10px] text-[#71807C] block">Total Pembayaran</span>
              <span className="text-sm sm:text-base font-bold text-[#12483E] font-mono tabular-nums">
                Rp [Total Tagihan]
              </span>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] text-[#71807C] block">Batas Waktu Pembayaran</span>
              <span className="font-medium text-[#1A2220]">
                [Tanggal Jatuh Tempo] · 23.59 WIB
              </span>
            </div>
          </div>
        </div>

        {/* BRIVA Payment Guides Tabs */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-black/[0.06] shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
            <h3 className="text-xs sm:text-sm font-bold text-[#1A2220]">
              Petunjuk Transfer BRIVA
            </h3>

            {/* Guide Switcher */}
            <div className="inline-flex p-0.5 bg-[#F0EFEB] rounded-lg text-xs">
              <button
                onClick={() => setActiveGuideTab('brimo')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  activeGuideTab === 'brimo'
                    ? 'bg-white text-[#12483E] shadow-2xs'
                    : 'text-[#45524F] hover:text-[#1A2220]'
                }`}
              >
                BRImo
              </button>
              <button
                onClick={() => setActiveGuideTab('atm')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  activeGuideTab === 'atm'
                    ? 'bg-white text-[#12483E] shadow-2xs'
                    : 'text-[#45524F] hover:text-[#1A2220]'
                }`}
              >
                ATM BRI
              </button>
              <button
                onClick={() => setActiveGuideTab('bank_lain')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  activeGuideTab === 'bank_lain'
                    ? 'bg-white text-[#12483E] shadow-2xs'
                    : 'text-[#45524F] hover:text-[#1A2220]'
                }`}
              >
                Bank Lain
              </button>
            </div>
          </div>

          {/* Tab 1: BRImo Guide */}
          {activeGuideTab === 'brimo' && (
            <ol className="space-y-1.5 text-[11px] text-[#45524F] list-decimal list-inside">
              <li>Buka dan masuk ke aplikasi <strong>BRImo</strong> di ponsel Anda.</li>
              <li>Pilih menu <strong>Tagihan</strong> &gt; pilih <strong>BRIVA</strong>.</li>
              <li>Pilih <strong>Pembayaran Baru</strong> lalu masukkan Nomor BRIVA: <strong>{brivaNumber}</strong>.</li>
              <li>Pastikan nama pelanggan <strong>[Nama Penghuni]</strong> dan jumlah tagihan <strong>Rp [Total Tagihan]</strong> sudah sesuai.</li>
              <li>Masukkan PIN BRImo Anda dan simpan tanda bukti transaksi.</li>
            </ol>
          )}

          {/* Tab 2: ATM BRI Guide */}
          {activeGuideTab === 'atm' && (
            <ol className="space-y-1.5 text-[11px] text-[#45524F] list-decimal list-inside">
              <li>Masukkan kartu ATM BRI dan PIN 6-digit Anda.</li>
              <li>Pilih menu <strong>Transaksi Lain</strong> &gt; pilih <strong>Pembayaran</strong> &gt; pilih <strong>Lainnya</strong>.</li>
              <li>Pilih menu <strong>BRIVA</strong>.</li>
              <li>Masukkan Nomor Virtual Account: <strong>{brivaNumber}</strong> lalu tekan Benar.</li>
              <li>Periksa konfirmasi data di layar ATM dan selesaikan pembayaran.</li>
            </ol>
          )}

          {/* Tab 3: Transfer Antar Bank Guide */}
          {activeGuideTab === 'bank_lain' && (
            <ol className="space-y-1.5 text-[11px] text-[#45524F] list-decimal list-inside">
              <li>Buka aplikasi m-Banking atau ATM bank lain Anda (BCA, Mandiri, BNI, dll).</li>
              <li>Pilih menu <strong>Transfer Antar Bank</strong>.</li>
              <li>Pilih bank tujuan: <strong>Bank BRI (Kode: 002)</strong>.</li>
              <li>Masukkan nomor rekening tujuan berupa Nomor BRIVA: <strong>{brivaNumber}</strong>.</li>
              <li>Masukkan nominal tepat: <strong>Rp [Total Tagihan]</strong> lalu konfirmasi transfer.</li>
            </ol>
          )}

          <div className="pt-2 border-t border-black/[0.04] text-[10px] text-[#71807C] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#12483E] shrink-0" />
            <span>Sistem BRIVA mendeteksi pelunasan secara instan tanpa perlu unggah struk manual.</span>
          </div>
        </div>

        {/* PRIMARY ACTION: Selesai Bayar -> Langsung Menuju Halaman Bukti Sukses */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#12483E]/20 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="text-xs font-bold text-[#1A2220] block">
                Sudah menyelesaikan transfer BRIVA?
              </span>
              <span className="text-[11px] text-[#71807C] block mt-0.5">
                Konfirmasi transaksi untuk membuka kwitansi bukti pembayaran resmi Anda.
              </span>
            </div>

            <button
              onClick={onPaymentSuccess}
              className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#12483E] hover:bg-[#0A2E28] active:scale-[0.98] rounded-xl transition-all shadow-2xs inline-flex items-center justify-center gap-2 cursor-pointer min-h-[42px]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Saya Sudah Membayar via BRIVA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
