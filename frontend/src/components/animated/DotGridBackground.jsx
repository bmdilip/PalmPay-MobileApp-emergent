import React from 'react';

const DotGridBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(88, 107, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />
    </div>
  );
};

export default DotGridBackground;