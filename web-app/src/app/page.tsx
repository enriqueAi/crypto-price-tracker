'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import RefreshButton from '../components/RefreshButton';
import CryptoList from '../components/CryptoList';
import { useCryptoData } from '../hooks/useCryptoData';
import { Cryptocurrency } from '../services/cryptoService';

export default function Home() {
  const [displayMode, setDisplayMode] = useState<'default' | 'search'>('default');
  const {
    cryptocurrencies,
    isLoading,
    error,
    refreshData,
    isRefreshing,
    searchCrypto,
    searchResults,
    isSearching,
    searchError
  } = useCryptoData();

  const handleSearch = async (query: string) => {
    try {
      await searchCrypto(query);
      setDisplayMode('search');
    } catch (err) {
      // Error will be handled by the useCryptoData hook
      console.error('Search failed:', err);
    }
  };

  const handleRefresh = async () => {
    try {
      if (displayMode === 'search') {
        setDisplayMode('default');
      }
      await refreshData();
    } catch (err) {
      // Error will be handled by the useCryptoData hook
      console.error('Refresh failed:', err);
    }
  };

  const handleBackToDefault = () => {
    setDisplayMode('default');
  };

  const displayedCryptos: Cryptocurrency[] =
    displayMode === 'search' ? searchResults : cryptocurrencies;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-2 sm:px-4 py-6 max-w-7xl">
        <header className="mb-6 text-center" role="banner">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">
            Crypto Price Tracker
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Track live prices of popular cryptocurrencies
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
            <SearchBar
              onSearch={handleSearch}
              isSearching={isSearching}
              error={searchError}
            />
            <RefreshButton
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
            />
          </div>

          {displayMode === 'search' && searchResults.length > 0 && (
            <div className="mb-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToDefault}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                aria-label="Return to default cryptocurrency list"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Default List
              </motion.button>
            </div>
          )}
        </header>

        <main role="main">
          <CryptoList
            cryptocurrencies={displayedCryptos}
            isLoading={displayMode === 'default' ? isLoading : isSearching}
            error={error || searchError}
          />
        </main>

        <footer className="mt-12 text-center text-gray-500 text-sm" role="contentinfo">
          <p>Data provided by CoinGecko API</p>
          <p className="mt-1">© {new Date().getFullYear()} Crypto Price Tracker</p>
        </footer>
      </div>
    </div>
  );
}
