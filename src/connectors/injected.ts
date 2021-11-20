import { InjectedConnector } from '@web3-react/injected-connector';
import { SUPPORTED_IDS as SUPPORTED_CHAIN_IDS } from 'constants/chains';

export default new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS
});
