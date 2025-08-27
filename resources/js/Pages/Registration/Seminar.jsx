import { Head, useForm, usePage } from "@inertiajs/react";
import z from "zod";
import { useToast } from "@/hooks";
import { Header, Footer } from "@/components/layouts";
import { InputField, Button, SelectField } from "@/components/forms";

export default function Seminar({ images, sessions }) {
  const { flash } = usePage().props;
  const { data, setData, post, processing, errors, reset, setError } = useForm({
    name: "",
    phone: "",
    organization: "",
    email: "",
    session: "",
  });
  useToast(flash?.info);

  const schema = z.object({
    name: z.string().min(1, { message: "Nama wajib diisi." }),
    session: z.string().min(1, { message: "Sesi wajib diisi." }),
    phone: z.string().regex(/^(\+?62|0)\d{8,}$/, {
      message:
        "Nomor telepon tidak valid harus diawali '+62' atau '0' dan min. 10 digit.",
    }),
    organization: z
      .string()
      .min(1, { message: "Institusi/Universitas wajib diisi." }),
    email: z
      .string()
      .min(1, { message: "Email wajib diisi." })
      .email({ message: "Format email tidak valid." }),
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
    post(route("seminar.submit_form"), {
      onSuccess: (page) => {
        reset();
        setData({
          name: "",
          phone: "",
          email: "",
          organization: "",
          session: "",
        });
      },
    });
  };

  return (
    <>
      <Head title="Registrasi Seminar IKA ISMEI" />
      <div className="welcome-bg-main text-[#4a4a4a] min-h-screen flex flex-col justify-between">
        {/* Form Section */}
        <main className="flex flex-col items-center px-4">
          <Header images={images} />

          <h1 className="lexend text-white text-2xl md:text-3xl font-bold text-center">
            REGISTRASI
          </h1>
          <p className="lexend text-white text-lg md:text-xl mb-6 text-center">
            Seminar IKA ISMEI
          </p>

          <div className="w-full max-w-lg space-y-4 px-5 py-6 bg-[#fafafa] rounded-2xl">
            <form className="rubik w-full max-w-md space-y-4">
              <div>
                <InputField
                  label="Nama Lengkap"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  error={errors?.name}
                  labelClassName={"rubik"}
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
                  labelClassName={"rubik"}
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
                  labelClassName={"rubik"}
                  type="email"
                />
              </div>
              <div>
                <InputField
                  label="Institusi/Universitas"
                  name="organization"
                  value={data.organization}
                  onChange={handleChange}
                  required
                  error={errors?.organization}
                  labelClassName={"rubik"}
                />
              </div>
              <div>
                <SelectField
                  label="Sesi"
                  name="session"
                  id="session"
                  options={sessions}
                  onChange={handleChange}
                  error={errors?.session}
                />
              </div>

              <Button onClick={handleSubmit} processing={processing}>
                Daftar
              </Button>

              <p className="text-sm text-center">
                {/* Terms &amp; Conditions */}
              </p>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
