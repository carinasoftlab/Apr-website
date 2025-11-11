/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "www.pri.arunachal.gov.in",
          pathname: "/uploads/images/**",
        },
        {
          protocol: "https",
          hostname: "apr-backend.onrender.com",
          pathname: "/uploads/images/**",
        },
        {
          protocol: "http",
          hostname: "localhost",
          port: "8087",
          pathname: "/uploads/images/**",
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  