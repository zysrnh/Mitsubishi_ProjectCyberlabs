import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function MitsubishiRegistration({ images }) {
  const { flash } = usePage().props;
  const { data, setData, post, processing, errors, reset, setError } = useForm({
    name: "",
    phone: "",
    email: "",
    assistant_sales: "",
    dealer: "",
    dealer_branch: "",
    agree_terms: false,
  });

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setData(name, type === 'checkbox' ? checked : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!data.name || !data.phone || !data.email || !data.dealer_branch || !data.agree_terms) {
      alert("Mohon lengkapi semua field yang wajib diisi dan setujui syarat & ketentuan");
      return;
    }

    post(route("karang_taruna.submit_form"), {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <>
      <Head title="Registration - Mitsubishi Motors" />
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

        input::placeholder,
        select::placeholder {
          color: #9ca3af;
          font-size: 0.875rem;
        }

        input[type="text"],
        input[type="tel"],
        input[type="email"],
        select {
          font-size: 0.875rem;
          font-family: 'Inter', sans-serif;
        }

        /* Select styling */
        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1.25rem;
          padding-right: 2.5rem;
          cursor: pointer;
        }

        select:invalid {
          color: #9ca3af;
        }

        /* Input styling */
        input[type="text"],
        input[type="tel"],
        input[type="email"],
        select {
          border: 1px solid #d1d5db;
          transition: all 0.2s ease;
        }

        input[type="text"]:focus,
        input[type="tel"]:focus,
        input[type="email"]:focus,
        select:focus {
          border-color: #C8102E;
          box-shadow: 0 0 0 3px rgba(200, 16, 46, 0.1);
          outline: none;
        }

        /* Checkbox styling */
        input[type="checkbox"] {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid #d1d5db;
          border-radius: 0.25rem;
          cursor: pointer;
          accent-color: #C8102E;
        }

        /* Animations */
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

        .animate-form {
          animation: fadeInUp 1s ease-out 0.4s both;
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
        <div className="flex-1 flex flex-col items-center px-4 py-8 md:py-12">
          {/* Logo */}
          <div className="mb-6 animate-logo">
            <div className="text-center">
              <div className="mb-3">
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
          <h1 className="montserrat-extrabold text-xl md:text-3xl text-center mb-8 animate-title">
            INDONESIA INTERNATIONAL<br />
            MOTOR SHOW
          </h1>

          {/* Form Container */}
          <div className="w-full max-w-lg animate-form mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="inter-font text-sm font-medium text-gray-700 mb-1.5 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-white"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="inter-font text-sm font-medium text-gray-700 mb-1.5 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-white"
                    required
                  />
                </div>
              </div>

              {/* Email and Assistant Sales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="inter-font text-sm font-medium text-gray-700 mb-1.5 block">
                    E-mail Adress
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="inter-font text-sm font-medium text-gray-700 mb-1.5 block">
                    Assistant Sales Name
                  </label>
                  <input
                    type="text"
                    name="assistant_sales"
                    value={data.assistant_sales}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-white"
                  />
                </div>
              </div>

              {/* Sales Dealer and Dealer Branch */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="inter-font text-sm font-medium text-gray-700 mb-1.5 block">
                    Sales Dealer
                  </label>
                  <input
                    type="text"
                    name="dealer"
                    value={data.dealer}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="inter-font text-sm font-medium text-gray-700 mb-1.5 block">
                    Dealer Branch
                  </label>
                  <select
                    name="dealer_branch"
                    value={data.dealer_branch}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-white"
                    required
                  >
                    <option value="">Select Dealer Branch</option>
                    <option value="Jakarta Pusat">Jakarta Pusat</option>
                    <option value="Jakarta Selatan">Jakarta Selatan</option>
                    <option value="Jakarta Utara">Jakarta Utara</option>
                    <option value="Jakarta Barat">Jakarta Barat</option>
                    <option value="Jakarta Timur">Jakarta Timur</option>
                    <option value="Tangerang">Tangerang</option>
                    <option value="Bekasi">Bekasi</option>
                    <option value="Bandung">Bandung</option>
                    <option value="Surabaya">Surabaya</option>
                  </select>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="pt-3">
                <p className="inter-font text-sm text-center text-gray-700 mb-3">
                  Do you accept the terms and conditions by registrating?
                </p>
                <div className="flex items-center justify-center gap-3">
                  <input
                    type="checkbox"
                    name="agree_terms"
                    id="agree_terms"
                    checked={data.agree_terms}
                    onChange={handleChange}
                    required
                  />
                  <label 
                    htmlFor="agree_terms" 
                    className="inter-font text-sm text-gray-700 cursor-pointer"
                  >
                    I agree to the terms and conditions
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-[#C8102E] text-white montserrat-bold text-base md:text-lg py-3.5 rounded-full shadow-lg hover:bg-[#A00D26] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                  {processing ? "SUBMITTING..." : "SUBMIT"}
                </button>
              </div>
            </form>
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