import React from 'react';
import { forwardRef } from 'react';

const Input = forwardRef(function Input({ label, id, error, textarea, ...props }, ref) {
  const baseClasses = "block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm md:text-base";
  const inputClasses = `${baseClasses} ${textarea ? 'h-24 md:h-32' : 'h-8 md:h-10'} ${error ? 'border-red-500' : 'border'}`;

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm md:text-base font-medium text-gray-700">
        {label}
      </label>
      {textarea ? (
        <textarea
          ref={ref}
          id={id}
          className={inputClasses}
          {...props}
        />
      ) : (
        <input
          ref={ref}
          id={id}
          className={inputClasses}
          {...props}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

export default Input;