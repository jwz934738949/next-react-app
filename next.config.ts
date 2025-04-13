import bundleAnalyzer from '@next/bundle-analyzer';

import type { NextConfig } from 'next';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', //当环境变量ANALYZE为true时开启
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  sassOptions: {
    additionalData: '@import "@/styles/index.scss";',
  },
};

export default withBundleAnalyzer(nextConfig);
