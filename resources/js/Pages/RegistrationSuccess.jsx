import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";

const SuccessMessage = ({ registration, isVisible }) => {
  return (
    <div className="w-full max-w-xl mx-auto space-y-8 text-center">
      <div
        className={`rounded-3xl p-10 bg-white shadow-2xl border border-slate-100 relative overflow-hidden transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        style={{ transitionDelay: '0.2s' }}
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-green-500"></div>
        
        <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-extrabold mb-4 text-slate-900 tracking-tight">
          Registrasi Berhasil!
        </h2>

        <p className="text-slate-500 text-lg font-light leading-relaxed">
          Terima kasih telah mendaftar. E-Ticket QR Code Anda telah dikirimkan secara otomatis melalui WhatsApp ke nomor <span className="font-semibold text-slate-900">{registration.phone}</span>.
        </p>
      </div>

      {/* QR result if available */}
      {registration?.qr_url && (
        <div 
          className={`rounded-3xl p-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{ transitionDelay: '0.4s' }}
        >
          <p className="text-xs font-bold mb-8 text-[#2A348D] uppercase tracking-[0.2em]">QR Code E-Ticket</p>
          
          <div className="bg-[#f8fafc] p-10 rounded-[2.5rem] inline-block mb-8 border-2 border-dashed border-slate-200">
            <img 
              src={registration.qr_url} 
              alt="QR Code" 
              className="w-56 h-56 mx-auto mix-blend-multiply" 
              onError={e => {e.target.onerror=null;e.target.src='/images/no-qr.png';}} 
            />
          </div>

          <div className="space-y-2 mb-10">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Unique ID</p>
            <p className="text-3xl font-black text-[#2A348D] tracking-[0.3em]">{registration?.unique_code}</p>
          </div>

          <a
            href={registration.qr_url}
            download={`QR-ASITA-${registration?.unique_code}.png`}
            className="w-full inline-flex items-center justify-center gap-4 px-8 py-5 rounded-2xl text-white font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_20px_-5px_rgba(42,52,141,0.5)]"
            style={{ backgroundColor: "#2A348D" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            DOWNLOAD E-TICKET
          </a>
        </div>
      )}

      {/* Important Info */}
      <div 
        className={`rounded-2xl p-6 text-left bg-blue-50/50 border-l-[6px] border-[#2A348D] flex gap-5 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        style={{ transitionDelay: '0.6s' }}
      >
        <div className="flex-shrink-0 bg-[#2A348D] w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-[#2A348D] mb-1">PANDUAN REGISTRASI ULANG</p>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            Tunjukkan QR Code ini kepada petugas di lokasi acara. Salinan juga tersedia di WhatsApp Anda untuk akses cepat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function RegistrationSuccess({ registration }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Head title="Success - ASITA Meeting" />

      <div className="min-h-screen bg-[#f1f5f9] flex flex-col">
        {/* Header Section */}
        <div className="bg-[#2A348D] h-[340px] w-full relative overflow-hidden flex flex-col items-center pt-16">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute top-0 left-0 -ml-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
          
          <div className={`transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
            <div className="bg-white p-5 rounded-[2rem] shadow-2xl mb-6 inline-block">
              <img
                src="/images/Asitajpeg-removebg-preview.png"
                alt="ASITA Logo"
                className="h-16 object-contain"
              />
            </div>
            <h1 className="text-white text-3xl font-black tracking-[0.1em] text-center uppercase">
              ASITA MEETING 2026
            </h1>
          </div>
        </div>

        <main className="flex-1 px-4 -mt-24 pb-20 relative z-20">
          <SuccessMessage registration={registration} isVisible={isVisible} />
          
          <div className={`mt-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.8s' }}>
             <a 
              href={route('asita.show_form')} 
              className="inline-flex items-center gap-2 text-slate-500 hover:text-[#2A348D] transition-all text-sm font-bold group"
             >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                KEMBALI KE PENDAFTARAN
             </a>
          </div>
        </main>

        <footer className="py-10 text-center bg-white border-t border-slate-200">
          <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">
            © {new Date().getFullYear()} ASITA Meeting • Powered by Cyberlabs
          </p>
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        * {
          font-family: 'Outfit', sans-serif;
        }

        body {
          margin: 0;
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
}
