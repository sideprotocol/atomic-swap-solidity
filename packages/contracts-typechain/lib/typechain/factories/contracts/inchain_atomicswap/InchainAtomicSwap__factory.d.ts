import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { InchainAtomicSwap, InchainAtomicSwapInterface } from "../../../contracts/inchain_atomicswap/InchainAtomicSwap";
type InchainAtomicSwapConstructorParams = [linkLibraryAddresses: InchainAtomicSwapLibraryAddresses, signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class InchainAtomicSwap__factory extends ContractFactory {
    constructor(...args: InchainAtomicSwapConstructorParams);
    static linkBytecode(linkLibraryAddresses: InchainAtomicSwapLibraryAddresses): string;
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<InchainAtomicSwap & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): InchainAtomicSwap__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50612a93806100206000396000f3fe60806040526004361061016a5760003560e01c806370480275116100d1578063a217fddf1161008a578063d7c41c7911610064578063d7c41c7914610532578063e63ab1e91461055b578063f2407ca414610586578063fca6caa1146105af57610171565b8063a217fddf146104b5578063b0803c1c146104e0578063d547741f1461050957610171565b806370480275146103a657806382dc1ec4146103cf5780638456cb59146103f857806389f681901461040f5780638d6cb1c41461043a57806391d148541461047857610171565b80633d538ecf116101235780633d538ecf146102a85780633f4ba83a146102d357806346fbf68e146102ea57806353f10c80146103275780635c975abb146103525780636b2c0f551461037d57610171565b806301ffc9a7146101765780631785f53c146101b3578063248a9ca3146101dc57806324d7806c146102195780632f2ff15d1461025657806336568abe1461027f57610171565b3661017157005b600080fd5b34801561018257600080fd5b5061019d60048036038101906101989190611d1b565b6105f7565b6040516101aa9190611d63565b60405180910390f35b3480156101bf57600080fd5b506101da60048036038101906101d59190611ddc565b610671565b005b3480156101e857600080fd5b5061020360048036038101906101fe9190611e3f565b610681565b6040516102109190611e7b565b60405180910390f35b34801561022557600080fd5b50610240600480360381019061023b9190611ddc565b6106af565b60405161024d9190611d63565b60405180910390f35b34801561026257600080fd5b5061027d60048036038101906102789190611e96565b6106c5565b005b34801561028b57600080fd5b506102a660048036038101906102a19190611e96565b6106e7565b005b3480156102b457600080fd5b506102bd610762565b6040516102ca9190611eef565b60405180910390f35b3480156102df57600080fd5b506102e8610768565b005b3480156102f657600080fd5b50610311600480360381019061030c9190611ddc565b6107db565b60405161031e9190611d63565b60405180910390f35b34801561033357600080fd5b5061033c61080e565b6040516103499190611eef565b60405180910390f35b34801561035e57600080fd5b50610367610814565b6040516103749190611d63565b60405180910390f35b34801561038957600080fd5b506103a4600480360381019061039f9190611ddc565b610839565b005b3480156103b257600080fd5b506103cd60048036038101906103c89190611ddc565b610866565b005b3480156103db57600080fd5b506103f660048036038101906103f19190611ddc565b610876565b005b34801561040457600080fd5b5061040d6108a3565b005b34801561041b57600080fd5b50610424610916565b6040516104319190611eef565b60405180910390f35b34801561044657600080fd5b50610461600480360381019061045c9190611f36565b61091c565b60405161046f929190611f76565b60405180910390f35b34801561048457600080fd5b5061049f600480360381019061049a9190611e96565b61095d565b6040516104ac9190611d63565b60405180910390f35b3480156104c157600080fd5b506104ca6109d6565b6040516104d79190611e7b565b60405180910390f35b3480156104ec57600080fd5b5061050760048036038101906105029190612029565b6109dd565b005b34801561051557600080fd5b50610530600480360381019061052b9190611e96565b610c2d565b005b34801561053e57600080fd5b506105596004803603810190610554919061208b565b610c4f565b005b34801561056757600080fd5b50610570610f92565b60405161057d9190611e7b565b60405180910390f35b34801561059257600080fd5b506105ad60048036038101906105a89190612118565b610fb6565b005b3480156105bb57600080fd5b506105d660048036038101906105d19190611e3f565b61104f565b6040516105ee9c9b9a99989796959493929190612218565b60405180910390f35b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061066a5750610669826111dd565b5b9050919050565b61067e6000801b82610c2d565b50565b60008061068c611247565b905080600001600084815260200190815260200160002060010154915050919050565b60006106be6000801b8361095d565b9050919050565b6106ce82610681565b6106d78161126f565b6106e18383611283565b50505050565b6106ef611384565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610753576040517f6697b23200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61075d828261138c565b505050565b60005481565b6107927f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a3361095d565b6107d1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107c890612331565b60405180910390fd5b6107d961148e565b565b60006108077f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a8361095d565b9050919050565b60075481565b60008061081f611500565b90508060000160009054906101000a900460ff1691505090565b6108637f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a82610c2d565b50565b6108736000801b826106c5565b50565b6108a07f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a826106c5565b50565b6108cd7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a3361095d565b61090c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161090390612331565b60405180910390fd5b610914611528565b565b60065481565b6002602052816000526040600020818154811061093857600080fd5b9060005260206000209060020201600091509150508060000154908060010154905082565b600080610968611247565b905080600001600085815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1691505092915050565b6000801b81565b6109e561159a565b6109ed6115f1565b6109f683611632565b60006040518060800160405280600654815260200160075481526020016127108152602001600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525090506000806000600173__$0f262aedcaca17139081476b6881c33748$__6319887ca39091898989600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168b6040518863ffffffff1660e01b8152600401610ae8979695949392919061282a565b606060405180830381865af4158015610b05573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b2991906128c3565b925092509250827f8b82d32987f9a4ae1bc7868a6f104edb711227ec3c9fccb0416a14fcc29bec5a60405160405180910390a28660e0016020810190610b6f9190612916565b15610bc15786606001602001358273ffffffffffffffffffffffffffffffffffffffff16847fadd1d5b6c827fee45fa32e72964c9d43d2191c9b8b083889fb2e3f468c71856860405160405180910390a45b828173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f6bf7309f141d1b44e414f1fc04d98491cd0acf98f0f1e5ad885d0a7ce164e6fa60405160405180910390a450505050610c286117a9565b505050565b610c3682610681565b610c3f8161126f565b610c49838361138c565b50505050565b6000610c596117c2565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff16148015610ca75750825b9050600060018367ffffffffffffffff16148015610cdc575060003073ffffffffffffffffffffffffffffffffffffffff163b145b905081158015610cea575080155b15610d21576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055508315610d715760018560000160086101000a81548160ff0219169083151502179055505b610d7a8b6117ea565b612710871115610db6576040517fce43144600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b612710861115610df2576040517fb089e48e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff1603610e58576040517fcfe2ea6300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b866006819055508560078190555087600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555089600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555088600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508315610f855760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d26001604051610f7c9190612992565b60405180910390a15b5050505050505050505050565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b610fc36000801b3361095d565b611002576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ff990612331565b60405180910390fd5b60008111611045576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161103c906129f9565b60405180910390fd5b8060008190555050565b60016020528060005260406000206000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806002016040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481525050908060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806005016040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815250509080600701549080600801549080600901549080600a01549080600b01549080600c0160009054906101000a900460ff1690508c565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60007f02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800905090565b6112808161127b611384565b611999565b50565b60008061128e611247565b905061129a848461095d565b61137857600181600001600086815260200190815260200160002060000160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550611314611384565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a4600191505061137e565b60009150505b92915050565b600033905090565b600080611397611247565b90506113a3848461095d565b1561148257600081600001600086815260200190815260200160002060000160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555061141e611384565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16857ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a46001915050611488565b60009150505b92915050565b6114966119ea565b60006114a0611500565b905060008160000160006101000a81548160ff0219169083151502179055507f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6114e8611384565b6040516114f59190612a19565b60405180910390a150565b60007fcd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300905090565b6115306115f1565b600061153a611500565b905060018160000160006101000a81548160ff0219169083151502179055507f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611582611384565b60405161158f9190612a19565b60405180910390a150565b60006115a4611a2a565b905060028160000154036115e4576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002816000018190555050565b6115f9610814565b15611630576040517fd93c066500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b8060600160000160208101906116489190611ddc565b73ffffffffffffffffffffffffffffffffffffffff168160200160000160208101906116749190611ddc565b73ffffffffffffffffffffffffffffffffffffffff16036116c1576040517f45b3a4c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806101e00160600160208101906116d89190611ddc565b73ffffffffffffffffffffffffffffffffffffffff16816101400160600160208101906117059190611ddc565b73ffffffffffffffffffffffffffffffffffffffff1603611752576040517f5e231fff00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80602001602001358160c0013511156117a6578060c001356040517f46d9be1400000000000000000000000000000000000000000000000000000000815260040161179d9190611eef565b60405180910390fd5b50565b60006117b3611a2a565b90506001816000018190555050565b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00905090565b60006117f46117c2565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff161480156118425750825b9050600060018367ffffffffffffffff16148015611877575060003073ffffffffffffffffffffffffffffffffffffffff163b145b905081158015611885575080155b156118bc576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550831561190c5760018560000160086101000a81548160ff0219169083151502179055505b611914611a52565b61191c611a5c565b611924611a66565b61192d86611a9a565b606460008190555083156119915760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d260016040516119889190612992565b60405180910390a15b505050505050565b6119a3828261095d565b6119e65780826040517fe2517d3f0000000000000000000000000000000000000000000000000000000081526004016119dd929190612a34565b60405180910390fd5b5050565b6119f2610814565b611a28576040517f8dfc202b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b60007f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00905090565b611a5a611c59565b565b611a64611c59565b565b611a6e611c59565b6000611a78611500565b905060008160000160006101000a81548160ff02191690831515021790555050565b6000611aa46117c2565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff16148015611af25750825b9050600060018367ffffffffffffffff16148015611b27575060003073ffffffffffffffffffffffffffffffffffffffff163b145b905081158015611b35575080155b15611b6c576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055508315611bbc5760018560000160086101000a81548160ff0219169083151502179055505b611bc96000801b87611283565b50611bf47f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a87611283565b508315611c515760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d26001604051611c489190612992565b60405180910390a15b505050505050565b611c61611c99565b611c97576040517fd7e6bcf800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b6000611ca36117c2565b60000160089054906101000a900460ff16905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611cf881611cc3565b8114611d0357600080fd5b50565b600081359050611d1581611cef565b92915050565b600060208284031215611d3157611d30611cb9565b5b6000611d3f84828501611d06565b91505092915050565b60008115159050919050565b611d5d81611d48565b82525050565b6000602082019050611d786000830184611d54565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611da982611d7e565b9050919050565b611db981611d9e565b8114611dc457600080fd5b50565b600081359050611dd681611db0565b92915050565b600060208284031215611df257611df1611cb9565b5b6000611e0084828501611dc7565b91505092915050565b6000819050919050565b611e1c81611e09565b8114611e2757600080fd5b50565b600081359050611e3981611e13565b92915050565b600060208284031215611e5557611e54611cb9565b5b6000611e6384828501611e2a565b91505092915050565b611e7581611e09565b82525050565b6000602082019050611e906000830184611e6c565b92915050565b60008060408385031215611ead57611eac611cb9565b5b6000611ebb85828601611e2a565b9250506020611ecc85828601611dc7565b9150509250929050565b6000819050919050565b611ee981611ed6565b82525050565b6000602082019050611f046000830184611ee0565b92915050565b611f1381611ed6565b8114611f1e57600080fd5b50565b600081359050611f3081611f0a565b92915050565b60008060408385031215611f4d57611f4c611cb9565b5b6000611f5b85828601611e2a565b9250506020611f6c85828601611f21565b9150509250929050565b6000604082019050611f8b6000830185611ee0565b611f986020830184611ee0565b9392505050565b600080fd5b60006102808284031215611fbb57611fba611f9f565b5b81905092915050565b600080fd5b600080fd5b600080fd5b60008083601f840112611fe957611fe8611fc4565b5b8235905067ffffffffffffffff81111561200657612005611fc9565b5b60208301915083604082028301111561202257612021611fce565b5b9250929050565b60008060006102a0848603121561204357612042611cb9565b5b600061205186828701611fa4565b93505061028084013567ffffffffffffffff81111561207357612072611cbe565b5b61207f86828701611fd3565b92509250509250925092565b60008060008060008060c087890312156120a8576120a7611cb9565b5b60006120b689828a01611dc7565b96505060206120c789828a01611dc7565b95505060406120d889828a01611dc7565b94505060606120e989828a01611dc7565b93505060806120fa89828a01611f21565b92505060a061210b89828a01611f21565b9150509295509295509295565b60006020828403121561212e5761212d611cb9565b5b600061213c84828501611f21565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6004811061218557612184612145565b5b50565b600081905061219682612174565b919050565b60006121a682612188565b9050919050565b6121b68161219b565b82525050565b6121c581611d9e565b82525050565b6121d481611d9e565b82525050565b6121e381611ed6565b82525050565b6040820160008201516121ff60008501826121cb565b50602082015161221260208501826121da565b50505050565b60006101c08201905061222e600083018f611e6c565b61223b602083018e6121ad565b612248604083018d6121bc565b612255606083018c6121e9565b61226260a083018b6121bc565b61226f60c083018a6121e9565b61227d610100830189611ee0565b61228b610120830188611ee0565b612299610140830187611ee0565b6122a7610160830186611ee0565b6122b5610180830185611ee0565b6122c36101a0830184611d54565b9d9c50505050505050505050505050565b600082825260208201905092915050565b7f4f776e61626c655061757361626c653a206163636573732064656e6965640000600082015250565b600061231b601e836122d4565b9150612326826122e5565b602082019050919050565b6000602082019050818103600083015261234a8161230e565b9050919050565b8082525050565b60006123676020840184611e2a565b905092915050565b61237881611e09565b82525050565b600082905092915050565b60006123986020840184611dc7565b905092915050565b6123a981611d9e565b82525050565b60006123be6020840184611f21565b905092915050565b6123cf81611ed6565b82525050565b604082016123e66000830183612389565b6123f360008501826123a0565b5061240160208301836123af565b61240e60208501826123c6565b50505050565b61241d81611d48565b811461242857600080fd5b50565b60008135905061243a81612414565b92915050565b600061244f602084018461242b565b905092915050565b61246081611d48565b82525050565b600082905092915050565b600060ff82169050919050565b61248781612471565b811461249257600080fd5b50565b6000813590506124a48161247e565b92915050565b60006124b96020840184612495565b905092915050565b6124ca81612471565b82525050565b60a082016124e160008301836124aa565b6124ee60008501826124c1565b506124fc6020830183612358565b612509602085018261236f565b506125176040830183612358565b612524604085018261236f565b506125326060830183612389565b61253f60608501826123a0565b5061254d60808301836123af565b61255a60808501826123c6565b50505050565b61028082016125726000830183612358565b61257f600085018261236f565b5061258d602083018361237e565b61259a60208501826123d5565b506125a8606083018361237e565b6125b560608501826123d5565b506125c360a0830183612389565b6125d060a08501826123a0565b506125de60c08301836123af565b6125eb60c08501826123c6565b506125f960e0830183612440565b61260660e0850182612457565b50612615610100830183612440565b612623610100850182612457565b50612632610120830183612440565b612640610120850182612457565b5061264f610140830183612466565b61265d6101408501826124d0565b5061266c6101e0830183612466565b61267a6101e08501826124d0565b50505050565b600082825260208201905092915050565b6000819050919050565b604082016126ac60008301836123af565b6126b960008501826123c6565b506126c760208301836123af565b6126d460208501826123c6565b50505050565b60006126e6838361269b565b60408301905092915050565b600082905092915050565b6000604082019050919050565b60006127168385612680565b935061272182612691565b8060005b8581101561275a5761273782846126f2565b61274188826126da565b975061274c836126fd565b925050600181019050612725565b5085925050509392505050565b61277081611d9e565b82525050565b6000819050919050565b600061279b61279661279184611d7e565b612776565b611d7e565b9050919050565b60006127ad82612780565b9050919050565b60006127bf826127a2565b9050919050565b6127cf816127b4565b82525050565b6080820160008201516127eb60008501826123c6565b5060208201516127fe60208501826123c6565b50604082015161281160408501826123c6565b50606082015161282460608501826123a0565b50505050565b600061038082019050612840600083018a612351565b61284d6020830189612560565b8181036102a083015261286181878961270a565b90506128716102c0830186612767565b61287f6102e08301856127c6565b61288d6103008301846127d5565b98975050505050505050565b6000815190506128a881611e13565b92915050565b6000815190506128bd81611db0565b92915050565b6000806000606084860312156128dc576128db611cb9565b5b60006128ea86828701612899565b93505060206128fb868287016128ae565b925050604061290c868287016128ae565b9150509250925092565b60006020828403121561292c5761292b611cb9565b5b600061293a8482850161242b565b91505092915050565b6000819050919050565b600067ffffffffffffffff82169050919050565b600061297c61297761297284612943565b612776565b61294d565b9050919050565b61298c81612961565b82525050565b60006020820190506129a76000830184612983565b92915050565b7f4d6f726967696e4170703a20696e76616c69642076616c756521000000000000600082015250565b60006129e3601a836122d4565b91506129ee826129ad565b602082019050919050565b60006020820190508181036000830152612a12816129d6565b9050919050565b6000602082019050612a2e60008301846121bc565b92915050565b6000604082019050612a4960008301856121bc565b612a566020830184611e6c565b939250505056fea26469706673582212201e54fff32ffb4ff524a2c506ba13ea7161fa1289c136a0f3b6cf9ddd1b87085864736f6c63430008140033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "AccessControlBadConfirmation";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "neededRole";
            readonly type: "bytes32";
        }];
        readonly name: "AccessControlUnauthorizedAccount";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "DuplicateReleaseSchedule";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "EnforcedPause";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ExpectedPause";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidAddress";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidBuyerFee";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "provided";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "maximum";
            readonly type: "uint256";
        }];
        readonly name: "InvalidExpirationTime";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidInitialization";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "InvalidMinBidAmount";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidReleasePercentage";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidSellerFee";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidSigners";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidTotalPercentage";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidTreasuryAddress";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "real";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "expected";
            readonly type: "uint256";
        }];
        readonly name: "NotEnoughFund";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NotInitializing";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OrderAlreadyExists";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "current";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiredTime";
            readonly type: "uint256";
        }];
        readonly name: "OrderAlreadyExpired";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OverMaximumReleaseStep";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ReentrancyGuardReentrantCall";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "UnauthorizedSender";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "UnsupportedTokenPair";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ZeroReleaseSchedule";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "orderID";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "bidder";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "AcceptedBid";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "id";
            readonly type: "bytes32";
        }];
        readonly name: "AtomicSwapOrderCreated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "id";
            readonly type: "bytes32";
        }];
        readonly name: "AtomicSwapOrderTook";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint64";
            readonly name: "version";
            readonly type: "uint64";
        }];
        readonly name: "Initialized";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "Paused";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "previousAdminRole";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "newAdminRole";
            readonly type: "bytes32";
        }];
        readonly name: "RoleAdminChanged";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "RoleGranted";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "RoleRevoked";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "Unpaused";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "DEFAULT_ADMIN_ROLE";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "PAUSER_ROLE";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_account";
            readonly type: "address";
        }];
        readonly name: "addAdmin";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_account";
            readonly type: "address";
        }];
        readonly name: "addPauser";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "buyerFeeRate";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "bytes32";
                readonly name: "uuid";
                readonly type: "bytes32";
            }, {
                readonly components: readonly [{
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "amount";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct IAtomicSwapBase.Coin";
                readonly name: "sellToken";
                readonly type: "tuple";
            }, {
                readonly components: readonly [{
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "amount";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct IAtomicSwapBase.Coin";
                readonly name: "buyToken";
                readonly type: "tuple";
            }, {
                readonly internalType: "address";
                readonly name: "desiredTaker";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "minBidAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bool";
                readonly name: "acceptBid";
                readonly type: "bool";
            }, {
                readonly internalType: "bool";
                readonly name: "withdrawToSellerAccount";
                readonly type: "bool";
            }, {
                readonly internalType: "bool";
                readonly name: "withdrawToBuyerAccount";
                readonly type: "bool";
            }, {
                readonly components: readonly [{
                    readonly internalType: "uint8";
                    readonly name: "v";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "bytes32";
                    readonly name: "r";
                    readonly type: "bytes32";
                }, {
                    readonly internalType: "bytes32";
                    readonly name: "s";
                    readonly type: "bytes32";
                }, {
                    readonly internalType: "address";
                    readonly name: "owner";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "deadline";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct IAtomicSwapBase.PermitSignature";
                readonly name: "sellerSignature";
                readonly type: "tuple";
            }, {
                readonly components: readonly [{
                    readonly internalType: "uint8";
                    readonly name: "v";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "bytes32";
                    readonly name: "r";
                    readonly type: "bytes32";
                }, {
                    readonly internalType: "bytes32";
                    readonly name: "s";
                    readonly type: "bytes32";
                }, {
                    readonly internalType: "address";
                    readonly name: "owner";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "deadline";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct IAtomicSwapBase.PermitSignature";
                readonly name: "buyerSignature";
                readonly type: "tuple";
            }];
            readonly internalType: "struct IAtomicSwapBase.SwapWithPermitMsg";
            readonly name: "swap";
            readonly type: "tuple";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "durationInHours";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "percentage";
                readonly type: "uint256";
            }];
            readonly internalType: "struct IAtomicSwapBase.Release[]";
            readonly name: "releases";
            readonly type: "tuple[]";
        }];
        readonly name: "executeSwapWithPermit";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }];
        readonly name: "getRoleAdmin";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "grantRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "hasRole";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_admin";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_vault";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_vestingManager";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_treasury";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_sellerFee";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "_buyerFee";
            readonly type: "uint256";
        }];
        readonly name: "initialize";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_account";
            readonly type: "address";
        }];
        readonly name: "isAdmin";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_account";
            readonly type: "address";
        }];
        readonly name: "isPauser";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "paginationSize";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "pause";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "paused";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_account";
            readonly type: "address";
        }];
        readonly name: "removeAdmin";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_account";
            readonly type: "address";
        }];
        readonly name: "removePauser";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "callerConfirmation";
            readonly type: "address";
        }];
        readonly name: "renounceRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "revokeRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "sellerFeeRate";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_paginationSize";
            readonly type: "uint256";
        }];
        readonly name: "setPaginationSize";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "interfaceId";
            readonly type: "bytes4";
        }];
        readonly name: "supportsInterface";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly name: "swapOrder";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "id";
            readonly type: "bytes32";
        }, {
            readonly internalType: "enum IAtomicSwapBase.OrderStatus";
            readonly name: "status";
            readonly type: "uint8";
        }, {
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }];
            readonly internalType: "struct IAtomicSwapBase.Coin";
            readonly name: "sellToken";
            readonly type: "tuple";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }];
            readonly internalType: "struct IAtomicSwapBase.Coin";
            readonly name: "buyToken";
            readonly type: "tuple";
        }, {
            readonly internalType: "uint256";
            readonly name: "minBidAmount";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "createdAt";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "canceledAt";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "completedAt";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiredAt";
            readonly type: "uint256";
        }, {
            readonly internalType: "bool";
            readonly name: "acceptBid";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "swapOrderVestingParams";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "durationInHours";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "percentage";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "unpause";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly stateMutability: "payable";
        readonly type: "receive";
    }];
    static createInterface(): InchainAtomicSwapInterface;
    static connect(address: string, runner?: ContractRunner | null): InchainAtomicSwap;
}
export interface InchainAtomicSwapLibraryAddresses {
    ["contracts/inchain_atomicswap/logic/AtomicSwapStateLogic.sol:AtomicSwapStateLogic"]: string;
}
export {};
