// import React from 'react';

// const LoadingSpinner = () => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//       <div className="relative">
//         <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-8 h-8 bg-gold rounded-full animate-ping"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoadingSpinner;

import React from 'react';

const LoadingSpinner = ({ size = 'large', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center justify-center">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-gold border-t-transparent rounded-full animate-spin`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`${size === 'small' ? 'w-4 h-4' : size === 'medium' ? 'w-6 h-6' : 'w-8 h-8'} bg-gold rounded-full animate-ping`}></div>
        </div>
      </div>
      {text && (
        <p className="mt-4 text-white font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;