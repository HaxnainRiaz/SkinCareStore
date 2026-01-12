"use client";

import React from 'react';

export const Input = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    required = false,
    className = "",
    error = "",
    icon: Icon
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-[#0a4019] mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#5e5e5d]">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`w-full ${Icon ? 'pl-14' : 'px-6'} py-4 bg-white border border-[#F5F3F0] rounded-2xl text-sm font-medium text-[#0a4019] placeholder-[#5e5e5d] focus:outline-none focus:ring-2 focus:ring-[#d3d3d3]/30 focus:border-[#d3d3d3] transition-all duration-300 shadow-sm hover:shadow-md ${error ? 'border-red-500 shadow-red-50' : ''}`}
                />
            </div>
            {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
        </div>
    );
};

