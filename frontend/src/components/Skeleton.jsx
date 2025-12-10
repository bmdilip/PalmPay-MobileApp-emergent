import React from 'react';

export const Skeleton = ({ className = '', width, height, rounded = 'md' }) => {
  const roundedClass = {
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'xl': 'rounded-xl',
    'full': 'rounded-full'
  }[rounded] || 'rounded-md';

  return (
    <div 
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] ${roundedClass} ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || '20px',
        animation: 'shimmer 2s infinite'
      }}
    />
  );
};

export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl p-5 space-y-4 border border-gray-100">
      <div className="flex items-center gap-4">
        <Skeleton width="48px" height="48px" rounded="lg" />
        <div className="flex-1 space-y-2">
          <Skeleton width="60%" height="16px" />
          <Skeleton width="40%" height="12px" />
        </div>
      </div>
      <Skeleton width="100%" height="12px" />
      <Skeleton width="80%" height="12px" />
    </div>
  );
};

export const SkeletonTransaction = () => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100">
      <Skeleton width="40px" height="40px" rounded="full" />
      <div className="flex-1 space-y-2">
        <Skeleton width="50%" height="14px" />
        <Skeleton width="30%" height="12px" />
      </div>
      <div className="text-right space-y-2">
        <Skeleton width="60px" height="16px" />
        <Skeleton width="40px" height="10px" />
      </div>
    </div>
  );
};

export const SkeletonProfile = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4">
        <Skeleton width="80px" height="80px" rounded="full" />
        <div className="flex-1 space-y-3">
          <Skeleton width="50%" height="20px" />
          <Skeleton width="30%" height="14px" />
        </div>
      </div>
      
      {/* Menu Items Skeleton */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-lg">
          <Skeleton width="24px" height="24px" rounded="md" />
          <Skeleton width="60%" height="16px" />
        </div>
      ))}
    </div>
  );
};

export const SkeletonHome = () => {
  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton width="150px" height="24px" />
        <Skeleton width="100px" height="16px" />
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl p-6 space-y-4">
        <Skeleton width="100px" height="14px" />
        <Skeleton width="60%" height="32px" />
        <Skeleton width="40%" height="12px" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton width="56px" height="56px" rounded="xl" />
            <Skeleton width="40px" height="12px" />
          </div>
        ))}
      </div>

      {/* Transactions */}
      <div className="space-y-3">
        <Skeleton width="120px" height="16px" />
        {[1, 2, 3].map((i) => (
          <SkeletonTransaction key={i} />
        ))}
      </div>
    </div>
  );
};

// Global shimmer animation style
const shimmerStyle = `
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

// Inject shimmer animation into document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shimmerStyle;
  if (!document.querySelector('style[data-skeleton-shimmer]')) {
    style.setAttribute('data-skeleton-shimmer', 'true');
    document.head.appendChild(style);
  }
}

export default Skeleton;
