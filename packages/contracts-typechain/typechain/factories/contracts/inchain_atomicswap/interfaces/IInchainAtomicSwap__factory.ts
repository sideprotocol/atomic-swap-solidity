/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IInchainAtomicSwap,
  IInchainAtomicSwapInterface,
} from "../../../../contracts/inchain_atomicswap/interfaces/IInchainAtomicSwap";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "provided",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expectedExpiry",
        type: "uint256",
      },
    ],
    name: "BidAlreadyExpired",
    type: "error",
  },
  {
    inputs: [],
    name: "BidAlreadyPlaced",
    type: "error",
  },
  {
    inputs: [],
    name: "BidDoesNotExist",
    type: "error",
  },
  {
    inputs: [],
    name: "BidNotAllowed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum IAtomicSwapBase.BidStatus",
        name: "status",
        type: "uint8",
      },
    ],
    name: "BidNotInPlacedStatus",
    type: "error",
  },
  {
    inputs: [],
    name: "DuplicateReleaseSchedule",
    type: "error",
  },
  {
    inputs: [],
    name: "InactiveOrder",
    type: "error",
  },
  {
    inputs: [],
    name: "InvaldAddition",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidBidderAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidBuyerFee",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "InvalidContractAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "provided",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maximum",
        type: "uint256",
      },
    ],
    name: "InvalidExpirationTime",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidMinimumBidLimit",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidReleasePercentage",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSellerFee",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidTotalPercentage",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidTreasuryAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "MismatchedBidAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "NoBidPlaced",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
    ],
    name: "NotAllowedTransferAmount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "real",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expected",
        type: "uint256",
      },
    ],
    name: "NotEnoughFund",
    type: "error",
  },
  {
    inputs: [],
    name: "OrderAlreadyExists",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "current",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiredTime",
        type: "uint256",
      },
    ],
    name: "OrderAlreadyExpired",
    type: "error",
  },
  {
    inputs: [],
    name: "OrderCanceled",
    type: "error",
  },
  {
    inputs: [],
    name: "OrderDoesNotExist",
    type: "error",
  },
  {
    inputs: [],
    name: "OrderNotAllowTake",
    type: "error",
  },
  {
    inputs: [],
    name: "OverMaximumReleaseStep",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TransferFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TransferFromFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TransferToRecipientFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TransferToTreasuryFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        internalType: "address",
        name: "expected",
        type: "address",
      },
    ],
    name: "UnauthorizedAcceptAction",
    type: "error",
  },
  {
    inputs: [],
    name: "UnauthorizedCancelAction",
    type: "error",
  },
  {
    inputs: [],
    name: "UnauthorizedSender",
    type: "error",
  },
  {
    inputs: [],
    name: "UnauthorizedTakeAction",
    type: "error",
  },
  {
    inputs: [],
    name: "UnsupportedTokenPair",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroReleaseSchedule",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "orderID",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "AcceptedBid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "AtomicSwapOrderCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "AtomicSwapOrderCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "maker",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "taker",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "AtomicSwapOrderTook",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "orderID",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "bidder",
        type: "address",
      },
    ],
    name: "CanceledBid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "orderID",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PlacedBid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "orderID",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ReceivedNewBid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "orderID",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "UpdatedBid",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "orderID",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "bidder",
            type: "address",
          },
        ],
        internalType: "struct IAtomicSwapBase.AcceptBidMsg",
        name: "acceptBidMsg",
        type: "tuple",
      },
    ],
    name: "acceptBid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "orderID",
            type: "bytes32",
          },
        ],
        internalType: "struct IAtomicSwapBase.CancelSwapMsg",
        name: "cancelswap",
        type: "tuple",
      },
    ],
    name: "cancelSwap",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "uuid",
            type: "bytes32",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct IAtomicSwapBase.Coin",
            name: "sellToken",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct IAtomicSwapBase.Coin",
            name: "buyToken",
            type: "tuple",
          },
          {
            internalType: "address",
            name: "maker",
            type: "address",
          },
          {
            internalType: "address",
            name: "desiredTaker",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "minBidAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expireAt",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "acceptBid",
            type: "bool",
          },
        ],
        internalType: "struct IAtomicSwapBase.MakeSwapMsg",
        name: "makeswap",
        type: "tuple",
      },
    ],
    name: "makeSwap",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "uuid",
            type: "bytes32",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct IAtomicSwapBase.Coin",
            name: "sellToken",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct IAtomicSwapBase.Coin",
            name: "buyToken",
            type: "tuple",
          },
          {
            internalType: "address",
            name: "maker",
            type: "address",
          },
          {
            internalType: "address",
            name: "desiredTaker",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "minBidAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expireAt",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "acceptBid",
            type: "bool",
          },
        ],
        internalType: "struct IAtomicSwapBase.MakeSwapMsg",
        name: "makeswap",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "durationInHours",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "percentage",
            type: "uint256",
          },
        ],
        internalType: "struct IAtomicSwapBase.Release[]",
        name: "releases",
        type: "tuple[]",
      },
    ],
    name: "makeSwapWithVesting",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "bidAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "bidder",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "orderID",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "expireTimestamp",
            type: "uint256",
          },
        ],
        internalType: "struct IAtomicSwapBase.PlaceBidMsg",
        name: "placeBidMsg",
        type: "tuple",
      },
    ],
    name: "placeBid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "orderID",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "takerReceiver",
            type: "address",
          },
        ],
        internalType: "struct IAtomicSwapBase.TakeSwapMsg",
        name: "takeswap",
        type: "tuple",
      },
    ],
    name: "takeSwap",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "orderID",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "bidder",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "addition",
            type: "uint256",
          },
        ],
        internalType: "struct IAtomicSwapBase.UpdateBidMsg",
        name: "updateBidMsg",
        type: "tuple",
      },
    ],
    name: "updateBid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export class IInchainAtomicSwap__factory {
  static readonly abi = _abi;
  static createInterface(): IInchainAtomicSwapInterface {
    return new Interface(_abi) as IInchainAtomicSwapInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IInchainAtomicSwap {
    return new Contract(address, _abi, runner) as unknown as IInchainAtomicSwap;
  }
}
