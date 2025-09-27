import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const ScreenLoader = () => {
  const spinnerIcon = <LoadingOutlined style={{ fontSize: 48, color: '#BB86FC' }} spin />;

  return (
    <div className="fixed inset-0 bg-[#121212] flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="text-center space-y-6">
        {/* Animated Spinner */}
        <div className="flex justify-center">
          <Spin indicator={spinnerIcon} />
        </div>
        
        {/* Loading Text with Animation */}
        <div className="space-y-2">
          <h3 className="text-[#FFFFFF] text-xl font-medium font-['Inter'] tracking-wide">
            Loading Excellence
          </h3>
          </div>
        
        {/* Progress Bar */}
        <div className="w-64 mx-auto bg-[#1E1E1E] rounded-full h-1.5 border border-[#2D2D2D]">
          <div className="bg-gradient-to-r from-[#BB86FC] to-[#9C6DE4] h-full rounded-full animate-pulse w-3/4"></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="flex justify-center space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-[#BB86FC] rounded-full opacity-60 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScreenLoader;