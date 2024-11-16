import React from "react";

const LoadingSpinner = ({className}: { className?: string }) => {
  return (
    <div className={`h-screen bg-cyan-500 flex items-center justify-center ${className}`}>
      <div className="animate-spin rounded-full h-24 w-24 border-t-8 border-white border-solid"></div>
    </div>
  );
};

export default LoadingSpinner;
