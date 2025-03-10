/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    reactStrictMode: true,
    images: {
      domains: ['res.cloudinary.com'],
    },
};

export default nextConfig;
