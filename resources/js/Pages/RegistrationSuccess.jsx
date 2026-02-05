import { Head, usePage } from "@inertiajs/react";
import { useToast } from "@/hooks";
import { Footer } from "@/components/layouts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";


const SuccessMessage = ({ registrationType, registration }) => {
  const showIdCardInfo =
    registrationType === "vip" || registrationType === "karang_taruna";

  const needsAdminVerification =
    registrationType === "umum" || registrationType === "karang_taruna";

  return (
    <div className="w-full max-w-xl space-y-6 text-center">
      <div
        className="rounded-2xl p-8 mb-6"
        style={{
          backgroundColor: "rgba(200, 16, 46, 0.05)",
          border: "1px solid rgba(200, 16, 46, 0.2)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto mb-4 primary-text"
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

        <p className="text-xl md:text-2xl font-bold mb-3 primary-text">
          Registrasi Sukses!
        </p>

        <p className="text-gray-600">
          QR Code akan dikirimkan melalui WhatsApp Anda.
        </p>
      </div>

      {/* Show QR result if available */}
      {registration?.qr_url && (
        <div className="rounded-xl p-6 bg-white shadow-md" style={{ border: "2px solid rgba(200, 16, 46, 0.2)" }}>
          <p className="text-sm font-semibold mb-4 primary-text">QR Code Anda</p>
          <div className="bg-white p-4 rounded-lg inline-block">
            <img src={registration.qr_url} alt="QR Code" className="w-48 h-48 mx-auto" onError={e => {e.target.onerror=null;e.target.src='/images/no-qr.png';}} />
          </div>
          <p className="text-xs text-gray-500 mt-3 mb-3">
            Kode Unik: <span className="font-bold primary-text">{registration?.unique_code}</span>
          </p>
          <a
            href={registration.qr_url}
            download={`QR-${registration?.unique_code}.png`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "#C8102E" }}
          >
            Download QR Code
          </a>
        </div>
      )}

      {needsAdminVerification && (
        <div
          className="rounded-xl p-5 text-left"
          style={{
            backgroundColor: "#f1f5f9",
            borderLeft: "4px solid #C8102E",
          }}
        >
          <p className="text-sm font-semibold mb-2 primary-text flex items-center">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            QR Code telah dikirim!
          </p>

          <p className="text-sm text-gray-600">
            QR Code telah dikirimkan ke WhatsApp Anda. Pastikan nomor WhatsApp yang
            Anda daftarkan sudah benar dan aktif.
          </p>
        </div>
      )}

      {showIdCardInfo && (
        <div
          className="rounded-xl p-5 text-left"
          style={{
            backgroundColor: "#f8fafc",
            borderLeft: "4px solid #C8102E",
          }}
        >
          <p className="text-sm font-semibold mb-2 primary-text">
            📋 Informasi Pengambilan ID Card
          </p>
          <p className="text-sm text-gray-600">
            Pengambilan ID Card dapat dilakukan{" "}
            <strong>H-1 sebelum acara</strong> di lokasi acara.
          </p>
        </div>
      )}
    </div>
  );
};

export default function RegistrationSuccess({
  is_approved,
  images,
  qr_full_path,
  registration,
}) {
  const { flash } = usePage().props;

  useToast(flash?.info);

  const registrationType = registration?.extras?.type || "umum";

  return (
    <>
      <Head title="Registration - Success" />

      <div className="min-h-screen gradient-bg flex flex-col">
        <main className="flex-1 flex flex-col items-center px-6 py-10">
          {/* Logo Mitsubishi */}
          <div className="mb-8 animate-logo">
            <img
              src="/images/mitsubishi-logo.png"
              alt="Mitsubishi Motors Logo"
              className="h-20 md:h-24 mx-auto object-contain"
            />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-10 animate-title text-center black-text">
            Registrasi Berhasil
          </h2>

          <div className="w-full max-w-3xl mb-12 animate-grid">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="flex justify-center">
                <SuccessMessage registrationType={registrationType} registration={registration} />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <style jsx>{`
        @font-face {
          font-family: "mmcoffice";
          src: url("/fonts/mmcoffice-regular.ttf") format("truetype");
          font-weight: 400;
        }

        @font-face {
          font-family: "mmcoffice";
          src: url("/fonts/mmcoffice-bold.ttf") format("truetype");
          font-weight: 700;
        }

        * {
          font-family: "mmcoffice", sans-serif;
        }

        .primary-text {
          color: #c8102e;
        }

        .black-text {
          color: #000000;
        }

        .gradient-bg {
          background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
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
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .animate-grid {
          animation: fadeInUp 1s ease-out 0.4s both;
        }
      `}</style>
    </>
  );
}
