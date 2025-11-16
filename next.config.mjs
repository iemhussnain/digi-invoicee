/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Sentry configuration
  sentry: {
    hideSourceMaps: true,
  },

  // Environment variables exposed to client
  env: {
    NEXT_PUBLIC_APP_NAME: 'Digi Invoice ERP',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },

  // Image optimization
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.fbr.gov.pk',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', // For S3
      },
    ],
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Handle PDF.js worker
    config.resolve.alias.canvas = false;

    // Handle node modules in client bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },

  // Experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },

  // TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
