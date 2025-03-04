import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCryptocurrencies, searchCryptocurrencies, Cryptocurrency } from '../services/cryptoService';
import { useState } from 'react';

export const useCryptoData = (limit = 5) => {
    const queryClient = useQueryClient();
    const [searchResults, setSearchResults] = useState<Cryptocurrency[]>([]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['cryptocurrencies', limit],
        queryFn: () => fetchCryptocurrencies(limit),
        staleTime: 60000, // 1 minute
    });

    const refreshData = useMutation({
        mutationFn: () => fetchCryptocurrencies(limit),
        onSuccess: (newData) => {
            queryClient.setQueryData(['cryptocurrencies', limit], newData);
        },
    });

    const searchCrypto = useMutation({
        mutationFn: (query: string) => searchCryptocurrencies(query),
        onSuccess: (data) => {
            setSearchResults(data);
        },
    });

    return {
        cryptocurrencies: data || [],
        isLoading,
        error,
        refreshData: refreshData.mutate,
        isRefreshing: refreshData.isPending,
        searchCrypto: searchCrypto.mutate,
        searchResults,
        isSearching: searchCrypto.isPending,
        searchError: searchCrypto.error,
    };
}; 