import { useState } from "react";

export default function RegistrationWelcome({ images, redirectTo }) {
  const [isLoading, setLoading] = useState(false);
  const handleRedirect = () => {
    setLoading(true);
    window.location.href = redirectTo;
  };
  return (
    <>
      <div className="welcome-bg-main min-h-screen flex flex-col justify-between text-white">
        <header className="flex flex-col justify-center items-center p-5 gap-8">
          <img
            src={images["sby_art_white"]}
            alt="SBY Logo"
            className="h-25 md:h-25 object-contain"
          />
          <div className="flex">
            <div className="flex space-x-4">
              <img
                src={images["ekraf_white"]}
                alt="EKRAF Logo"
                className="h-20 md:h-25 object-contain"
              />
              <img
                src={images["kkri_white"]}
                alt="KEMENBUD Logo"
                className="h-20 md:h-25 object-contain"
              />
            </div>
          </div>
        </header>

        <main className="flex flex-col items-center px-4 text-center">
          <h1 className="cinzel text-4xl md:text-5xl font-bold">SELAMAT</h1>
          <p className="cinzel text-3xl md:text-4xl mb-8">DATANG!</p>
          <button
            disabled={isLoading}
            onClick={handleRedirect}
            className="poppins cursor-pointer bg-blue-600 hover:bg-blue-700 px-25 py-3 rounded-md text-white font-medium"
          >
            {isLoading ? (
              <>
                <div className="flex items-center gap-1">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Loading...</span>
                </div>
              </>
            ) : (
              "Daftar"
            )}
          </button>
        </main>

        <footer className="text-center text-xs text-gray-300 p-4">
          Copyright © 2025 CyberLabs | Powered By Alco Media Indonesia
        </footer>
      </div>
    </>
  );
}
