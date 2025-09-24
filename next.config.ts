// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ["i.postimg.cc", "via.placeholder.com", 'i.ibb.co.com'],
//     // OR you can use remotePatterns for more flexibility
//     // remotePatterns: [
//     //   {
//     //     protocol: "https",
//     //     hostname: "i.postimg.cc",
//     //     pathname: "/**",
//     //   },
//     //   {
//     //     protocol: "https",
//     //     hostname: "via.placeholder.com",
//     //     pathname: "/**",
//     //   },
//     // ],
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
        port: '',
        pathname: '/**',
      },
      // Add other domains you might need
      {
        protocol: 'https',
        hostname: 'api.imgbb.com',
        port: '',
        pathname: '/**',
      }
    ],
    domains: ["i.postimg.cc", "via.placeholder.com", 'i.ibb.co.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/process-id-photo',
        destination: 'http://206.162.244.131:8000/process-id-photo',
      },
    ];
  },
};

export default nextConfig;