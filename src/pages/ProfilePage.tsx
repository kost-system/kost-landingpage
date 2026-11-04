import React, { useState } from 'react';
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
} from 'lucide-react';

interface ProfilePageProps {
  isPaid?: boolean;
  onNavigateToPayment: () => void;
  onViewSuccessReceipt?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  isPaid = false,
  onNavigateToPayment,
  onViewSuccessReceipt,
}) => {
  // Frontend visual interaction states
  const [waNotification, setWaNotification] = useState<boolean>(true);
  const [emailNotification, setEmailNotification] = useState<boolean>(true);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [showContractNotice, setShowContractNotice] = useState<boolean>(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);

  return (
    <div className="w-full py-4 sm:py-8 pb-20 sm:pb-12">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        {/* Page Title */}
        <div>
          <span className="text-[10px] sm:text-xs font-semibold text-[#12483E] tracking-wider uppercase block">
            Portal Penghuni
          </span>
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1A2220] mt-0.5">
            Profil Penghuni
          </h1>
          <p className="text-[11px] sm:text-xs text-[#45524F] mt-0.5">
            Informasi identitas penghuni, unit kamar, status tagihan, dan pengaturan akun.
          </p>
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
                  [Nama Penghuni]
                </h2>
                <div className="flex items-center gap-1.5 text-[11px] text-[#71807C] mt-0.5">
                  <span className="font-semibold text-[#12483E]">[Penghuni Aktif]</span>
                  <span aria-hidden="true">·</span>
                  <span>ID: [ID Penghuni]</span>
                  <span aria-hidden="true">·</span>
                  <span>Kamar [Nomor Kamar]</span>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-black/[0.04] w-full sm:w-auto">
              <span className="text-[10px] text-[#71807C] block">Status Kamar</span>
              <span className="text-xs font-semibold text-[#1A2220]">
                [Tipe Kamar] · Lt. [Nomor Lantai]
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STATUS TAGIHAN & TOMBOL PEMBAYARAN */}
        {/* User requested: "dari profil hanya ada tombol pembayaran, status tagihan dan tombol pembayaran. jadi nanti pembayarn masuk page terpisah" */}
        {/* ============================================================ */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-[#F6FAF8] border border-[#12483E]/20 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-black/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#12483E] text-white flex items-center justify-center shrink-0">
                <ReceiptText className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#12483E] uppercase tracking-wider block">
                  Kewajiban Sewa
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-[#1A2220]">
                  Status Tagihan Berjalan
                </h3>
              </div>
            </div>

            {/* Dynamic Status Tagihan */}
            {isPaid ? (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#12483E] bg-[#EBF3F0] px-2.5 py-1 rounded-lg border border-[#12483E]/30 self-start sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#12483E]" />
                <span>[Status: Pembayaran Lunas]</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/80 self-start sm:self-auto">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>[Status: Belum Terbayar]</span>
              </div>
            )}
          </div>

          <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] sm:text-[11px] text-[#71807C] block">
                {isPaid ? 'Jumlah Dilunasi' : 'Total Tagihan Bulan Ini'}
              </span>
              <div className="text-xl sm:text-2xl font-bold text-[#12483E] font-mono tabular-nums mt-0.5">
                Rp [Total Tagihan]
              </div>
              <span className="text-[10px] text-[#71807C] block mt-0.5">
                {isPaid
                  ? 'Pelunasan diverifikasi otomatis melalui QRIS / BRIVA'
                  : 'Jatuh Tempo: [DD / MM / YYYY] · 23.59 WIB'}
              </span>
            </div>

            {/* Tombol Pembayaran -> Menuju Page Pembayaran Terpisah */}
            {isPaid ? (
              <button
                onClick={onViewSuccessReceipt || onNavigateToPayment}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-[#12483E] bg-[#EBF3F0] hover:bg-[#DEEBE6] active:scale-[0.98] rounded-xl transition-all shadow-2xs cursor-pointer min-h-[42px] sm:min-h-[44px] shrink-0"
              >
                <FileText className="w-4 h-4" />
                <span>Lihat Bukti Kwitansi Lunas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onNavigateToPayment}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-[#12483E] hover:bg-[#0A2E28] active:scale-[0.98] rounded-xl transition-all shadow-xs cursor-pointer min-h-[42px] sm:min-h-[44px] shrink-0"
              >
                <CreditCard className="w-4 h-4" />
                <span>Bayar Tagihan Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Grid: Informasi Dasar & Periode Sewa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: Informasi Dasar Penghuni & Kamar */}
          <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-black/[0.06] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-black/[0.06]">
                <Home className="w-4 h-4 text-[#12483E]" />
                <h3 className="text-xs sm:text-sm font-bold text-[#1A2220]">
                  Informasi Dasar Penghuni & Kamar
                </h3>
              </div>

              <div className="mt-3 space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#71807C]">Nama Lengkap</span>
                  <span className="font-semibold text-[#1A2220]">[Nama Penghuni]</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#71807C]">Nomor Identitas (KTP)</span>
                  <span className="font-medium text-[#1A2220] font-mono tabular-nums">
                    [Nomor Identitas]
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#71807C]">Nomor Unit Kamar</span>
                  <span className="font-semibold text-[#12483E]">[Nomor Kamar]</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#71807C]">Tipe Kamar</span>
                  <span className="font-medium text-[#1A2220]">[Tipe Kamar]</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#71807C]">Lokasi Lantai</span>
                  <span className="font-medium text-[#1A2220]">Lantai [Nomor Lantai]</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2.5 border-t border-black/[0.04] text-[10px] sm:text-[11px] text-[#71807C] flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#12483E] shrink-0" />
              <span>Untuk perubahan data unit, hubungi pengelola gedung.</span>
            </div>
          </div>

          {/* Card 2: Periode Sewa */}
          <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-black/[0.06] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-black/[0.06]">
                <Calendar className="w-4 h-4 text-[#12483E]" />
                <h3 className="text-xs sm:text-sm font-bold text-[#1A2220]">
                  Periode & Ketentuan Sewa
                </h3>
              </div>

              <div className="mt-3 space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#71807C]">Mulai Sewa</span>
                  <span className="font-medium text-[#1A2220] font-mono tabular-nums">
                    [DD / MM / YYYY]
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#71807C]">Berakhir Sewa</span>
                  <span className="font-semibold text-[#1A2220] font-mono tabular-nums">
                    [DD / MM / YYYY]
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#71807C]">Durasi Kontrak</span>
                  <span className="font-medium text-[#1A2220]">[Durasi Kontrak]</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#71807C]">Skema Penagihan</span>
                  <span className="font-medium text-[#1A2220]">[Bulanan / Berkala]</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#71807C]">Status Kontrak</span>
                  <span className="font-semibold text-[#12483E]">[Aktif]</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2.5 border-t border-black/[0.04]">
              <button
                onClick={() => setShowContractNotice(true)}
                className="w-full py-1.5 text-xs font-semibold text-[#12483E] bg-[#FAF9F6] hover:bg-[#EBF3F0] rounded-lg sm:rounded-xl border border-black/[0.06] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Lihat Ringkasan Kontrak Sewa</span>
              </button>
            </div>
          </div>
        </div>

        {/* Card 3: Nomor Telepon & Kontak Darurat */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-black/[0.06] shadow-2xs">
          <div className="flex items-center gap-2 pb-3 border-b border-black/[0.06]">
            <Phone className="w-4 h-4 text-[#12483E]" />
            <h3 className="text-xs sm:text-sm font-bold text-[#1A2220]">
              Kontak Penghuni & Darurat
            </h3>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg sm:rounded-xl bg-[#FAF9F6] border border-black/[0.05]">
              <span className="text-[10px] font-medium text-[#71807C] block">
                Nomor Telepon Utama
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#1A2220] block mt-0.5 font-mono tabular-nums">
                [+62 8xx-xxxx-xxxx]
              </span>
              <span className="text-[10px] text-[#71807C] block mt-0.5">
                WhatsApp & notifikasi tagihan
              </span>
            </div>

            <div className="p-3 rounded-lg sm:rounded-xl bg-[#FAF9F6] border border-black/[0.05]">
              <span className="text-[10px] font-medium text-[#71807C] block">
                Kontak Darurat (Kerabat)
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#1A2220] block mt-0.5">
                [Nama Kontak Darurat]
              </span>
              <span className="text-[10px] text-[#71807C] block mt-0.5 font-mono tabular-nums">
                [+62 8xx-xxxx-xxxx] · [Hubungan Keluarga]
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Pengaturan Akun Sederhana */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-black/[0.06] shadow-2xs">
          <div className="flex items-center gap-2 pb-3 border-b border-black/[0.06]">
            <Shield className="w-4 h-4 text-[#12483E]" />
            <h3 className="text-xs sm:text-sm font-bold text-[#1A2220]">
              Pengaturan Akun Sederhana
            </h3>
          </div>

          <div className="mt-3 divide-y divide-black/[0.05]">
            {/* Toggle WhatsApp Notifications */}
            <div className="py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-[#71807C] shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-[#1A2220] block leading-tight">
                    Pengingat Tagihan WhatsApp
                  </span>
                  <span className="text-[10px] text-[#71807C] block">
                    Pemberitahuan H-3 sebelum jatuh tempo
                  </span>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={waNotification}
                onClick={() => setWaNotification(!waNotification)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  waNotification ? 'bg-[#12483E]' : 'bg-stone-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-2xs ring-0 transition duration-200 ease-in-out ${
                    waNotification ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle Email Notifications */}
            <div className="py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-[#71807C] shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-[#1A2220] block leading-tight">
                    Salinan Invoice via Email
                  </span>
                  <span className="text-[10px] text-[#71807C] block">
                    Kirim kwitansi resmi ke surel
                  </span>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={emailNotification}
                onClick={() => setEmailNotification(!emailNotification)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  emailNotification ? 'bg-[#12483E]' : 'bg-stone-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-2xs ring-0 transition duration-200 ease-in-out ${
                    emailNotification ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Password Change Action UI */}
            <div className="py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <KeyRound className="w-4 h-4 text-[#71807C] shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-[#1A2220] block leading-tight">
                    Kata Sandi & Akses
                  </span>
                  <span className="text-[10px] text-[#71807C] block">
                    Perbarui PIN akses portal
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-2.5 py-1 text-[11px] font-semibold text-[#12483E] bg-[#EBF3F0] hover:bg-[#DEEBE6] rounded-lg transition-colors cursor-pointer"
              >
                Ubah
              </button>
            </div>

            {/* Logout Action UI */}
            <div className="py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <LogOut className="w-4 h-4 text-[#71807C] shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-[#1A2220] block leading-tight">
                    Sesi Akun
                  </span>
                  <span className="text-[10px] text-[#71807C] block">
                    Keluar dari perangkat ini
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="px-2.5 py-1 text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>

        {/* Change Password Modal UI Preview */}
        {showPasswordModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs"
          >
            <div className="w-full max-w-sm bg-white rounded-xl sm:rounded-2xl border border-black/[0.08] p-4 sm:p-5 shadow-xl">
              <div className="flex items-center justify-between pb-2.5 border-b border-black/[0.06]">
                <h4 className="text-xs sm:text-sm font-bold text-[#1A2220]">
                  Ubah Kata Sandi Akun
                </h4>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="p-1 rounded-lg text-[#71807C] hover:bg-black/[0.04]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 space-y-2.5 text-xs">
                <div>
                  <label className="text-[10px] font-medium text-[#71807C] block mb-0.5">
                    Kata Sandi Saat Ini
                  </label>
                  <input
                    type="password"
                    placeholder="[••••••••]"
                    readOnly
                    className="w-full px-2.5 py-1.5 bg-[#FAF9F6] border border-black/[0.08] rounded-lg text-xs text-[#1A2220]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-medium text-[#71807C] block mb-0.5">
                    Kata Sandi Baru
                  </label>
                  <input
                    type="password"
                    placeholder="[Minimal 8 karakter]"
                    readOnly
                    className="w-full px-2.5 py-1.5 bg-[#FAF9F6] border border-black/[0.08] rounded-lg text-xs text-[#1A2220]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-medium text-[#71807C] block mb-0.5">
                    Konfirmasi Kata Sandi Baru
                  </label>
                  <input
                    type="password"
                    placeholder="[Ulangi kata sandi baru]"
                    readOnly
                    className="w-full px-2.5 py-1.5 bg-[#FAF9F6] border border-black/[0.08] rounded-lg text-xs text-[#1A2220]"
                  />
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 py-1.5 text-xs font-semibold text-[#45524F] bg-[#FAF9F6] hover:bg-[#EBEAE5] rounded-lg transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 py-1.5 text-xs font-semibold text-white bg-[#12483E] hover:bg-[#0A2E28] rounded-lg transition-colors cursor-pointer"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contract Notice Modal UI */}
        {showContractNotice && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs"
          >
            <div className="w-full max-w-md bg-white rounded-xl sm:rounded-2xl border border-black/[0.08] p-4 sm:p-5 shadow-xl">
              <div className="flex items-center justify-between pb-2.5 border-b border-black/[0.06]">
                <h4 className="text-xs sm:text-sm font-bold text-[#1A2220]">
                  Ringkasan Kontrak Sewa Hunian
                </h4>
                <button
                  onClick={() => setShowContractNotice(false)}
                  className="p-1 rounded-lg text-[#71807C] hover:bg-black/[0.04]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 space-y-2 text-xs text-[#45524F]">
                <p>
                  Perjanjian sewa tercatat antara <strong>Senja Living Management</strong> dan <strong>[Nama Penghuni]</strong>.
                </p>
                <div className="p-2.5 bg-[#FAF9F6] rounded-lg border border-black/[0.05] space-y-1 text-[11px]">
                  <div>• Nomor Kontrak: [KTR/YYYY/MM/—]</div>
                  <div>• Unit Tersewa: Kamar [Nomor Kamar], [Tipe Kamar]</div>
                  <div>• Masa Berlaku: [DD/MM/YYYY] s.d. [DD/MM/YYYY]</div>
                  <div>• Gerbang Utama: 23.00 WIB (Kunci Akses Mandiri)</div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowContractNotice(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-[#12483E] hover:bg-[#0A2E28] rounded-lg transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logout Confirm UI */}
        {showLogoutConfirm && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs"
          >
            <div className="w-full max-w-sm bg-white rounded-xl sm:rounded-2xl border border-black/[0.08] p-4 sm:p-5 shadow-xl text-center">
              <div className="w-9 h-9 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-2">
                <LogOut className="w-4 h-4" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1A2220]">
                Konfirmasi Keluar Sesi
              </h4>
              <p className="text-[11px] text-[#71807C] mt-0.5">
                Anda sedang melihat prototype antarmuka profil penghuni.
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-1.5 text-xs font-semibold text-[#45524F] bg-[#FAF9F6] hover:bg-[#EBEAE5] rounded-lg transition-colors cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-1.5 text-xs font-semibold text-white bg-rose-700 hover:bg-rose-800 rounded-lg transition-colors cursor-pointer"
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
