import React, { useState, useEffect } from 'react';
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
  AlertCircle,
  Loader2,
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
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [checkMessage, setCheckMessage] = useState<string | null>(null);

  // Real Midtrans States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [qrImageUrl, setQrImageUrl] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');
  const [grossAmount, setGrossAmount] = useState<number>(1500000);
  const [expireTime, setExpireTime] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 1. Fetch Real QRIS from Midtrans Core API on mount
  useEffect(() => {
    const fetchQris = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const savedSession = localStorage.getItem('tenant_session');
        const tenant = savedSession ? JSON.parse(savedSession) : null;
        const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

        const res = await fetch(`${apiUrl}/payments/midtrans/charge-qris`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tenantId: tenant?.id,
            amount: tenant?.monthlyPrice || 1500000,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Gagal memuat QRIS dari Midtrans');
        }

        setQrImageUrl(data.qrUrl || '');
        setOrderId(data.orderId || '');
        setGrossAmount(Number(data.grossAmount) || 1500000);
        setExpireTime(data.expireTime || '');
      } catch (err: any) {
        setErrorMessage(err.message || 'Koneksi ke gateway pembayaran gagal.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQris();
  }, []);

  // 2. Real-time Status Check to Midtrans API
  const handleCheckQris = async () => {
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
        setCheckMessage('Status: Menunggu Pembayaran. Silakan selesaikan scan QRIS di aplikasi Anda.');
      } else {
        setCheckMessage(`Status: ${data.transaction_status || 'Belum terbayar'}. Silakan coba kembali.`);
      }
    } catch {
      setCheckMessage('Belum ada dana masuk yang terdeteksi. Silakan coba beberapa detik lagi.');
    } finally {
      setIsChecking(false);
    }
  };

  const handleCopyNmid = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedNmid(true);
    setTimeout(() => setCopiedNmid(false), 2000);
  };

  return (
    <div className="w-full py-4 sm:py-8 pb-20 sm:pb-12">
      <div className="max-w-2xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        {/* Back Button */}
        <div>
          <button
            onClick={onBackToMethods}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12483E] hover:text-[#0E3A32] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali ke Pilihan Pembayaran</span>
          </button>
        </div>

        {/* Page Title */}
        <div>
          <span className="text-[10px] sm:text-xs font-semibold text-[#12483E] tracking-wider uppercase block">
            Midtrans QRIS Resmi
          </span>
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1A2220] mt-0.5">
            Pembayaran QRIS Real-Time
          </h1>
          <p className="text-[11px] sm:text-xs text-[#45524F] mt-0.5">
            Pindai kode QR dinamis di bawah menggunakan GoPay, OVO, ShopeePay, BCA Mobile, atau aplikasi bank lain.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* QR Code Container Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-black/[0.06] shadow-2xs space-y-5">
          {/* Amount Box */}
          <div className="p-3.5 bg-[#FAF9F6] border border-black/[0.05] rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold text-[#71807C] block uppercase tracking-wider">
                Total Tagihan
              </span>
              <span className="text-base sm:text-lg font-bold text-[#1A2220]">
                Rp {grossAmount.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#71807C] block">Kode Order</span>
              <span className="text-xs font-mono font-semibold text-[#12483E]">
                {orderId || 'Memuat...'}
              </span>
            </div>
          </div>

          {/* Dynamic QR Code Render */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="p-4 bg-white border-2 border-black/[0.08] rounded-2xl shadow-sm text-center">
              {isLoading ? (
                <div className="w-56 h-56 flex flex-col items-center justify-center gap-2">
                  <Loader2 className="w-8 h-8 text-[#12483E] animate-spin" />
                  <span className="text-xs text-slate-500 font-medium">Membuat QRIS Midtrans...</span>
                </div>
              ) : qrImageUrl ? (
                <img
                  src={qrImageUrl}
                  alt="QRIS Midtrans"
                  className="w-56 h-56 sm:w-64 sm:h-64 object-contain mx-auto"
                />
              ) : (
                <div className="w-56 h-56 flex flex-col items-center justify-center gap-2 bg-slate-50 rounded-xl">
                  <QrCode className="w-12 h-12 text-slate-400 stroke-[1.5]" />
                  <span className="text-xs text-slate-500 font-medium px-4 text-center">
                    QRIS gagal dibuat. Periksa Server Key Midtrans.
                  </span>
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-black/[0.05] flex items-center justify-center gap-2 text-[11px] text-[#71807C]">
                <span>NMID: ID102938472910</span>
                <button
                  onClick={() => handleCopyNmid('ID102938472910')}
                  className="text-[#12483E] hover:underline flex items-center gap-0.5 font-semibold"
                >
                  {copiedNmid ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedNmid ? 'Disalin' : 'Salin'}</span>
                </button>
              </div>
            </div>

            {expireTime && (
              <p className="text-[11px] text-[#71807C] mt-3">
                Batas waktu pembayaran: <span className="font-semibold text-slate-800">{expireTime}</span>
              </p>
            )}
          </div>

          {/* Status Check Message */}
          {checkMessage && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              <span>{checkMessage}</span>
            </div>
          )}

          {/* Action Check Status */}
          <div className="pt-2 border-t border-black/[0.06]">
            <button
              onClick={handleCheckQris}
              disabled={isChecking || isLoading}
              className="w-full py-3 bg-[#12483E] hover:bg-[#0E3A32] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isChecking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memeriksa ke Gateway Midtrans...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>Saya Sudah Bayar (Cek Status)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
