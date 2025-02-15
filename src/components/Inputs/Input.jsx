import React from 'react'
import { forwardRef } from 'react';

const Input = forwardRef(function Input({ label, id,error,textarea, ...props}, ref) {
  const classes =
    'w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600';

  return (
    <>
    <div className="flex flex-col gap my-2 m-5">
      <label className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      {textarea ? (
        <textarea ref={ref} className={classes} {...props} />
      ) : (
        <input ref={ref} className={classes} id={id} {...props} 
        />
      )}
    <div className='text-red-800'>
      {error && <p>{error}</p>}
    </div>
    </div>
    </>
  );
});

export default Input;