const ETH = 1;
const AVAX = 43114;
const FUJI = 43113;

export const CHAIN_IDS: Record<string, number> = {
  ETH,
  AVAX,
  FUJI
} as const;

export type SupportedAllChainId = typeof CHAIN_IDS[number];

export const SUPPORTED_IDS = [ETH, AVAX, FUJI];
export const ACTIVED_ID =
  CHAIN_IDS[process.env.REACT_APP_ACTIVED_KEY as string] || AVAX;

export const NETWORK_URLS: { [key in SupportedAllChainId]: string } = {
  [CHAIN_IDS.ETH]:
    'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  [CHAIN_IDS.AVAX]: 'https://api.avax.network/ext/bc/C/rpc',
  [CHAIN_IDS.FUJI]: 'https://api.avax-test.network/ext/bc/C/rpc'
};

export const AVAXSCAN_URL = process.env.REACT_APP_AVAXSCAN_URL as string;
