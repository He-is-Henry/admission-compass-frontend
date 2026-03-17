/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "publicappmediaqa.s3.eu-central-1.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
