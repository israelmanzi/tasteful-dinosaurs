import React from 'react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function UserInput({ label, ...props }: AuthInputProps) {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-start text-sm font-medium text-gray-500"
      >
        {label}
      </label>
      <input
        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-slate-800 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
        {...props}
      />
    </div>
  );
}
