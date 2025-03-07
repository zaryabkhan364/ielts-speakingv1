// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Configuration, WebpackOptionsNormalized, ExternalItemFunctionData } from "webpack";

const nextConfig = {
  webpack: (config: Configuration) => {
    if (Array.isArray(config.externals)) {
      config.externals.push(/\.node$/);
    } else if (typeof config.externals === "function") {
      const originalExternals = config.externals;
      config.externals = (
        data: ExternalItemFunctionData,
        callback: (err?: Error | null, result?: string | boolean | string[] | Record<string, unknown>) => void
      ) => {
        if (data.request && /\.node$/.test(data.request)) {
          return callback(null, `commonjs ${data.request}`);
        }
        if (typeof originalExternals === "function") {
          return originalExternals(data, callback);
        }
        return callback();
      };
    } else {
      config.externals = config.externals ? [config.externals, /\.node$/] : [/\.node$/];
    }

    return config;
  },
};

export default nextConfig;
