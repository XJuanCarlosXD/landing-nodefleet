import React from "react";

const Input = ({ label, name, register, errors, textarea, ...rest }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-sans font-semibold text-md" htmlFor={name}>
        {label}
      </label>
      {textarea ? (
        <textarea
          {...rest}
          id={name}
          name={name}
          {...register(name, { required: `${label} is required` })}
          className="p-2 rounded-lg outline-none bg-white/10 border border-white"
        />
      ) : (
        <input
          {...rest}
          id={name}
          name={name}
          {...register(name, { required: `${label} is required` })}
          className="p-2 rounded-lg outline-none bg-white/10 border border-white"
        />
      )}
      {errors && (
        <span className="text-red-500 font-semibold text-sm">
          {errors.message}
        </span>
      )}
    </div>
  );
};

export default Input;
