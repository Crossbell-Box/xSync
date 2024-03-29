import { NextConfig } from "next";
import UnoCSS from "@unocss/webpack";
import { withIpfsGateway } from "@crossbell/ipfs-gateway-next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	experimental: {
		externalDir: true,
	},
	webpack: (config) => {
		config.plugins.push(UnoCSS());

		// https://github.com/WalletConnect/walletconnect-monorepo/blob/7716e164281c2f531145d682c3658f761fa0a823/providers/universal-provider/src/utils/deepLinks.ts#L39
		// @walletconnect/universal-provider imports react-native conditionally.
		// Since this is a NextJS app, simply mark it as external to avoid the webpack bundling warning.
		config.externals.push("react-native");

		// https://github.com/WalletConnect/walletconnect-monorepo/issues/1908#issuecomment-1487801131
		config.externals.push("pino-pretty", "lokijs", "encoding");

		// https://github.com/WalletConnect/walletconnect-legacy/blob/main/packages/client/src/socket.ts#L19
		// @walletconnect/legacy-client imports 'ws' for the NodeJS environment, which causes bundle errors.
		// Since we use 'walletconnect' only in the browser, mark it as external to avoid webpack bundling warnings.
		config.externals.push("ws");

		// https://github.com/WalletConnect/walletconnect-utils/blob/b7d7dc003c25dd33ef74c2fac483140f71a51d86/jsonrpc/http-connection/src/http.ts#L2
		// `@walletconnect/jsonrpc-http-connection` imports `cross-fetch` to support fetch in Node.js. It's unnecessary for Next.JS app.
		config.resolve.alias["cross-fetch"] = require.resolve(
			"next/dist/build/polyfills/fetch/index.js",
		);

		return config;
	},
};

module.exports = withIpfsGateway(nextConfig);
