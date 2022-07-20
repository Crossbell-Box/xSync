import { ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";
import { NextPage } from "next/types";
import Head from "next/head";
import WalletProvider from "@/components/providers/WalletProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import NotificationsProvider from "@/components/providers/NotificationsProvider";
import ModalsProvider from "@/components/providers/ModalsProvider";
import "@/styles/globals.css";
import "uno.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<>
			<Head>
				<title>Crossbell.io</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>

			<ThemeProvider>
				<ModalsProvider>
					<NotificationsProvider>
						<WalletProvider>
							<QueryProvider>
								{getLayout(<Component {...pageProps} />)}
							</QueryProvider>
						</WalletProvider>
					</NotificationsProvider>
				</ModalsProvider>
			</ThemeProvider>
		</>
	);
}