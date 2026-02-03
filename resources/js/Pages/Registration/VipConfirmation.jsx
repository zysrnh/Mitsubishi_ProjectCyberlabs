import { Head, useForm, usePage } from "@inertiajs/react";
import z from "zod";
import { useToast } from "@/hooks";

export default function VipConfirmation({ images }) {
  const { flash } = usePage().props;
  const { data, setData, post, processing, errors, reset, setError } = useForm({
    name: "",
    phone: "",
    email: "",
    institution: "",
  });
  useToast(flash?.info);

  const schema = z.object({
    name: z.string().min(1, { message: "Nama wajib diisi." }),
    phone: z.string().regex(/^(\+?62|0)\d{8,}$/, {
      message:
        "Nomor telepon tidak valid harus diawali '+62' atau '0' dan min. 10 digit.",
    }),
    email: z.string().email({ message: "Email tidak valid." }).optional().or(z.literal("")),
    institution: z.string().min(1, { message: "Instansi wajib diisi." }),
  });

  const handleChange = ({ target: { name, value } }) => {
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = schema.safeParse(data);

    if (!result.success) {
      const newErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        newErrors[field] = issue.message;
      });
      setError(newErrors);
      return;
    }

    setError({});
    post(route("vip.submit_confirmation"), {
      onSuccess: (page) => {
        reset();
        setData({
          name: "",
          phone: "",
          email: "",
          institution: "",
        });
      },
    });
  };

  return (
    <>
      <Head title="Konfirmasi Kehadiran - VIP/VVIP" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');
        
        .montserrat-bold {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
        }
        
        input::placeholder {
          font-size: 0.875rem;
          color: #9ca3af;
        }
        
        /* Konsistensi ukuran font untuk semua input */
        input[type="text"],
        input[type="tel"],
        input[type="email"] {
          font-size: 0.875rem;
        }
        
        /* Enhanced stroke/border for input fields */
        input[type="text"],
        input[type="tel"],
        input[type="email"] {
          border: 2px solid #28377a !important;
          box-shadow: 0 2px 4px rgba(40, 55, 122, 0.1);
          transition: all 0.2s ease;
        }
        
        input[type="text"]:focus,
        input[type="tel"]:focus,
        input[type="email"]:focus {
          border: 2px solid #1e2a5a !important;
          box-shadow: 0 0 0 3px rgba(40, 55, 122, 0.15);
          transform: translateY(-1px);
        }
        
        input[type="text"]:hover,
        input[type="tel"]:hover,
        input[type="email"]:hover {
          border-color: #1e2a5a !important;
          box-shadow: 0 4px 6px rgba(40, 55, 122, 0.15);
        }

        /* Input with icon styles */
        .input-with-icon {
          position: relative;
        }
        
        .input-with-icon input {
          padding-left: 1rem;
          padding-right: 2.75rem;
        }
        
        .input-icon {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #28377a;
          width: 1.25rem;
          height: 1.25rem;
          pointer-events: none;
          z-index: 10;
        }

        /* Info box styling */
        .info-box {
          background-color: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }

        /* Animasi Masuk */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-logo {
          animation: scaleIn 0.6s ease-out;
        }

        .animate-title {
          animation: fadeInDown 0.8s ease-out 0.2s both;
        }

        .animate-form {
          animation: fadeInUp 1s ease-out 0.4s both;
        }

        .animate-footer {
          animation: fadeInUp 0.8s ease-out 0.6s both;
        }

        /* Animasi untuk form fields */
        .form-field {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .form-field:nth-child(1) { animation-delay: 0.5s; }
        .form-field:nth-child(2) { animation-delay: 0.6s; }
        .form-field:nth-child(3) { animation-delay: 0.7s; }
        .form-field:nth-child(4) { animation-delay: 0.8s; }
        .form-field:nth-child(5) { animation-delay: 0.9s; }
      `}</style>
      <div
        className="min-h-screen flex flex-col justify-between"
        style={{ backgroundColor: "#f1f5f8" }}
      >
        {/* Form Section */}
        <main className="flex flex-col items-center px-4 py-10 md:py-16">
          {/* Logo */}
          <div className="mb-8 animate-logo">
            <img
              src="/images/KarangTaruna.png"
              alt="Logo"
              className="h-24 md:h-28 mx-auto"
            />
          </div>

          <h1
            className="montserrat-bold text-xl md:text-2xl lg:text-3xl text-center mb-8 animate-title px-4"
            style={{ color: "#28377a" }}
          >
            KONFIRMASI KEHADIRAN<br />VIP & VVIP
          </h1>

          {/* Form Container */}
          <div className="w-full max-w-4xl px-4 animate-form">
            {/* Info Box */}
            <div className="info-box form-field mb-6">
              <div className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <p className="text-sm text-amber-800 font-medium">
                  <strong>Penting:</strong> Pastikan nomor telepon yang Anda masukkan adalah <strong>nomor WhatsApp aktif</strong>, karena konfirmasi akan dikirim melalui WhatsApp.
                </p>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 form-field">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <div className="input-with-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="input-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nama Lengkap"
                      value={data.name}
                      onChange={handleChange}
                      className="border-2 rounded-lg py-2.5 w-full focus:outline-none"
                      required
                    />
                  </div>
                  {errors?.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Nomor WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="input-with-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="input-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Contoh: 08123456789"
                      value={data.phone}
                      onChange={handleChange}
                      className="border-2 rounded-lg py-2.5 w-full focus:outline-none"
                      required
                    />
                  </div>
                  {errors?.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 form-field">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Email
                  </label>
                  <div className="input-with-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="input-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <input
                      type="email"
                      name="email"
                      placeholder="email@example.com"
                      value={data.email}
                      onChange={handleChange}
                      className="border-2 rounded-lg py-2.5 w-full focus:outline-none"
                    />
                  </div>
                  {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Instansi <span className="text-red-500">*</span>
                  </label>
                  <div className="input-with-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="input-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                    </svg>
                    <input
                      type="text"
                      name="institution"
                      placeholder="Nama Instansi/Lembaga"
                      value={data.institution}
                      onChange={handleChange}
                      className="border-2 rounded-lg py-2.5 w-full focus:outline-none"
                      required
                    />
                  </div>
                  {errors?.institution && <p className="text-red-500 text-xs mt-1">{errors.institution}</p>}
                </div>
              </div>

              <div className="pt-4 form-field">
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-3 px-4 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#28377a" }}
                >
                  {processing ? "Mengirim..." : "Konfirmasi Kehadiran"}
                </button>
              </div>
            </form>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-6 px-4 animate-footer">
          <p className="text-xs md:text-sm text-black font-semibold">
            © Copyright Karang Taruna All Right Reserved. Design & Development By alcomedia.id
          </p>
        </footer>
      </div>
    </>
  );
}