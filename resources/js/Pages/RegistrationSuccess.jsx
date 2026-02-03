import { Head, usePage } from "@inertiajs/react";
import { useToast } from "@/hooks";
import { Footer } from "@/components/layouts";

const QrCode = ({ qrPath }) => {
  return (
    <>
      <form className="w-3/4 max-w-md space-y-4 mb-6">
        <img src={qrPath} alt="QR Code" className="w-full" />
      </form>

      <p className="cinzel text-lg md:text-xl mb-6 text-center" style={{ color: '#28377a' }}>
        Simpan QR Code ini!
      </p>
    </>
  );
};

const SuccessMessage = ({ registrationType }) => {
  // Cek apakah VIP atau Karang Taruna
  const showIdCardInfo = registrationType === 'vip' || registrationType === 'karang_taruna';
  // Cek apakah perlu verifikasi admin (umum dan karang_taruna)
  const needsAdminVerification = registrationType === 'umum' || registrationType === 'karang_taruna';

  return (
    <>
      <div className="w-3/4 max-w-md space-y-6 text-center">
        <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: 'rgba(40, 55, 122, 0.05)', borderWidth: '1px', borderColor: 'rgba(40, 55, 122, 0.2)' }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 mx-auto mb-4" 
            style={{ color: '#28377a' }}
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
          
          <p className="cinzel text-xl md:text-2xl font-bold mb-3" style={{ color: '#28377a' }}>
            Registrasi Sukses!
          </p>

          <p className="cinzel text-base md:text-lg" style={{ color: '#28377a', opacity: 0.8 }}>
            {needsAdminVerification 
              ? 'QR Code akan dikirimkan melalui WhatsApp setelah verifikasi admin.'
              : 'QR Code akan dikirimkan melalui WhatsApp Anda.'}
          </p>
        </div>

        {/* Alert Box untuk Umum & Karang Taruna yang perlu verifikasi */}
        {needsAdminVerification && (
          <div className="rounded-lg p-5 mb-4 text-left" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6' }}>
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 flex-shrink-0 mt-0.5"
                style={{ color: '#2563eb' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: '#1e40af' }}>
                  ⏳ Menunggu Verifikasi Admin
                </p>
                <p className="text-sm" style={{ color: '#1e3a8a' }}>
                  Registrasi Anda akan diverifikasi oleh admin. QR Code akan dikirim ke WhatsApp Anda setelah registrasi disetujui.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Box untuk VIP & Karang Taruna */}
        {showIdCardInfo && (
          <div className="rounded-lg p-5 mb-4 text-left" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', borderLeft: '4px solid #f59e0b' }}>
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 flex-shrink-0 mt-0.5"
                style={{ color: '#d97706' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: '#92400e' }}>
                  📋 Informasi Pengambilan ID Card:
                </p>
                <p className="text-sm" style={{ color: '#78350f' }}>
                  Pengambilan ID Card dapat dilakukan <strong>H-1 sebelum acara</strong> di lokasi acara.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-left rounded-lg p-4 space-y-2" style={{ backgroundColor: 'rgba(40, 55, 122, 0.03)' }}>
          <p className="text-sm flex items-start" style={{ color: '#28377a', opacity: 0.7 }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" style={{ color: '#28377a' }} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>{needsAdminVerification ? 'QR Code akan dikirim setelah verifikasi selesai' : 'Simpan QR Code dengan baik untuk check-in di acara'}</span>
          </p>
          <p className="text-sm flex items-start" style={{ color: '#28377a', opacity: 0.7 }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" style={{ color: '#28377a' }} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Pastikan nomor WhatsApp Anda aktif</span>
          </p>
          {showIdCardInfo && (
            <p className="text-sm flex items-start" style={{ color: '#28377a', opacity: 0.7 }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" style={{ color: '#28377a' }} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>Jangan lupa ambil ID Card H-1 di lokasi acara</span>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default function RegistrationSuccess({ is_approved, images, qr_full_path, registration }) {
  const { flash } = usePage().props;
  console.log(qr_full_path);

  useToast(flash?.info);

  // Ambil tipe registrasi dari data registration
  const registrationType = registration?.extras?.type || 'umum';

  return (
    <>
      <Head title="Registration - Success" />
      <div className="bg-white min-h-screen flex flex-col justify-between">
        {/* Main Content */}
        <main className="flex-1 flex flex-col justify-center items-center px-4 py-12">
          {/* Logo RakerB */}
          <div className="mb-12 animate-fade-in-down">
            <img 
              src="/images/KarangTaruna.png" 
              className="w-80 md:w-96 h-auto transition-all duration-300 hover:scale-105" 
              alt="Logo Karang Taruna" 
            />
          </div>

          {/* Content Section */}
          <div className="max-w-2xl w-full space-y-8 animate-fade-in-up">
            <div className="text-center space-y-4 animate-fade-in">
              <h1 className="lexend text-4xl md:text-5xl lg:text-6xl font-bold text-shadow-lg" style={{ color: '#28377a' }}>
                Registrasi Berhasil!
              </h1>
              <p className="cinzel text-base md:text-lg text-shadow-lg" style={{ color: '#28377a', opacity: 0.8 }}>
                Terima kasih telah melakukan konfirmasi kehadiran
              </p>
            </div>

            {/* Success Message */}
            <div className="mt-16 px-4 md:px-8 animate-fade-in-up-delayed flex justify-center">
              <SuccessMessage registrationType={registrationType} />
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