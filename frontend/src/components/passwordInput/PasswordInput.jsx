import React, { useState } from 'react';

const PasswordInput = ({ label, value, onChange }) => {

    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };
  return (
    <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            <div className="relative">
                <input
                    type={visible ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    className="w-full p-2 border rounded"
                />
                <button type="button"
                    onClick={toggleVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                    {visible ? 'Hide' : 'Show'}
                </button>
            </div>
        </div>
  )
}

export default PasswordInput