import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";

const SuccessMessage = ({ registration, isVisible }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-8 text-center">
      <div
        className={`rounded-3xl p-10 bg-white shadow-2xl border border-slate-100 relative overflow-hidden transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        style={{ transitionDelay: '0.2s' }}
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#0EA5E9]"></div>
        
        <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-[#0EA5E9]"
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

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={registration.qr_url}
              download={`QR-ASITA-${registration?.unique_code}.png`}
              className="flex-1 inline-flex items-center justify-center gap-4 px-8 py-5 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold text-lg transition-all hover:bg-slate-50 active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              UNDUH GAMBAR
            </a>
            
            <button
               onClick={handlePrint}
               className="flex-1 inline-flex items-center justify-center gap-4 px-8 py-5 rounded-2xl bg-[#0EA5E9] text-white font-bold text-lg transition-all hover:brightness-110 active:scale-[0.98] shadow-lg shadow-blue-500/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              EKSPOR PDF
            </button>
          </div>
        </div>
      )}

      {/* Printer Optimized Layout */}
      <div className="hidden pdf-ticket">
         <div className="p-12 border-[8px] border-[#2A348D] rounded-[48px] bg-white max-w-2xl mx-auto shadow-2xl">
            <div className="flex justify-between items-center mb-10 pb-8 border-b-2 border-dashed border-slate-200">
               <img src="/images/Asitajpeg-removebg-preview.png" className="h-20" alt="Logo" />
               <div className="text-right">
                  <h2 className="text-2xl font-black text-[#2A348D]">RAKERDA 1</h2>
                  <p className="text-sm text-slate-500 font-bold tracking-widest uppercase">DPD ASITA JABAR</p>
               </div>
            </div>

            <div className="flex gap-12 mb-10">
               <div className="flex-1 space-y-6">
                  <div>
                     <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Nama Peserta</label>
                     <p className="text-2xl font-bold text-slate-900">{registration.name}</p>
                  </div>
                  <div>
                     <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Instansi / Biro</label>
                     <p className="text-xl font-bold text-slate-900">{registration.company_name}</p>
                  </div>
                  <div className="flex gap-8">
                     <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Jabatan</label>
                        <p className="text-sm font-semibold text-slate-700">{registration.position}</p>
                     </div>
                     <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Registrasi ID</label>
                        <p className="text-sm font-black text-[#0EA5E9]">{registration.unique_code}</p>
                     </div>
                  </div>
               </div>
               <div className="w-48 h-48 bg-white p-3 border-4 border-slate-100 rounded-3xl shadow-inner">
                  <img src={registration.qr_url} className="w-full h-full" alt="QR" />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-10">
               <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Venue</p>
                  <p className="text-sm font-black text-slate-900">Harris Hotel Bandung</p>
               </div>
               <div className="text-center border-l border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tanggal & Waktu</p>
                  <p className="text-sm font-black text-slate-900">09 April 2026, 08:30 WIB</p>
               </div>
            </div>

            <div className="text-center pt-8 border-t border-dashed border-slate-200">
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest italic leading-relaxed">
                  "Transformasi Digital ASITA Jawa Barat melalui Inovasi dan Integrasi Teknologi"
               </p>
            </div>
         </div>
      </div>

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
            Simpan file PDF ini. Tunjukkan ke petugas di lokasi acara untuk proses Check-in cepat.
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

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        * {
          font-family: 'Outfit', sans-serif;
        }

        body {
          margin: 0;
          overflow-x: hidden;
        }

        @media print {
          body * {
            visibility: hidden;
          }
          .pdf-ticket, .pdf-ticket * {
            visibility: visible;
          }
          .pdf-ticket {
            display: block !important;
            position: fixed;
            left: 0;
            top: 0;
          }
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: "url('/images/asita_meeting_bg.png')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 to-slate-950"></div>
        </div>

        <div className="h-auto w-full relative z-10 flex flex-col items-center pt-16 pb-12">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          
          <div className={`transition-all duration-1000 flex flex-col items-center ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
            <div className="bg-white p-4 sm:p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] mb-8 inline-block">
              <img
                src="/images/Asitajpeg-removebg-preview.png"
                alt="ASITA Logo"
                className="h-16 sm:h-24 object-contain"
              />
            </div>
            <h1 className="text-white text-4xl sm:text-6xl font-black mb-2 italic">RAKERDA 1</h1>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0EA5E9] tracking-[0.2em] uppercase mb-4">DPD ASITA JABAR</h2>
            
            <div className="space-y-2 max-w-2xl px-6 text-center">
              <p className="text-white/40 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                ASSOCIATION OF INDONESIAN TOURS & TRAVEL AGENCIES
              </p>
              <p className="text-[#0EA5E9] text-xs sm:text-sm font-black italic tracking-wide">
                "TRANSFORMASI DIGITAL ASITA JAWA BARAT MELALUI INOVASI DAN INTEGRASI TEKNOLOGI"
              </p>
            </div>
            <div className="w-16 h-1 bg-[#0EA5E9] mx-auto mt-6 rounded-full opacity-50"></div>
          </div>
        </div>

        <main className="flex-1 px-4 -mt-24 pb-20 relative z-20">
          <SuccessMessage registration={registration} isVisible={isVisible} />
          
          <div className={`mt-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.8s' }}>
             <a 
              href={route('asita.show_form')} 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-[#0EA5E9] transition-all text-sm font-bold group"
             >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                KEMBALI KE PENDAFTARAN
             </a>
          </div>
        </main>

        <footer className="py-16 bg-slate-950 text-center relative z-10 border-t border-white/5 space-y-12">
           <div className="flex flex-col sm:flex-row items-center justify-center gap-12 text-slate-400">
                <div className="text-center group">
                   <p className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-3">Admin ASITA</p>
                   <a 
                    href="https://wa.me/6282113971389" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-2xl hover:bg-[#0EA5E9]/20 transition-all border border-white/10 group-hover:border-[#0EA5E9]/50"
                   >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-5 h-5" alt="WA" />
                      <span className="text-lg font-black text-white">0821-1397-1389</span>
                   </a>
                </div>
                <div className="text-center group">
                   <p className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-3">Ibu Dewi</p>
                   <a 
                    href="https://wa.me/628164864620" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-2xl hover:bg-[#0EA5E9]/20 transition-all border border-white/10 group-hover:border-[#0EA5E9]/50"
                   >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-5 h-5" alt="WA" />
                      <span className="text-lg font-black text-white">0816-4864-620</span>
                   </a>
                </div>
           </div>

           <div className="space-y-4">
              <div className="flex flex-col items-center gap-2">
                 <p className="text-white text-base font-black tracking-[0.2em] uppercase">HARRIS HOTEL, 09 APRIL 2026</p>
                 <p className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase">ASITA JABAR • ASSOCIATION OF INDONESIAN TOURS & TRAVEL AGENCIES</p>
              </div>
              <div className="h-px w-20 bg-white/10 mx-auto"></div>
              <p className="text-slate-600 text-[9px] font-black tracking-[0.4em] uppercase">
                © {new Date().getFullYear()} ASITA JABAR • Powered by <span className="text-[#0EA5E9]">Cyberlabs</span>
              </p>
           </div>
        </footer>
      </div>
    </>
  );
}
