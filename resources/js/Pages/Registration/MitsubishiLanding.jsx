import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function MitsubishiLanding({ redirectTo }) {
  return (
    <>
      <Head title="Mitsubishi Motors - Indonesia International Motor Show" />
      <style>{`
  @font-face {
    font-family: 'MMCOFFICE';
    src: url('/fonts/mmcoffice-regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'MMCOFFICE';
    src: url('/fonts/mmcoffice-bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  /* Default font untuk seluruh halaman */
  * {
    font-family: 'MMCOFFICE', sans-serif;
  }

  body, html {
    font-family: 'MMCOFFICE', sans-serif;
  }

  .mmcoffice-regular {
    font-family: 'MMCOFFICE', sans-serif;
    font-weight: normal;
  }

  .mmcoffice-bold {
    font-family: 'MMCOFFICE', sans-serif;
    font-weight: bold;
  }

  /* Animasi */
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
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  .animate-logo {
    animation: scaleIn 0.8s ease-out;
  }

  .animate-title {
    animation: fadeInDown 1s ease-out 0.3s both;
  }

  .animate-button {
    animation: fadeInUp 1s ease-out 0.6s both;
  }

  .animate-cityscape {
    animation: fadeInUp 1.2s ease-out 0.4s both;
  }

  .button-hover:hover {
    animation: pulse 0.6s ease-in-out;
  }

  /* Background gradient */
  .gradient-bg {
    background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
  }

  /* Cityscape effect */
  .cityscape-container {
    position: relative;
    overflow: hidden;
  }

  .cityscape-img {
    opacity: 0.3;
    filter: grayscale(1);
  }
`}</style>

      <div className="min-h-screen gradient-bg flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          {/* Logo */}
          <div className="mb-8 md:mb-12 animate-logo">
            <div className="text-center">
              {/* Mitsubishi Logo */}
              <div className="mb-4">
                <img
                  src="/images/mitsubishi-logo.png"
                  alt="Mitsubishi Motors Logo"
                  className="h-20 md:h-24 mx-auto object-contain"
                />
              </div>

            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-10 md:mb-16 animate-title max-w-3xl">
            <h1 className="mmcoffice-bold text-2xl md:text-4xl lg:text-5xl leading-tight">
              INDONESIA INTERNATIONAL<br />
              MOTOR SHOW
            </h1>
          </div>

          {/* CTA Button */}
          <div className="animate-button mb-12">
            <a
              href={redirectTo}
              className="button-hover inline-block bg-[#C8102E] text-white montserrat-bold text-lg md:text-xl px-16 md:px-24 py-4 md:py-5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-[#A00D26] transform hover:-translate-y-1"
            >
              <b>TEST DRIVE</b>
            </a>
          </div>
        </div>

        {/* Cityscape */}
        <div className="cityscape-container h-48 md:h-64 w-full animate-cityscape -mb-12 md:-mb-20">
          <div className="relative h-full flex items-end justify-center">
            <img
              src="/images/cityspace.png"
              alt="Cityscape"
              className="w-full h-full object-cover object-top"
            />

          </div>
        </div>
      </div>
    </>
  );
}