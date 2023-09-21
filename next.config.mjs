/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 8192,
        },
      },
    });
    return config;
  },
};
