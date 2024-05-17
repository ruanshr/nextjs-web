/** @type {import('next').NextConfig} */
const path = require("path");
const dotenv = require("dotenv");
const ESLintPlugin = require("eslint-webpack-plugin");
const i18nConfig = require("./config/i18nConfig");
const { withSentryConfig } = require("@sentry/nextjs");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const configuration = dotenv.config({ path: ".env.sentry" }).parsed;
const SENTRY_RELEASE = configuration?.SENTRY_RELEASE || "";

const isDev = process.env.APP_ENV === "development";
const isProd = process.env.APP_ENV === "production";

const BUILD_ID = new Date().valueOf().toString(32); // 每次打包生成一个唯一标识

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

let nextConfig = {
  distDir: isDev ? ".next" : "dist",
  reactStrictMode: false,
  assetPrefix: "",
  swcMinify: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: isProd,
  },
  sassOptions: {},
  experimental: {
    forceSwcTransforms: true,
    largePageDataBytes: 1024 * 135,
    middlewarePrefetch: "strict",
  },
  env: {
    APP_ENV: process.env.APP_ENV,
    BUILD_ID,
  },
  productionBrowserSourceMaps: isProd,
  i18n: {
    defaultLocale: "default",
    locales: i18nConfig.supportLanguage,
    localeDetection: false,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|gif|json|js|css|mp4|avif)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [];
  },
  webpack: (config, { isServer }) => {
    // 路径别名
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
      src: path.resolve(__dirname, "src"),
      config: path.resolve(__dirname, "config"),
    };

    // Eslint overlay
    if (!isServer) {
      config.plugins.push(
        new ESLintPlugin({
          context: __dirname,
          emitError: true,
          extensions: ["ts", "tsx"], // 指定要检查的文件类型
        })
      );
    }

    // sentry
    if (isProd && SENTRY_RELEASE) {
      config.plugins.push(
        new SentryWebpackPlugin({
          release: SENTRY_RELEASE,
          include: "./dist/static",
          ignoreFile: path.join(__dirname, "./.gitignore"), // 指定忽略文件配置,
          ignore: ["node_modules"],
          urlPrefix: "~/_next",
        })
      );
    }

    return config;
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

const sentryNextConfigOptions = {
  sentry: {
    hideSourceMaps: true,
  },
};

nextConfig = isProd
  ? withSentryConfig(
      Object.assign({}, nextConfig, sentryNextConfigOptions),
      sentryWebpackPluginOptions
    )
  : nextConfig;

module.exports = withBundleAnalyzer(nextConfig);
