import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

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
    sim_photo: null,
    agree_terms: false,
  });

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [simPhotoPreview, setSimPhotoPreview] = useState(null);

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setData(name, type === "checkbox" ? checked : value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData("sim_photo", file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setSimPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTermsCheckbox = (e) => {
    if (!data.agree_terms) {
      e.preventDefault();
      setShowTermsModal(true);
    } else {
      setData("agree_terms", false);
    }
  };

  const handleAcceptTerms = () => {
    setData("agree_terms", true);
    setShowTermsModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route("mitsubishi.submit_form"), {
      forceFormData: true,
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
          background: linear-gradient(180deg, #FAFAFA 0%, #E8E8E8 100%);
        }

        label {
          color: #000;
          font-weight: 500;
        }

        input::placeholder {
          color: #9ca3af;
          font-size: 0.875rem;
        }

        input,
        select {
          border: 1px solid #d1d5db;
          transition: all 0.2s ease;
          background: #fff;
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
          color: #000;
        }

        select option {
          color: #000;
        }

        input[type="checkbox"] {
          accent-color: #C8102E;
          width: 1.25rem;
          height: 1.25rem;
          cursor: pointer;
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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
          opacity: 0.4;
          filter: grayscale(0.8);
        }

        .modal-overlay {
          animation: fadeIn 0.3s ease-out;
        }

        .modal-content {
          animation: scaleIn 0.3s ease-out;
        }

        .file-upload-btn {
          position: relative;
          overflow: hidden;
          display: inline-block;
          cursor: pointer;
        }

        .file-upload-btn input[type="file"] {
          position: absolute;
          left: -9999px;
        }

        @media (max-width: 640px) {
          input, select {
            font-size: 14px;
          }
        }
      `}</style>

      <div className="min-h-screen gradient-bg flex flex-col">
        <div className="flex-1 flex flex-col items-center px-4 py-6 sm:py-8 md:py-12">

          {/* Logo */}
          <div className="mb-4 sm:mb-6 animate-logo pt-4 sm:pt-8">
            <img
              src="/images/mitsubishi-logo.png"
              alt="Mitsubishi Motors Logo"
              className="h-16 sm:h-20 md:h-24 lg:h-28 mx-auto object-contain"
            />
          </div>

          {/* Title */}
          <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-center mb-6 sm:mb-8 md:mb-10 animate-title black-text font-bold px-4">
            INDONESIA INTERNATIONAL<br />
            MOTOR SHOW
          </h1>

          {/* Form Container */}
          <div className="w-full max-w-2xl animate-form mb-6 sm:mb-8 px-2 sm:px-4">
            <div className="bg-white rounded-2xl sm:rounded-[2rem] shadow-xl p-4 sm:p-6 md:p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

                {/* Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="text-sm sm:text-base font-medium text-black mb-1.5 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base text-black"
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm sm:text-base font-medium text-black mb-1.5 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={data.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base text-black"
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Email & Assistant */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="text-sm sm:text-base font-medium text-black mb-1.5 block">
                      E-mail Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base text-black"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm sm:text-base font-medium text-black mb-1.5 block">
                      Assistant Sales Name
                    </label>
                    <input
                      type="text"
                      name="assistant_sales"
                      value={data.assistant_sales}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base text-black"
                    />
                  </div>
                </div>

                {/* Dealer & Branch */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="text-sm sm:text-base font-medium text-black mb-1.5 block">
                      Sales Dealer
                    </label>
                    <input
                      type="text"
                      name="dealer"
                      value={data.dealer}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base text-black"
                    />
                  </div>

                  <div>
                    <label className="text-sm sm:text-base font-medium text-black mb-1.5 block">
                      Dealer Branch
                    </label>
                    <select
                      name="dealer_branch"
                      value={data.dealer_branch}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base text-black"
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

                {/* SIM Photo Upload */}
                <div>
                  <label className="text-sm sm:text-base font-medium text-black mb-1.5 block">
                    Upload Foto SIM (Surat Izin Mengemudi)
                  </label>
                  
                  <div className="mt-2">
                    <label className="file-upload-btn">
                      <div className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-dashed border-gray-300 hover:border-[#C8102E] transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100 flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-600">
                          {data.sim_photo ? data.sim_photo.name : "Pilih foto SIM"}
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                  </div>

                  {simPhotoPreview && (
                    <div className="mt-3">
                      <img
                        src={simPhotoPreview}
                        alt="Preview SIM"
                        className="w-full max-w-xs mx-auto rounded-lg shadow-md"
                      />
                    </div>
                  )}

                  {errors.sim_photo && (
                    <p className="text-red-500 text-xs mt-1">{errors.sim_photo}</p>
                  )}
                </div>

                {/* Terms */}
                <div className="pt-2 sm:pt-3 text-center">
                  <p className="text-xs sm:text-sm text-black mb-3 px-2">
                    Do you accept the terms and conditions by registrating?
                  </p>

                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <input
                      type="checkbox"
                      name="agree_terms"
                      id="agree_terms"
                      checked={data.agree_terms}
                      onChange={handleTermsCheckbox}
                      required
                    />
                    <label
                      htmlFor="agree_terms"
                      className="text-xs sm:text-sm text-black cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        handleTermsCheckbox(e);
                      }}
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
                <div className="pt-3 sm:pt-4">
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-[#C8102E] text-white font-bold text-base sm:text-lg md:text-xl py-3 sm:py-4 rounded-full shadow-xl hover:bg-[#A00D26] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl active:scale-[0.98]"
                  >
                    {processing ? "SUBMITTING..." : "SUBMIT"}
                  </button>
                </div>

              </form>
            </div>
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

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowTermsModal(false)}></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden modal-content">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#C8102E] mb-4 text-center">
                Syarat dan Ketentuan Test Drive
              </h2>
              
              <div className="overflow-y-auto max-h-[50vh] pr-2 space-y-3 text-sm sm:text-base text-black">
                <p className="font-semibold mb-3">Dengan ini saya menyatakan bahwa:</p>
                
                <div className="space-y-2">
                  <p>• Saya berusia minimal 17 tahun dan maksimal 65 tahun</p>
                  
                  <p>• Saya memiliki dan membawa Surat Izin Mengemudi (SIM) untuk mengendarai kendaraan roda 4 yang sah berlaku di Indonesia (SIM A/B1/Khusus/International)</p>
                  
                  <p>• Saya tidak sedang dalam pengaruh alkohol atau obat-obatan yang dapat mengurangi konsentrasi dalam mengoperasikan kendaraan</p>
                  
                  <p>• Saya bersedia untuk menggunakan sabuk pengaman selama Test Drive/Test Ride berlangsung</p>
                  
                  <p>• Apabila dalam rombongan saya ada balita atau ibu hamil, saya sebagai pengemudi akan bertanggung jawab atas segala resiko yang dapat diakibatkan</p>
                  
                  <p>• Saya bersedia untuk mengikuti arahan yang diberikan oleh Instruktur Test Drive terkait kecepatan maksimum dan cara pengoperasian kendaraan</p>
                  
                  <p>• Saya tidak akan merokok atau vaping di dalam kendaraan Test Drive</p>
                  
                  <p>• Saya bersedia untuk tidak membawa makanan dan minuman ke dalam kendaraan Test Drive</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="px-6 py-2.5 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleAcceptTerms}
                  className="px-6 py-2.5 rounded-full bg-[#C8102E] text-white font-semibold hover:bg-[#A00D26] transition-colors"
                >
                  Setuju & Lanjutkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}