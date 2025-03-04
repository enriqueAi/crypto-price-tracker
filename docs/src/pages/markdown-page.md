---
title: Markdown page example
---

# Markdown page example

You don't need React to write simple standalone pages.

---
sidebar_position: 1
---

# Introduction

## Crypto Price Tracker

The Crypto Price Tracker is a web application I built with Next.js that allows users to track live cryptocurrency prices. This documentation covers the project's setup, API integration, and the reasoning behind my technical decisions.

### Project Overview

I created this tracker with several key features in mind:

- Real-time display of popular cryptocurrency prices in a responsive table layout
- Visual 7-day sparkline charts for each cryptocurrency
- Price changes over multiple time periods (1h, 24h, 7d)
- A search function to find specific cryptocurrencies
- A manual refresh button for updating prices on demand
- Responsive design that works well on any device
- Loading indicators to improve the user experience

### Technology Stack

For this project, I selected these technologies:

- **Next.js 15** - For server-side rendering and better performance
- **React 19** - The foundation for building the UI components
- **TypeScript** - To add type safety and improve code quality
- **React Query** - My choice for data fetching and state management
- **Axios** - For making HTTP requests to the CoinGecko API
- **Framer Motion** - To add subtle animations that enhance the UX
- **Tailwind CSS** - For rapid UI development with utility classes

### Project Structure

I organized the project with a modular structure to keep the code maintainable:
    src/
    ├── app/ # Next.js App Router
    │ ├── page.tsx # Main dashboard page
    │ ├── layout.tsx # Root layout
    │ └── globals.css # Global styles
    ├── components/ # Reusable UI components
    │ ├── CryptoList.tsx # Table display of cryptocurrencies
    │ ├── SparklineChart.tsx # 7-day price chart visualization
    │ ├── SearchBar.tsx # Search functionality
    │ ├── RefreshButton.tsx # Manual refresh button
    │ └── LoadingIndicator.tsx # Loading state indicator
    ├── services/ # API and data services
    │ └── cryptoService.ts # CoinGecko API integration
    └── hooks/ # Custom React hooks
    └── useCryptoData.ts # React Query hook for crypto data

This structure helps separate concerns and makes it easier to navigate the codebase.

---
sidebar_position: 2
---

# Setup Guide

This guide will walk you through setting up and running the Crypto Price Tracker project on your local machine.

## Prerequisites

Before diving in, make sure you have:

- Node.js 18.x or later (I developed this with Node 18.16.0)
- npm or yarn package manager

## Installation

Follow these steps to get up and running:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crypto-price-tracker.git
   cd crypto-price-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Fire up the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser and you should see the app running!

## Project Structure

I've organized the code into these main directories:

- `src/app`: Contains the Next.js App Router files - the backbone of the application
- `src/components`: Houses all the UI components - I've kept these modular and reusable
- `src/services`: Contains the API service functions - all external data fetching happens here
- `src/hooks`: Custom React hooks that handle state and data flow

## Environment Variables

The project uses the CoinGecko public API which doesn't require an API key for basic usage. If you need to configure environment variables (for example, if you want to use a different API), create a `.env.local` file in the root directory:

    NEXT_PUBLIC_API_URL=https://api.coingecko.com/api/v3


I've kept external dependencies minimal to make setup easier.

## Building for Production

When you're ready to deploy, build the application:

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm run start
# or
yarn start
```

The production build is optimized for performance and should run significantly faster than the development version.

---
sidebar_position: 3
---

# API Integration

## CoinGecko API

For this project, I chose the [CoinGecko API](https://www.coingecko.com/en/api) because I've used it before while being reliable,, and offering free access to cryptocurrency data. It provides all the information we need without requiring authentication for basic usage which is a huge bonus.

## How I Implemented the API Service

I created a dedicated service in `src/services/cryptoService.ts` to handle all API interactions. This keeps the API logic separate from the UI components and makes the code more maintainable.

### Cryptocurrency Interface

First, I defined a TypeScript interface to represent the cryptocurrency data structure:

```typescript
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
```

This gives us type safety throughout the application and makes it clear what data we're working with.

### Fetching Cryptocurrencies

The main function to fetch cryptocurrency data looks like this:

```typescript
export const fetchCryptocurrencies = async (limit = 5): Promise<Cryptocurrency[]> => {
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
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    throw error;
  }
};
```

I set the default limit to 5 cryptocurrencies to keep the initial load fast, but this can be adjusted as needed.

### Search Implementation

The search functionality was tricky to implement. CoinGecko's search endpoint doesn't return price data directly, so I had to create a two-step process:

```typescript
export const searchCryptocurrencies = async (query: string): Promise<Cryptocurrency[]> => {
  try {
    // Step 1: Search for cryptocurrencies by name/symbol
    const response = await axios.get(`${API_URL}/search`, {
      params: {
        query,
      },
    });
    
    // Step 2: Get detailed information for the search results
    const coins = response.data.coins.slice(0, 5);
    if (coins.length === 0) return [];
    
    const ids = coins.map((coin: any) => coin.id).join(',');
    
    const detailedResponse = await axios.get(`${API_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids,
        order: 'market_cap_desc',
        sparkline: false,
      },
    });
    
    return detailedResponse.data;
  } catch (error) {
    console.error('Error searching cryptocurrencies:', error);
    throw error;
  }
};
```

This approach gives us the best of both worlds: the search capability of the `/search` endpoint and the detailed price data from the `/coins/markets` endpoint.

## Error Handling

I've built robust error handling into the API service to catch issues before they affect the user experience. When something goes wrong with an API call, we log it and show a friendly message to the user.

All API calls are wrapped in try/catch blocks, and errors are propagated up to the UI layer where they can be handled appropriately.

## Rate Limiting Considerations

CoinGecko's free API has rate limits (about 10-50 calls per minute depending on the endpoint). To respect these limits and provide a good user experience, I:

1. Implemented caching with React Query to reduce redundant API calls
2. Added a manual refresh button instead of automatic polling
3. Limited the number of cryptocurrencies fetched at once

These measures help prevent hitting rate limits while still providing up-to-date information.

### Challenge: Rate Limiting

**Problem**: The CoinGecko API has rate limits that could be easily exceeded during development and testing.

**Solution**: 
When I first started making API calls, I quickly ran into rate limiting issues during testing. To solve this, I:

- Implemented caching with React Query to reduce the number of API calls
- Added a manual refresh button instead of automatic polling
- Set appropriate stale times for queries to prevent unnecessary refetching

These changes dramatically reduced the number of API calls and prevented rate limit errors.

### Challenge: Current Rate Limiting Issues with Search

**Problem**: The search functionality makes two API calls in quick succession (one to `/search` and another to `/coins/markets`), which can easily trigger rate limits, especially when users type quickly or make multiple searches.

**Current Implementation Limitations**:
- Only uses a 1-second delay between retries
- Makes two API calls for each search query
- Simple retry mechanism may not be sufficient for heavy usage

**Potential Solutions**:
1. Implement request debouncing for search input
2. Increase the retry delay to 30-60 seconds when rate limited
3. Cache search results for frequently searched terms
4. Add a proper rate limiter that tracks API calls across the entire application
5. Consider implementing server-side caching for popular searches

## UI Components

## Table Layout

I implemented a responsive table layout to display cryptocurrency data in an organized and scannable format. The table includes columns for:

- Rank (#)
- Coin name and symbol with icon
- Current price
- Price changes (1h, 24h, 7d)
- 7-day sparkline chart
- Market cap
- Action button

The table is fully responsive and adapts to different screen sizes, with the sparkline column hiding on mobile devices to preserve space.

## Sparkline Charts

One of the key visual features is the 7-day sparkline chart for each cryptocurrency. I implemented this using HTML Canvas for optimal performance:

```typescript
const SparklineChart: React.FC<SparklineChartProps> = ({
    data,
    width = 120,
    height = 40,
    lineColor,
    lineWidth = 1.5,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isPositive = data.length > 1 ? data[data.length - 1] > data[0] : true;
    const defaultColor = isPositive ? '#10B981' : '#EF4444'; // green for positive, red for negative
    const color = lineColor || defaultColor;

    useEffect(() => {
        if (!canvasRef.current || !data || data.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Draw the sparkline
        // ... drawing logic ...
    }, [data, width, height, color, lineWidth]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="inline-block"
        />
    );
};
```

The sparklines are color-coded (green for positive trends, red for negative) and provide a quick visual representation of price movement over the past week.

## Currency Icons

I enhanced the currency icons with a circular border and background for a more polished look:

```jsx
<div className="w-10 h-10 flex-shrink-0 mr-3 bg-gray-100 rounded-full p-1 border border-gray-200">
    <img src={crypto.image} alt={crypto.name} className="w-full h-full rounded-full" />
</div>
```

This gives the icons a more polished and consistent appearance throughout the application.

## Responsive Design

I implemented a fully responsive design that works well on devices of all sizes:

- On desktop, the full table is displayed with all columns
- On tablets, the layout adjusts with optimized spacing
- On mobile devices, the sparkline column is hidden and text sizes are reduced
- The table becomes horizontally scrollable on very small screens

This ensures a good user experience regardless of the device being used.

---
sidebar_position: 5
---

# Challenges & Solutions

## Development Journey

I started this project by setting up the basic Next.js structure and planning the component hierarchy. The first challenge was deciding on a state management approach - I considered several options including Context API and Zustand, but ultimately chose React Query because of its built-in caching and data fetching capabilities.

### Challenge: Rate Limiting with Search Functionality

**Problem**: Our search functionality is currently experiencing rate limiting issues because it makes two API calls in quick succession (one to `/search` and another to `/coins/markets`). This is particularly problematic when users type quickly or make multiple searches.

**Current Implementation Limitations**:
- The retry mechanism only uses a 1-second delay between retries
- Each search requires two separate API calls
- The simple retry mechanism isn't sufficient for heavy usage patterns

**Solution In Progress**: 
We're currently working on improving this by considering several approaches:

1. Implementing request debouncing for search input to prevent rapid-fire API calls
2. Increasing the retry delay to 30-60 seconds when rate limited
3. Adding a caching layer for frequently searched terms
4. Implementing a proper rate limiter to track API calls across the application
5. Adding server-side caching for popular searches

These improvements will help manage the API rate limits more effectively while maintaining a smooth user experience.

### Challenge: Initial Design Approach

**Problem**: When I first started the project, I struggled with creating a cohesive and professional design that would effectively display complex cryptocurrency data while maintaining good user experience.

**Solution**: 
My breakthrough came when I started thinking about the user journey and breaking down the UI into smaller, manageable components. I began with a basic table layout and iteratively improved it:

1. First, I focused on the core functionality and basic layout
2. Then, I added visual hierarchy using typography and spacing
3. Finally, I incorporated interactive elements like hover states and animations

The turning point came when I started using Tailwind CSS's utility classes systematically. What initially felt overwhelming became intuitive as I developed a consistent pattern for:
- Using spacing utilities (margin and padding)
- Implementing responsive designs
- Creating consistent color schemes
- Adding interactive states

This systematic approach helped everything "click" into place, and the design started feeling more cohesive and professional.

### Challenge: Future Enhancement Plans

**Problem**: While developing this project, I identified several features I wanted to implement but had to prioritize core functionality first.

**Current Status**: I've created a roadmap of future enhancements that I plan to learn and implement:

1. **Dark/Light Mode Toggle**: 
   - Learning how to implement theme switching in Next.js
   - Understanding CSS variables for theming
   - Implementing user preference persistence

2. **Advanced Chart Visualizations**:
   - Implementing interactive price history charts
   - Adding date range selectors
   - Creating comparison views for multiple cryptocurrencies

```typescript
// Example of theme implementation (future enhancement)
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

These enhancements represent my learning roadmap as I continue to develop my skills in React and Next.js development.

## API Integration Challenges

### Challenge: Rate Limiting

**Problem**: The CoinGecko API has rate limits that could be easily exceeded during development and testing.

**Solution**: 
When I first started making API calls, I quickly ran into rate limiting issues during testing. To solve this, I:

- Implemented caching with React Query to reduce the number of API calls
- Added a manual refresh button instead of automatic polling
- Set appropriate stale times for queries to prevent unnecessary refetching

These changes dramatically reduced the number of API calls and prevented rate limit errors.

### Challenge: Current Rate Limiting Issues with Search

**Problem**: The search functionality makes two API calls in quick succession (one to `/search` and another to `/coins/markets`), which can easily trigger rate limits, especially when users type quickly or make multiple searches.

**Current Implementation Limitations**:
- Only uses a 1-second delay between retries
- Makes two API calls for each search query
- Simple retry mechanism may not be sufficient for heavy usage

**Potential Solutions**:
1. Implement request debouncing for search input
2. Increase the retry delay to 30-60 seconds when rate limited
3. Cache search results for frequently searched terms
4. Add a proper rate limiter that tracks API calls across the entire application
5. Consider implementing server-side caching for popular searches

### Challenge: Search Implementation

**Problem**: The CoinGecko search API returns limited data that doesn't include price information.

**Solution**: 
When I first implemented the search functionality, I hit a roadblock with the CoinGecko API. The search endpoint didn't return price data, which was frustrating. After digging through their documentation, I realized I needed to implement a two-step process:

1. First, search for cryptocurrencies by name/symbol using the `/search` endpoint
2. Then, fetch detailed information for the search results using the `/coins/markets` endpoint with the IDs from the search results

```typescript
export const searchCryptocurrencies = async (query: string): Promise<Cryptocurrency[]> => {
  try {
    // Step 1: Search for cryptocurrencies
    const response = await axios.get(`${API_URL}/search`, {
      params: { query },
    });
    
    // Step 2: Get detailed information for the search results
    const coins = response.data.coins.slice(0, 5);
    if (coins.length === 0) return [];
    
    const ids = coins.map((coin: any) => coin.id).join(',');
    
    const detailedResponse = await axios.get(`${API_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids,
        order: 'market_cap_desc',
        sparkline: false,
      },
    });
    
    return detailedResponse.data;
  } catch (error) {
    console.error('Error searching cryptocurrencies:', error);
    throw error;
  }
};
```

This approach worked well, though it does mean each search requires two API calls.

## State Management Challenges

### Challenge: Managing Search Results

**Problem**: I needed to maintain both the default list of cryptocurrencies and search results without conflicts.

**Solution**: 
I initially tried to store both sets of data in React Query, but this led to confusion when switching between views. Instead, I:

- Used React Query for the default list of cryptocurrencies
- Used local React state for search results
- Created a display mode state to toggle between default and search views

```typescript
const [displayMode, setDisplayMode] = useState<'default' | 'search'>('default');
const [searchResults, setSearchResults] = useState<Cryptocurrency[]>([]);

// In the search mutation
const searchCrypto = useMutation({
  mutationFn: (query: string) => searchCryptocurrencies(query),
  onSuccess: (data) => {
    setSearchResults(data);
    setDisplayMode('search');
  },
});
```

This separation made the code much cleaner and easier to reason about.

### Challenge: Refreshing Data

**Problem**: I needed a way to manually refresh data while showing loading state.

**Solution**: 
I tried a few approaches here, including using the `refetch` function from `useQuery`, but I wanted more control over the process. I ended up using React Query's `useMutation` for the refresh functionality:

```typescript
const refreshData = useMutation({
  mutationFn: () => fetchCryptocurrencies(limit),
  onSuccess: (newData) => {
    queryClient.setQueryData(['cryptocurrencies', limit], newData);
  },
});
```

This approach gave me fine-grained control over the loading state and allowed me to update the cache directly.

## UI/UX Challenges

### Challenge: Loading States

**Problem**: I needed to show loading states during API calls without full page reloads.

**Solution**: 
I created a reusable `LoadingIndicator` component with Framer Motion animations. The trickiest part was deciding when to show loading states - I didn't want to show a loading spinner for quick refreshes, but I needed to indicate that something was happening.

I ended up using React Query's `isLoading` and `isPending` states to control when to show loading indicators:

```tsx
{isLoading ? (
  <LoadingIndicator size="large" />
) : (
  <CryptoList cryptocurrencies={displayedCryptos} />
)}
```

For the refresh button, I added a smaller loading indicator inside the button itself, which provides feedback without disrupting the UI.

### Challenge: Responsive Design

**Problem**: Ensuring the application works well on all device sizes.

**Solution**: 
I started with a mobile-first approach and used Tailwind CSS's responsive utilities to adapt the layout for larger screens. The grid layout for cryptocurrency cards was particularly challenging to get right:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {cryptocurrencies.map((crypto) => (
    <CryptoCard key={crypto.id} crypto={crypto} />
  ))}
</div>
```

This creates a single column on mobile, two columns on medium screens, and three columns on large screens. I tested extensively on different devices to ensure everything looked good.

## Error Handling Challenges

### Challenge: Graceful Error Handling

**Problem**: I needed to handle API errors gracefully without breaking the UI.

**Solution**: 
My first attempt at error handling was too basic - just a console.log in the catch block. This wasn't helpful for users. I improved it by:

- Implementing try/catch blocks in all API calls
- Creating error states in the UI to display user-friendly error messages
- Using React Query's built-in error handling

```tsx
if (error) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline"> Failed to load cryptocurrency data. Please try again later.</span>
    </div>
  );
}
```

This approach ensures users always know what's happening, even when things go wrong.

## Tips for Working with This Codebase

- When adding new API endpoints, follow the pattern in cryptoService.ts
- The React Query hooks are centralized in the hooks directory for easier maintenance
- Component props are strictly typed with TypeScript interfaces for better code completion
- If you need to modify the UI, the component structure follows atomic design principles

## Conclusion

Building this Crypto Price Tracker taught me a lot about working with external APIs and managing state in React applications. The combination of React Query for state management, careful API integration, and responsive UI design resulted in a smooth user experience despite the inherent challenges of working with external APIs and real-time data.

If I were to continue developing this application, I'd add features like price history charts, cryptocurrency comparisons, and portfolio tracking functionality.

