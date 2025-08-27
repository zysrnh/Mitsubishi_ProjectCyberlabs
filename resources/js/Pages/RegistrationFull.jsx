import { useState } from "react";
// import { Header, Footer } from "@/components/layouts";

export default function RegistrationWelcome({ images }) {
  return (
    <>
      <div className="welcome-bg-main min-h-screen flex flex-col justify-between text-white">
        {/* <Header /> */}

        <div className="w-full flex justify-center">
          <main className="flex flex-col items-center px-4 text-center gap-4 max-w-3xl">
            <h1 className="beautique text-4xl md:text-5xl font-bold">
              Mohon Maaf Pendaftaran Telah Ditutup Karena Melebihi Kapasitas
            </h1>
            <p className="beautique text-3xl md:text-4xl mb-8">
              Terima Kasih Atas Partisipasi Anda
            </p>
          </main>
        </div>

        {/* <Footer /> */}
      </div>
    </>
  );
}
