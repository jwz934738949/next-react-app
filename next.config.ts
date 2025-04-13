import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', //当环境变量ANALYZE为true时开启
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
};

export default withBundleAnalyzer(nextConfig);
