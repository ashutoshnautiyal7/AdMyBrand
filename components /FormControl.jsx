import React from "react";

const FormControl = ({ label, options, value, onChange, errorMessage }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <select
        className={`border rounded w-full py-2 px-3 `}
        value={value}
        onChange={handleChange}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default FormControl;
