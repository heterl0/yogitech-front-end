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
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.ContextReplacementPlugin(
        /highlight\.js\/lib\/languages$/,
        new RegExp(`^(javascript|sh|bash|html|scss|css|json).js$`)
      )
    );
    return config;
  },
};

import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  // eslint-disable-next-line no-undef
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
