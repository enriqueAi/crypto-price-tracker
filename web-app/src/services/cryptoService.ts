import axios, { AxiosError } from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second
const MIN_REFRESH_INTERVAL = 10000; // 10 seconds minimum between refreshes

let lastRefreshTime = 0;

// Helper function to add delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface Cryptocurrency {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    price_change_percentage_24h: number;
    price_change_percentage_1h_in_currency?: number;
    price_change_percentage_7d_in_currency?: number;
    sparkline_in_7d?: {
        price: number[];
    };
}

export const fetchCryptocurrencies = async (limit = 5): Promise<Cryptocurrency[]> => {
    const now = Date.now();
    const timeSinceLastRefresh = now - lastRefreshTime;

    if (timeSinceLastRefresh < MIN_REFRESH_INTERVAL) {
        throw new Error(`Please wait ${Math.ceil((MIN_REFRESH_INTERVAL - timeSinceLastRefresh) / 1000)} seconds before refreshing again`);
    }

    let retries = 0;

    while (retries < MAX_RETRIES) {
        try {
            const response = await axios.get(`${API_URL}/coins/markets`, {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: limit,
                    page: 1,
                    sparkline: true,
                    price_change_percentage: '1h,24h,7d'
                },
                timeout: 10000, // 10 second timeout
            });
            lastRefreshTime = Date.now();
            return response.data;
        } catch (error) {
            retries++;
            const axiosError = error as AxiosError;

            // Log detailed error information
            console.error('Error fetching cryptocurrencies:', {
                status: axiosError.response?.status,
                statusText: axiosError.response?.statusText,
                message: axiosError.message,
                attempt: retries,
            });

            // Handle rate limiting (429 status code)
            if (axiosError.response?.status === 429) {
                const errorMessage = 'Rate limit reached. Please try again in a few minutes.';
                console.log(errorMessage);
                throw new Error(errorMessage);
            }

            // If we've exhausted all retries, throw a more informative error
            if (retries === MAX_RETRIES) {
                throw new Error(
                    `Failed to fetch cryptocurrency data after ${MAX_RETRIES} attempts. ` +
                    `Last error: ${axiosError.message}`
                );
            }

            // Wait before retrying for other types of errors
            await delay(RETRY_DELAY * retries); // Exponential backoff
        }
    }

    // This should never be reached due to the throw in the last retry
    throw new Error('Unexpected error in fetchCryptocurrencies');
};

export const searchCryptocurrencies = async (query: string): Promise<Cryptocurrency[]> => {
    let retries = 0;

    while (retries < MAX_RETRIES) {
        try {
            const response = await axios.get(`${API_URL}/search`, {
                params: {
                    query,
                },
                timeout: 10000, // 10 second timeout
            });

            // Get detailed information for the search results
            const coins = response.data.coins.slice(0, 5);
            if (coins.length === 0) return [];

            const ids = coins.map((coin: any) => coin.id).join(',');

            const detailedResponse = await axios.get(`${API_URL}/coins/markets`, {
                params: {
                    vs_currency: 'usd',
                    ids,
                    order: 'market_cap_desc',
                    sparkline: true,
                    price_change_percentage: '1h,24h,7d'
                },
                timeout: 10000,
            });

            return detailedResponse.data;
        } catch (error) {
            retries++;
            const axiosError = error as AxiosError;

            console.error('Error searching cryptocurrencies:', {
                status: axiosError.response?.status,
                statusText: axiosError.response?.statusText,
                message: axiosError.message,
                attempt: retries,
            });

            if (axiosError.response?.status === 429) {
                console.log(`Rate limited. Waiting before retry attempt ${retries}...`);
                await delay(RETRY_DELAY * retries);
                continue;
            }

            if (retries === MAX_RETRIES) {
                throw new Error(
                    `Failed to search cryptocurrencies after ${MAX_RETRIES} attempts. ` +
                    `Last error: ${axiosError.message}`
                );
            }

            await delay(RETRY_DELAY);
        }
    }

    throw new Error('Unexpected error in searchCryptocurrencies');
}; 