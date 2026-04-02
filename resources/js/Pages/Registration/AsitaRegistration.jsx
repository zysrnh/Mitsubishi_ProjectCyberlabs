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

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("asita.submit_form"));
  };

  return (
    <>
      <Head title="Pendaftaran - RAKERDA 1 ASITA JABAR" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

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
          border-radius: 32px;
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          position: relative;
        }

        .input-item {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .input-item.active {
          opacity: 1;
          transform: translateY(0);
        }

        .custom-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 14px;
          border: 2px solid #f1f5f9;
          background: #f8fafc;
          transition: all 0.3s ease;
          font-size: 0.95rem;
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
          font-weight: 700;
          font-size: 0.75rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .primary-btn {
          width: 100%;
          padding: 18px;
          border-radius: 16px;
          background: #0EA5E9;
          color: white;
          font-weight: 800;
          font-size: 1.1rem;
          border: none;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 25px -5px rgba(14, 165, 233, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-transform: uppercase;
        }

        .primary-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          filter: brightness(1.1);
          box-shadow: 0 15px 30px -5px rgba(14, 165, 233, 0.5);
        }

        .header-box {
          padding: 60px 0 40px;
          text-align: center;
        }

        .main-title {
          font-size: 3rem;
          font-weight: 900;
          color: white;
          margin-bottom: 8px;
          line-height: 1.1;
        }

        .sub-title {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.7);
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>

      <div className="min-h-screen flex flex-col bg-slate-950">
        <div className="bg-overlay"></div>
        <div className="bg-gradient-main"></div>

        <div className="form-container flex-1 px-4 py-8">
          <header className="header-box">
             <div className={`transition-all duration-1000 ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <div className="bg-white p-4 rounded-2xl shadow-xl inline-block mb-6">
                   <img src="/images/Asitajpeg-removebg-preview.png" alt="Logo" className="h-16" />
                </div>
                <h1 className="main-title">
                   RAKERDA 1 <span className="text-[#0EA5E9]">ASITA JABAR</span>
                </h1>
                <p className="sub-title font-light italic">
                   "TRANSFORMASI DIGITAL ASITA JAWA BARAT MELALUI INOVASI DAN INTEGRASI TEKNOLOGI"
                </p>
             </div>
          </header>

          <div className={`max-w-3xl mx-auto form-card p-8 sm:p-12 transition-all duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* SECTION: IDENTITAS PERUSAHAAN */}
              <section className="space-y-6">
                <div className="flex items-center gap-4">
                   <div className="h-px flex-1 bg-slate-100"></div>
                   <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400">Identitas Perusahaan</h2>
                   <div className="h-px flex-1 bg-slate-100"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className={`input-item ${isMounted ? 'active' : ''}`} style={{ transitionDelay: '0.1s' }}>
                    <label className="custom-label">1. Nama Perusahaan (PT/CV)</label>
                    <input type="text" name="company_name" value={data.company_name} onChange={handleChange} placeholder="Contoh: PT. Wisata Utama" className="custom-input" required />
                    {errors.company_name && <p className="text-red-500 text-xs mt-1 font-bold">{errors.company_name}</p>}
                  </div>
                  <div className={`input-item ${isMounted ? 'active' : ''}`} style={{ transitionDelay: '0.2s' }}>
                    <label className="custom-label">4. No Register Asita (NIA)</label>
                    <input type="text" name="nia" value={data.nia} onChange={handleChange} placeholder="Masukkan Nomor NIA" className="custom-input" required />
                    {errors.nia && <p className="text-red-500 text-xs mt-1 font-bold">{errors.nia}</p>}
                  </div>
                </div>

                <div className={`input-item ${isMounted ? 'active' : ''}`} style={{ transitionDelay: '0.3s' }}>
                  <label className="custom-label">5. Alamat Perusahaan</label>
                  <textarea name="company_address" value={data.company_address} onChange={handleChange} placeholder="Alamat lengkap kantor pusat/cabang" className="custom-input min-h-[80px]" required />
                  {errors.company_address && <p className="text-red-500 text-xs mt-1 font-bold">{errors.company_address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className={`input-item ${isMounted ? 'active' : ''}`} style={{ transitionDelay: '0.4s' }}>
                    <label className="custom-label">6. No Telpon Perusahaan / HP Kantor</label>
                    <input type="tel" name="company_phone" value={data.company_phone} onChange={handleChange} placeholder="022 / 021 - XXXXX" className="custom-input" required />
                    {errors.company_phone && <p className="text-red-500 text-xs mt-1 font-bold">{errors.company_phone}</p>}
                  </div>
                  <div className={`input-item ${isMounted ? 'active' : ''}`} style={{ transitionDelay: '0.5s' }}>
                    <label className="custom-label">8. Website Perusahaan</label>
                    <input type="url" name="website" value={data.website} onChange={handleChange} placeholder="https://www.company.com" className="custom-input" />
                    {errors.website && <p className="text-red-500 text-xs mt-1 font-bold">{errors.website}</p>}
                  </div>
                </div>

                <div className={`input-item ${isMounted ? 'active' : ''}`} style={{ transitionDelay: '0.6s' }}>
                  <label className="custom-label">9. Media Sosial Perusahaan</label>
                  <input type="text" name="social_media" value={data.social_media} onChange={handleChange} placeholder="Instagram: @company / Facebook: CompanyName" className="custom-input" />
                  {errors.social_media && <p className="text-red-500 text-xs mt-1 font-bold">{errors.social_media}</p>}
                </div>
              </section>

              {/* SECTION: IDENTITAS PESERTA */}
              <section className="space-y-6">
                <div className="flex items-center gap-4">
                   <div className="h-px flex-1 bg-slate-100"></div>
                   <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400">Identitas Peserta</h2>
                   <div className="h-px flex-1 bg-slate-100"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className={`input-item ${isMounted ? 'active' : ''}`} style={{ transitionDelay: '0.7s' }}>
                    <label className="custom-label">2. Nama Peserta Yang Hadir</label>
                    <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Nama Lengkap & Gelar" className="custom-input" required />
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-bold">{errors.name}</p>}
                  </div>
                  <div className={`input-item ${isMounted ? 'active' : ''}`} style={{ transitionDelay: '0.8s' }}>
                    <label className="custom-label">3. Jabatan Peserta</label>
                    <input type="text" name="position" value={data.position} onChange={handleChange} placeholder="Direktur / Owner / Manager" className="custom-input" required />
                    {errors.position && <p className="text-red-500 text-xs mt-1 font-bold">{errors.position}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className={`input-item ${isMounted ? 'active' : ''}`} style={{ transitionDelay: '0.9s' }}>
                    <label className="custom-label">7. No HP (WA Aktif) Peserta</label>
                    <input type="tel" name="phone" value={data.phone} onChange={handleChange} placeholder="Dibutuhkan untuk pengiriman E-Ticket" className="custom-input" required />
                    {errors.phone && <p className="text-red-500 text-xs mt-1 font-bold">{errors.phone}</p>}
                  </div>
                  <div className={`input-item ${isMounted ? 'active' : ''}`} style={{ transitionDelay: '1.0s' }}>
                    <label className="custom-label">Email (Opsional)</label>
                    <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="alamat@email.com" className="custom-input" />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-bold">{errors.email}</p>}
                  </div>
                </div>
              </section>

              {/* SECTION: LAIN-LAIN */}
              <section className="space-y-6">
                <div className="flex items-center gap-4">
                   <div className="h-px flex-1 bg-slate-100"></div>
                   <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400">Konfirmasi Rakerda</h2>
                   <div className="h-px flex-1 bg-slate-100"></div>
                </div>

                <div className={`input-item ${isMounted ? 'active' : ''}`} style={{ transitionDelay: '1.1s' }}>
                  <label className="custom-label">10. Pembagian Komisi Dalam Rakerda</label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <button
                      type="button"
                      onClick={() => setData('commission_type', 'A')}
                      className={`p-4 rounded-xl border-2 transition-all font-bold text-sm ${data.commission_type === 'A' ? 'border-[#0EA5E9] bg-blue-50 text-[#0EA5E9]' : 'border-slate-100 text-slate-400 opacity-60'}`}
                    >
                      KOMISI A
                    </button>
                    <button
                      type="button"
                      onClick={() => setData('commission_type', 'B')}
                      className={`p-4 rounded-xl border-2 transition-all font-bold text-sm ${data.commission_type === 'B' ? 'border-[#0EA5E9] bg-blue-50 text-[#0EA5E9]' : 'border-slate-100 text-slate-400 opacity-60'}`}
                    >
                      KOMISI B
                    </button>
                  </div>
                  {errors.commission_type && <p className="text-red-500 text-xs mt-1 font-bold">{errors.commission_type}</p>}
                </div>
              </section>

              <div className={`pt-8 input-item ${isMounted ? 'active' : ''}`} style={{ transitionDelay: '1.2s' }}>
                <button type="submit" disabled={processing} className="primary-btn">
                  {processing ? "Mendaftarkan..." : (
                    <>
                      <span>SUBMIT PENDAFTARAN</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <footer className="py-12 bg-slate-950 text-center relative z-10 border-t border-white/5 space-y-6">
           <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-slate-400">
                <div className="text-center group">
                   <p className="text-[10px] uppercase tracking-tighter opacity-50 mb-1">Admin ASITA</p>
                   <a href="https://wa.me/6282113971389" className="text-base font-bold text-[#0EA5E9] hover:underline">0821-1397-1389</a>
                </div>
                <div className="text-center group">
                   <p className="text-[10px] uppercase tracking-tighter opacity-50 mb-1">Ibu Dewi</p>
                   <a href="https://wa.me/628164864620" className="text-base font-bold text-[#0EA5E9] hover:underline">0816-4864-620</a>
                </div>
           </div>
           <p className="text-slate-600 text-[10px] font-bold tracking-[0.3em] uppercase">
            © {new Date().getFullYear()} ASITA Meeting • Member of Chamber of Commerce
          </p>
        </footer>
      </div>
    </>
  );
}
