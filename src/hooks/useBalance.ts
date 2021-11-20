import { useState, useEffect } from 'react';
import { useUserWeb3 } from 'hooks/useWeb3';
import useBlockNumber from 'hooks/useBlockNumber';
import { BigNumber } from '@ethersproject/bignumber';

export const useBalance = () => {
  const { library, account, chainId } = useUserWeb3();
  const blockNumber = useBlockNumber();
  const [balance, setBalance] = useState(BigNumber.from('0'));

  useEffect(() => {
    if (!account || !library || !chainId) return;
    library.getBalance(account).then((balance: BigNumber) => {
      setBalance(balance);
    });
  }, [library, blockNumber, account, chainId]);

  return balance;
};

export default useBalance;
