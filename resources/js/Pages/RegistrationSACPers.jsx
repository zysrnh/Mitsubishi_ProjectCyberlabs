import { Head, useForm, usePage } from "@inertiajs/react";
import InputField from "../Components/Forms/InputField";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import z from "zod";

export default function RegistrationSACPers({ images }) {
  const { flash } = usePage().props;
  const { data, setData, post, processing, errors, reset, setError } = useForm({
    name: "",
    phone: "",
    email: "",
    job_title: "",
    organization: "",
  });

  const schema = z.object({
    name: z.string().min(1, { message: "Nama wajib diisi." }),
    phone: z.string().regex(/^(\+?62|0)\d{8,}$/, {
      message:
        "Nomor telepon tidak valid harus diawali '+62' atau '0' dan min. 10 digit.",
    }),
    email: z
      .string()
      .min(1, { message: "Email wajib diisi." })
      .email({ message: "Format email tidak valid." }),
    job_title: z.string().min(1, { message: "Pekerjaan wajib diisi." }),
    organization: z.string().min(1, { message: "Institusi wajib diisi." }),
  });

  const handleChange = ({ target: { name, value } }) => {
    setData(name, value);
  };

  const handleSubmit = (e) => {
    const result = schema.safeParse(data);

    if (!result.success) {
      const newErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        newErrors[field] = issue.message;
      });
      setError(newErrors);
      return;
    }

    setError({});
    post(route("sac_pers.submit_registration"), {
      onSuccess: (page) => {
        reset();
        setData({
          name: "",
          phone: "",
          email: "",
          job_title: "",
          organization: "",
        });
      },
    });
  };

  useEffect(() => {
    if (!flash?.info) return;

    const info = flash.info;

    // Handle different info types
    if (typeof info === "string") {
      toast(info);
    } else if (typeof info === "object") {
      // Handle your backend format: ['error' => 'info']
      if (info.error) {
        toast.error(info.error);
      } else if (info.success) {
        toast.success(info.success, {
          duration: 12 * 1000,
        });
      } else if (info.info) {
        toast.info(info.info);
      } else if (info.warning) {
        toast.warning(info.warning);
      }
    }
  }, [flash?.info]);

  return (
    <>
      <Head title="Registrasi SAC Pers" />
      <Toaster />
      <div className="bg-[#0a0a0a] text-white min-h-screen flex flex-col justify-between">
        {/* Top Section  */}
        <header className="flex justify-between items-center p-6">
          <img
            src={images["sby_art_white"]}
            alt="SBY Logo"
            className="h-20 md:h-30 object-contain"
          />
          <div className="flex space-x-4">
            <img
              src={images["ekraf_white"]}
              alt="EKRAF Logo"
              className="h-18 md:h-30 object-contain"
            />
            <img
              src={images["kkri_white"]}
              alt="KEMENBUD Logo"
              className="h-18 md:h-30 object-contain"
            />
          </div>
        </header>

        {/* Form Section */}
        <main className="flex flex-col items-center px-4">
          <h1 className="cinzel text-2xl md:text-3xl font-bold text-center">
            REGISTRASI
          </h1>
          <p className="cinzel text-lg md:text-xl mb-6 text-center">SAC PERS</p>

          <form className="w-full max-w-md space-y-4">
            <div>
              <InputField
                label="Nama Lengkap"
                name="name"
                value={data.name}
                onChange={handleChange}
                required
                error={errors?.name}
                labelClassName={"poppins"}
              />
            </div>
            <div>
              <InputField
                label="Nomor Telepon"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                required
                error={errors?.phone}
                labelClassName={"poppins"}
                type="tel"
              />
            </div>
            <div>
              <InputField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
                error={errors?.email}
                labelClassName={"poppins"}
                type="email"
              />
            </div>
            <div>
              <InputField
                label="Pekerjaan"
                name="job_title"
                value={data.job_title}
                onChange={handleChange}
                required
                error={errors?.job_title}
                labelClassName={"poppins"}
              />
            </div>
            <div>
              <InputField
                label="Institusi/Media"
                name="organization"
                value={data.organization}
                onChange={handleChange}
                required
                error={errors?.organization}
                labelClassName={"poppins"}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={processing}
              type="button"
              className={`cursor-pointer w-full text-white font-medium py-3 rounded-md flex items-center justify-center ${
                processing ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {processing ? (
                <>
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
                  Loading...
                </>
              ) : (
                "Daftar"
              )}
            </button>

            <p className="text-sm text-gray-300 text-center">
              Terms &amp; Conditions
            </p>
          </form>
        </main>

        {/* Footer  */}
        <footer className="text-center text-xs text-gray-400 p-4">
          Copyright © 2025 Alcomedia.id | Powered By Alco Media Indonesia
        </footer>
      </div>
    </>
  );
}
