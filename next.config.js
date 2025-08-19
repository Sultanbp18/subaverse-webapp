/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.subaverse.xyz",
        pathname: "/**",
      },
    ],
  },
}

module.exports = nextConfig
