import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Header, Footer } from "@/components/layouts";
import { Button } from "@/components/forms";

export default function RegistrationWelcome({ images, title, redirectTo }) {
  const [isLoading, setLoading] = useState(false);
  const handleRedirect = () => {
    setLoading(true);
    window.location.href = redirectTo;
  };

  return (
    <>
      <Head title="Alcomedia - IKA ISMEI" />
      <div className="welcome-bg-main min-h-screen flex flex-col justify-between text-white">
        <main className="flex flex-col justify-center items-center px-4 text-center">
          <div className="mt-15">
            <Header images={images} isLarge={true} />
          </div>

          <div className="flex flex-col-reverse md:flex-row justify-around items-center gap-12">
            <div>
              <div className="flex flex-col gap-4 justify-start">
                <h1 className="lexend text-primary text-4xl text-center md:text-start text-shadow-lg md:text-5xl font-bold mb-4 ">
                  Selamat Datang
                </h1>
                <p className="lexend text-3xl text-shadow-lg md:text-4xl mb-8">
                  {title}
                </p>
              </div>

              <div className="rubik max-w-lg w-full mt-20 shadow-2xl">
                <Button processing={isLoading} onClick={handleRedirect}>
                  Daftar
                </Button>
              </div>
            </div>
            <div>
              <img src={images["people_pic"]} className="transition-all duration-300" alt="Foto Ketua dan Wamenkeu" />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
