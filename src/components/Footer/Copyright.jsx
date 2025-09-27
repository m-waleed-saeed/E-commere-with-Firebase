import React from 'react';

const Copyright = () => {
  const year = new Date().getFullYear();

  return (
    <div className="text-center py-4 text-sm text-white font-medium bg-[#121212]">
      &copy; {year} All rights reserved. Developed by <span className='text-[#BB86FC]'>Muhammad Waleed</span>
    </div>
  );
};

export default Copyright;
