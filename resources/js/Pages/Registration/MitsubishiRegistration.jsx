import { Head, useForm, usePage } from "@inertiajs/react";

export default function MitsubishiRegistration({ selectedVehicle }) {
  const { flash } = usePage().props;
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    phone: "",
    email: "",
    assistant_sales: "",
    dealer: "",
    dealer_branch: "",
    vehicle: selectedVehicle?.id || "",
    agree_terms: false,
  });

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setData(name, type === "checkbox" ? checked : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route("mitsubishi.submit_form"), {
      onError: (errors) => {
        console.error("Validation errors:", errors);
      },
    });
  };

  return (
    <>
      <Head title="Registration - Mitsubishi Motors" />

      <style>{`
        @font-face {
          font-family: 'mmcoffice';
          src: url('/fonts/mmcoffice-regular.ttf') format('truetype');
          font-weight: 400;
        }

        @font-face {
          font-family: 'mmcoffice';
          src: url('/fonts/mmcoffice-bold.ttf') format('truetype');
          font-weight: 700;
        }

        * {
          font-family: 'mmcoffice', sans-serif;
        }

        .primary-text {
          color: #C8102E;
        }
        
        .black-text {
          color: #000000;
        }

        .gradient-bg {
          background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
        }

        input::placeholder,
        select::placeholder {
          color: #9ca3af;
          font-size: 0.875rem;
        }

        input,
        select {
          border: 1px solid #d1d5db;
          transition: all 0.2s ease;
        }

        input:focus,
        select:focus {
          border-color: #C8102E;
          box-shadow: 0 0 0 3px rgba(200, 16, 46, 0.1);
          outline: none;
        }

        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1.25rem;
          padding-right: 2.5rem;
        }

        input[type="checkbox"] {
          accent-color: #C8102E;
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

        .animate-form {
          animation: fadeInUp 1s ease-out 0.4s both;
        }

        .cityscape-img {
          opacity: 0.3;
          filter: grayscale(1);
        }
      `}</style>

      <div className="min-h-screen gradient-bg flex flex-col">
        <div className="flex-1 flex flex-col items-center px-4 py-8 md:py-12">

          {/* Logo */}
          <div className="mb-6 animate-logo">
            <img
              src="/images/mitsubishi-logo.png"
              alt="Mitsubishi Motors Logo"
              className="h-20 md:h-24 mx-auto object-contain"
            />
          </div>

          {/* Title */}
          <h1 className="text-xl md:text-3xl text-center mb-10 animate-title black-text font-bold">
            INDONESIA INTERNATIONAL<br />
            MOTOR SHOW
          </h1>

          {/* Form Container */}
          <div className="w-full max-w-lg animate-form mb-8">
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-white"
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={data.phone}
                      onChange={handleChange}
                      placeholder="08123456789"
                      className="w-full px-4 py-2.5 rounded-lg bg-white"
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Email & Assistant */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      E-mail Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-white"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
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

                {/* Dealer & Branch */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
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
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      Dealer Branch *
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
                    {errors.dealer_branch && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.dealer_branch}
                      </p>
                    )}
                  </div>
                </div>

                {/* Terms */}
                <div className="pt-3 text-center">
                  <p className="text-sm text-gray-700 mb-3">
                    Do you accept the terms and conditions by registering?
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
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      I agree to the terms and conditions
                    </label>
                  </div>

                  {errors.agree_terms && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.agree_terms}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-[#C8102E] text-white font-bold text-base md:text-lg py-3.5 rounded-full shadow-lg hover:bg-[#A00D26] transition-all duration-300 disabled:opacity-50"
                  >
                    {processing ? "SUBMITTING..." : "SUBMIT"}
                  </button>
                </div>

              </form>
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
