/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    assetPrefix: "",
    basePath: "",
    swcMinify: false
}

module.exports = nextConfig
