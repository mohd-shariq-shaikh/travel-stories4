/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images:{
    domains: ['lh3.googleusercontent.com','tse4.mm.bing.net','in.images.search.yahoo.com','png.pngtree.com','s.yimg.com','cdn.sanity.io'],
  }
}

module.exports = nextConfig
