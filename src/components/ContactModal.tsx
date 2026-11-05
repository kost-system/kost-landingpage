import React from 'react';
import { X, MessageSquare, Phone, Mail, Clock, MapPin, Copy, Check } from 'lucide-react';

import { landingApi, KostSettings } from '../api';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedType, setCopiedType] = React.useState<string | null>(null);
  const [settings, setSettings] = React.useState<KostSettings | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      landingApi.getSettings().then((data) => {
        if (data) setSettings(data);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const phoneDisplay = settings?.phone || '081234567890';
  const emailDisplay = settings?.email || 'pengelola@senjaliving.id';

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 1800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs transition-opacity"
    >
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl border border-black/[0.08] p-4 sm:p-5 shadow-xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2.5 border-b border-black/[0.06]">
          <div>
            <h3 id="contact-modal-title" className="text-xs sm:text-sm font-bold text-[#1A2220]">
              Layanan Informasi & Pengelola
            </h3>
            <p className="text-[10px] sm:text-[11px] text-[#71807C] mt-0.5">
              Hubungi pengelola kost untuk pertanyaan & reservasi
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#71807C] hover:text-[#1A2220] hover:bg-black/[0.04] transition-colors cursor-pointer"
            aria-label="Tutup jendela kontak"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 space-y-2">
          {/* WhatsApp / Pesan */}
          <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#FAF9F6] border border-black/[0.05] flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF3F0] text-[#12483E] flex items-center justify-center shrink-0">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] font-medium text-[#71807C] block">
                  WhatsApp Pengelola
                </span>
                <span className="text-xs font-semibold text-[#1A2220] block">
                  {phoneDisplay}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleCopy(phoneDisplay, 'wa')}
              className="px-2 py-1 text-[10px] font-medium text-[#12483E] bg-white border border-[#12483E]/20 rounded-md hover:bg-[#EBF3F0] transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              {copiedType === 'wa' ? (
                <>
                  <Check className="w-3 h-3 text-[#12483E]" />
                  <span>Disalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Salin</span>
                </>
              )}
            </button>
          </div>

          {/* Telepon */}
          <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#FAF9F6] border border-black/[0.05] flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF3F0] text-[#12483E] flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] font-medium text-[#71807C] block">
                  Panggilan Langsung
                </span>
                <span className="text-xs font-semibold text-[#1A2220] block">
                  {phoneDisplay}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleCopy(phoneDisplay, 'phone')}
              className="px-2 py-1 text-[10px] font-medium text-[#12483E] bg-white border border-[#12483E]/20 rounded-md hover:bg-[#EBF3F0] transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              {copiedType === 'phone' ? (
                <>
                  <Check className="w-3 h-3 text-[#12483E]" />
                  <span>Disalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Salin</span>
                </>
              )}
            </button>
          </div>

          {/* Surel / Email */}
          <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#FAF9F6] border border-black/[0.05] flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF3F0] text-[#12483E] flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] font-medium text-[#71807C] block">
                  Surel Resmi
                </span>
                <span className="text-xs font-semibold text-[#1A2220] block">
                  {emailDisplay}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleCopy(emailDisplay, 'email')}
              className="px-2 py-1 text-[10px] font-medium text-[#12483E] bg-white border border-[#12483E]/20 rounded-md hover:bg-[#EBF3F0] transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              {copiedType === 'email' ? (
                <>
                  <Check className="w-3 h-3 text-[#12483E]" />
                  <span>Disalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Salin</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-black/[0.06] space-y-1 text-[10px] sm:text-[11px] text-[#71807C]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-[#12483E] shrink-0" />
            <span>Operasional: 08.00 – 21.00 WIB</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-[#12483E] shrink-0" />
            <span>Survei fisik konfirmasi H-1 sebelumnya</span>
          </div>
        </div>

        <div className="mt-3.5">
          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-semibold text-[#45524F] bg-[#F0EFEB] hover:bg-[#E5E4DE] rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
