import React, { useState, useEffect } from 'react';
import { CurrentPage, PaymentChannel } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ContactModal } from './components/ContactModal';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { PaymentMethodPage } from './pages/PaymentMethodPage';
import { QrisPaymentPage } from './pages/QrisPaymentPage';
import { BrivaPaymentPage } from './pages/BrivaPaymentPage';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('beranda');
  const [selectedChannel, setSelectedChannel] = useState<PaymentChannel>('qris');
  const [isBillPaid, setIsBillPaid] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Active tab indicator for navigation
  const activeNavTab = currentPage === 'beranda' ? 'beranda' : 'profil';

  const handleSelectChannel = (channel: PaymentChannel) => {
    setSelectedChannel(channel);
    if (channel === 'qris') {
      setCurrentPage('pembayaran-qris');
    } else {
      setCurrentPage('pembayaran-briva');
    }
  };

  const handlePaymentSuccess = (channel: PaymentChannel) => {
    setSelectedChannel(channel);
    setIsBillPaid(true);
    setCurrentPage('pembayaran-sukses');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A2220] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#12483E]/15 selection:text-[#12483E]">
      {/* Top Header - Beranda & Profil */}
      <Header
        currentTab={activeNavTab}
        onSelectTab={(tab) => setCurrentPage(tab)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentPage === 'beranda' && (
          <HomePage
            onOpenContact={() => setIsContactOpen(true)}
            onNavigateToProfile={() => setCurrentPage('profil')}
          />
        )}

        {currentPage === 'profil' && (
          <ProfilePage
            isPaid={isBillPaid}
            onNavigateToPayment={() => setCurrentPage('pilih-metode')}
            onViewSuccessReceipt={() => setCurrentPage('pembayaran-sukses')}
          />
        )}

        {currentPage === 'pilih-metode' && (
          <PaymentMethodPage
            onBackToProfile={() => setCurrentPage('profil')}
            onSelectChannel={handleSelectChannel}
          />
        )}

        {currentPage === 'pembayaran-qris' && (
          <QrisPaymentPage
            onBackToMethods={() => setCurrentPage('pilih-metode')}
            onPaymentSuccess={() => handlePaymentSuccess('qris')}
          />
        )}

        {currentPage === 'pembayaran-briva' && (
          <BrivaPaymentPage
            onBackToMethods={() => setCurrentPage('pilih-metode')}
            onPaymentSuccess={() => handlePaymentSuccess('briva')}
          />
        )}

        {currentPage === 'pembayaran-sukses' && (
          <PaymentSuccessPage
            paymentChannel={selectedChannel}
            onGoToProfile={() => setCurrentPage('profil')}
            onGoToHome={() => setCurrentPage('beranda')}
          />
        )}
      </main>

      {/* Mobile Fixed Bottom Navigation */}
      <BottomNav
        currentTab={activeNavTab}
        onSelectTab={(tab) => setCurrentPage(tab)}
      />

      {/* Contact Manager Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
