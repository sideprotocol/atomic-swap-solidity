type ChainInfo = {
  chainId: number;
  endpoint: string;
};

const testNets: Record<string, ChainInfo> = {
  goerli: {
    chainId: 10121,
    endpoint: "0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23",
  },
  bnb: {
    chainId: 10102,
    endpoint: "0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1",
  },
  mumbai: {
    chainId: 10109,
    endpoint: "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8",
  },
  sepolia: {
    chainId: 10161,
    endpoint: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
  },
};

export function getChainInfo(chainName: string): ChainInfo | null {
  return testNets[chainName] || null;
}
