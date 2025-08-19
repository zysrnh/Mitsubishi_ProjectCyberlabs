import { Head, usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const QrCode = ({ qrPath }) => {
  return (
    <>
      <form className="w-3/4 max-w-md space-y-4 mb-6">
        <img src={qrPath} alt="QR Code" className="w-full" />
      </form>

      <p className="cinzel text-lg md:text-xl mb-6 text-center">
        Simpan QR Code ini!
      </p>
    </>
  );
};

const SuccessMessage = () => {
  return (
    <>
      <p className="cinzel text-xl md:text-2xl font-bold text-center">
        Menunggu Approval Pendaftaran.
      </p>

      <p className="cinzel text-lg md:text-xl mb-6 text-center">
        Kami akan mengirim konfirmasi pendaftaran melalui email dan Whatsapp
        Anda.
      </p>
    </>
  );
};

export default function RegistrationSAC({ is_approved, images, qr_full_path }) {
  const { flash } = usePage().props;
  console.log(qr_full_path);

  useEffect(() => {
    if (!flash?.info) return;

    const info = flash.info;

    if (typeof info === "string") {
      toast(info);
    } else if (typeof info === "object") {
      if (info.error) {
        toast.error(info.error);
      } else if (info.success) {
        toast.success(info.success, {
          duration: 12 * 1000,
        });
      } else if (info.info) {
        toast.info(info.info);
      } else if (info.warning) {
        toast.warning(info.warning);
      }
    }
  }, [flash?.info]);

  return (
    <>
      <Head title="Alcomedia - SBY Art Community" />
      <Toaster />
      <div className="welcome-bg-main bg-[#0a0a0a] text-white min-h-screen flex flex-col justify-between">
        {/* Top Section  */}
        <header className="flex justify-between items-center p-6">
          <img
            src={images["sby_art_white"]}
            alt="SBY Logo"
            className="h-20 md:h-30 object-contain"
          />
          <div className="flex space-x-4">
            <img
              src={images["ekraf_white"]}
              alt="EKRAF Logo"
              className="h-18 md:h-30 object-contain"
            />
            <img
              src={images["kkri_white"]}
              alt="KEMENBUD Logo"
              className="h-18 md:h-30 object-contain"
            />
          </div>
        </header>

        {/* Form Section */}
        <main className="flex flex-col items-center px-4">
          <h1 className="cinzel text-2xl md:text-3xl font-bold text-center">
            REGISTRASI
          </h1>
          <p className="cinzel text-lg md:text-xl mb-6 text-center">
            Berhasil!
          </p>
          
          {is_approved ? <QrCode qrPath={qr_full_path} /> : <SuccessMessage />}
        </main>

        {/* Footer  */}
        <footer className="text-center text-xs text-gray-400 p-4">
          Copyright © 2025 Alcomedia.id | Powered By Alco Media Indonesia
        </footer>
      </div>
    </>
  );
}
