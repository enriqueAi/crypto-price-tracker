---
sidebar_position: 1
---

# Getting Started

Welcome to the Crypto Price Tracker documentation! This guide will help you understand the project structure, set up your development environment, and get started with the application.

## Overview

Crypto Price Tracker is a real-time cryptocurrency price tracking application built with Next.js. It provides:

- Live cryptocurrency price updates
- Interactive price charts
- Search functionality
- Responsive design for all devices
- Rate limit handling and caching

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/henryhennings/crypto-price-tracker.git
   cd crypto-price-tracker
   ```

2. Install dependencies for the web application:
   ```bash
   cd web-app
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

The project is organized into two main parts:

```
/
├── web-app/         # Next.js application
│   ├── src/        # Source code
│   │   ├── app/    # Next.js App Router
│   │   ├── components/  # React components
│   │   └── services/    # API services
│   └── public/     # Static assets
│
└── docs/           # Documentation (you are here)
```

## Next Steps

- Learn about the [API Integration](./api-integration.md)
- Explore the [UI Components](./ui-components.md)
- Check out the [Development Challenges](./challenges.md) we solved

## Contributing

We welcome contributions! Please see our [Contributing Guide](../CONTRIBUTING.md) for details.
