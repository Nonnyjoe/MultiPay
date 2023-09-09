import { ReactNode, createContext, useEffect, useState } from "react";
import { BiconomySmartAccount, BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account";
import { Bundler, IBundler } from "@biconomy/bundler";
import { ChainId } from "@biconomy/core-types";
import { ParticleAuthModule, ParticleProvider } from "@biconomy/particle-auth";
import { BiconomyPaymaster, IPaymaster } from "@biconomy/paymaster";
import { ethers } from "ethers";
import { Address } from "viem";

const particle = new ParticleAuthModule.ParticleNetwork({
  projectId: "e592ca9c-cfcf-47fc-b35d-1d0061cc619b",
  clientKey: "cA7ffn67I4vIam0723WnkHnkizRSQ3L34YXPsPyp",
  appId: "5ff5b3dc-1f31-494c-9dbb-b01d48ac82d8",
  wallet: {
    displayWalletEntry: true,
    defaultWalletEntryPosition: ParticleAuthModule.WalletEntryPosition.BR,
  },
});

const bundler: IBundler = new Bundler({
  bundlerUrl: "https://bundler.biconomy.io/api/v2/84531/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
  chainId: ChainId.BASE_GOERLI_TESTNET,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
});

const paymaster: IPaymaster = new BiconomyPaymaster({
  paymasterUrl: "https://paymaster.biconomy.io/api/v1/84531/9DHWydTN6.e6391c84-4efd-42bd-bdd4-c8ee8d7c83af",
});

export const SmartAccountContext = createContext<any>(null);

export const SmartAccountProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [smartAccount, setSmartAccount] = useState<BiconomySmartAccount | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Provider | null>(null);

  // set user data if logged in
  useEffect(() => {
    (async () => {
      const userInfo = await particle.auth.isLoginAsync();
      if (userInfo) {
        await setDetails();
      }
    })();
  }, []);

  const setDetails = async () => {
    const particleProvider = new ParticleProvider(particle.auth);
    const web3Provider = new ethers.providers.Web3Provider(particleProvider, "any");
    setProvider(web3Provider);
    const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
      signer: web3Provider.getSigner(),
      chainId: ChainId.BASE_GOERLI_TESTNET,
      bundler: bundler,
      paymaster: paymaster,
    };
    let biconomySmartAccount = new BiconomySmartAccount(biconomySmartAccountConfig);
    biconomySmartAccount = await biconomySmartAccount.init();
    setAddress((await biconomySmartAccount.getSmartAccountAddress()) as Address);
    setSmartAccount(biconomySmartAccount);
  };

  const connect = async () => {
    try {
      setLoading(true);
      const userInfo = await particle.auth.login();
      console.log("Logged in user:", userInfo);
      await setDetails();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const data = {
    smartAccount,
    provider,
    setSmartAccount,
    setProvider,
    connect,
    address,
    loading,
  };
  return <SmartAccountContext.Provider value={data}>{children}</SmartAccountContext.Provider>;
};
