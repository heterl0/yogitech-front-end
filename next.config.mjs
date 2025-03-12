/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.yogitech.me",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api-dev-minimal-v510.vercel.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  trailingSlash: true,
};

export default nextConfig;
