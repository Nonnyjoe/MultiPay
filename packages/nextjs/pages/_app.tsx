import type { AppProps } from "next/app";
import "../styles/globals.css";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectKitProvider } from "connectkit";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { arbitrum, base, baseGoerli, goerli, mainnet, optimism, polygon, zora } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { SmartAccountProvider } from "~~/context/SmartAccount";
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';


const client = new Client({
  url: 'https://api.studio.thegraph.com/query/52398/multipay/version/latest',
  exchanges: [cacheExchange, fetchExchange],
});
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    goerli,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    baseGoerli,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// const config = createConfig(
//   getDefaultConfig({
//     // Required API Keys
//     alchemyId: process.env.ALCHEMY_ID, // or infuraId
//     walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID ?? "",

//     // Required
//     appName: "Multi Pay",

//     // Optional
//     appDescription: "Your App Description",
//     appUrl: "https://family.co", // your app's url
//     appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
//   }),
// );

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider>
        <RainbowKitProvider chains={chains}>
        <Provider value={client}>
          <SmartAccountProvider>
            <Component {...pageProps} />
          </SmartAccountProvider>
        </Provider>
        </RainbowKitProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
