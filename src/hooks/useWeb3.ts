import { useState, useEffect, useCallback } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { NETWORK_CONTEXT_NAME } from 'constants/misc';
import injected from 'connectors/injected';
import { noop } from 'utils';

export const useUserWeb3 = () => {
  const context = useWeb3React<Web3Provider>();

  return context;
};

export const useNetworkWeb3 = () => {
  const context = useWeb3React<Web3Provider>(NETWORK_CONTEXT_NAME);

  return context;
};

export const useActiveWeb3 = () => {
  const user = useUserWeb3();
  const network = useNetworkWeb3();

  return user.active ? user : network;
};

export const useTryConnect = () => {
  const { activate } = useUserWeb3();
  const tryConnect = useCallback(
    async (connector: AbstractConnector) => {
      if (connector && connector instanceof WalletConnectConnector) {
        connector.walletConnectProvider = undefined;
      }
      activate(connector, undefined, true).catch(error => {
        console.log(error);
        if (error instanceof UnsupportedChainIdError) {
          // a little janky...can't use setError because the connector isn't set
          activate(connector);
        } else {
          return error;
        }
      });
    },
    [activate]
  );

  return tryConnect;
};

export const useDisconnect = (confirm?: () => Promise<boolean>) => {
  const { deactivate, connector } = useUserWeb3();
  const disconnect = useCallback(async () => {
    const sure = await (confirm ? confirm() : Promise.resolve(true));

    if (!sure) return;
    if (connector && connector instanceof WalletConnectConnector) {
      connector.close();
    }
    deactivate();
  }, [deactivate, confirm, connector]);

  return disconnect;
};

export const useEagerConnect = () => {
  const { activate, active } = useUserWeb3();
  const [tried, setTried] = useState(false);

  // if user is actived try activate
  useEffect(() => {
    if (!active && window.ethereum) {
      injected
        .isAuthorized()
        .then(isAuthorized => {
          if (isAuthorized) {
            activate(injected, undefined, true).catch(() => {
              setTried(true);
            });
          }
        })
        .catch(noop);
    } else {
      setTried(true);
    }
  }, [activate, active]);

  // wait until we get confirmation of a connection to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  return tried;
};

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export const useInactiveListener = (suppress = false) => {
  const { active, error, activate } = useUserWeb3();

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        activate(injected, undefined, true).catch(error => {
          console.error('Failed to activate after chain changed', error);
        });
      };

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch(error => {
            console.error('Failed to activate after accounts changed', error);
          });
        }
      };

      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
    return undefined;
  }, [active, error, suppress, activate]);
};

export default useActiveWeb3;
