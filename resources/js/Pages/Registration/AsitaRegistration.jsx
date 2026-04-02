import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AsitaRegistration() {
  const { data, setData, post, processing, errors } = useForm({
    company_name: "",
    nia: "",
    name: "",
    position: "",
    phone: "",
    email: "",
  });

  const [isFocused, setIsFocused] = useState("");

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
          background-color: #f8fafc;
          margin: 0;
          overflow-x: hidden;
        }

        .primary-color {
          color: #2A348D;
        }
        
        .bg-primary {
          background-color: #2A348D;
        }

        .bg-glass {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(42, 52, 141, 0.1);
        }

        .input-group {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .custom-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          background: white;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 1rem;
          color: #1e293b;
          box-sizing: border-box;
        }

        .custom-input:focus {
          outline: none;
          border-color: #2A348D;
          box-shadow: 0 0 0 4px rgba(42, 52, 141, 0.1);
        }

        .custom-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: 0.9rem;
          color: #2A348D;
          transition: all 0.3s ease;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          background: #2A348D;
          color: white;
          font-weight: 600;
          font-size: 1.1rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(42, 52, 141, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .submit-btn:hover:not(:disabled) {
          background: #1e2770;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(42, 52, 141, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .header-gradient {
          background: linear-gradient(135deg, #2A348D 0%, #1e2770 100%);
          border-radius: 0 0 50% 50% / 0 0 20% 20%;
          padding-bottom: 100px;
          margin-bottom: -60px;
        }

        .logo-container {
          background: white;
          padding: 15px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          display: inline-block;
          margin-top: 40px;
        }

        .error-text {
          color: #ef4444;
          font-size: 0.75rem;
          margin-top: 4px;
        }
      `}</style>

      <div className="min-h-screen flex flex-col">
        {/* Decorative Header */}
        <div className="header-gradient text-center px-4">
          <div className="logo-container animate-fade-in-down">
            <img
              src="/images/Asitajpeg-removebg-preview.png"
              alt="ASITA Logo"
              className="h-16 sm:h-20 object-contain"
            />
          </div>
          <h1 className="text-white text-2xl sm:text-3xl font-bold mt-6 tracking-tight animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
            REGISTRATION MEETING
          </h1>
          <p className="text-blue-100 mt-2 opacity-80 animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
            Silakan lengkapi formulir pendaftaran di bawah ini
          </p>
        </div>

        {/* Form Section */}
        <div className="flex-1 px-4 pb-12">
          <div className="max-w-xl mx-auto bg-glass p-6 sm:p-10 rounded-[2rem] shadow-2xl animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Company Name */}
              <div className="input-group">
                <label className="custom-label">Nama Perusahaan</label>
                <input
                  type="text"
                  name="company_name"
                  value={data.company_name}
                  onChange={handleChange}
                  placeholder="Contoh: PT. Wisata Jaya"
                  className="custom-input"
                  required
                />
                {errors.company_name && <p className="error-text">{errors.company_name}</p>}
              </div>

              {/* NIA */}
              <div className="input-group">
                <label className="custom-label">NIA (Nomor Induk Anggota)</label>
                <input
                  type="text"
                  name="nia"
                  value={data.nia}
                  onChange={handleChange}
                  placeholder="Masukkan Nomor Induk Anggota"
                  className="custom-input"
                  required
                />
                {errors.nia && <p className="error-text">{errors.nia}</p>}
              </div>

              {/* Personal Name */}
              <div className="input-group">
                <label className="custom-label">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Masukkan Nama Lengkap Anda"
                  className="custom-input"
                  required
                />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>

              {/* Position */}
              <div className="input-group">
                <label className="custom-label">Jabatan</label>
                <input
                  type="text"
                  name="position"
                  value={data.position}
                  onChange={handleChange}
                  placeholder="Contoh: Direktur / Manager"
                  className="custom-input"
                  required
                />
                {errors.position && <p className="error-text">{errors.position}</p>}
              </div>

              {/* WhatsApp */}
              <div className="input-group">
                <label className="custom-label">No. WhatsApp</label>
                <input
                  type="tel"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                  placeholder="Contoh: 08123456789"
                  className="custom-input"
                  required
                />
                {errors.phone && <p className="error-text">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className="input-group">
                <label className="custom-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Contoh: nama@perusahaan.com"
                  className="custom-input"
                  required
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
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
                      <span>MEMPROSES...</span>
                    </>
                  ) : (
                    "DAFTAR SEKARANG"
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="py-6 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} ASITA Meeting. All rights reserved.
        </div>
      </div>
    </>
  );
}
