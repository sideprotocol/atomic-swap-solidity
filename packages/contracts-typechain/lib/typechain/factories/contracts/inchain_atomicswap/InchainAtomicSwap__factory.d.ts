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
    static readonly bytecode = "0x608060405234801561001057600080fd5b50612a09806100206000396000f3fe608060405234801561001057600080fd5b50600436106101a95760003560e01c80636b2c0f55116100f9578063a217fddf11610097578063d7c41c7911610071578063d7c41c79146104be578063e63ab1e9146104da578063f2407ca4146104f8578063fca6caa114610514576101a9565b8063a217fddf14610454578063a743a3d014610472578063d547741f146104a2576101a9565b80638456cb59116100d35780638456cb59146103cb57806389f68190146103d55780638d6cb1c4146103f357806391d1485414610424576101a9565b80636b2c0f5514610377578063704802751461039357806382dc1ec4146103af576101a9565b806336568abe1161016657806346fbf68e1161014057806346fbf68e146102d657806353f10c80146103065780635c975abb1461032457806366e929bf14610342576101a9565b806336568abe146102925780633d538ecf146102ae5780633f4ba83a146102cc576101a9565b806301ffc9a7146101ae5780631785f53c146101de578063248a9ca3146101fa57806324d7806c1461022a5780632f2ff15d1461025a57806334a884a214610276575b600080fd5b6101c860048036038101906101c39190611c22565b61054f565b6040516101d59190611c6a565b60405180910390f35b6101f860048036038101906101f39190611ce3565b6105c9565b005b610214600480360381019061020f9190611d46565b6105d9565b6040516102219190611d82565b60405180910390f35b610244600480360381019061023f9190611ce3565b610607565b6040516102519190611c6a565b60405180910390f35b610274600480360381019061026f9190611d9d565b61061d565b005b610290600480360381019061028b9190611e67565b61063f565b005b6102ac60048036038101906102a79190611d9d565b61091a565b005b6102b6610995565b6040516102c39190611ee2565b60405180910390f35b6102d461099b565b005b6102f060048036038101906102eb9190611ce3565b610a0e565b6040516102fd9190611c6a565b60405180910390f35b61030e610a41565b60405161031b9190611ee2565b60405180910390f35b61032c610a47565b6040516103399190611c6a565b60405180910390f35b61035c60048036038101906103579190611d9d565b610a6c565b60405161036e96959493929190611f83565b60405180910390f35b610391600480360381019061038c9190611ce3565b610ae2565b005b6103ad60048036038101906103a89190611ce3565b610b0f565b005b6103c960048036038101906103c49190611ce3565b610b1f565b005b6103d3610b4c565b005b6103dd610bbf565b6040516103ea9190611ee2565b60405180910390f35b61040d60048036038101906104089190612010565b610bc5565b60405161041b929190612050565b60405180910390f35b61043e60048036038101906104399190611d9d565b610c06565b60405161044b9190611c6a565b60405180910390f35b61045c610c7f565b6040516104699190611d82565b60405180910390f35b61048c60048036038101906104879190611d9d565b610c86565b6040516104999190611ee2565b60405180910390f35b6104bc60048036038101906104b79190611d9d565b610cab565b005b6104d860048036038101906104d39190612079565b610ccd565b005b6104e2611010565b6040516104ef9190611d82565b60405180910390f35b610512600480360381019061050d9190612106565b611034565b005b61052e60048036038101906105299190611d46565b6110cd565b6040516105469c9b9a999897969594939291906121c8565b60405180910390f35b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806105c257506105c18261125b565b5b9050919050565b6105d66000801b82610cab565b50565b6000806105e46112c5565b905080600001600084815260200190815260200160002060010154915050919050565b60006106166000801b83610c06565b9050919050565b610626826105d9565b61062f816112ed565b6106398383611301565b50505050565b610647611402565b61064f611459565b8260600160000160208101906106659190611ce3565b73ffffffffffffffffffffffffffffffffffffffff168360200160000160208101906106919190611ce3565b73ffffffffffffffffffffffffffffffffffffffff16036106de576040517f45b3a4c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006040518060800160405280600754815260200160085481526020016127108152602001600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525090506000806000600173__$8ad05547f64aebe22f2eafad9eff5b91dd$__6319887ca39091898989600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168b6040518863ffffffff1660e01b81526004016107d09796959493929190612723565b606060405180830381865af41580156107ed573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061081191906127bc565b925092509250827f8b82d32987f9a4ae1bc7868a6f104edb711227ec3c9fccb0416a14fcc29bec5a60405160405180910390a28660e0016020810190610857919061280f565b156108ad5786606001602001358273ffffffffffffffffffffffffffffffffffffffff16847fadd1d5b6c827fee45fa32e72964c9d43d2191c9b8b083889fb2e3f468c71856860405160405180910390a4610909565b828173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f6bf7309f141d1b44e414f1fc04d98491cd0acf98f0f1e5ad885d0a7ce164e6fa60405160405180910390a45b5050505061091561149a565b505050565b6109226114b3565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610986576040517f6697b23200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61099082826114bb565b505050565b60005481565b6109c57f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a33610c06565b610a04576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109fb90612899565b60405180910390fd5b610a0c6115bd565b565b6000610a3a7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a83610c06565b9050919050565b60085481565b600080610a5261162f565b90508060000160009054906101000a900460ff1691505090565b6003602052816000526040600020602052806000526040600020600091509150508060000154908060010154908060020160009054906101000a900460ff16908060020160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030154908060040154905086565b610b0c7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a82610cab565b50565b610b1c6000801b8261061d565b50565b610b497f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a8261061d565b50565b610b767f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a33610c06565b610bb5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bac90612899565b60405180910390fd5b610bbd611657565b565b60075481565b60026020528160005260406000208181548110610be157600080fd5b9060005260206000209060020201600091509150508060000154908060010154905082565b600080610c116112c5565b905080600001600085815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1691505092915050565b6000801b81565b6009602052816000526040600020602052806000526040600020600091509150505481565b610cb4826105d9565b610cbd816112ed565b610cc783836114bb565b50505050565b6000610cd76116c9565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff16148015610d255750825b9050600060018367ffffffffffffffff16148015610d5a575060003073ffffffffffffffffffffffffffffffffffffffff163b145b905081158015610d68575080155b15610d9f576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055508315610def5760018560000160086101000a81548160ff0219169083151502179055505b610df88b6116f1565b612710871115610e34576040517fce43144600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b612710861115610e70576040517fb089e48e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff1603610ed6576040517fcfe2ea6300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b866007819055508560088190555087600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555089600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555088600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083156110035760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d26001604051610ffa9190612908565b60405180910390a15b5050505050505050505050565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b6110416000801b33610c06565b611080576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161107790612899565b60405180910390fd5b600081116110c3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110ba9061296f565b60405180910390fd5b8060008190555050565b60016020528060005260406000206000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806002016040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481525050908060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806005016040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815250509080600701549080600801549080600901549080600a01549080600b01549080600c0160009054906101000a900460ff1690508c565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60007f02dd7bc7dec4dceedda775e58dd541e08a116c6c53815c0bd028192f7b626800905090565b6112fe816112f96114b3565b6118a0565b50565b60008061130c6112c5565b90506113188484610c06565b6113f657600181600001600086815260200190815260200160002060000160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506113926114b3565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16857f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a460019150506113fc565b60009150505b92915050565b600061140c6118f1565b9050600281600001540361144c576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002816000018190555050565b611461610a47565b15611498576040517fd93c066500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b60006114a46118f1565b90506001816000018190555050565b600033905090565b6000806114c66112c5565b90506114d28484610c06565b156115b157600081600001600086815260200190815260200160002060000160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555061154d6114b3565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16857ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a460019150506115b7565b60009150505b92915050565b6115c5611919565b60006115cf61162f565b905060008160000160006101000a81548160ff0219169083151502179055507f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6116176114b3565b604051611624919061298f565b60405180910390a150565b60007fcd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300905090565b61165f611459565b600061166961162f565b905060018160000160006101000a81548160ff0219169083151502179055507f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586116b16114b3565b6040516116be919061298f565b60405180910390a150565b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00905090565b60006116fb6116c9565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff161480156117495750825b9050600060018367ffffffffffffffff1614801561177e575060003073ffffffffffffffffffffffffffffffffffffffff163b145b90508115801561178c575080155b156117c3576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555083156118135760018560000160086101000a81548160ff0219169083151502179055505b61181b611959565b611823611963565b61182b61196d565b611834866119a1565b606460008190555083156118985760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2600160405161188f9190612908565b60405180910390a15b505050505050565b6118aa8282610c06565b6118ed5780826040517fe2517d3f0000000000000000000000000000000000000000000000000000000081526004016118e49291906129aa565b60405180910390fd5b5050565b60007f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00905090565b611921610a47565b611957576040517f8dfc202b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b611961611b60565b565b61196b611b60565b565b611975611b60565b600061197f61162f565b905060008160000160006101000a81548160ff02191690831515021790555050565b60006119ab6116c9565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff161480156119f95750825b9050600060018367ffffffffffffffff16148015611a2e575060003073ffffffffffffffffffffffffffffffffffffffff163b145b905081158015611a3c575080155b15611a73576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055508315611ac35760018560000160086101000a81548160ff0219169083151502179055505b611ad06000801b87611301565b50611afb7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a87611301565b508315611b585760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d26001604051611b4f9190612908565b60405180910390a15b505050505050565b611b68611ba0565b611b9e576040517fd7e6bcf800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b6000611baa6116c9565b60000160089054906101000a900460ff16905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611bff81611bca565b8114611c0a57600080fd5b50565b600081359050611c1c81611bf6565b92915050565b600060208284031215611c3857611c37611bc0565b5b6000611c4684828501611c0d565b91505092915050565b60008115159050919050565b611c6481611c4f565b82525050565b6000602082019050611c7f6000830184611c5b565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611cb082611c85565b9050919050565b611cc081611ca5565b8114611ccb57600080fd5b50565b600081359050611cdd81611cb7565b92915050565b600060208284031215611cf957611cf8611bc0565b5b6000611d0784828501611cce565b91505092915050565b6000819050919050565b611d2381611d10565b8114611d2e57600080fd5b50565b600081359050611d4081611d1a565b92915050565b600060208284031215611d5c57611d5b611bc0565b5b6000611d6a84828501611d31565b91505092915050565b611d7c81611d10565b82525050565b6000602082019050611d976000830184611d73565b92915050565b60008060408385031215611db457611db3611bc0565b5b6000611dc285828601611d31565b9250506020611dd385828601611cce565b9150509250929050565b600080fd5b60006102408284031215611df957611df8611ddd565b5b81905092915050565b600080fd5b600080fd5b600080fd5b60008083601f840112611e2757611e26611e02565b5b8235905067ffffffffffffffff811115611e4457611e43611e07565b5b602083019150836040820283011115611e6057611e5f611e0c565b5b9250929050565b60008060006102608486031215611e8157611e80611bc0565b5b6000611e8f86828701611de2565b93505061024084013567ffffffffffffffff811115611eb157611eb0611bc5565b5b611ebd86828701611e11565b92509250509250925092565b6000819050919050565b611edc81611ec9565b82525050565b6000602082019050611ef76000830184611ed3565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60038110611f3d57611f3c611efd565b5b50565b6000819050611f4e82611f2c565b919050565b6000611f5e82611f40565b9050919050565b611f6e81611f53565b82525050565b611f7d81611ca5565b82525050565b600060c082019050611f986000830189611ed3565b611fa56020830188611d73565b611fb26040830187611f65565b611fbf6060830186611f74565b611fcc6080830185611ed3565b611fd960a0830184611ed3565b979650505050505050565b611fed81611ec9565b8114611ff857600080fd5b50565b60008135905061200a81611fe4565b92915050565b6000806040838503121561202757612026611bc0565b5b600061203585828601611d31565b925050602061204685828601611ffb565b9150509250929050565b60006040820190506120656000830185611ed3565b6120726020830184611ed3565b9392505050565b60008060008060008060c0878903121561209657612095611bc0565b5b60006120a489828a01611cce565b96505060206120b589828a01611cce565b95505060406120c689828a01611cce565b94505060606120d789828a01611cce565b93505060806120e889828a01611ffb565b92505060a06120f989828a01611ffb565b9150509295509295509295565b60006020828403121561211c5761211b611bc0565b5b600061212a84828501611ffb565b91505092915050565b6004811061214457612143611efd565b5b50565b600081905061215582612133565b919050565b600061216582612147565b9050919050565b6121758161215a565b82525050565b61218481611ca5565b82525050565b61219381611ec9565b82525050565b6040820160008201516121af600085018261217b565b5060208201516121c2602085018261218a565b50505050565b60006101c0820190506121de600083018f611d73565b6121eb602083018e61216c565b6121f8604083018d611f74565b612205606083018c612199565b61221260a083018b611f74565b61221f60c083018a612199565b61222d610100830189611ed3565b61223b610120830188611ed3565b612249610140830187611ed3565b612257610160830186611ed3565b612265610180830185611ed3565b6122736101a0830184611c5b565b9d9c50505050505050505050505050565b8082525050565b600061229a6020840184611d31565b905092915050565b6122ab81611d10565b82525050565b600082905092915050565b60006122cb6020840184611cce565b905092915050565b6122dc81611ca5565b82525050565b60006122f16020840184611ffb565b905092915050565b61230281611ec9565b82525050565b6040820161231960008301836122bc565b61232660008501826122d3565b5061233460208301836122e2565b61234160208501826122f9565b50505050565b61235081611c4f565b811461235b57600080fd5b50565b60008135905061236d81612347565b92915050565b6000612382602084018461235e565b905092915050565b61239381611c4f565b82525050565b600082905092915050565b600060ff82169050919050565b6123ba816123a4565b81146123c557600080fd5b50565b6000813590506123d7816123b1565b92915050565b60006123ec60208401846123c8565b905092915050565b6123fd816123a4565b82525050565b60a0820161241460008301836123dd565b61242160008501826123f4565b5061242f602083018361228b565b61243c60208501826122a2565b5061244a604083018361228b565b61245760408501826122a2565b5061246560608301836122bc565b61247260608501826122d3565b5061248060808301836122e2565b61248d60808501826122f9565b50505050565b61024082016124a5600083018361228b565b6124b260008501826122a2565b506124c060208301836122b1565b6124cd6020850182612308565b506124db60608301836122b1565b6124e86060850182612308565b506124f660a08301836122bc565b61250360a08501826122d3565b5061251160c08301836122e2565b61251e60c08501826122f9565b5061252c60e0830183612373565b61253960e085018261238a565b50612548610100830183612399565b612556610100850182612403565b506125656101a0830183612399565b6125736101a0850182612403565b50505050565b600082825260208201905092915050565b6000819050919050565b604082016125a560008301836122e2565b6125b260008501826122f9565b506125c060208301836122e2565b6125cd60208501826122f9565b50505050565b60006125df8383612594565b60408301905092915050565b600082905092915050565b6000604082019050919050565b600061260f8385612579565b935061261a8261258a565b8060005b858110156126535761263082846125eb565b61263a88826125d3565b9750612645836125f6565b92505060018101905061261e565b5085925050509392505050565b61266981611ca5565b82525050565b6000819050919050565b600061269461268f61268a84611c85565b61266f565b611c85565b9050919050565b60006126a682612679565b9050919050565b60006126b88261269b565b9050919050565b6126c8816126ad565b82525050565b6080820160008201516126e460008501826122f9565b5060208201516126f760208501826122f9565b50604082015161270a60408501826122f9565b50606082015161271d60608501826122d3565b50505050565b600061034082019050612739600083018a612284565b6127466020830189612493565b81810361026083015261275a818789612603565b905061276a610280830186612660565b6127786102a08301856126bf565b6127866102c08301846126ce565b98975050505050505050565b6000815190506127a181611d1a565b92915050565b6000815190506127b681611cb7565b92915050565b6000806000606084860312156127d5576127d4611bc0565b5b60006127e386828701612792565b93505060206127f4868287016127a7565b9250506040612805868287016127a7565b9150509250925092565b60006020828403121561282557612824611bc0565b5b60006128338482850161235e565b91505092915050565b600082825260208201905092915050565b7f4f776e61626c655061757361626c653a206163636573732064656e6965640000600082015250565b6000612883601e8361283c565b915061288e8261284d565b602082019050919050565b600060208201905081810360008301526128b281612876565b9050919050565b6000819050919050565b600067ffffffffffffffff82169050919050565b60006128f26128ed6128e8846128b9565b61266f565b6128c3565b9050919050565b612902816128d7565b82525050565b600060208201905061291d60008301846128f9565b92915050565b7f4d6f726967696e4170703a20696e76616c69642076616c756521000000000000600082015250565b6000612959601a8361283c565b915061296482612923565b602082019050919050565b600060208201905081810360008301526129888161294c565b9050919050565b60006020820190506129a46000830184611f74565b92915050565b60006040820190506129bf6000830185611f74565b6129cc6020830184611d73565b939250505056fea2646970667358221220441869e806174a6eeebcc32c1d2e54e7612fad2c279ef731563600944f7ca77964736f6c63430008140033";
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
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "provided";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "expectedExpiry";
            readonly type: "uint256";
        }];
        readonly name: "BidAlreadyExpired";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "BidAlreadyPlaced";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "BidDoesNotExist";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "BidNotAllowed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "enum IAtomicSwapBase.BidStatus";
            readonly name: "status";
            readonly type: "uint8";
        }];
        readonly name: "BidNotInPlacedStatus";
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
        readonly name: "InactiveOrder";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvaldAddition";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidAddress";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidBidderAddress";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidBuyerFee";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "contractAddress";
            readonly type: "address";
        }];
        readonly name: "InvalidContractAddress";
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
        readonly inputs: readonly [];
        readonly name: "InvalidMinimumBidLimit";
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
        readonly name: "InvalidTotalPercentage";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidTreasuryAddress";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "MismatchedBidAmount";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NoBidPlaced";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "allowance";
            readonly type: "uint256";
        }];
        readonly name: "NotAllowedTransferAmount";
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
        readonly name: "OrderCanceled";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OrderDoesNotExist";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OrderNotAllowTake";
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
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "TransferFailed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "TransferFromFailed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "TransferToRecipientFailed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "TransferToTreasuryFailed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "caller";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "expected";
            readonly type: "address";
        }];
        readonly name: "UnauthorizedAcceptAction";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "UnauthorizedCancelAction";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "UnauthorizedSender";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "UnauthorizedTakeAction";
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
        readonly name: "AtomicSwapOrderCanceled";
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
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "orderID";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "bidder";
            readonly type: "address";
        }];
        readonly name: "CanceledBid";
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
        readonly name: "PlacedBid";
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
        readonly name: "UpdatedBid";
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
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "bids";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "order";
            readonly type: "bytes32";
        }, {
            readonly internalType: "enum IAtomicSwapBase.BidStatus";
            readonly name: "status";
            readonly type: "uint8";
        }, {
            readonly internalType: "address";
            readonly name: "bidder";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "receiveTimestamp";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "expireTimestamp";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
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
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "counteroffers";
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
                readonly name: "makerSignature";
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
                readonly name: "takerSignature";
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
    }];
    static createInterface(): InchainAtomicSwapInterface;
    static connect(address: string, runner?: ContractRunner | null): InchainAtomicSwap;
}
export interface InchainAtomicSwapLibraryAddresses {
    ["contracts/abstracts/libs/logic/AtomicSwapStateLogic.sol:AtomicSwapStateLogic"]: string;
}
export {};
