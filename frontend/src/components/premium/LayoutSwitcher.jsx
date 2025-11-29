import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { List, Grid3x3, LayoutGrid } from 'lucide-react';

const LayoutSwitcher = ({ currentLayout, onChange }) => {
  const [layout, setLayout] = useState(currentLayout || 'list');

  const layouts = [
    { id: 'list', icon: List, label: 'List View' },
    { id: 'grid', icon: Grid3x3, label: 'Grid View' },
    { id: 'compact', icon: LayoutGrid, label: 'Compact View' }
  ];

  useEffect(() => {
    // Load saved preference
    const savedLayout = localStorage.getItem('transactionLayout');
    if (savedLayout) {
      setLayout(savedLayout);
      onChange?.(savedLayout);
    }
  }, []);

  const handleLayoutChange = (layoutId) => {
    setLayout(layoutId);
    onChange?.(layoutId);
    // Save to localStorage
    localStorage.setItem('transactionLayout', layoutId);
  };

  return (
    <div className="inline-flex gap-1 p-1 bg-[rgba(0,200,214,0.1)] border border-[rgba(0,200,214,0.2)] rounded-lg">
      {layouts.map((layoutOption) => {
        const IconComponent = layoutOption.icon;
        const isActive = layout === layoutOption.id;
        
        return (
          <motion.button
            key={layoutOption.id}
            onClick={() => handleLayoutChange(layoutOption.id)}
            className={`
              relative w-8 h-8 flex items-center justify-center rounded-md transition-colors
              ${isActive ? '' : 'hover:bg-[rgba(0,200,214,0.15)]'}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={layoutOption.label}
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-[rgba(0,200,214,0.3)] rounded-md"
                layoutId="activeLayout"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <IconComponent
              className={`w-4 h-4 relative z-10 ${
                isActive ? 'text-[#00C8D6]' : 'text-gray-600'
              }`}
            />
          </motion.button>
        );
      })}
    </div>
  );
};

export default LayoutSwitcher;