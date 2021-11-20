import { useCallback } from 'react';
import { formatEther } from '@ethersproject/units';
import { AbstractConnector } from '@web3-react/abstract-connector';
import injected from 'connectors/injected';
import walletConnect from 'connectors/walletconnect';
import { useTryConnect, useUserWeb3 } from 'hooks/useWeb3';
import { useBalance } from 'hooks/useBalance';
import { trimBalance } from 'utils';
import './App.css';

function App() {
  const balance = useBalance();
  const { active, chainId } = useUserWeb3();
  const tryConnect = useTryConnect();
  const connect = useCallback(
    (connector: AbstractConnector) => {
      tryConnect(connector);
    },
    [tryConnect]
  );
  const inject = () => {
    connect(injected);
  };
  const wallet = () => {
    connect(walletConnect);
  };
  return (
    <div className="App">
      <div className="status">
        connected: {active.toString()}
      </div>
      <div className="chainId">
        chainId: {chainId}
      </div>
      <div className="balance">{trimBalance(formatEther(balance))}</div>
      <div className="connect">
        <button onClick={inject}>Inject MetaMask</button>
        <button onClick={wallet}>WalletConnect</button>
      </div>
    </div>
  );
}

export default App;
