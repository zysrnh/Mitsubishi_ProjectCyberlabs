import { Head, usePage } from "@inertiajs/react";

const SuccessMessage = ({ registration }) => {
  return (
    <div className="w-full max-w-xl space-y-6 text-center">
      <div
        className="rounded-2xl p-8 mb-6 bg-blue-50 border border-blue-100"
        style={{
          backgroundColor: "rgba(42, 52, 141, 0.05)",
          border: "1px solid rgba(42, 52, 141, 0.2)",
        }}
      >
        <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-blue-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-[#2A348D]"
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
        </div>

        <p className="text-xl md:text-2xl font-bold mb-3 text-[#2A348D]">
          Registrasi Sukses!
        </p>

        <p className="text-slate-600">
          QR Code pendaftaran Anda telah berhasil dibuat dan dikirimkan melalui WhatsApp.
        </p>
      </div>

      {/* Show QR result if available */}
      {registration?.qr_url && (
        <div className="rounded-2xl p-8 bg-white shadow-xl border border-slate-100 transform transition-all hover:scale-[1.02]">
          <p className="text-sm font-semibold mb-6 text-[#2A348D] uppercase tracking-wider">QR Code Pendaftaran</p>
          <div className="bg-slate-50 p-6 rounded-2xl inline-block mb-4">
            <img 
              src={registration.qr_url} 
              alt="QR Code" 
              className="w-48 h-48 mx-auto mix-blend-multiply" 
              onError={e => {e.target.onerror=null;e.target.src='/images/no-qr.png';}} 
            />
          </div>
          <div className="space-y-1 mb-6">
            <p className="text-xs text-slate-400">Kode Unik Anda</p>
            <p className="text-lg font-bold text-[#2A348D] tracking-widest">{registration?.unique_code}</p>
          </div>
          <a
            href={registration.qr_url}
            download={`QR-ASITA-${registration?.unique_code}.png`}
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:brightness-110 shadow-lg"
            style={{ backgroundColor: "#2A348D" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download QR Code
          </a>
        </div>
      )}

      <div className="rounded-xl p-5 text-left bg-slate-50 border-l-4 border-[#2A348D]">
        <p className="text-sm font-semibold mb-2 text-[#2A348D] flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Informasi Penting
        </p>

        <p className="text-sm text-slate-600 leading-relaxed">
          Silakan tunjukkan QR Code ini kepada petugas di meja registrasi saat tiba di lokasi acara. Salinan QR Code juga telah dikirimkan ke nomor WhatsApp <strong>{registration.phone}</strong>.
        </p>
      </div>
    </div>
  );
};

export default function RegistrationSuccess({
  registration,
}) {
  return (
    <>
      <Head title="Registration Success - ASITA Meeting" />

      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Decorative Header */}
        <div className="bg-[#2A348D] h-64 w-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full pt-8">
             <div className="bg-white p-3 rounded-xl shadow-lg mb-4">
                <img
                  src="/images/Asitajpeg-removebg-preview.png"
                  alt="ASITA Logo"
                  className="h-12 object-contain"
                />
             </div>
             <h2 className="text-white text-2xl font-bold tracking-tight px-4 text-center">
                REGISTRASI BERHASIL
             </h2>
          </div>
        </div>

        <main className="flex-1 px-4 -mt-16 pb-12 relative z-20">
          <div className="max-w-xl mx-auto">
            <SuccessMessage registration={registration} />
            
            <div className="mt-8 text-center">
               <a 
                href={route('asita.show_form')} 
                className="text-slate-400 hover:text-[#2A348D] transition-colors text-sm font-medium"
               >
                 Kembali ke Beranda
               </a>
            </div>
          </div>
        </main>

        <footer className="py-6 text-center text-slate-400 text-xs border-t border-slate-200">
          © {new Date().getFullYear()} ASITA Meeting. All rights reserved.
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        * {
          font-family: 'Outfit', sans-serif;
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        main {
          animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
}
