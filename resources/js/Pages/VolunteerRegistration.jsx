import { Head, router, useForm, usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import { Wizard } from "react-use-wizard";
import VolunteerStep1 from "./VolunteerRegistration/VolunteerStep1";
import VolunteerStep2 from "./VolunteerRegistration/VolunteerStep2";
import VolunteerStep3 from "./VolunteerRegistration/VolunteerStep3";
import VolunteerStep4 from "./VolunteerRegistration/VolunteerStep4";
import VolunteerStep5 from "./VolunteerRegistration/VolunteerStep5";
import VolunteerStep6 from "./VolunteerRegistration/VolunteerStep6";
import { useEffect, useState } from "react";

export default function VolunteerRegistration({ events, images }) {
  const { flash } = usePage().props;
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    phone: "",
    email: "",
    event: "",
    job_title: "",
    organization: "",
    cv: "",
  });
  const [goBackToFirstStep, setGoBackToFirstStep] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setData(name, value);
  };

  const handleSubmit = () => {
    console.log(data);
    post(route("volunteer.submit_registration"), {
      data: data,
      onSuccess: (page) => {
        console.log("onSuccess triggered!", page);
        reset();

        setGoBackToFirstStep(true);
      },

      onError: (errors) => {
        console.log(errors);
      },
      onFinish: () => {
        console.log("onFinish triggered - request completed");
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
      <Head title="Register Volunteer" />
      <Toaster />
      <div class="bg-[#0a0a0a] text-white min-h-screen flex flex-col justify-between">
        {/* Top Section  */}
        <header class="flex justify-between items-center p-6">
          <img
            src={images["sby_art_white"]}
            alt="SBY Logo"
            class="h-20 md:h-30 object-contain"
          />
          <div class="flex space-x-4">
            <img
              src={images["ekraf_white"]}
              alt="EKRAF Logo"
              class="h-18 md:h-30 object-contain"
            />
            <img
              src={images["kkri_white"]}
              alt="KEMENBUD Logo"
              class="h-18 md:h-30 object-contain"
            />
          </div>
        </header>

        {/* Form Section */}
        <main class="flex flex-col items-center px-4">
          <h1 class="cinzel text-2xl md:text-3xl font-bold text-center">
            REGISTRASI
          </h1>
          <p class="cinzel text-lg md:text-xl mb-6 text-center">Volunteer</p>

          <form className="w-full max-w-md space-y-4">
            <Wizard>
              <VolunteerStep1
                data={data}
                setData={setData}
                handleChange={handleChange}
              />
              <VolunteerStep2
                data={data}
                setData={setData}
                handleChange={handleChange}
              />
              <VolunteerStep3
                data={data}
                setData={setData}
                handleChange={handleChange}
                events={events}
              />
              <VolunteerStep4
                data={data}
                setData={setData}
                handleChange={handleChange}
              />
              <VolunteerStep5
                data={data}
                setData={setData}
                handleChange={handleChange}
              />
              <VolunteerStep6
                data={data}
                setData={setData}
                handleChange={handleChange}
                onSubmit={handleSubmit}
                processing={processing}
                goBackToFirstStep={goBackToFirstStep}
                setGoBackToFirstStep={setGoBackToFirstStep}
              />
            </Wizard>
          </form>
        </main>

        {/* Footer  */}
        <footer class="text-center text-xs text-gray-400 p-4">
          Copyright © 2025 Alcomedia.id | Powered By Alco Media Indonesia
        </footer>
      </div>
    </>
  );
}
