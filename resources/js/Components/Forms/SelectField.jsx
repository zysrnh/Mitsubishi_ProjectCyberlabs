import clsx from "clsx";

export default function SelectField({
  label,
  name,
  id,
  value,
  onChange,
  options = [],
  required = false,
  error,
  disabled = false,
  className,
  labelClassName,
  selectClassName,
  containerClassName,
  ...selectProps
}) {
  return (
    <div className={clsx("flex flex-col gap-2 lg:gap-4", containerClassName)}>
      <label
        htmlFor={id || name}
        className={clsx(
          "text-sm md:text-sm lg:text-base",
          {
            "text-gray-400": disabled,
            "text-red-600": error,
          },
          labelClassName
        )}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <select
        name={name}
        id={id || name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={clsx(
          " py-2 px-4 text-base text-black bg-gray-100 md:text-lg lg:text-xl lg:py-3 lg:px-5 rounded",
          "border border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
          "transition-colors duration-200",
          {
            "bg-gray-200 text-gray-500 cursor-not-allowed": disabled,
            "border-red-300 bg-red-50 focus:ring-red-500": error,
            "hover:bg-gray-200": !disabled && !error,
          },
          selectClassName,
          className
        )}
        {...selectProps}
      >
        <option className="" value="">
          --Pilih--
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option?.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className=" text-red-600 text-sm font-medium">{error}</span>
      )}
    </div>
  );
}
