import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function AsitaRegistration() {
  const { data, setData, post, processing, errors } = useForm({
    company_name: "",
    name: "",
    position: "",
    nia: "",
    company_address: "",
    company_phone: "",
    phone: "",
    email: "",
    website: "",
    social_media: "",
    commission_type: "A",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setData(name, value);
  };

  const nextStep = () => {
    // Basic validation check for required fields in each step
    if (currentStep === 0) {
      if (!data.company_name || !data.nia || !data.company_address || !data.company_phone) {
        alert("Mohon lengkapi data identitas perusahaan");
        return;
      }
    } else if (currentStep === 1) {
      if (!data.name || !data.position || !data.phone) {
        alert("Mohon lengkapi data identitas peserta");
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("asita.submit_form"));
  };

  return (
    <>
      <Head title="Pendaftaran - RAKERDA 1 ASITA JABAR" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        * {
          font-family: 'Outfit', sans-serif;
        }

        body {
          background-color: #0f172a;
          margin: 0;
          overflow-x: hidden;
          min-height: 100vh;
        }

        .bg-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/images/asita_meeting_bg.png');
          background-size: cover;
          background-position: center;
          opacity: 0.6;
          z-index: 0;
        }

        .bg-gradient-main {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(15, 23, 42, 0.4), #0f172a);
          z-index: 1;
        }

        .form-container {
          position: relative;
          z-index: 10;
        }

        .form-card {
          background: #ffffff;
          border-radius: 40px;
          box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          position: relative;
        }

        .custom-input {
          width: 100%;
          padding: 16px 20px;
          border-radius: 16px;
          border: 2px solid #f1f5f9;
          background: #f8fafc;
          transition: all 0.3s ease;
          font-size: 1rem;
          color: #1e293b;
          box-sizing: border-box;
        }

        .custom-input:focus {
          outline: none;
          border-color: #0EA5E9;
          background: white;
          box-shadow: 0 8px 20px rgba(14, 165, 233, 0.1);
        }

        .custom-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 800;
          font-size: 0.7rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .primary-btn {
          padding: 20px 32px;
          border-radius: 20px;
          background: #0EA5E9;
          color: white;
          font-weight: 900;
          font-size: 1.1rem;
          border: none;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 15px 30px -5px rgba(14, 165, 233, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .primary-btn:hover:not(:disabled) {
          transform: translateY(-4px);
          filter: brightness(1.1);
          box-shadow: 0 20px 40px -5px rgba(14, 165, 233, 0.5);
        }

        .secondary-btn {
          padding: 20px 32px;
          border-radius: 20px;
          background: white;
          color: #64748b;
          font-weight: 900;
          font-size: 1.1rem;
          border: 2px solid #f1f5f9;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .secondary-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #1e293b;
        }

        .step-indicator {
          width: 40px;
          height: 6px;
          border-radius: 3px;
          background: #f1f5f9;
          transition: all 0.5s ease;
        }

        .step-indicator.active {
          width: 80px;
          background: #0EA5E9;
        }
      `}</style>

      <div className="min-h-screen flex flex-col bg-slate-950">
        <div className="bg-overlay"></div>
        <div className="bg-gradient-main"></div>

        <div className="form-container flex-1 px-4 py-8">
          <header className="header-box !pt-10 !pb-10 text-center">
             <div className={`transition-all duration-1000 flex flex-col items-center ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="bg-white p-4 sm:p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] mb-8 inline-block">
                   <img src="/images/Asitajpeg-removebg-preview.png" alt="Logo" className="h-20 sm:h-28 object-contain" />
                </div>
                
                <h1 className="text-white text-4xl sm:text-7xl font-black mb-2 italic tracking-tight">RAKERDA 1</h1>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0EA5E9] tracking-[0.2em] uppercase mb-10">DPD ASITA JABAR</h2>
                
                <div className="flex gap-4 mb-4">
                   <div className={`step-indicator ${currentStep === 0 ? 'active' : ''}`}></div>
                   <div className={`step-indicator ${currentStep === 1 ? 'active' : ''}`}></div>
                   <div className={`step-indicator ${currentStep === 2 ? 'active' : ''}`}></div>
                </div>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Step {currentStep + 1} of 3</p>
             </div>
          </header>

          <div className={`max-w-3xl mx-auto form-card transition-all duration-700 ${isMounted ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <form onSubmit={handleSubmit} className="p-8 sm:p-14">
              
              {/* STEP 1: IDENTITAS PERUSAHAAN */}
              {currentStep === 0 && (
                <section className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700">
                  <div className="text-center mb-10">
                     <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase mb-2">Identitas Perusahaan</h2>
                     <p className="text-slate-400 text-sm font-medium">Lengkapi detail Biro / PT / CV pendaftar</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="custom-label">1. Nama Perusahaan (PT/CV)</label>
                      <input type="text" name="company_name" value={data.company_name} onChange={handleChange} placeholder="Contoh: PT. Wisata Jaya" className="custom-input" required />
                      {errors.company_name && <p className="text-red-500 text-xs mt-1 font-bold">{errors.company_name}</p>}
                    </div>
                    <div>
                      <label className="custom-label">4. No Register ASITA (NIA)</label>
                      <input type="text" name="nia" value={data.nia} onChange={handleChange} placeholder="Masukkan NIA" className="custom-input" required />
                      {errors.nia && <p className="text-red-500 text-xs mt-1 font-bold">{errors.nia}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="custom-label">5. Alamat Perusahaan</label>
                    <textarea name="company_address" value={data.company_address} onChange={handleChange} placeholder="Alamat lengkap kantor" className="custom-input min-h-[100px]" required />
                    {errors.company_address && <p className="text-red-500 text-xs mt-1 font-bold">{errors.company_address}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="custom-label">6. No Telpon/HP Kantor</label>
                      <input type="tel" name="company_phone" value={data.company_phone} onChange={handleChange} placeholder="022-X..." className="custom-input" required />
                      {errors.company_phone && <p className="text-red-500 text-xs mt-1 font-bold">{errors.company_phone}</p>}
                    </div>
                    <div>
                      <label className="custom-label">8. Website (Opsional)</label>
                      <input type="url" name="website" value={data.website} onChange={handleChange} placeholder="https://..." className="custom-input" />
                    </div>
                  </div>

                  <div>
                    <label className="custom-label">9. Media Sosial (Opsional)</label>
                    <input type="text" name="social_media" value={data.social_media} onChange={handleChange} placeholder="IG: @... / FB: ..." className="custom-input" />
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button type="button" onClick={nextStep} className="primary-btn w-full sm:w-auto flex items-center justify-center gap-4">
                       BERIKUTNYA
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </button>
                  </div>
                </section>
              )}

              {/* STEP 2: IDENTITAS PESERTA */}
              {currentStep === 1 && (
                <section className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700">
                  <div className="text-center mb-10">
                     <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase mb-2">Identitas Peserta</h2>
                     <p className="text-slate-400 text-sm font-medium">Data personel yang akan menghadiri Rakerda</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="custom-label">2. Nama Peserta Yang Hadir</label>
                      <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Nama Lengkap & Gelar" className="custom-input" required />
                    </div>
                    <div>
                      <label className="custom-label">3. Jabatan Peserta</label>
                      <input type="text" name="position" value={data.position} onChange={handleChange} placeholder="Direktur / Manager / Staff" className="custom-input" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="custom-label">7. No HP (WhatsApp Aktif)</label>
                      <input type="tel" name="phone" value={data.phone} onChange={handleChange} placeholder="Dibutuhkan untuk pengiriman E-Ticket" className="custom-input" required />
                    </div>
                    <div>
                      <label className="custom-label">Email (Opsional)</label>
                      <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="alamat@email.com" className="custom-input" />
                    </div>
                  </div>

                  <div className="pt-10 flex flex-col sm:flex-row gap-4">
                    <button type="button" onClick={prevStep} className="secondary-btn flex-1 flex items-center justify-center gap-4">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                       KEMBALI
                    </button>
                    <button type="button" onClick={nextStep} className="primary-btn flex-1 flex items-center justify-center gap-4">
                       BERIKUTNYA
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </button>
                  </div>
                </section>
              )}

              {/* STEP 3: KONFIRMASI */}
              {currentStep === 2 && (
                <section className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700">
                  <div className="text-center mb-10">
                     <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase mb-2">Konfirmasi Akhir</h2>
                     <p className="text-slate-400 text-sm font-medium">Pembagian komisi Rakerda 1</p>
                  </div>

                  <div className="bg-slate-50 p-8 rounded-[2.5rem] border-2 border-slate-100">
                    <label className="custom-label text-center mb-6">10. Pembagian Komisi Dalam Rakerda</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <button
                        type="button"
                        onClick={() => setData('commission_type', 'A')}
                        className={`p-6 rounded-[2rem] border-4 transition-all flex flex-col items-center gap-3 ${data.commission_type === 'A' ? 'border-[#0EA5E9] bg-white shadow-xl shadow-blue-500/10' : 'border-transparent bg-transparent opacity-40 hover:opacity-100'}`}
                      >
                        <span className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl ${data.commission_type === 'A' ? 'bg-[#0EA5E9] text-white' : 'bg-slate-200 text-slate-400'}`}>A</span>
                        <span className={`font-black text-lg ${data.commission_type === 'A' ? 'text-[#0EA5E9]' : 'text-slate-400'}`}>KOMISI A</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setData('commission_type', 'B')}
                        className={`p-6 rounded-[2rem] border-4 transition-all flex flex-col items-center gap-3 ${data.commission_type === 'B' ? 'border-[#0EA5E9] bg-white shadow-xl shadow-blue-500/10' : 'border-transparent bg-transparent opacity-40 hover:opacity-100'}`}
                      >
                        <span className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl ${data.commission_type === 'B' ? 'bg-[#0EA5E9] text-white' : 'bg-slate-200 text-slate-400'}`}>B</span>
                        <span className={`font-black text-lg ${data.commission_type === 'B' ? 'text-[#0EA5E9]' : 'text-slate-400'}`}>KOMISI B</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-10 flex flex-col sm:flex-row gap-4">
                    <button type="button" onClick={prevStep} className="secondary-btn flex-1 flex items-center justify-center gap-4">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                       KEMBALI
                    </button>
                    <button type="submit" disabled={processing} className="primary-btn flex-1 flex items-center justify-center gap-4">
                       {processing ? "MEMPROSES..." : (
                        <>
                          SUBMIT PENDAFTARAN
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                        </>
                      )}
                    </button>
                  </div>
                </section>
              )}
            </form>
          </div>
        </div>

        <footer className="py-20 bg-slate-950 text-center relative z-10 border-t border-white/5 space-y-12">
           <div className="flex flex-col sm:flex-row items-center justify-center gap-12 text-slate-400">
                <div className="text-center group">
                   <p className="text-[10px] uppercase font-black opacity-30 mb-3 tracking-widest">Admin ASITA</p>
                   <a href="https://wa.me/6282113971389" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-2xl hover:bg-[#0EA5E9]/10 transition-all border border-white/10">
                      <span className="text-lg font-black text-white">0821-1397-1389</span>
                   </a>
                </div>
                <div className="text-center group">
                   <p className="text-[10px] uppercase font-black opacity-30 mb-3 tracking-widest">Ibu Dewi</p>
                   <a href="https://wa.me/628164864620" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-2xl hover:bg-[#0EA5E9]/10 transition-all border border-white/10">
                      <span className="text-lg font-black text-white">0816-4864-620</span>
                   </a>
                </div>
           </div>

           <div className="space-y-4 px-6">
              <p className="text-white text-base font-black tracking-[0.2em] uppercase">HARRIS HOTEL, 09 APRIL 2026</p>
              <p className="text-white/20 text-[9px] font-bold tracking-[0.3em] uppercase">ASITA JABAR • ASSOCIATION OF INDONESIAN TOURS & TRAVEL AGENCIES</p>
              <div className="h-px w-20 bg-white/10 mx-auto"></div>
              <p className="text-slate-600 text-[8px] font-black tracking-[0.5em] uppercase">
                © {new Date().getFullYear()} ASITA JABAR • Powered by <span className="text-[#0EA5E9]">Cyberlabs</span>
              </p>
           </div>
        </footer>
      </div>
    </>
  );
}
