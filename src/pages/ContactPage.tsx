import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { FAQSection } from '../components/FAQSection';

interface ContactPageProps {
  onOpenTrial: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenTrial }) => {
  return (
    <div className="bg-[#FCFBF8] min-h-screen">
      {/* Page Header */}
      <div className="bg-[#0B332D] text-[#F8F5EE] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#B79A62]/20">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <p className="text-[11px] font-sans font-bold text-[#B79A62] uppercase tracking-widest">
            DIRECT INQUIRIES
          </p>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F8F5EE] font-semibold">
            Contact Academic Support
          </h1>
          <p className="text-sm sm:text-base text-[#E8E0D1]/80 max-w-2xl mx-auto font-sans">
            Reach out via WhatsApp, email, or direct inquiry form for curriculum consultation and trial scheduling.
          </p>
        </div>
      </div>

      <ContactSection />
      <FAQSection onOpenTrial={onOpenTrial} />
    </div>
  );
};
