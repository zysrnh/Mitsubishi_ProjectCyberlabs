import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Header, Footer } from "@/components/layouts";
import { Button } from "@/components/forms";

export default function VipConfirmationWelcome({ images, title, redirectTo }) {
  const [isLoading, setLoading] = useState(false);

  const handleRedirect = () => {
    setLoading(true);
    window.location.href = redirectTo;
  };

  return (
    <>
      <Head title="Konfirmasi Kehadiran - Welcome" />
      <div className="bg-white min-h-screen flex flex-col justify-between">
        <main className="flex-1 flex flex-col justify-center items-center px-4 py-12">
          {/* Logo */}
          <div className="mb-8 animate-fade-in-down">
            <img
              src="/images/KarangTaruna.png"
              className="w-80 md:w-96 h-auto transition-all duration-300 hover:scale-105"
              alt="Logo Karang Taruna"
            />
          </div>

          {/* Content Section */}
          <div className="max-w-3xl w-full space-y-6 animate-fade-in-up">
            <div className="text-center space-y-6 animate-fade-in">
              <h1 className="lexend text-3xl md:text-4xl lg:text-5xl font-bold text-shadow-lg" style={{ color: '#28377a' }}>
                Selamat Datang
              </h1>
              <div className="space-y-2">
                <p className="lexend text-xl md:text-2xl lg:text-3xl font-semibold text-shadow-lg" style={{ color: '#28377a' }}>
                  di Acara
                </p>
                <p className="lexend text-2xl md:text-3xl lg:text-4xl font-bold text-shadow-lg" style={{ color: '#28377a' }}>
                  Pengukuhan Pengurus Nasional Karang Taruna (PNKT)
                </p>
              </div>
              
              {/* Event Details */}
              <div className="mt-8 space-y-3 pt-4 border-t-2 border-gray-200">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#28377a' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="lexend text-lg md:text-xl lg:text-2xl font-semibold" style={{ color: '#28377a' }}>
                    Sutera Hall - Mall @ Alam Sutera, Tangerang Selatan
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#28377a' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <p className="lexend text-lg md:text-xl lg:text-2xl font-semibold" style={{ color: '#28377a' }}>
                    Pukul 10:00 - 13:00 WIB
                  </p>
                </div>
              </div>

              {/* VIP Badge */}
              <div className="mt-6 inline-block px-6 py-3 rounded-full" style={{ backgroundColor: 'rgba(40, 55, 122, 0.1)', border: '2px solid #28377a' }}>
                <p className="lexend text-lg md:text-xl font-bold" style={{ color: '#28377a' }}>
                  🌟 KONFIRMASI KEHADIRAN VIP & VVIP 🌟
                </p>
              </div>
            </div>

            {/* Confirmation Button */}
            <div className="mt-12 px-4 md:px-8 animate-fade-in-up-delayed">
              <button
                onClick={handleRedirect}
                disabled={isLoading}
                className="rubik w-full py-5 px-8 text-white text-xl font-semibold rounded-xl shadow-2xl transition-all duration-300 hover:opacity-90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ backgroundColor: '#28377a' }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  'Konfirmasi Kehadiran'
                )}
              </button>

              <footer className="text-center py-6 px-4 animate-footer">
                <p className="text-xs md:text-sm text-black font-semibold">
                  © Copyright Karang Taruna All Right Reserved. Design & Development By alcomedia.id
                </p>
              </footer>
            </div>
          </div>

        </main>

        <Footer />
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out 0.3s both;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out 0.4s both;
        }

        .animate-fade-in-up-delayed {
          animation: fadeInUp 0.8s ease-out 0.6s both;
        }

        .text-shadow-lg {
          text-shadow: 0 2px 4px rgba(40, 55, 122, 0.2);
        }
      `}</style>
    </>
  );
}