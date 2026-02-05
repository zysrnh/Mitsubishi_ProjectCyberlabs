import { Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function VehicleSelection({ vehicles }) {
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const handleVehicleSelect = (vehicleId) => {
    console.log('Vehicle selected:', vehicleId);
    setSelectedVehicle(vehicleId);

    // Navigate ke form dengan vehicle yang dipilih
    const url = `/mitsubishi/register?vehicle=${vehicleId}`;
    console.log('Navigating to:', url);

    // Try Inertia router first, fallback to window.location
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

  /* Default font untuk seluruh halaman */
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
          <h2 className="mmcoffice-bold text-2xl md:text-4xl mb-10 animate-title text-center">
            Select Vehicle
          </h2>

          {/* Vehicle Grid */}
          <div className="w-full max-w-3xl mb-12 animate-grid">
            <div className="p-0 md:p-12">
              <div className=" grid grid-cols-2 gap-2 md:gap-8">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    onClick={() => handleVehicleSelect(vehicle.id)}
                    className={`vehicle-card bg-gray-50 rounded-2xl p-4 border-2 ${selectedVehicle === vehicle.id
                      ? 'selected border-[#C8102E]'
                      : 'border-gray-200'
                      }`}
                  >
                    <h3 className="mmcoffice-bold text-sm md:text-base text-center mb-3">
                      {vehicle.name}
                    </h3>
                    <div className="flex items-center justify-center overflow-hidden">
                      <img
                        src="/images/xpander.png"
                        alt="Car"
                        className="w-full h-full object-contain"
                      />
                    </div>

                  </div>
                ))}
              </div>
            </div>
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