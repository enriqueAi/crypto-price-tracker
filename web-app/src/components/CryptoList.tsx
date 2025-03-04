'use client';

import React from 'react';
import { Cryptocurrency } from '../services/cryptoService';
import LoadingIndicator from './LoadingIndicator';
import SparklineChart from './SparklineChart';

interface CryptoListProps {
    cryptocurrencies: Cryptocurrency[];
    isLoading: boolean;
    error: Error | null;
}

const CryptoList: React.FC<CryptoListProps> = ({ cryptocurrencies, isLoading, error }) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <LoadingIndicator size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> Failed to load cryptocurrency data. Please try again later.</span>
            </div>
        );
    }

    if (cryptocurrencies.length === 0) {
        return (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">No cryptocurrencies found. Try a different search term.</span>
            </div>
        );
    }

    // Helper function to render percentage change with color and arrow
    const renderPercentageChange = (value: number | undefined) => {
        if (value === undefined) return 'N/A';

        const isPositive = value >= 0;
        return (
            <span className={`${isPositive ? 'text-green-500' : 'text-red-500'} flex items-center justify-end`}>
                <span className={`mr-1 ${isPositive ? 'transform transition-transform group-hover:translate-y-[-2px]' : 'transform transition-transform group-hover:translate-y-[2px]'}`}>
                    {isPositive ? '▲' : '▼'}
                </span>
                <span>{Math.abs(value).toFixed(1)}%</span>
            </span>
        );
    };

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-300">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">#</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Coin</th>
                        <th className="px-4 py-3 text-right text-sm font-bold text-gray-600 uppercase tracking-wider">Price</th>
                        <th className="px-4 py-3 text-right text-sm font-bold text-gray-600 uppercase tracking-wider">1h</th>
                        <th className="px-4 py-3 text-right text-sm font-bold text-gray-600 uppercase tracking-wider">24h</th>
                        <th className="px-4 py-3 text-right text-sm font-bold text-gray-600 uppercase tracking-wider">7d</th>
                        <th className="px-4 py-3 text-right text-sm font-bold text-gray-600 uppercase tracking-wider">Market Cap</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-gray-600 uppercase tracking-wider">Last 7 Days</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {cryptocurrencies.map((crypto, index) => (
                        <tr
                            key={crypto.id}
                            className={`hover:bg-blue-50 transition-colors duration-200 
                                ${crypto.symbol.toLowerCase() === 'btc' ? 'bg-yellow-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                        >
                            <td className="px-4 py-4 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">{index + 1}</span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 flex-shrink-0 mr-3 rounded-full shadow-sm overflow-hidden">
                                        <img src={crypto.image} alt={crypto.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{crypto.name}</div>
                                        <div className="text-xs text-gray-500">{crypto.symbol.toUpperCase()}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                ${crypto.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium group">
                                {renderPercentageChange(crypto.price_change_percentage_1h_in_currency)}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium group">
                                {renderPercentageChange(crypto.price_change_percentage_24h)}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium group">
                                {renderPercentageChange(crypto.price_change_percentage_7d_in_currency)}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                ${crypto.market_cap.toLocaleString()}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-center">
                                {crypto.sparkline_in_7d?.price ? (
                                    <SparklineChart
                                        data={crypto.sparkline_in_7d.price}
                                        width={120}
                                        height={40}
                                        lineColor={crypto.price_change_percentage_7d_in_currency && crypto.price_change_percentage_7d_in_currency >= 0 ? '#10B981' : '#EF4444'}
                                    />
                                ) : (
                                    <span className="text-gray-400 text-sm">No data</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoList; 