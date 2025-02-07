import type { NextConfig } from "next";
import { config } from "dotenv";
config({ path: ".env" });

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.BLOB_HOSTNAME || "",
        port: "",
      },
    ],
  },
};

export default nextConfig;
