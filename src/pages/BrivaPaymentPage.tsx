import React, { useState, useEffect } from 'react';
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
  RefreshCw,
  AlertCircle,
  Loader2,
  Info,
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
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [checkMessage, setCheckMessage] = useState<string | null>(null);

  // Real Midtrans States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [brivaNumber, setBrivaNumber] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');
  const [grossAmount, setGrossAmount] = useState<number>(1500000);
  const [expireTime, setExpireTime] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 1. Fetch Real BRIVA from Midtrans Core API on mount
  useEffect(() => {
    const fetchBriva = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const savedSession = localStorage.getItem('tenant_session');
        const tenant = savedSession ? JSON.parse(savedSession) : null;
        const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

        const res = await fetch(`${apiUrl}/payments/midtrans/charge-briva`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tenantId: tenant?.id,
            amount: tenant?.monthlyPrice || 1500000,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Gagal membuat nomor BRIVA dari Midtrans');
        }

        setBrivaNumber(data.vaNumber || '');
        setOrderId(data.orderId || '');
        setGrossAmount(Number(data.grossAmount) || 1500000);
        setExpireTime(data.expireTime || '');
      } catch (err: any) {
        setErrorMessage(err.message || 'Koneksi ke gateway BRIVA gagal.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBriva();
  }, []);

  // 2. Real-time Status Check
  const handleCheckBriva = async () => {
    if (!orderId) return;
    setIsChecking(true);
    setCheckMessage(null);

    try {
      const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/payments/midtrans/status/${orderId}`);
      const data = await res.json();

      if (data.transaction_status === 'settlement' || data.transaction_status === 'capture') {
        setCheckMessage('Pembayaran Berhasil! Tagihan Anda telah lunas.');
        setTimeout(() => {
          onPaymentSuccess();
        }, 1500);
      } else if (data.transaction_status === 'pending') {
        setCheckMessage('Status: Menunggu Pembayaran. Silakan selesaikan transfer ke nomor BRIVA di atas.');
      } else {
        setCheckMessage(`Status: ${data.transaction_status || 'Belum terbayar'}. Silakan coba kembali.`);
      }
    } catch {
      setCheckMessage('Belum ada dana masuk yang terdeteksi. Silakan coba beberapa saat lagi.');
    } finally {
      setIsChecking(false);
    }
  };

  const handleCopyBriva = () => {
    navigator.clipboard?.writeText(brivaNumber.replace(/[^0-9]/g, ''));
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
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12483E] hover:text-[#0E3A32] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali ke Pilihan Metode</span>
          </button>
        </div>

        {/* Page Title */}
        <div>
          <span className="text-[10px] sm:text-xs font-semibold text-[#12483E] tracking-wider uppercase block">
            BRI Virtual Account Resmi
          </span>
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1A2220] mt-0.5">
            Pembayaran BRIVA Real-Time
          </h1>
          <p className="text-[11px] sm:text-xs text-[#45524F] mt-0.5">
            Transfer tepat sesuai total nominal ke nomor BRIVA yang tertera di bawah.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* BRIVA Info Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-black/[0.06] shadow-2xs space-y-5">
          {/* Header Amount */}
          <div className="p-4 bg-[#FAF9F6] border border-black/[0.05] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-semibold text-[#71807C] block uppercase tracking-wider">
                Total Tagihan Sewa
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#1A2220]">
                Rp {grossAmount.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] text-[#71807C] block">Kode Referensi Order</span>
              <span className="text-xs font-mono font-semibold text-[#12483E]">
                {orderId || 'Memuat...'}
              </span>
            </div>
          </div>

          {/* Virtual Account Number Box */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#EBF3F0] to-[#E3EDE8] border border-[#12483E]/20 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#12483E] flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" />
                <span>Nomor Virtual Account BRIVA (Midtrans)</span>
              </span>
              <span className="text-[10px] font-bold text-[#12483E] bg-white px-2 py-0.5 rounded-md border border-[#12483E]/20">
                BRI
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="text-base sm:text-2xl font-mono font-extrabold text-[#1A2220] tracking-wider select-all">
                {isLoading ? (
                  <span className="text-slate-400 text-sm font-sans font-medium flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Membuat nomor BRIVA resmi...</span>
                  </span>
                ) : (
                  brivaNumber || 'Nomor BRIVA Tidak Tersedia'
                )}
              </div>

              {brivaNumber && (
                <button
                  onClick={handleCopyBriva}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-[#12483E] hover:bg-[#0E3A32] rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  {copiedBriva ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBriva ? 'Tersalin' : 'Salin'}</span>
                </button>
              )}
            </div>

            {expireTime && (
              <p className="text-[11px] text-[#556964] pt-1">
                Batas waktu pembayaran: <strong>{expireTime}</strong>
              </p>
            )}
          </div>

          {/* Status Message */}
          {checkMessage && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              <span>{checkMessage}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2 border-t border-black/[0.06]">
            <button
              onClick={handleCheckBriva}
              disabled={isChecking || isLoading}
              className="w-full py-3 bg-[#12483E] hover:bg-[#0E3A32] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isChecking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memeriksa ke Gateway BRIVA...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>Saya Sudah Transfer (Cek Status)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Petunjuk Pembayaran Tabs */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-5 border border-black/[0.06] shadow-2xs space-y-4">
          <h3 className="text-xs sm:text-sm font-bold text-[#1A2220]">
            Panduan Cara Bayar BRIVA
          </h3>
          <div className="flex gap-2 border-b border-black/[0.06] pb-2 text-xs font-semibold">
            <button
              onClick={() => setActiveGuideTab('brimo')}
              className={`pb-1 px-2 border-b-2 transition-all ${
                activeGuideTab === 'brimo'
                  ? 'border-[#12483E] text-[#12483E]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              BRImo
            </button>
            <button
              onClick={() => setActiveGuideTab('atm')}
              className={`pb-1 px-2 border-b-2 transition-all ${
                activeGuideTab === 'atm'
                  ? 'border-[#12483E] text-[#12483E]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              ATM BRI
            </button>
            <button
              onClick={() => setActiveGuideTab('bank_lain')}
              className={`pb-1 px-2 border-b-2 transition-all ${
                activeGuideTab === 'bank_lain'
                  ? 'border-[#12483E] text-[#12483E]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Bank Lain
            </button>
          </div>

          <div className="text-xs text-[#556964] space-y-2 leading-relaxed">
            {activeGuideTab === 'brimo' && (
              <ol className="list-decimal pl-4 space-y-1">
                <li>Buka aplikasi <strong>BRImo</strong> lalu login.</li>
                <li>Pilih menu <strong>Tagihan</strong> &gt; <strong>BRIVA</strong>.</li>
                <li>Masukkan nomor Virtual Account di atas dan klik <strong>Lanjutkan</strong>.</li>
                <li>Periksa detail tagihan, lalu masukkan PIN transaksi Anda.</li>
              </ol>
            )}
            {activeGuideTab === 'atm' && (
              <ol className="list-decimal pl-4 space-y-1">
                <li>Masukkan kartu ATM dan PIN di mesin ATM BRI.</li>
                <li>Pilih menu <strong>Transaksi Lain</strong> &gt; <strong>Pembayaran</strong> &gt; <strong>Lainnya</strong> &gt; <strong>BRIVA</strong>.</li>
                <li>Masukkan nomor Virtual Account BRIVA Anda.</li>
                <li>Konfirmasi pembayaran lalu simpan struk transaksi.</li>
              </ol>
            )}
            {activeGuideTab === 'bank_lain' && (
              <ol className="list-decimal pl-4 space-y-1">
                <li>Buka mobile banking bank Anda (BCA, Mandiri, BNI, dll).</li>
                <li>Pilih <strong>Transfer Antar Bank</strong> &gt; Bank Tujuan: <strong>BRI (002)</strong>.</li>
                <li>Masukkan nomor rekening tujuan dengan nomor BRIVA di atas.</li>
                <li>Masukkan nominal yang tepat dan selesaikan transaksi.</li>
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
