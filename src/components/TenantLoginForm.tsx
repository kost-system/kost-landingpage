import React, { useState } from 'react';
import { Lock, Phone, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

interface TenantLoginFormProps {
  onLoginSuccess: (tenantData: any) => void;
}

export const TenantLoginForm: React.FC<TenantLoginFormProps> = ({ onLoginSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';
      
      // Ambil data tenant & rooms dari database
      const [tenantsRes, roomsRes] = await Promise.all([
        fetch(`${apiUrl}/tenants`),
        fetch(`${apiUrl}/rooms`),
      ]);

      if (!tenantsRes.ok || !roomsRes.ok) {
        throw new Error('Gagal menghubungi server database.');
      }

      const tenants: any[] = await tenantsRes.json();
      const rooms: any[] = await roomsRes.json();

      // Bersihkan nomor input
      const cleanInput = phoneNumber.replace(/[^0-9]/g, '');

      // Verifikasi HANYA berdasarkan database nyata
      const matchedTenant = tenants.find((t) => {
        if (t.status !== 'active') return false;
        const cleanDbPhone = (t.phone || '').replace(/[^0-9]/g, '');
        return (
          cleanDbPhone === cleanInput ||
          cleanDbPhone.slice(-8) === cleanInput.slice(-8)
        );
      });

      if (!matchedTenant) {
        setErrorMessage(
          'Nomor telepon tidak ditemukan dalam daftar penghuni aktif di sistem. Pastikan nomor yang diisi sudah terdaftar oleh pengelola kos.'
        );
        setIsLoading(false);
        return;
      }

      // Ambil detail kamar terkait dari database
      const assignedRoom = rooms.find((r) => r.id === matchedTenant.roomId);

      const sessionData = {
        ...matchedTenant,
        roomNumber: assignedRoom?.number || 'Belum Ditentukan',
        roomType: assignedRoom?.type || 'Standard',
        roomFloor: assignedRoom?.floor || 1,
        monthlyPrice: assignedRoom?.monthlyPrice || 0,
      };

      localStorage.setItem('tenant_session', JSON.stringify(sessionData));
      onLoginSuccess(sessionData);
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan saat memverifikasi akun.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-8 sm:py-16 px-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#EBF3F0] text-[#12483E] flex items-center justify-center border border-[#12483E]/15">
            <Lock className="w-6 h-6 stroke-[1.8]" />
          </div>
          <h2 className="text-xl font-bold text-[#1A2220]">Masuk Portal Penghuni</h2>
          <p className="text-xs text-[#5C6B67] leading-relaxed">
            Masukkan nomor WhatsApp atau telepon Anda yang terdaftar pada database sistem kos.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
                <span>Masuk ke Akun Saya</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-black/[0.06] text-center">
          <p className="text-[11px] text-[#71807C] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Hanya nomor aktif yang terverifikasi yang dapat masuk</span>
          </p>
        </div>
      </div>
    </div>
  );
};
