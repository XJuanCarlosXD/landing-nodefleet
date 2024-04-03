import React from "react";

const Input = (props) => {
  if (props.textarea) {
    return (
      <div className="flex flex-col gap-2">
        <label className="font-sans font-semibold text-md" htmlFor={props.name}>
          {props.label}
        </label>
        <textarea
          {...props}
          className="p-2 rounded-lg bg-white/10 border border-white"
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-2">
        <label className="font-sans font-semibold text-md" htmlFor={props.name}>
          {props.label}
        </label>
        <input
          {...props}
          className="p-2 rounded-lg bg-white/10 border border-white"
        />
      </div>
    );
  }
};

export default Input;
