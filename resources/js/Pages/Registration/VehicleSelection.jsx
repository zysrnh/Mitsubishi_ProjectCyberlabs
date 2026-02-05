import { Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function VehicleSelection({ vehicles }) {
  const [selectedVehicle, setSelectedVehicle] = useState("");

  // Mapping vehicle names to image paths
  const vehicleImages = {
    'XPANDER': '/images/xpander.png',
    'XFORCE': '/images/xforce.png',
    'NEW PAJERO SPORT': '/images/pajero.png',
    'DESTINATOR': '/images/destinator.png',
  };

  const handleVehicleSelect = (vehicleId) => {
    console.log('Vehicle selected:', vehicleId);
    setSelectedVehicle(vehicleId);

    const url = `/mitsubishi/register?vehicle=${vehicleId}`;
    console.log('Navigating to:', url);

    try {
      router.visit(url);
    } catch (error) {
      console.error('Router error:', error);
      window.location.href = url;
    }
  };

  return (
    <>
      <Head title="Select Vehicle - Mitsubishi Motors" />
      <style>{`
  @font-face {
    font-family: 'mmcoffice';
    src: url('/fonts/mmcoffice-regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'mmcoffice';
    src: url('/fonts/mmcoffice-bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  * {
    font-family: 'mmcoffice', sans-serif;
  }

  .mmcoffice-bold {
    font-family: 'mmcoffice', sans-serif;
    font-weight: 700;
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
    background: #f5f5f5;
    position: relative;
  }

  .vehicle-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .vehicle-card.selected {
    background: #fff;
    box-shadow: 0 4px 12px rgba(200, 16, 46, 0.3);
  }

  .vehicle-card.selected::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 3px solid #C8102E;
    border-radius: 1.5rem;
    pointer-events: none;
  }

  .gradient-bg {
    background: linear-gradient(180deg, #FAFAFA 0%, #E8E8E8 100%);
  }

  .cityscape-img {
    opacity: 0.4;
    filter: grayscale(0.8);
  }

  .vehicle-name {
    font-family: 'mmcoffice', sans-serif;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  @media (max-width: 768px) {
    .vehicle-card {
      padding: 0.75rem;
    }
    
    .vehicle-name {
      font-size: 0.65rem;
    }
  }

  @media (min-width: 769px) {
    .vehicle-name {
      font-size: 1.1rem;
    }
  }
`}</style>

      <div className="min-h-screen gradient-bg flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center px-4 sm:px-6 py-6 sm:py-8 md:py-12">
          {/* Logo */}
          <div className="mb-6 sm:mb-8 animate-logo pt-4 sm:pt-8">
            <div className="text-center">
              <img
                src="/images/mitsubishi-logo.png"
                alt="Mitsubishi Motors Logo"
                className="h-16 sm:h-20 md:h-24 lg:h-28 mx-auto object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="mmcoffice-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-8 sm:mb-10 md:mb-12 animate-title text-center text-black">
            Select Vehicle
          </h2>

          {/* Vehicle Grid - Container with rounded background */}
          <div className="w-full max-w-4xl mb-8 sm:mb-12 md:mb-16 animate-grid px-2 sm:px-4">
            <div className="bg-white/40 backdrop-blur-sm rounded-[2rem] sm:rounded-[3rem] p-4 sm:p-6 md:p-10 lg:p-12 shadow-lg">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    onClick={() => handleVehicleSelect(vehicle.id)}
                    className={`vehicle-card rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 flex flex-col items-center justify-between ${
                      selectedVehicle === vehicle.id ? 'selected' : ''
                    }`}
                  >
                    {/* Vehicle Name */}
                    <h3 className="vehicle-name text-center mb-2 sm:mb-3 md:mb-4 text-black uppercase">
                      {vehicle.name}
                    </h3>
                    
                    {/* Vehicle Image */}
                    <div className="w-full flex items-center justify-center">
                      <img
                        src={vehicleImages[vehicle.name.toUpperCase()] || '/images/xpander.png'}
                        alt={vehicle.name}
                        className="w-full h-auto object-contain max-h-32 sm:max-h-40 md:max-h-48"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cityscape - Fixed at bottom */}
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