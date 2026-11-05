import React, { useState, useEffect } from 'react';
import {
  User,
  Home,
  Calendar,
  Phone,
  Shield,
  FileText,
  Bell,
  KeyRound,
  LogOut,
  ReceiptText,
  Clock,
  ArrowRight,
  Info,
  X,
  CreditCard,
  CheckCircle2,
  Mail,
  Loader2,
} from 'lucide-react';
import { landingApi, Invoice } from '../api';

interface ProfilePageProps {
  tenant: any;
  isPaid?: boolean;
  onLogout?: () => void;
  onNavigateToPayment: () => void;
  onViewSuccessReceipt?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  tenant,
  isPaid = false,
  onLogout,
  onNavigateToPayment,
  onViewSuccessReceipt,
}) => {
  const [waNotification, setWaNotification] = useState<boolean>(true);
  const [emailNotification, setEmailNotification] = useState<boolean>(true);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [showContractNotice, setShowContractNotice] = useState<boolean>(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoadingInvoices, setIsLoadingInvoices] = useState<boolean>(true);

  // Ambil tagihan riil dari backend Supabase
  useEffect(() => {
    if (tenant?.id) {
      setIsLoadingInvoices(true);
      landingApi.getInvoicesByTenant(tenant.id)
        .then((data) => {
          setInvoices(data);
        })
        .finally(() => {
          setIsLoadingInvoices(false);
        });
    }
  }, [tenant?.id]);

  // Cek tagihan bulan berjalan
  const currentPeriod = new Date().toISOString().slice(0, 7);
  const currentInvoice = invoices.find((inv) => inv.periodMonth === currentPeriod) || invoices[0];
  const isInvoicePaid = isPaid || (currentInvoice ? currentInvoice.status === 'paid' : false);

  // Ambil data nyata yang login dari Supabase/Database
  const tenantName = tenant?.name || 'Penghuni Kos';
  const tenantPhone = tenant?.phone || '-';
  const tenantEmail = tenant?.email || '-';
  const tenantId = tenant?.id ? tenant.id.slice(0, 8).toUpperCase() : 'PNH-01';
  const roomNumber = tenant?.roomNumber || 'A05';
  const roomType = tenant?.roomType || 'Kamar Mandi Dalam + AC';
  const roomFloor = tenant?.roomFloor || 1;
  const startDate = tenant?.startDate || '2026-11-04';
  const emergencyContact = tenant?.emergencyContact || '-';
  const monthlyPrice = tenant?.monthlyPrice
    ? `Rp ${Number(tenant.monthlyPrice).toLocaleString('id-ID')}`
    : 'Rp 1.500.000';

  return (
    <div className="w-full py-4 sm:py-8 pb-20 sm:pb-12">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        {/* Page Title */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] sm:text-xs font-semibold text-[#12483E] tracking-wider uppercase block">
              Portal Penghuni
            </span>
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1A2220] mt-0.5">
              Profil Penghuni
            </h1>
            <p className="text-[11px] sm:text-xs text-[#45524F] mt-0.5">
              Informasi identitas akun, unit kamar, dan status tagihan terdaftar.
            </p>
          </div>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>

        {/* Profile Header Summary */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-black/[0.06] shadow-2xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#EBF3F0] border border-[#12483E]/20 text-[#12483E] flex items-center justify-center font-bold text-base sm:text-lg shrink-0">
                <User className="w-5 h-5 sm:w-7 sm:h-7 stroke-[1.7]" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#1A2220]">
                  {tenantName}
                </h2>
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#71807C] mt-0.5">
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Penghuni Aktif
                  </span>
                  <span>•</span>
                  <span>ID: {tenantId}</span>
                  <span>•</span>
                  <span className="font-semibold text-[#12483E]">Kamar {roomNumber}</span>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-black/[0.04] w-full sm:w-auto">
              <span className="text-[10px] text-[#71807C] block">Unit Kamar</span>
              <span className="text-xs font-semibold text-[#1A2220]">
                {roomType} • Lt. {roomFloor}
              </span>
              <span className="text-[11px] text-emerald-700 block font-medium mt-0.5">
                {monthlyPrice} / bulan
              </span>
            </div>
          </div>
        </div>

        {/* Detail Identitas & Kamar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card: Informasi Akun */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-black/[0.06] shadow-2xs space-y-3.5">
            <h3 className="text-xs sm:text-sm font-bold text-[#1A2220] flex items-center gap-2 border-b border-black/[0.04] pb-2.5">
              <User className="w-4 h-4 text-[#12483E]" />
              <span>Data Kontak Terdaftar</span>
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#71807C]">Nama Lengkap</span>
                <span className="font-semibold text-[#1A2220]">{tenantName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#71807C]">Nomor Telepon / WA</span>
                <span className="font-semibold text-[#1A2220]">{tenantPhone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#71807C]">Alamat Email</span>
                <span className="font-medium text-[#1A2220]">{tenantEmail}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#71807C]">Kontak Darurat</span>
                <span className="font-medium text-[#1A2220]">{emergencyContact}</span>
              </div>
            </div>
          </div>

          {/* Card: Informasi Sewa */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-black/[0.06] shadow-2xs space-y-3.5">
            <h3 className="text-xs sm:text-sm font-bold text-[#1A2220] flex items-center gap-2 border-b border-black/[0.04] pb-2.5">
              <Home className="w-4 h-4 text-[#12483E]" />
              <span>Informasi Sewa Kamar</span>
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#71807C]">Nomor Kamar</span>
                <span className="font-bold text-[#12483E]">Kamar {roomNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#71807C]">Tipe & Fasilitas</span>
                <span className="font-medium text-[#1A2220]">{roomType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#71807C]">Lantai Unit</span>
                <span className="font-medium text-[#1A2220]">Lantai {roomFloor}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#71807C]">Mulai Menempati</span>
                <span className="font-medium text-[#1A2220]">{startDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Tagihan Bulan Ini */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-black/[0.06] shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-black/[0.04] pb-3">
            <h3 className="text-xs sm:text-sm font-bold text-[#1A2220] flex items-center gap-2">
              <ReceiptText className="w-4 h-4 text-[#12483E]" />
              <span>Tagihan Sewa Bulan Berjalan ({currentPeriod})</span>
            </h3>
            {isLoadingInvoices ? (
              <span className="text-[10px] text-[#71807C] flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" /> Memeriksa...
              </span>
            ) : (
              <span
                className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  isInvoicePaid
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {isInvoicePaid ? 'Lunas Terverifikasi' : 'Menunggu Pembayaran'}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#FAF9F6] p-3.5 rounded-xl border border-black/[0.04]">
            <div>
              <p className="text-xs font-semibold text-[#1A2220]">
                Tagihan Sewa Kamar {roomNumber}
              </p>
              <p className="text-[11px] text-[#71807C] mt-0.5">
                {isInvoicePaid && currentInvoice?.paidAt
                  ? `Dibayar pada: ${new Date(currentInvoice.paidAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`
                  : 'Batas jatuh tempo: Tanggal 10 setiap bulan'}
              </p>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-2">
              <span className="text-sm sm:text-base font-extrabold text-[#12483E]">
                {currentInvoice?.amount ? `Rp ${currentInvoice.amount.toLocaleString('id-ID')}` : monthlyPrice}
              </span>
              {!isInvoicePaid ? (
                <button
                  onClick={onNavigateToPayment}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#12483E] hover:bg-[#0E3A32] rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  Bayar Sekarang
                </button>
              ) : (
                onViewSuccessReceipt && (
                  <button
                    onClick={onViewSuccessReceipt}
                    className="px-3 py-1 text-xs font-semibold text-[#12483E] bg-[#EBF3F0] hover:bg-[#DEEBE6] rounded-lg transition-colors cursor-pointer"
                  >
                    Lihat Bukti
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Riwayat Pembayaran Lampau */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-black/[0.06] shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-black/[0.04] pb-3">
            <h3 className="text-xs sm:text-sm font-bold text-[#1A2220] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#12483E]" />
              <span>Riwayat Transaksi & Pembayaran</span>
            </h3>
            <span className="text-[10px] sm:text-xs font-semibold text-[#71807C]">
              {invoices.length} Catatan Tagihan
            </span>
          </div>

          {isLoadingInvoices ? (
            <div className="py-6 flex items-center justify-center gap-2 text-xs text-[#71807C]">
              <Loader2 className="w-4 h-4 animate-spin text-[#12483E]" />
              <span>Memuat riwayat transaksi...</span>
            </div>
          ) : invoices.length === 0 ? (
            <div className="py-6 text-center text-xs text-[#71807C]">
              Belum ada riwayat transaksi sebelumnya.
            </div>
          ) : (
            <div className="divide-y divide-black/[0.04]">
              {invoices.map((inv) => {
                const isPaid = inv.status === 'paid';
                return (
                  <div
                    key={inv.id}
                    className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1A2220]">
                          Periode {inv.periodMonth}
                        </span>
                        <span className="text-[10px] text-[#71807C] font-mono">
                          {inv.invoiceNumber}
                        </span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-[#71807C] mt-0.5">
                        {isPaid && inv.paidAt
                          ? `Dibayar: ${new Date(inv.paidAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}`
                          : `Jatuh tempo: ${inv.dueDate || '-'}`}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <span className="text-xs sm:text-sm font-bold text-[#12483E] font-mono">
                        Rp {inv.amount.toLocaleString('id-ID')}
                      </span>
                      <span
                        className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isPaid
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {isPaid ? 'Lunas' : 'Belum Bayar'}
                      </span>
                      {isPaid && onViewSuccessReceipt && (
                        <button
                          onClick={onViewSuccessReceipt}
                          className="px-2.5 py-1 text-[10px] font-semibold text-[#12483E] bg-[#EBF3F0] hover:bg-[#DEEBE6] rounded-md transition-colors cursor-pointer"
                        >
                          Kwitansi
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Konfirmasi Logout */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/40 backdrop-blur-xs">
            <div className="w-full max-w-sm bg-white rounded-2xl border border-black/[0.08] p-5 shadow-xl text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <LogOut className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#1A2220]">Keluar dari Portal Penghuni?</h4>
              <p className="text-xs text-[#71807C]">
                Anda harus memasukkan nomor telepon kembali saat ingin mengakses halaman profil ini.
              </p>
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2 text-xs font-semibold text-[#45524F] bg-[#FAF9F6] hover:bg-[#EBEAE5] rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    setShowLogoutConfirm(false);
                    if (onLogout) onLogout();
                  }}
                  className="flex-1 py-2 text-xs font-semibold text-white bg-rose-700 hover:bg-rose-800 rounded-xl cursor-pointer"
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
