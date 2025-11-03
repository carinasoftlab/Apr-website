/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "www.pri.arunachal.gov.in",
          pathname: "/uploads/**",
        },
        {
          protocol: "https",
          hostname: "apr-backend.onrender.com",
          pathname: "/uploads/**",
        },
        {
          protocol: "http",
          hostname: "localhost",
          port: "8087",
          pathname: "/uploads/**",
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  