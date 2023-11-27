"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vesting__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "DuplicateReleaseSchedule",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidInitialization",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidTotalPercentage",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidVesting",
        type: "error",
    },
    {
        inputs: [],
        name: "NoVestedTokensAvailable",
        type: "error",
    },
    {
        inputs: [],
        name: "NoVestedTokensForRelease",
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
        name: "NotInitializing",
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
                name: "owner",
                type: "address",
            },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
    },
    {
        inputs: [],
        name: "ReentrancyGuardReentrantCall",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "beneficiary",
                type: "address",
            },
        ],
        name: "VestingAlreadyStarted",
        type: "error",
    },
    {
        inputs: [],
        name: "VestingNotStarted",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint64",
                name: "version",
                type: "uint64",
            },
        ],
        name: "Initialized",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "from",
                                type: "address",
                            },
                            {
                                internalType: "uint256",
                                name: "start",
                                type: "uint256",
                            },
                            {
                                internalType: "address",
                                name: "token",
                                type: "address",
                            },
                            {
                                internalType: "uint256",
                                name: "totalAmount",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "amountReleased",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "lastReleasedStep",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct IVesting.VestingSchedule",
                        name: "schedule",
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
                        name: "release",
                        type: "tuple[]",
                    },
                    {
                        internalType: "address",
                        name: "beneficiary",
                        type: "address",
                    },
                    {
                        internalType: "bytes32",
                        name: "orderId",
                        type: "bytes32",
                    },
                ],
                indexed: true,
                internalType: "struct IVesting.VestingInfo",
                name: "vesting",
                type: "tuple",
            },
        ],
        name: "NewVesting",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "Received",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "beneficiary",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "Released",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_admin",
                type: "address",
            },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "beneficiary",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "orderId",
                type: "bytes32",
            },
        ],
        name: "release",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "releaseInfos",
        outputs: [
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
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "orderId",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "beneficiary",
                type: "address",
            },
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "totalAmount",
                type: "uint256",
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
        name: "startVesting",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "vestingSchedules",
        outputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "start",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "totalAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amountReleased",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "lastReleasedStep",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50612121806100206000396000f3fe60806040526004361061007f5760003560e01c80638da5cb5b1161004e5780638da5cb5b14610182578063c4d66de8146101ad578063d7c2eec7146101d6578063f2fde38b146101ff576100ca565b8063715018a6146100cf5780637623f00e146100e65780637b00ffad1461010257806382a969e214610144576100ca565b366100ca57343373ffffffffffffffffffffffffffffffffffffffff167f88a5966d370b9919b20f3e2c13ff65706f196a4e32cc2c12bf57088f8852587460405160405180910390a3005b600080fd5b3480156100db57600080fd5b506100e4610228565b005b61010060048036038101906100fb919061168c565b61023c565b005b34801561010e57600080fd5b5061012960048036038101906101249190611723565b6106d7565b60405161013b96959493929190611781565b60405180910390f35b34801561015057600080fd5b5061016b600480360381019061016691906117e2565b610760565b604051610179929190611835565b60405180910390f35b34801561018e57600080fd5b506101976107ae565b6040516101a4919061185e565b60405180910390f35b3480156101b957600080fd5b506101d460048036038101906101cf9190611879565b6107e6565b005b3480156101e257600080fd5b506101fd60048036038101906101f89190611723565b610975565b005b34801561020b57600080fd5b5061022660048036038101906102219190611879565b610cd7565b005b610230610d5d565b61023a6000610de4565b565b610244610ebb565b600073ffffffffffffffffffffffffffffffffffffffff166000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600087815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461031c576040517f628dbb9600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8073__$2effe1973215a034e8e4a17bdeb5710028$__6333b988f590916040518263ffffffff1660e01b81526004016103559190611993565b60006040518083038186803b15801561036d57600080fd5b505af4158015610381573d6000803e3d6000fd5b50505050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610404578134146103ff5781346040517f04157bb40000000000000000000000000000000000000000000000000000000081526004016103f6929190611835565b60405180910390fd5b610411565b61041083333085610f12565b5b600042905060006040518060c001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020016000815260200160008152509050806000808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600089815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600301556080820151816004015560a082015181600501559050506000600160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000898152602001908152602001600020905060005b845181101561064c57818582815181106105f2576105f16119b5565b5b6020026020010151908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101555050808061064490611a13565b9150506105d5565b5060405180608001604052808381526020018581526020018873ffffffffffffffffffffffffffffffffffffffff168152602001898152506040516106919190611c76565b60405180910390207fb16abbea6ba3704f5f2a80a6e86817bd96545258a4bbe645becfc85ab722675260405160405180910390a25050506106d061104b565b5050505050565b6000602052816000526040600020602052806000526040600020600091509150508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030154908060040154908060050154905086565b6001602052826000526040600020602052816000526040600020818154811061078857600080fd5b906000526020600020906002020160009250925050508060000154908060010154905082565b6000806107b9611064565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b60006107f061108c565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff1614801561083e5750825b9050600060018367ffffffffffffffff16148015610873575060003073ffffffffffffffffffffffffffffffffffffffff163b145b905081158015610881575080155b156108b8576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555083156109085760018560000160086101000a81548160ff0219169083151502179055505b610911866110b4565b831561096d5760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d260016040516109649190611ce6565b60405180910390a15b505050505050565b61097d610ebb565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002090506000600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002090508160010154421015610a62576040517f35549be800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600081805490501480610a7d57508080549050826005015410155b15610ab4576040517f8bdb538100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080836001015490506000846005015490505b8380549050811015610b9657610e10848281548110610aea57610ae96119b5565b5b906000526020600020906002020160000154610b069190611d01565b82610b119190611d43565b9150814210610b96576000612710858381548110610b3257610b316119b5565b5b9060005260206000209060020201600101548760030154610b539190611d01565b610b5d9190611da6565b90508084610b6b9190611d43565b9350600182610b7a9190611d43565b8660050181905550508080610b8e90611a13565b915050610ac8565b5060008211610bd1576040517f3507415000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81846004016000828254610be59190611d43565b92505081905550600073ffffffffffffffffffffffffffffffffffffffff168460020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610c7857610c738460020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16878461113a565b610c83565b610c828683611270565b5b818673ffffffffffffffffffffffffffffffffffffffff167fb21fb52d5749b80f3182f8c6992236b5e5576681880914484d7f4c9b062e619e60405160405180910390a350505050610cd361104b565b5050565b610cdf610d5d565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610d515760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610d48919061185e565b60405180910390fd5b610d5a81610de4565b50565b610d65611370565b73ffffffffffffffffffffffffffffffffffffffff16610d836107ae565b73ffffffffffffffffffffffffffffffffffffffff1614610de257610da6611370565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401610dd9919061185e565b60405180910390fd5b565b6000610dee611064565b905060008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050828260000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3505050565b6000610ec5611378565b90506002816000015403610f05576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002816000018190555050565b6000808573ffffffffffffffffffffffffffffffffffffffff166323b872dd868686604051602401610f4693929190611dd7565b6040516020818303038152906040529060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610f949190611e7f565b6000604051808303816000865af19150503d8060008114610fd1576040519150601f19603f3d011682016040523d82523d6000602084013e610fd6565b606091505b509150915081801561100457506000815114806110035750808060200190518101906110029190611ece565b5b5b611043576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161103a90611f7e565b60405180910390fd5b505050505050565b6000611055611378565b90506001816000018190555050565b60007f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300905090565b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00905090565b6110bc6113a0565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361112e5760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401611125919061185e565b60405180910390fd5b61113781610de4565b50565b6000808473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb858560405160240161116c929190611f9e565b6040516020818303038152906040529060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040516111ba9190611e7f565b6000604051808303816000865af19150503d80600081146111f7576040519150601f19603f3d011682016040523d82523d6000602084013e6111fc565b606091505b509150915081801561122a57506000815114806112295750808060200190518101906112289190611ece565b5b5b611269576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161126090612039565b60405180910390fd5b5050505050565b60008273ffffffffffffffffffffffffffffffffffffffff1682600067ffffffffffffffff8111156112a5576112a46114f4565b5b6040519080825280601f01601f1916602001820160405280156112d75781602001600182028036833780820191505090505b506040516112e59190611e7f565b60006040518083038185875af1925050503d8060008114611322576040519150601f19603f3d011682016040523d82523d6000602084013e611327565b606091505b505090508061136b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611362906120cb565b60405180910390fd5b505050565b600033905090565b60007f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00905090565b6113a86113e0565b6113de576040517fd7e6bcf800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b60006113ea61108c565b60000160089054906101000a900460ff16905090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b61142781611414565b811461143257600080fd5b50565b6000813590506114448161141e565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006114758261144a565b9050919050565b6114858161146a565b811461149057600080fd5b50565b6000813590506114a28161147c565b92915050565b6000819050919050565b6114bb816114a8565b81146114c657600080fd5b50565b6000813590506114d8816114b2565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61152c826114e3565b810181811067ffffffffffffffff8211171561154b5761154a6114f4565b5b80604052505050565b600061155e611400565b905061156a8282611523565b919050565b600067ffffffffffffffff82111561158a576115896114f4565b5b602082029050602081019050919050565b600080fd5b600080fd5b6000604082840312156115bb576115ba6115a0565b5b6115c56040611554565b905060006115d5848285016114c9565b60008301525060206115e9848285016114c9565b60208301525092915050565b60006116086116038461156f565b611554565b9050808382526020820190506040840283018581111561162b5761162a61159b565b5b835b81811015611654578061164088826115a5565b84526020840193505060408101905061162d565b5050509392505050565b600082601f830112611673576116726114de565b5b81356116838482602086016115f5565b91505092915050565b600080600080600060a086880312156116a8576116a761140a565b5b60006116b688828901611435565b95505060206116c788828901611493565b94505060406116d888828901611493565b93505060606116e9888289016114c9565b925050608086013567ffffffffffffffff81111561170a5761170961140f565b5b6117168882890161165e565b9150509295509295909350565b6000806040838503121561173a5761173961140a565b5b600061174885828601611493565b925050602061175985828601611435565b9150509250929050565b61176c8161146a565b82525050565b61177b816114a8565b82525050565b600060c0820190506117966000830189611763565b6117a36020830188611772565b6117b06040830187611763565b6117bd6060830186611772565b6117ca6080830185611772565b6117d760a0830184611772565b979650505050505050565b6000806000606084860312156117fb576117fa61140a565b5b600061180986828701611493565b935050602061181a86828701611435565b925050604061182b868287016114c9565b9150509250925092565b600060408201905061184a6000830185611772565b6118576020830184611772565b9392505050565b60006020820190506118736000830184611763565b92915050565b60006020828403121561188f5761188e61140a565b5b600061189d84828501611493565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6118db816114a8565b82525050565b6040820160008201516118f760008501826118d2565b50602082015161190a60208501826118d2565b50505050565b600061191c83836118e1565b60408301905092915050565b6000602082019050919050565b6000611940826118a6565b61194a81856118b1565b9350611955836118c2565b8060005b8381101561198657815161196d8882611910565b975061197883611928565b925050600181019050611959565b5085935050505092915050565b600060208201905081810360008301526119ad8184611935565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611a1e826114a8565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611a5057611a4f6119e4565b5b600182019050919050565b611a648161146a565b82525050565b6000611a768383611a5b565b60208301905092915050565b611a8b816114a8565b82525050565b6000611a9d8383611a82565b60208301905092915050565b600082016000820151611abc8482611a6a565b9350506020820151611ace8482611a91565b9350506040820151611ae08482611a6a565b9350506060820151611af28482611a91565b9350506080820151611b048482611a91565b93505060a0820151611b168482611a91565b935050505050565b6000611b2a8383611aa9565b60c08301905092915050565b600081905092915050565b600082016000820151611b548482611a91565b9350506020820151611b668482611a91565b935050505050565b6000611b7a8383611b41565b60408301905092915050565b6000611b91826118a6565b611b9b8185611b36565b9350611ba6836118c2565b8060005b83811015611bd7578151611bbe8882611b6e565b9750611bc983611928565b925050600181019050611baa565b5085935050505092915050565b6000611bf08383611b86565b905092915050565b611c0181611414565b82525050565b6000611c138383611bf8565b60208301905092915050565b60008083016000830151611c338582611b1e565b9450506020830151611c458582611be4565b9450506040830151611c578582611a6a565b9450506060830151611c698582611c07565b9450508391505092915050565b6000611c828284611c1f565b915081905092915050565b6000819050919050565b600067ffffffffffffffff82169050919050565b6000819050919050565b6000611cd0611ccb611cc684611c8d565b611cab565b611c97565b9050919050565b611ce081611cb5565b82525050565b6000602082019050611cfb6000830184611cd7565b92915050565b6000611d0c826114a8565b9150611d17836114a8565b9250828202611d25816114a8565b91508282048414831517611d3c57611d3b6119e4565b5b5092915050565b6000611d4e826114a8565b9150611d59836114a8565b9250828201905080821115611d7157611d706119e4565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611db1826114a8565b9150611dbc836114a8565b925082611dcc57611dcb611d77565b5b828204905092915050565b6000606082019050611dec6000830186611763565b611df96020830185611763565b611e066040830184611772565b949350505050565b600081519050919050565b600081905092915050565b60005b83811015611e42578082015181840152602081019050611e27565b60008484015250505050565b6000611e5982611e0e565b611e638185611e19565b9350611e73818560208601611e24565b80840191505092915050565b6000611e8b8284611e4e565b915081905092915050565b60008115159050919050565b611eab81611e96565b8114611eb657600080fd5b50565b600081519050611ec881611ea2565b92915050565b600060208284031215611ee457611ee361140a565b5b6000611ef284828501611eb9565b91505092915050565b600082825260208201905092915050565b7f5472616e7366657248656c7065723a3a7472616e7366657246726f6d3a20747260008201527f616e7366657246726f6d206661696c6564000000000000000000000000000000602082015250565b6000611f68603183611efb565b9150611f7382611f0c565b604082019050919050565b60006020820190508181036000830152611f9781611f5b565b9050919050565b6000604082019050611fb36000830185611763565b611fc06020830184611772565b9392505050565b7f5472616e7366657248656c7065723a3a736166655472616e736665723a20747260008201527f616e73666572206661696c656400000000000000000000000000000000000000602082015250565b6000612023602d83611efb565b915061202e82611fc7565b604082019050919050565b6000602082019050818103600083015261205281612016565b9050919050565b7f5472616e7366657248656c7065723a3a736166655472616e736665724554483a60008201527f20455448207472616e73666572206661696c6564000000000000000000000000602082015250565b60006120b5603483611efb565b91506120c082612059565b604082019050919050565b600060208201905081810360008301526120e4816120a8565b905091905056fea2646970667358221220ca4d6d364393a133098dab12ab53ce68e430eff740b8cfd5915dd26fc6fec46164736f6c63430008140033";
const isSuperArgs = (xs) => {
    return (typeof xs[0] === "string" ||
        Array.isArray(xs[0]) ||
        "_isInterface" in xs[0]);
};
class Vesting__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            const [linkLibraryAddresses, signer] = args;
            super(_abi, Vesting__factory.linkBytecode(linkLibraryAddresses), signer);
        }
    }
    static linkBytecode(linkLibraryAddresses) {
        let linkedBytecode = _bytecode;
        linkedBytecode = linkedBytecode.replace(new RegExp("__\\$2effe1973215a034e8e4a17bdeb5710028\\$__", "g"), linkLibraryAddresses["contracts/abstracts/libs/utils/AtomicSwapMsgValidator.sol:AtomicSwapMsgValidator"]
            .replace(/^0x/, "")
            .toLowerCase());
        return linkedBytecode;
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    connect(runner) {
        return super.connect(runner);
    }
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.Vesting__factory = Vesting__factory;
Vesting__factory.bytecode = _bytecode;
Vesting__factory.abi = _abi;
//# sourceMappingURL=Vesting__factory.js.map