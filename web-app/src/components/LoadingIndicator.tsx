'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingIndicatorProps {
    size?: 'small' | 'medium' | 'large';
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ size = 'medium' }) => {
    const sizeMap = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
        large: 'w-12 h-12',
    };

    return (
        <div className="flex justify-center items-center">
            <motion.div
                className={`${sizeMap[size]} border-4 border-gray-200 border-t-blue-500 rounded-full`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    );
};

export default LoadingIndicator; 