import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const POLLING_INTERVAL = 13000;
const RPC_URLS: { [chainId: number]: string } = {
  4: "https://rinkeby-light.eth.linkpool.io",
};

export const injected = new InjectedConnector({
  supportedChainIds: [4],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 4: RPC_URLS[4] },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});