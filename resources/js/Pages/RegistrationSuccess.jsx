import { Head, usePage } from "@inertiajs/react";
import { useToast } from "@/hooks";
import { Header, Footer } from "@/components/layouts";

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

// const SuccessMessage = () => {
//   return (
//     <>
//       <p className="cinzel text-xl md:text-2xl font-bold text-center">
//         Menunggu Approval Pendaftaran.
//       </p>

//       <p className="cinzel text-lg md:text-xl mb-6 text-center">
//         Kami akan mengirim konfirmasi pendaftaran melalui email dan Whatsapp
//         Anda.
//       </p>
//     </>
//   );
// };

export default function RegistrationSuccess({ is_approved, images, qr_full_path }) {
  const { flash } = usePage().props;
  console.log(qr_full_path);

  useToast(flash?.info);

  return (
    <>
      <Head title="Alcomedia - IKA ISMEI" />
      <div className="welcome-bg-main bg-[#0a0a0a] text-white min-h-screen flex flex-col justify-between">
        {/* Top Section  */}
        <Header images={images} isLarge={true} />

        {/* Form Section */}
        <main className="flex flex-col items-center px-4">
          <h1 className="lexend text-primary text-2xl md:text-3xl font-bold text-center mb-4">
            REGISTRASI BERHASIL!
          </h1>
          {/* <p className="cinzel text-lg md:text-xl mb-6 text-center">
            Berhasil!
          </p> */}

          <QrCode qrPath={qr_full_path} />
          {/* {is_approved ? <QrCode qrPath={qr_full_path} /> : <SuccessMessage />} */}
        </main>

        <Footer />
      </div>
    </>
  );
}
