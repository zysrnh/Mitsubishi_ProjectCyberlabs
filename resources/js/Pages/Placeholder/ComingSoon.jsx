export default function ComingSoon({ images }) {
  return (
    <>
      <div className="welcome-bg-main min-h-screen flex flex-col justify-between text-white">
        <header className="flex flex-col justify-center items-center p-5 gap-8">
          <img
            src={images["sby_art_white"]}
            alt="SBY Logo"
            className="h-25 md:h-25 object-contain"
          />
          <div className="flex">
            <div className="flex space-x-4">
              <img
                src={images["ekraf_white"]}
                alt="EKRAF Logo"
                className="h-20 md:h-25 object-contain"
              />
              <img
                src={images["kkri_white"]}
                alt="KEMENBUD Logo"
                className="h-20 md:h-25 object-contain"
              />
            </div>
          </div>
        </header>

        <div className="w-full flex justify-center">
          <main className="flex flex-col items-center px-4 text-center gap-4 max-w-3xl">
            <h1 className="cinzel text-3xl md:text-4xl font-bold">
              Coming Soon
            </h1>
            <img
              src={images["alco_white"]}
              alt="Alco Media Convex"
              className="h-35 md:h-40 object-contain"
            />
          </main>
        </div>

        <footer className="text-center text-xs text-gray-300 p-4">
          Copyright © 2025 Alcomedia.id | Powered By Alco Media Indonesia
        </footer>
      </div>
    </>
  );
}
