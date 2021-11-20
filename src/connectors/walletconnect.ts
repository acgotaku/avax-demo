import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import {
  SUPPORTED_IDS as SUPPORTED_CHAIN_IDS,
  NETWORK_URLS,
  ACTIVED_ID
} from 'constants/chains';

export default new WalletConnectConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
  chainId: ACTIVED_ID,
  rpc: NETWORK_URLS,
  qrcode: true
});
