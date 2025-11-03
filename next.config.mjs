/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Broad allow-list for external hosts used in <Image>
    domains: ['apr-backend.onrender.com', 'www.pri.arunachal.gov.in', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apr-backend.onrender.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.pri.arunachal.gov.in',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8087',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
