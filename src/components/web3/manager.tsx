import { FC, useEffect } from 'react';
import { useEagerConnect, useInactiveListener } from 'hooks/useWeb3';
import BlockNumber from './block-number';

const Web3Manager: FC = ({ children }) => {
  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // fix change network to avalanche
  useEffect(() => {
    if (window.ethereum && window.ethereum.removeAllListeners) {
      window.ethereum.removeAllListeners(['networkChanged']);
    }
  }, []);

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager);

  return <BlockNumber>{children}</BlockNumber>;
};

export default Web3Manager;
