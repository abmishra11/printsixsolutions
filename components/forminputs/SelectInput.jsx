import React from "react";

export default function SelectInput({
  label,
  name,
  register,
  className = "sm:col-span-2",
  options = [],
  multipleSelect = false,
  isRequired = true,
  onChange = undefined,
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
      >
        {isRequired ? `* ${label}` : `${label}`}
      </label>
      <div className="mt-2">
        <select
          {...register(`${name}`)}
          multiple={multipleSelect}
          id={name}
          name={name}
          required={isRequired}
          className="block w-full rounded-md border-0 py-3 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 dark:bg-transparent dark:text-slate-50"
          onChange={onChange} // This will only be used if onChange is provided
        >
          {options.map((option, i) => {
            return (
              <option
                key={i}
                value={option.id}
                style={{
                  color: "black",
                }}
              >
                {option.title}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
