import React from "react";

const Loader = ({ fullPage = false, className = "" }) => {
    if (fullPage) {
        return (
            <img
                src="/images/spinner.gif"
                alt="spinner"
                className={`w-32 fixed top-[calc(50%-48px)] left-[calc(50%-64px)] ${className}`}
            />
        );
    }

    return (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-200 ${className}`}>
            <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-gray-600 rounded-full"></div>
        </div>
    );
};

export default Loader;
