import createNextIntlPlugin from "next-intl/plugin";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.lumenis-ng.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.dev.lumenis-ng.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias["@shared"] = path.join(__dirname, "@shared");

    config.module.rules.push({
      test: /\.stories\.(js|jsx|ts|tsx)$/,
      loader: "ignore-loader",
    });

    return config;
  },
};

export default withNextIntl(nextConfig);
