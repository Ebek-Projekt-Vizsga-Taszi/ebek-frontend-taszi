import React from "react";

const Background = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {/* Finom szemcsés zaj effekt */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 dark:opacity-20" />
      
      {/* Lágy gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-blue-50/30 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-blue-900/10" />
      
      {/* Reszponzív geometriai mintázat */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[linear-gradient(170deg,transparent_65%,#3b82f6/10%)] dark:bg-[linear-gradient(170deg,transparent_65%,#1d4ed8/10%)]" />
    </div>
  );
};

export default Background;