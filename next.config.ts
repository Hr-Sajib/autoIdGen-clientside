import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    // Simple allow-list
    domains: ["i.postimg.cc"],

    // OR (more flexible) use remotePatterns:
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "i.postimg.cc",
    //     pathname: "/**",
    //   },
    // ],
  },
};

export default nextConfig;
