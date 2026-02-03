import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function MitsubishiLanding({ redirectTo }) {
  return (
    <>
      <Head title="Mitsubishi Motors - Indonesia International Motor Show" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Inter:wght@400;500;600&display=swap');
        
        .montserrat-bold {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
        }
        
        .montserrat-extrabold {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
        }

        .inter-font {
          font-family: 'Inter', sans-serif;
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
              {/* Mitsubishi Logo Placeholder */}
              <div className="mb-4">
                <svg 
                  viewBox="0 0 200 100" 
                  className="h-20 md:h-24 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Three Diamond Shape */}
                  <polygon 
                    points="100,10 120,40 80,40" 
                    fill="#C8102E"
                  />
                  <polygon 
                    points="80,40 100,70 60,55" 
                    fill="#C8102E"
                  />
                  <polygon 
                    points="120,40 140,55 100,70" 
                    fill="#C8102E"
                  />
                </svg>
              </div>
              <div className="inter-font font-bold text-lg md:text-xl tracking-wider">
                MITSUBISHI MOTORS
              </div>
              <div className="inter-font text-xs md:text-sm mt-1 tracking-wide">
                Drive your Ambition
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-10 md:mb-16 animate-title max-w-3xl">
            <h1 className="montserrat-extrabold text-2xl md:text-4xl lg:text-5xl leading-tight">
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
              TEST DRIVE
            </a>
          </div>
        </div>

        {/* Cityscape */}
        <div className="cityscape-container h-48 md:h-64 w-full animate-cityscape">
          <div className="relative h-full flex items-end justify-center">
            {/* Simple cityscape illustration */}
            <svg 
              viewBox="0 0 1200 250" 
              className="cityscape-img w-full h-full"
              preserveAspectRatio="xMidYMax meet"
            >
              {/* Mountains in background */}
              <polygon points="100,150 200,50 300,150" fill="#d1d5db" opacity="0.3"/>
              <polygon points="250,150 350,30 450,150" fill="#d1d5db" opacity="0.25"/>
              <polygon points="400,150 550,80 700,150" fill="#d1d5db" opacity="0.3"/>
              <polygon points="650,150 800,60 950,150" fill="#d1d5db" opacity="0.25"/>
              <polygon points="900,150 1000,40 1100,150" fill="#d1d5db" opacity="0.3"/>
              
              {/* Buildings */}
              <rect x="150" y="100" width="60" height="150" fill="#9ca3af" opacity="0.4"/>
              <rect x="250" y="120" width="50" height="130" fill="#9ca3af" opacity="0.35"/>
              <rect x="330" y="90" width="70" height="160" fill="#9ca3af" opacity="0.45"/>
              <rect x="430" y="110" width="55" height="140" fill="#9ca3af" opacity="0.4"/>
              <rect x="515" y="80" width="65" height="170" fill="#9ca3af" opacity="0.5"/>
              <rect x="610" y="105" width="50" height="145" fill="#9ca3af" opacity="0.35"/>
              <rect x="690" y="95" width="60" height="155" fill="#9ca3af" opacity="0.45"/>
              <rect x="780" y="115" width="55" height="135" fill="#9ca3af" opacity="0.4"/>
              <rect x="865" y="85" width="70" height="165" fill="#9ca3af" opacity="0.5"/>
              <rect x="965" y="100" width="60" height="150" fill="#9ca3af" opacity="0.4"/>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}