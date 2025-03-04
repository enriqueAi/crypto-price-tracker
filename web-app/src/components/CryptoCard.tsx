'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cryptocurrency } from '../services/cryptoService';

interface CryptoCardProps {
    crypto: Cryptocurrency;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
    const isPriceUp = crypto.price_change_percentage_24h >= 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            <div className="p-4">
                <div className="flex items-center mb-3">
                    <img
                        src={crypto.image}
                        alt={crypto.name}
                        className="w-10 h-10 mr-3"
                    />
                    <div>
                        <h3 className="font-bold text-lg">{crypto.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 uppercase">{crypto.symbol}</p>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Price</span>
                        <span className="font-semibold text-lg">${crypto.current_price.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-600 dark:text-gray-300">24h Change</span>
                        <span className={`font-semibold ${isPriceUp ? 'text-green-500' : 'text-red-500'}`}>
                            {isPriceUp ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%
                        </span>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-600 dark:text-gray-300">Market Cap</span>
                        <span className="font-semibold">${(crypto.market_cap / 1000000).toFixed(2)}M</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CryptoCard; 