import { Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function VehicleSelection({ vehicles }) {
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const handleVehicleSelect = (vehicleId) => {
    setSelectedVehicle(vehicleId);
    // Navigate ke form dengan vehicle yang dipilih
    setTimeout(() => {
      router.visit(route('mitsubishi.show_form', { vehicle: vehicleId }));
    }, 300);
  };

  return (
    <>
      <Head title="Select Vehicle - Mitsubishi Motors" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Inter:wght@400;500;600&display=swap');
        
        .montserrat-bold {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
        }

        .inter-font {
          font-family: 'Inter', sans-serif;
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

        .vehicle-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .vehicle-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        .vehicle-card.selected {
          border-color: #C8102E;
          box-shadow: 0 0 0 3px rgba(200, 16, 46, 0.2);
        }

        .gradient-bg {
          background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .cityscape-img {
          opacity: 0.3;
          filter: grayscale(1);
        }
      `}</style>

      <div className="min-h-screen gradient-bg flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center px-6 py-10">
          {/* Logo */}
          <div className="mb-8 animate-logo">
            <div className="text-center">
              <div className="mb-4">
                <svg 
                  viewBox="0 0 200 100" 
                  className="h-16 md:h-20 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="100,10 120,40 80,40" fill="#C8102E"/>
                  <polygon points="80,40 100,70 60,55" fill="#C8102E"/>
                  <polygon points="120,40 140,55 100,70" fill="#C8102E"/>
                </svg>
              </div>
              <div className="inter-font font-bold text-base md:text-lg tracking-wider">
                MITSUBISHI MOTORS
              </div>
              <div className="inter-font text-xs mt-1 tracking-wide">
                Drive your Ambition
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="montserrat-bold text-2xl md:text-3xl mb-10 animate-title text-center">
            Select Vehicle
          </h2>

          {/* Vehicle Grid */}
          <div className="w-full max-w-3xl mb-12 animate-grid">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="grid grid-cols-2 gap-6 md:gap-8">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    onClick={() => handleVehicleSelect(vehicle.id)}
                    className={`vehicle-card bg-gray-50 rounded-2xl p-4 border-2 ${
                      selectedVehicle === vehicle.id 
                        ? 'selected border-[#C8102E]' 
                        : 'border-gray-200'
                    }`}
                  >
                    <h3 className="montserrat-bold text-sm md:text-base text-center mb-3">
                      {vehicle.name}
                    </h3>
                    <div className="aspect-[4/3] bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                      {/* Placeholder for vehicle image */}
                      <svg 
                        className="w-3/4 h-3/4 text-gray-400"
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" 
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cityscape */}
        <div className="h-40 md:h-48 w-full">
          <div className="relative h-full flex items-end justify-center">
            <svg 
              viewBox="0 0 1200 250" 
              className="cityscape-img w-full h-full"
              preserveAspectRatio="xMidYMax meet"
            >
              <polygon points="100,150 200,50 300,150" fill="#d1d5db" opacity="0.3"/>
              <polygon points="250,150 350,30 450,150" fill="#d1d5db" opacity="0.25"/>
              <polygon points="400,150 550,80 700,150" fill="#d1d5db" opacity="0.3"/>
              <polygon points="650,150 800,60 950,150" fill="#d1d5db" opacity="0.25"/>
              <polygon points="900,150 1000,40 1100,150" fill="#d1d5db" opacity="0.3"/>
              
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