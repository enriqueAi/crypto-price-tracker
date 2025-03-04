---
sidebar_position: 8
---

# UI Components

This section documents the key UI components used in the Crypto Price Tracker application.

## Core Components

### PriceCard

The main component for displaying cryptocurrency prices and information.

```typescript
interface PriceCardProps {
  coinId: string;
  name: string;
  price: number;
  change24h: number;
  onRefresh: () => void;
}

const PriceCard: React.FC<PriceCardProps> = ({
  coinId,
  name,
  price,
  change24h,
  onRefresh,
}) => {
  // Component implementation
};
```

### CryptoList

A container component that displays multiple PriceCard components.

```typescript
interface CryptoListProps {
  coins: CoinData[];
  onRefresh: () => void;
}

const CryptoList: React.FC<CryptoListProps> = ({
  coins,
  onRefresh,
}) => {
  // Component implementation
};
```

## Layout Components

### Header

The application header with navigation and user controls.

### Sidebar

Navigation sidebar with filtering and sorting options.

## Interactive Components

### SearchBar

```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
}) => {
  // Component implementation
};
```

### FilterControls

Components for filtering and sorting the cryptocurrency list.

## Styling

The application uses:

- Tailwind CSS for styling
- CSS modules for component-specific styles
- Responsive design principles

## Best Practices

- Component composition
- Prop type validation
- Performance optimization
- Accessibility compliance

## Future Enhancements

- Dark mode support
- Additional chart components
- Enhanced mobile responsiveness
- More interactive features 