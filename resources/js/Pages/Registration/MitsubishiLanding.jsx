import { Head } from "@inertiajs/react";

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

  .gradient-bg {
    background: linear-gradient(180deg, #FAFAFA 0%, #E8E8E8 100%);
  }

  .cityscape-container {
    position: relative;
    overflow: hidden;
  }

  .cityscape-img {
    opacity: 0.4;
    filter: grayscale(0.8);
  }

  @media (max-width: 640px) {
    .button-hover {
      font-size: 1rem;
      padding: 0.875rem 3rem;
    }
  }
`}</style>

      <div className="min-h-screen gradient-bg flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
          {/* Logo */}
          <div className="mb-6 sm:mb-8 md:mb-12 animate-logo pt-4 sm:pt-8">
            <div className="text-center">
              <img
                src="/images/mitsubishi-logo.png"
                alt="Mitsubishi Motors Logo"
                className="h-16 sm:h-20 md:h-24 lg:h-28 mx-auto object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8 sm:mb-10 md:mb-16 animate-title max-w-3xl px-4">
            <h1 className="mmcoffice-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl leading-tight text-black">
              INDONESIA INTERNATIONAL<br />
              MOTOR SHOW
            </h1>
          </div>

          {/* CTA Button */}
          <div className="animate-button mb-8 sm:mb-12">
            <a
              href={redirectTo}
              className="button-hover inline-block bg-[#C8102E] text-white font-bold text-base sm:text-lg md:text-xl px-12 sm:px-16 md:px-24 py-3 sm:py-4 md:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-[#A00D26] transform hover:-translate-y-1 active:scale-95"
            >
              TEST DRIVE
            </a>
          </div>
        </div>

        {/* Cityscape */}
        <div className="cityscape-container w-full" style={{ height: '180px' }}>
          <div className="relative h-full flex items-end justify-center overflow-hidden">
            <img
              src="/images/cityspace.png"
              alt="Cityscape"
              className="w-full h-full object-cover object-top cityscape-img"
              style={{ objectPosition: 'center top' }}
            />
          </div>
        </div>
      </div>
    </>
  );
}