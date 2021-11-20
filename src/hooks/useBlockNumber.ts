import { useState, useCallback, useEffect, useContext } from 'react';
import { useActiveWeb3 } from 'hooks/useWeb3';
import useIsWindowVisible from 'hooks/useIsWindowVisible';
import { Context } from 'components/web3/block-number';

export const useListener = () => {
  const { chainId, library, active } = useActiveWeb3();
  const [blockNumber, setBlockNumber] = useState(0);
  const windowVisible = useIsWindowVisible();
  const blockNumberCallback = useCallback(
    (blockNumber: number) => setBlockNumber(blockNumber),
    [setBlockNumber]
  );

  // attach/detach listeners
  useEffect(() => {
    if (!active || !library || !chainId || !windowVisible) return;

    library
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch(error =>
        console.error(
          `Failed to get block number for chainId: ${chainId}`,
          error
        )
      );
    library.on('block', blockNumberCallback);

    return () => {
      library.removeListener('block', blockNumberCallback);
    };
  }, [active, chainId, library, windowVisible, blockNumberCallback]);

  return blockNumber;
};

export const useBlockNumber = () => {
  const blockNumber = useContext(Context);

  return blockNumber;
};

export default useBlockNumber;
