import React, { useState } from 'react';
import { Lock, Phone, ArrowRight, ShieldCheck, AlertCircle, Loader2, KeyRound, CheckCircle2 } from 'lucide-react';
import { landingApi } from '../api';

interface TenantLoginFormProps {
  onLoginSuccess: (tenantData: any) => void;
}

type AuthStep = 'phone' | 'password' | 'set-password';

export const TenantLoginForm: React.FC<TenantLoginFormProps> = ({ onLoginSuccess }) => {
  const [step, setStep] = useState<AuthStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [tenantInfo, setTenantInfo] = useState<{ id: string; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Langkah 1: Cek nomor HP & status password
  const handleCheckPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const data = await landingApi.checkTenantPhone(phoneNumber);
      setTenantInfo({ id: data.tenantId, name: data.name });

      if (data.hasPassword) {
        setStep('password');
      } else {
        setStep('set-password');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Nomor tidak terdaftar atau terjadi kesalahan.');
    } finally {
      setIsLoading(false);
    }
  };

  // Langkah 2a: Login dengan password yang sudah ada
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const data = await landingApi.loginTenant(phoneNumber, password);
      localStorage.setItem('tenant_session', JSON.stringify(data.tenant));
      onLoginSuccess(data.tenant);
    } catch (err: any) {
      if (err.requireSetPassword) {
        setTenantInfo({ id: err.tenantId, name: err.name || 'Penghuni' });
        setStep('set-password');
        setErrorMessage('Akun Anda belum memiliki kata sandi. Silakan atur kata sandi baru.');
      } else {
        setErrorMessage(err.message || 'Password salah.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Langkah 2b: Buat password baru pertama kali
  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    if (newPassword.length < 4) {
      setErrorMessage('Kata sandi minimal 4 karakter.');
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok.');
      setIsLoading(false);
      return;
    }

    try {
      const data = await landingApi.setTenantPassword(
        tenantInfo?.id || '',
        newPassword,
        phoneNumber
      );
      localStorage.setItem('tenant_session', JSON.stringify(data.tenant));
      onLoginSuccess(data.tenant);
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal menyimpan kata sandi baru.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-8 sm:py-16 px-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-sm space-y-6">
        {/* Header Form */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#EBF3F0] text-[#12483E] flex items-center justify-center border border-[#12483E]/15">
            {step === 'set-password' ? (
              <KeyRound className="w-6 h-6 stroke-[1.8]" />
            ) : (
              <Lock className="w-6 h-6 stroke-[1.8]" />
            )}
          </div>
          <h2 className="text-xl font-bold text-[#1A2220]">
            {step === 'phone' && 'Masuk Portal Penghuni'}
            {step === 'password' && `Halo, ${tenantInfo?.name || 'Penghuni'}`}
            {step === 'set-password' && 'Atur Kata Sandi Baru'}
          </h2>
          <p className="text-xs text-[#5C6B67] leading-relaxed">
            {step === 'phone' &&
              'Masukkan nomor WhatsApp atau telepon Anda yang terdaftar pada database sistem kos.'}
            {step === 'password' &&
              'Masukkan kata sandi akun Anda untuk membuka akses portal penghuni.'}
            {step === 'set-password' &&
              'Akun Anda terdaftar tetapi belum memiliki password. Buat kata sandi baru untuk login selanjutnya.'}
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Input Nomor HP */}
        {step === 'phone' && (
          <form onSubmit={handleCheckPhone} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1A2220] mb-1.5">
                Nomor WhatsApp / HP Terdaftar
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Contoh: 08123454667"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-black/[0.1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#12483E]/20 focus:border-[#12483E]"
                  required
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#12483E] hover:bg-[#0E3A32] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memeriksa ke Database...</span>
                </>
              ) : (
                <>
                  <span>Lanjutkan</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2A: Sudah punya password -> Masukkan Password */}
        {step === 'password' && (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-[#1A2220]">
                  Kata Sandi
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setStep('phone');
                    setPassword('');
                    setErrorMessage('');
                  }}
                  className="text-[11px] text-[#12483E] hover:underline cursor-pointer"
                >
                  Ganti Nomor
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi..."
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-black/[0.1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#12483E]/20 focus:border-[#12483E]"
                  required
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#12483E] hover:bg-[#0E3A32] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi Sandi...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Akun Saya</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2B: Belum punya password -> Setting Password Baru */}
        {step === 'set-password' && (
          <form onSubmit={handleSetPassword} className="space-y-4">
            <div className="p-3 bg-[#EBF3F0] rounded-xl text-xs text-[#12483E] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Nomor terverifikasi aktif untuk <strong>{tenantInfo?.name}</strong>.</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A2220] mb-1.5">
                Buat Kata Sandi Baru
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 4 karakter"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-black/[0.1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#12483E]/20 focus:border-[#12483E]"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A2220] mb-1.5">
                Konfirmasi Kata Sandi Baru
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi di atas"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-black/[0.1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#12483E]/20 focus:border-[#12483E]"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setStep('phone');
                  setNewPassword('');
                  setConfirmPassword('');
                  setErrorMessage('');
                }}
                className="py-3 px-4 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Kembali
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 bg-[#12483E] hover:bg-[#0E3A32] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menyimpan Sandi...</span>
                  </>
                ) : (
                  <>
                    <span>Simpan & Masuk</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        <div className="pt-2 border-t border-black/[0.06] text-center">
          <p className="text-[11px] text-[#71807C] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Aman dan terenkripsi langsung ke server kos</span>
          </p>
        </div>
      </div>
    </div>
  );
};

