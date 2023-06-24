import React, { PropsWithChildren } from "react";
import { WagmiConfig } from "wagmi";
import { createWagmiConfig } from "@crossbell/connect-kit";

const wagmiConfig = createWagmiConfig({
	appName: "crossbell.io",
	walletConnectV2ProjectId: "120bafecc92069a7b88c347e18c0a693",
});

export function WalletProvider({ children }: PropsWithChildren) {
	return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
