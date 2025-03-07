import type { Configuration } from 'webpack';

const nextConfig = {
  webpack: (config: Configuration) => {
    config.externals = [...(config.externals || []), /\.node$/]; // Ignore .node files
    return config;
  },
};

export default nextConfig;
