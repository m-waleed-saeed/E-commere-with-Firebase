import React from 'react';

const Copyright = () => {
  const year = new Date().getFullYear();

  return (
    <div className="text-center py-4 text-sm text-white font-medium bg-[#121212]">
      &copy; {year} <span className="text-[#BB86FC]">Luxury Tech</span>. All rights reserved.
    </div>
  );
};

export default Copyright;
