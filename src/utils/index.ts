import { BigNumber } from '@ethersproject/bignumber';

export const toHex = (value: number | string) => {
  if (value < 10) return `0x${parseInt(value as string, 10)}`;
  return BigNumber.from(value).toHexString();
};

export const runCallback = (func: any, ...args: any[]) => {
  if (func && typeof func === 'function') {
    func(...args);
  }
};

export const noop = () => {};

export const shortenAddress = (address: string, chars = 4): string => {
  return `${address.substring(0, chars + 2)}...${address.substring(
    42 - chars
  )}`;
};

export const trimBalance = (balance: string | number) => {
  return Number(Number(balance).toFixed(4)).toString();
};
