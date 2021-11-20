import { FC } from 'react';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { NETWORK_CONTEXT_NAME } from 'constants/misc';
import Manager from './manager';

const Web3ProviderNetwork = createWeb3ReactRoot(NETWORK_CONTEXT_NAME);

const NETWORK_POLLING_INTERVALS: { [chainId: number]: number } = {};

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(
    provider,
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
      ? parseInt(provider.chainId)
      : 'any'
  );

  library.pollingInterval = 15_000;
  library.detectNetwork().then(network => {
    const networkPollingInterval = NETWORK_POLLING_INTERVALS[network.chainId];
    if (networkPollingInterval) {
      console.debug('Setting polling interval', networkPollingInterval);
      library.pollingInterval = networkPollingInterval;
    }
  });
  return library;
}

const Provider: FC = ({ children }) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Web3ProviderNetwork getLibrary={getLibrary}>
      <Manager>{children}</Manager>
    </Web3ProviderNetwork>
  </Web3ReactProvider>
);

export default Provider;
