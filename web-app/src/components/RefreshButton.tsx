'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingIndicator from './LoadingIndicator';

interface RefreshButtonProps {
    onRefresh: () => void;
    isRefreshing: boolean;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onRefresh, isRefreshing }) => {
    const [error, setError] = useState<string | null>(null);

    // Clear error after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleRefresh = async () => {
        try {
            setError(null);
            await onRefresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while refreshing');
        }
    };

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:bg-green-300"
            >
                {isRefreshing ? (
                    <>
                        <LoadingIndicator size="small" />
                        <span className="ml-2">Refreshing...</span>
                    </>
                ) : (
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        Refresh Prices
                    </>
                )}
            </motion.button>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded shadow-lg z-10"
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RefreshButton; 