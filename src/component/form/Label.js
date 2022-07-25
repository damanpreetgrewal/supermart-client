import React from "react";

const Label = ({ label }) => {
  return (
    <label className="block text-gray-500 font-medium text-sm leading-none mb-2">
      {label}
    </label>
  );
};

export default Label;
