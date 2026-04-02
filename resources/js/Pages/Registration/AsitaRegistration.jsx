import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function AsitaRegistration() {
  const { data, setData, post, processing, errors } = useForm({
    company_name: "",
    nia: "",
    name: "",
    position: "",
    phone: "",
    email: "",
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("asita.submit_form"), {
      onSuccess: () => {
        console.log("Form submitted successfully");
      },
      onError: (errors) => {
        console.error("Validation errors:", errors);
      },
    });
  };

  return (
    <>
      <Head title="Registration - ASITA Meeting" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        * {
          font-family: 'Outfit', sans-serif;
        }

        body {
          background-color: #f1f5f9;
          background-image: 
            radial-gradient(at 0% 0%, hsla(233, 54%, 36%, 0.05) 0px, transparent 50%),
            radial-gradient(at 100% 0%, hsla(233, 54%, 36%, 0.05) 0px, transparent 50%);
          margin: 0;
          overflow-x: hidden;
          min-height: 100vh;
        }

        .primary-color {
          color: #2A348D;
        }
        
        .bg-primary {
          background-color: #2A348D;
        }

        .form-card {
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid rgba(42, 52, 141, 0.1);
          box-shadow: 
            0 10px 15px -3px rgba(0, 0, 0, 0.05),
            0 25px 50px -12px rgba(42, 52, 141, 0.1);
          position: relative;
          overflow: hidden;
        }

        .form-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #2A348D, #4a59c4);
        }

        .input-group {
          position: relative;
          margin-bottom: 1.25rem;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.5s ease-out;
        }

        .input-group.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .custom-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 12px;
          border: 2px solid #eef2f6;
          background: #f8fafc;
          transition: all 0.2s ease;
          font-size: 0.95rem;
          color: #1e293b;
          box-sizing: border-box;
          font-weight: 400;
        }

        .custom-input:focus {
          outline: none;
          border-color: #2A348D;
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(42, 52, 141, 0.08);
        }

        .custom-input::placeholder {
          color: #94a3b8;
          font-weight: 300;
        }

        .custom-label {
          display: block;
          margin-bottom: 0.6rem;
          font-weight: 600;
          font-size: 0.85rem;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          background: #2A348D;
          color: white;
          font-weight: 700;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 20px -5px rgba(42, 52, 141, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .submit-btn:hover:not(:disabled) {
          background: #1e2770;
          transform: translateY(-2px);
          box-shadow: 0 15px 25px -5px rgba(42, 52, 141, 0.5);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          background: #94a3b8;
          box-shadow: none;
          cursor: not-allowed;
        }

        @keyframes reveal {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .animate-reveal {
          animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .header-section {
          padding-top: 60px;
          padding-bottom: 80px;
          background: linear-gradient(135deg, #2A348D 0%, #1e2770 100%);
          clip-path: ellipse(150% 100% at 50% 0%);
        }

        .logo-box {
          background: white;
          padding: 16px;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          display: inline-block;
          margin-bottom: 24px;
        }

        .error-text {
          color: #dc2626;
          font-size: 0.8rem;
          margin-top: 6px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
        }
      `}</style>

      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="header-section text-center px-4">
          <div className={`logo-box ${isVisible ? 'animate-reveal' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <img
              src="/images/Asitajpeg-removebg-preview.png"
              alt="ASITA Logo"
              className="h-16 sm:h-20 object-contain"
            />
          </div>
          <h1 className={`text-white text-3xl sm:text-4xl font-extrabold mt-4 tracking-tight ${isVisible ? 'animate-reveal' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            REGISTRATION MEETING
          </h1>
          <p className={`text-blue-100 mt-3 text-lg font-light max-w-md mx-auto ${isVisible ? 'animate-reveal' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            Silakan lengkapi formulir pendaftaran untuk menghadiri acara pening
          </p>
        </div>

        {/* Form Container */}
        <div className="flex-1 px-4 pb-20 -mt-16">
          <div className={`max-w-xl mx-auto form-card p-8 sm:p-12 ${isVisible ? 'animate-reveal' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <form onSubmit={handleSubmit} className="space-y-2">
              
              {/* Company Name */}
              <div className={`input-group ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.5s' }}>
                <label className="custom-label">Nama Perusahaan / Instansi</label>
                <input
                  type="text"
                  name="company_name"
                  value={data.company_name}
                  onChange={handleChange}
                  placeholder="PT. Wisata Internasional"
                  className="custom-input"
                  required
                  autoFocus
                />
                {errors.company_name && (
                  <p className="error-text">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    {errors.company_name}
                  </p>
                )}
              </div>

              {/* NIA */}
              <div className={`input-group ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.6s' }}>
                <label className="custom-label">Nomor Induk Anggota (NIA)</label>
                <input
                  type="text"
                  name="nia"
                  value={data.nia}
                  onChange={handleChange}
                  placeholder="Masukkan NIA Anda"
                  className="custom-input"
                  required
                />
                {errors.nia && <p className="error-text">{errors.nia}</p>}
              </div>

              {/* Personal Name */}
              <div className={`input-group ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.7s' }}>
                <label className="custom-label">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="John Doe, M.Tr.Par"
                  className="custom-input"
                  required
                />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>

              {/* Position */}
              <div className={`input-group ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.8s' }}>
                <label className="custom-label">Jabatan Struktural</label>
                <input
                  type="text"
                  name="position"
                  value={data.position}
                  onChange={handleChange}
                  placeholder="Contoh: Direktur Utama"
                  className="custom-input"
                  required
                />
                {errors.position && <p className="error-text">{errors.position}</p>}
              </div>

              {/* WhatsApp */}
              <div className={`input-group ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.9s' }}>
                <label className="custom-label">Nomor WhatsApp Aktif</label>
                <input
                  type="tel"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                  placeholder="0812XXXXXXXX"
                  className="custom-input"
                  required
                />
                <p className="text-[0.7rem] text-slate-400 mt-1">E-Ticket akan dikirimkan melalui nomor ini</p>
                {errors.phone && <p className="error-text">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className={`input-group ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '1.0s' }}>
                <label className="custom-label">Alamat Email</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="custom-input"
                  required
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              {/* Submit Button */}
              <div className={`pt-6 ${isVisible ? 'animate-reveal' : 'opacity-0'}`} style={{ animationDelay: '1.1s' }}>
                <button
                  type="submit"
                  disabled={processing}
                  className="submit-btn"
                >
                  {processing ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>SEDANG MEMPROSES...</span>
                    </>
                  ) : (
                    <>
                      <span>KONFIRMASI PENDAFTARAN</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="py-8 text-center bg-white/50 backdrop-blur-sm">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} ASITA Meeting. Developed by Cyberlabs.
          </p>
        </div>
      </div>
    </>
  );
}
