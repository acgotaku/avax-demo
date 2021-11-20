import { createContext, FC } from 'react';
import { useListener } from 'hooks/useBlockNumber';

export const Context = createContext(0);

const BlockNumber: FC = ({ children }) => {
  const blockNumber = useListener();

  return <Context.Provider value={blockNumber}>{children}</Context.Provider>;
};

export default BlockNumber;
