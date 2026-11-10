import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  QrCode,
  ChevronRight,
  ShieldCheck,
  Zap,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { PaymentChannel } from '../types';

interface PaymentMethodPageProps {
  onBackToProfile: () => void;
  onSelectChannel: (channel: PaymentChannel) => void;
  activeInvoice?: any;
}

declare global {
  interface Window {
    snap?: any;
  }
}

export const PaymentMethodPage: React.FC<PaymentMethodPageProps> = ({
  onBackToProfile,
  onSelectChannel,
  activeInvoice,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const savedSession = typeof window !== 'undefined' ? localStorage.getItem('tenant_session') : null;
  const tenant = savedSession ? JSON.parse(savedSession) : null;
  const monthlyPrice = activeInvoice?.amount
    ? Number(activeInvoice.amount)
    : (tenant?.monthlyPrice ? Number(tenant.monthlyPrice) : 1500000);

  // Trigger Midtrans Snap Popup
  const handleTriggerSnap = async (preferredMethod?: 'qris' | 'briva') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/payments/midtrans/create-snap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: tenant?.id,
          invoiceId: activeInvoice?.id,
          amount: monthlyPrice,
          preferredMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal memulai transaksi Midtrans');
      }

      if (window.snap) {
        window.snap.pay(data.token, {
          onSuccess: function (result: any) {
            console.log('Payment success callback:', result);
            // Langsung picu sinkronisasi status ke backend
            if (data.orderId) {
              fetch(`${apiUrl}/payments/midtrans/status/${data.orderId}`).catch(console.error);
            }
            onSelectChannel(preferredMethod || 'qris');
          },
          onPending: function (result: any) {
            console.log('Payment pending callback:', result);
            // Cek status ke server untuk memastikan apakah transaksi sudah settlement
            if (data.orderId) {
              fetch(`${apiUrl}/payments/midtrans/status/${data.orderId}`)
                .then((r) => r.json())
                .then((statusData) => {
                  if (statusData.transaction_status === 'settlement' || statusData.transaction_status === 'capture') {
                    onSelectChannel(preferredMethod || 'qris');
                  } else {
                    setErrorMessage('Transaksi masih menunggu penyelesaian pembayaran.');
                  }
                })
                .catch(() => {
                  setErrorMessage('Transaksi belum selesai dibayar.');
                });
            } else {
              setErrorMessage('Transaksi belum selesai.');
            }
          },
          onError: function (err: any) {
            console.error('Payment error:', err);
            setErrorMessage('Pembayaran gagal atau dibatalkan.');
          },
          onClose: function () {
            // Pengguna menutup popup snap tanpa menyelesaikan pembayaran
            // Verifikasi status ke backend sebelum memutuskan: jika belum settlement, JANGAN dialihkan ke sukses
            if (data.orderId) {
              fetch(`${apiUrl}/payments/midtrans/status/${data.orderId}`)
                .then((r) => r.json())
                .then((statusData) => {
                  if (statusData.transaction_status === 'settlement' || statusData.transaction_status === 'capture') {
                    onSelectChannel(preferredMethod || 'qris');
                  } else {
                    setErrorMessage('Jendela pembayaran ditutup sebelum transaksi diselesaikan.');
                  }
                })
                .catch(() => {
                  setErrorMessage('Jendela pembayaran ditutup.');
                });
            } else {
              setErrorMessage('Jendela pembayaran ditutup.');
            }
          },
        });
      } else if (data.redirect_url) {
        window.open(data.redirect_url, '_blank');
      } else {
        setErrorMessage('SDK Midtrans Snap belum termuat di browser.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Koneksi ke gateway pembayaran gagal.');
    } finally {
      setIsLoading(false);
    }
  };

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
            Jalur Pembayaran Otomatis
          </span>
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1A2220] mt-0.5">
            Pilih Metode Pembayaran
          </h1>
          <p className="text-[11px] sm:text-xs text-[#45524F] mt-0.5">
            Transaksi diproses langsung melalui gerbang resmi Midtrans dengan status verifikasi otomatis 24 jam.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Total Summary Card */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-black/[0.06] shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06]">
            <div>
              <span className="text-[10px] sm:text-[11px] text-[#71807C] block">
                Total Tagihan Sewa
              </span>
              <div className="text-xl sm:text-2xl font-bold text-[#12483E] font-mono tabular-nums mt-0.5">
                Rp {monthlyPrice.toLocaleString('id-ID')}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#45524F]">
              <Calendar className="w-3.5 h-3.5 text-[#12483E]" />
              <span>Kamar: <strong>{tenant?.roomNumber || 'A05'}</strong></span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
            <span>Metode Verifikasi</span>
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Otomatis (Tanpa Upload Struk)
            </span>
          </div>
        </div>

        {/* Payment Channels Section */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#1A2220] block">
            Pilih Opsi Pembayaran Midtrans:
          </span>

          {/* Option 1: QRIS Midtrans */}
          <div
            onClick={() => !isLoading && handleTriggerSnap('qris')}
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
                      QRIS (GoPay, OVO, ShopeePay, BCA, dll)
                    </h3>
                    <span className="text-[9px] font-semibold text-[#12483E] bg-[#EBF3F0] px-1.5 py-0.2 rounded">
                      Instan
                    </span>
                  </div>
                  <p className="text-[11px] text-[#45524F] mt-0.5">
                    Buka pop-up QRIS Midtrans resmi, lalu scan dengan aplikasi e-Wallet atau mobile banking pilihan Anda.
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#FAF9F6] group-hover:bg-[#EBF3F0] text-[#12483E] flex items-center justify-center shrink-0 transition-colors">
                <ChevronRight className="w-4 h-4 stroke-[2]" />
              </div>
            </div>
          </div>

          {/* Option 2: Virtual Account (BRIVA, BCA, BNI, Mandiri) */}
          <div
            onClick={() => !isLoading && handleTriggerSnap('briva')}
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
                      Virtual Account (BRIVA, BCA, BNI, Mandiri)
                    </h3>
                    <span className="text-[9px] font-semibold text-blue-800 bg-blue-50 px-1.5 py-0.2 rounded">
                      Bank Transfer
                    </span>
                  </div>
                  <p className="text-[11px] text-[#45524F] mt-0.5">
                    Dapatkan nomor Virtual Account resmi dari bank pilihan Anda untuk transfer via m-Banking atau ATM.
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#FAF9F6] group-hover:bg-[#EBF3F0] text-[#12483E] flex items-center justify-center shrink-0 transition-colors">
                <ChevronRight className="w-4 h-4 stroke-[2]" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading Indicator Overlay */}
        {isLoading && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
            <span>Mempersiapkan jendela pembayaran Midtrans...</span>
          </div>
        )}

        {/* Security Notice */}
        <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-black/[0.05] flex items-start gap-2.5 text-xs text-[#71807C]">
          <ShieldCheck className="w-4 h-4 text-[#12483E] shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            Pembayaran dijamin aman menggunakan enkripsi TLS Bank Indonesia dan Midtrans. Status pembayaran sewa kamar Anda akan otomatis terverifikasi begitu transaksi berhasil.
          </p>
        </div>
      </div>
    </div>
  );
};
