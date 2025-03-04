# Crypto Price Tracker

A real-time cryptocurrency price tracking application built with Next.js and documented with Docusaurus.

## Project Structure

```
/
├── web-app/         # Next.js cryptocurrency tracking application
│   ├── src/        # Source code
│   ├── public/     # Static assets
│   └── ...         # Configuration files
│
└── docs/           # Docusaurus documentation
    ├── src/        # Documentation source
    └── ...         # Documentation configuration
```

## Setup Instructions

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager

### Web Application Setup

1. Navigate to the web application directory:
   ```bash
   cd web-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Documentation Setup

1. Navigate to the documentation directory:
   ```bash
   cd docs
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the documentation server:
   ```bash
   npm run start
   # or
   yarn start
   ```

4. Open [http://localhost:3001](http://localhost:3001) in your browser (Note: Documentation runs on port 3001 to avoid conflicts with the web application)

## Features

- Real-time cryptocurrency price tracking
- Search functionality for finding specific cryptocurrencies
- Visual price charts and trends
- Responsive design for all devices
- Comprehensive documentation

## API Integration

This project uses the CoinGecko API for cryptocurrency data. No API key is required for basic usage.

## Documentation

The documentation is built using Docusaurus and includes:
- Setup guides
- API integration details
- Component documentation
- Development challenges and solutions
- Future enhancement plans

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technology Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **State Management:** React Query
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Documentation:** Docusaurus
- **API:** CoinGecko

## Development

To run both the web application and documentation in development mode:

1. Start the web application:
```bash
cd web-app
npm run dev
```

2. In a new terminal, start the documentation:
```bash
cd docs
npm run start
```

## Building for Production

### Web Application
```bash
cd web-app
npm run build
npm run start
```

### Documentation
```bash
cd docs
npm run build
npm run serve
```

## Author

Henry Hennings
