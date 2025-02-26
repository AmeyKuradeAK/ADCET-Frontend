import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.cache = {
      type: "filesystem",
      compression: "gzip",
      cacheDirectory: path.resolve(__dirname, ".next/cache/webpack"), // ✅ Fixed absolute path
      maxAge: 1000 * 60 * 60 * 24, // 24 hours cache validity
    };
    return config;
  },
};

export default nextConfig;
