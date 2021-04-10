import { BigNumber, ethers } from "ethers";

export const formatETH = (balance: BigNumber): string => {
    if (!balance) {
        return "0.00";
    }
    return parseFloat(ethers.utils.formatEther(balance)).toFixed(6);
};

export const formatERC20 = (balance: BigNumber, decimals: number): string => {
    return ethers.utils.formatUnits(balance, decimals);
};

export const formatGas = (gas: BigNumber): string => {
    return String(parseInt(ethers.utils.formatUnits(gas, "gwei"), 10));
};

export const formatAddress = (address: string): string => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
}

export const formatTokenUri = (tokenUri: string): string => {
    return tokenUri.replace("data:text/plain;charset=utf-8,", "");
}