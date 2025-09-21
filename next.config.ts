import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.postimg.cc", "via.placeholder.com"],
    // OR you can use remotePatterns for more flexibility
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "i.postimg.cc",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "via.placeholder.com",
    //     pathname: "/**",
    //   },
    // ],
  },
  ignoreBuildErrors: true,
  ignoreDuringBuilds: true,
  ignoreTypeScriptErrors: true,
};

export default nextConfig;
