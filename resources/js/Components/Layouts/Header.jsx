import clsx from "clsx";

export default function Header({ images, isLarge }) {
  return (
    <>
      <header className="w-screen p-4 flex justify-center mb-4">
        <img
          src={images["logo_ikaismei"]}
          alt="Logo IKA ISMEI"
          className={clsx(
            "transition-all duration-300", // base classes
            isLarge ? "w-36 md:w-40" : "w-25 md:w-36" // conditional sizing
          )}
        />
      </header>
    </>
  );
}
