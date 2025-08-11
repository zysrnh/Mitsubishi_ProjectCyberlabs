import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../Components/UI/LoadingSpinner";

export default function ChooseSeat({
  images,
  seatingType,
  seats,
  tables,
  formData,
  maxColumnCount,
}) {
  const { flash } = usePage().props;
  const [isGoingBack, setIsGoingBack] = useState(false);
  const [localTables, setLocalTables] = useState(tables || []);

  const { data, setData, post, processing, errors } = useForm({
    seat: null,
    seat_id: null,
    group_name: null,
    type: seatingType,
  });

  // Theater seat selection
  const chooseSeat = (seat) => {
    if (!seat.is_available) {
      toast.error("Kursi telah terisi");
      return;
    }

    setData({
      seat: seat,
      seat_id: seat.id,
      group_name: null,
      type: seatingType,
    });
  };

  // Table selection
  const chooseTable = (table) => {
    if (table.remaining <= 0) {
      toast.error("Meja sudah penuh");
      return;
    }

    // If same table is already selected, do nothing
    if (data.group_name === table.group_name) {
      return;
    }

    // Reset previous selection if any
    if (data.group_name) {
      setLocalTables((prev) =>
        prev.map((t) =>
          t.group_name === data.group_name
            ? { ...t, remaining: t.remaining + 1 }
            : t
        )
      );
    }

    // Update local state to show immediate feedback for new selection
    setLocalTables((prev) =>
      prev.map((t) =>
        t.group_name === table.group_name
          ? { ...t, remaining: t.remaining - 1 }
          : t
      )
    );

    setData({
      seat: null,
      seat_id: null,
      group_name: table.group_name,
      type: seatingType,
    });
  };

  const handleSubmit = () => {
    if (seatingType === "theater") {
      post(route("sac_vip.choose_seat"), {
        seat_id: data.seat.id,
        type: data.type,
      });
    } else {
      post(
        route("sac_vip.choose_seat"),
        {
          group_name: data.group_name,
          type: data.type,
        },
        {
          onError: (errors) => {
            // Reset local table state if submission fails
            setLocalTables(tables || []);
          },
        }
      );
    }
  };

  const goBack = () => {
    if (isGoingBack) return;
    setIsGoingBack(true);
    router.get(route("sac_vip.registration"));
  };

  useEffect(() => {
    if (!flash?.info) return;

    const info = flash.info;
    if (typeof info === "string") {
      toast(info);
    } else if (typeof info === "object") {
      if (info.error) {
        toast.error(info.error);
        // Reset local state on error
        if (info.table_full || info.seat_taken) {
          setLocalTables(tables || []);
        }
      } else if (info.success) {
        toast.success(info.success);
      } else if (info.info) {
        toast.info(info.info);
      } else if (info.warning) {
        toast.warning(info.warning);
      }
    }
  }, [flash?.info, tables]);

  const renderTheaterSeating = () => (
    <div className="overflow-x-auto w-full max-w-3xl mb-6">
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${maxColumnCount}, minmax(50px, 1fr))`,
        }}
      >
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => chooseSeat(seat)}
            style={{
              gridColumnStart: seat.column,
              gridRowStart: seat.row,
            }}
            className={`p-3 cursor-pointer rounded-md text-center flex justify-center items-center poppins text-sm font-medium
              ${
                seat.is_available
                  ? data.seat?.id === seat.id
                    ? "bg-blue-700 text-white"
                    : "bg-gray-700 hover:bg-blue-600"
                  : "bg-gray-500 text-gray-300 cursor-not-allowed"
              }`}
          >
            {seat.label}
          </button>
        ))}
      </div>
    </div>
  );

  const renderTableSeating = () => (
    <div className="w-full max-w-2xl mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {localTables.map((table) => (
          <button
            key={table.group_name}
            onClick={() => chooseTable(table)}
            className={`p-6 rounded-lg border-2 transition-all duration-200 ${
              table.remaining <= 0
                ? "bg-gray-600 border-gray-500 cursor-not-allowed opacity-50"
                : data.group_name === table.group_name
                ? "bg-blue-700 border-blue-500 text-white"
                : "bg-gray-700 border-gray-600 hover:bg-blue-600 hover:border-blue-500"
            }`}
            disabled={table.remaining <= 0}
          >
            <div className="text-center">
              <h3 className="poppins text-xl font-bold mb-2">
                {table.group_name}
              </h3>
              <div className="poppins text-sm">
                <p className="mb-1">
                  <span className="font-semibold">{table.remaining}</span> kursi
                  tersedia
                </p>
                <p className="text-gray-300">dari {table.total} kursi</p>
              </div>
              {table.remaining <= 0 && (
                <p className="text-red-400 font-medium mt-2">PENUH</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const getSubmitButtonText = () => {
    if (seatingType === "theater") {
      return (
        <>
          Pilih Kursi <b className="ml-2">{data.seat?.label}</b>
        </>
      );
    } else {
      return (
        <>
          Pilih Meja <b className="ml-2">{data.group_name}</b>
        </>
      );
    }
  };

  const canSubmit = () => {
    if (seatingType === "theater") {
      return data.seat?.id;
    } else {
      return data.group_name;
    }
  };

  return (
    <>
      <Head title="Pilih Kursi" />
      <Toaster />
      <div className="bg-[#0a0a0a] text-white min-h-screen flex flex-col justify-between">
        {/* Top Section */}
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

        {/* Main Content */}
        <main className="flex flex-col items-center px-4">
          <h1 className="cinzel text-2xl md:text-3xl font-bold text-center">
            {seatingType === "theater" ? "PILIH KURSI" : "PILIH MEJA"}
          </h1>
          <p className="cinzel text-lg md:text-xl mb-6 text-center capitalize">
            {seatingType}
          </p>

          {/* Participant Info */}
          <div className="w-full max-w-md bg-[#1a1a1a] rounded-lg p-4 mb-6">
            <table className="w-full poppins text-sm md:text-base">
              <tbody>
                <tr>
                  <td className="py-1">Nama</td>
                  <td className="px-1">:</td>
                  <td>{formData.name}</td>
                </tr>
                <tr>
                  <td className="py-1">Email</td>
                  <td className="px-1">:</td>
                  <td>{formData.email}</td>
                </tr>
                <tr>
                  <td className="py-1">Intitusi</td>
                  <td className="px-1">:</td>
                  <td>{formData.organization}</td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={goBack}
              disabled={isGoingBack}
              className={`cursor-pointer mt-4 w-full py-2 rounded-md font-medium flex items-center justify-center ${
                isGoingBack ? "bg-blue-400" : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              {isGoingBack ? (
                <LoadingSpinner />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                  Edit Informasi Saya
                </>
              )}
            </button>
          </div>

          {/* Seating/Table Selection */}
          {seatingType === "theater"
            ? renderTheaterSeating()
            : renderTableSeating()}

          {/* Submit */}
          {canSubmit() && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={processing}
              className={`cursor-pointer w-full max-w-md text-white font-medium py-3 rounded-md flex items-center justify-center ${
                processing ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {processing ? <LoadingSpinner /> : getSubmitButtonText()}
            </button>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 p-4">
          Copyright © 2025 CyberLabs | Powered By Alco Media Indonesia
        </footer>
      </div>
    </>
  );
}
