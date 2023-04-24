import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { LayerCakeTools, LayerCakeToolsInterface } from "../LayerCakeTools";
type LayerCakeToolsConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class LayerCakeTools__factory extends ContractFactory {
    constructor(...args: LayerCakeToolsConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<LayerCakeTools & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): LayerCakeTools__factory;
    static readonly bytecode = "0x608060405234801561005d5760405162461bcd60e51b815260206004820152602260248201527f45746865722073656e7420746f206e6f6e2d70617961626c652066756e637469604482019081526137b760f11b6064830152608482fd5b50610b058061006d6000396000f3fe608060405234801561005d5760405162461bcd60e51b815260206004820152602260248201527f45746865722073656e7420746f206e6f6e2d70617961626c652066756e637469604482019081526137b760f11b6064830152608482fd5b50600436106100995760003560e01c8063153f91c6146100fe578063a527fba61461012e578063d0f1b18a146101ba578063e7c09a6b146101cd575b60405162461bcd60e51b815260206004820152603560248201527f436f6e747261637420646f6573206e6f7420686176652066616c6c6261636b2060448201908152746e6f7220726563656976652066756e6374696f6e7360581b6064830152608482fd5b61011161010c3660046107b2565b6101e0565b6040516001600160a01b0390911681526020015b60405180910390f35b6101ac61013c3660046107ff565b6040805160a060208201819052601260c0830152711b185e595c98d85ad954185d1a1dd85e525960721b60e0830152918101869052606081018590526080810184905290810182905260009061010001604051602081830303815290604052805190602001209050949350505050565b604051908152602001610125565b6101ac6101c8366004610834565b6102c9565b6101ac6101db366004610877565b6102fc565b6000806040518060400160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152509050600081856040516020016102309291906108de565b604051602081830303815290604052805190602001209050600060018286604001518760600151886080015160405160008152602001604052604051610292949392919093845260ff9290921660208401526040830152606082015260800190565b6020604051602081039080840390855afa1580156102b4573d6000803e3d6000fd5b5050604051601f190151979650505050505050565b600082826040516020016102de929190610a02565b60405160208183030381529060405280519060200120905092915050565b60008160405160200161030f9190610a46565b604051602081830303815290604052805190602001209050919050565b60405162461bcd60e51b815260206004820152602260248201527f414249206465636f64696e673a207475706c65206461746120746f6f2073686f6044820152611c9d60f21b6064820152608481fd5b60405162461bcd60e51b815260206004820152602260248201527f414249206465636f64696e673a20696e76616c6964207475706c65206f666673604482015261195d60f21b6064820152608481fd5b60405162461bcd60e51b815260206004820152602360248201527f414249206465636f64696e673a20737472756374206461746120746f6f2073686044820152621bdc9d60ea1b6064820152608481fd5b634e487b7160e01b600052604160045260246000fd5b6040516101a0810167ffffffffffffffff811182821017156104575761045761041d565b60405290565b604051601f8201601f1916810167ffffffffffffffff811182821017156104865761048661041d565b604052919050565b60405162461bcd60e51b815260206004820152602360248201527f414249206465636f64696e673a20696e76616c696420737472756374206f66666044820152621cd95d60ea1b6064820152608481fd5b80356001600160a01b03811681146104f657600080fd5b919050565b600082601f8301126105605760405162461bcd60e51b815260206004820152602b60248201527f414249206465636f64696e673a20696e76616c69642063616c6c64617461206160448201526a1c9c985e481bd9999cd95d60aa1b6064820152608481fd5b8135602067ffffffffffffffff82111561057c5761057c61041d565b61058e601f8301601f1916820161045d565b82815285828487010111156105f25760405162461bcd60e51b815260048101839052602760248201527f414249206465636f64696e673a20696e76616c69642062797465206172726179604482015266040d8cadccee8d60cb1b6064820152608481fd5b82828601838301376000928101909101919091529392505050565b803580151581146104f657600080fd5b60006101a08284031215610633576106336103cc565b61063b610433565b9050813581526020820135602082015260408201356040820152610661606083016104df565b6060820152610672608083016104df565b608082015260a082013560a082015260c082013560c082015260e082013567ffffffffffffffff8111156106a8576106a861048e565b6106b4848285016104fb565b60e0830152506101006106c881840161060d565b9082015261012082810135908201526101406106e58184016104df565b908201526101606106f783820161060d565b818301525061018080830135818301525092915050565b600060a08284031215610723576107236103cc565b60405160a0810167ffffffffffffffff82821081831117156107475761074761041d565b8160405282935084359150808211156107625761076261048e565b5061076f8582860161061d565b82525060208301356020820152604083013560ff8116811461079057600080fd5b8060408301525060608301356060820152608083013560808201525092915050565b600080604083850312156107c8576107c861032c565b82359150602083013567ffffffffffffffff8111156107e9576107e961037c565b6107f58582860161070e565b9150509250929050565b600080600080608085870312156108185761081861032c565b5050823594602084013594506040840135936060013592509050565b6000806040838503121561084a5761084a61032c565b82359150602083013567ffffffffffffffff81111561086b5761086b61037c565b6107f58582860161061d565b60006020828403121561088c5761088c61032c565b813567ffffffffffffffff8111156108a6576108a661037c565b6108b28482850161070e565b949350505050565b60005b838110156108d55781810151838201526020016108bd565b50506000910152565b600083516108f08184602088016108ba565b9190910191825250602001919050565b600081518084526109188160208601602086016108ba565b601f01601f19169290920160200192915050565b60006101a0825184526020830151602085015260408301516040850152606083015161096360608601826001600160a01b03169052565b50608083015161097e60808601826001600160a01b03169052565b5060a083015160a085015260c083015160c085015260e08301518160e08601526109aa82860182610900565b915050610100808401516109c18287018215159052565b50506101208381015190850152610140808401516001600160a01b031690850152610160808401511515908501526101809283015192909301919091525090565b6060815260146060820152731b185e595c98d85ad9515e1958dd5d1a5bdb925960621b608082015282602082015260a0604082015260006108b260a083018461092c565b60408152602060408201527f6c6179657263616b65496e76616c6964457865637574696f6e50726f6f6649646060820152608060208201526000825160a06080840152610a9761012084018261092c565b9050602084015160a084015260ff60408501511660c0840152606084015160e08401526080840151610100840152809150509291505056fea2646970667358221220d8f0afaf0c0ad8b57ef8e1c9c40be0f79e89e66dc62d4999228501e4fc3d5bfd64736f6c63430008130033";
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "bandwidthProvider";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "bool";
            readonly name: "added";
            readonly type: "bool";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "BandwidthChanged";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "executionId";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "bandwidthProvider";
            readonly type: "address";
        }, {
            readonly components: readonly [{
                readonly components: readonly [{
                    readonly internalType: "uint256";
                    readonly name: "nonce";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "amount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "fee";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "address";
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly internalType: "address";
                    readonly name: "recipient";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "executionTime";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "callDataGasLimit";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "bytes";
                    readonly name: "callData";
                    readonly type: "bytes";
                }, {
                    readonly internalType: "bool";
                    readonly name: "cancel";
                    readonly type: "bool";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "cancellationFeeRefund";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "address";
                    readonly name: "negatedBandwidthProvider";
                    readonly type: "address";
                }, {
                    readonly internalType: "bool";
                    readonly name: "initialNegation";
                    readonly type: "bool";
                }, {
                    readonly internalType: "bytes32";
                    readonly name: "invalidExecutionProofId";
                    readonly type: "bytes32";
                }];
                readonly internalType: "struct LayerCakeExecutionProof.Operations";
                readonly name: "operations";
                readonly type: "tuple";
            }, {
                readonly internalType: "uint256";
                readonly name: "partialAmount";
                readonly type: "uint256";
            }, {
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
            }];
            readonly indexed: false;
            readonly internalType: "struct LayerCakeExecutionProof.ExecutionProof";
            readonly name: "executionProof";
            readonly type: "tuple";
        }, {
            readonly indexed: false;
            readonly internalType: "bool";
            readonly name: "executionPrepared";
            readonly type: "bool";
        }];
        readonly name: "OperationsExecuted";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "executionId";
            readonly type: "bytes32";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "nonce";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "fee";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "sender";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "executionTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "callDataGasLimit";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "callData";
                readonly type: "bytes";
            }, {
                readonly internalType: "bool";
                readonly name: "cancel";
                readonly type: "bool";
            }, {
                readonly internalType: "uint256";
                readonly name: "cancellationFeeRefund";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "negatedBandwidthProvider";
                readonly type: "address";
            }, {
                readonly internalType: "bool";
                readonly name: "initialNegation";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes32";
                readonly name: "invalidExecutionProofId";
                readonly type: "bytes32";
            }];
            readonly indexed: false;
            readonly internalType: "struct LayerCakeExecutionProof.Operations";
            readonly name: "operations";
            readonly type: "tuple";
        }];
        readonly name: "OperationsStored";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "pathwayId";
            readonly type: "bytes32";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "nonce";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "fee";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "sender";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "executionTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "callDataGasLimit";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "callData";
                readonly type: "bytes";
            }, {
                readonly internalType: "bool";
                readonly name: "cancel";
                readonly type: "bool";
            }, {
                readonly internalType: "uint256";
                readonly name: "cancellationFeeRefund";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "negatedBandwidthProvider";
                readonly type: "address";
            }, {
                readonly internalType: "bool";
                readonly name: "initialNegation";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes32";
                readonly name: "invalidExecutionProofId";
                readonly type: "bytes32";
            }];
            readonly internalType: "struct LayerCakeExecutionProof.Operations";
            readonly name: "operations";
            readonly type: "tuple";
        }];
        readonly name: "getExecutionId";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "executionId";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly components: readonly [{
                    readonly internalType: "uint256";
                    readonly name: "nonce";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "amount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "fee";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "address";
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly internalType: "address";
                    readonly name: "recipient";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "executionTime";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "callDataGasLimit";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "bytes";
                    readonly name: "callData";
                    readonly type: "bytes";
                }, {
                    readonly internalType: "bool";
                    readonly name: "cancel";
                    readonly type: "bool";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "cancellationFeeRefund";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "address";
                    readonly name: "negatedBandwidthProvider";
                    readonly type: "address";
                }, {
                    readonly internalType: "bool";
                    readonly name: "initialNegation";
                    readonly type: "bool";
                }, {
                    readonly internalType: "bytes32";
                    readonly name: "invalidExecutionProofId";
                    readonly type: "bytes32";
                }];
                readonly internalType: "struct LayerCakeExecutionProof.Operations";
                readonly name: "operations";
                readonly type: "tuple";
            }, {
                readonly internalType: "uint256";
                readonly name: "partialAmount";
                readonly type: "uint256";
            }, {
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
            }];
            readonly internalType: "struct LayerCakeExecutionProof.ExecutionProof";
            readonly name: "invalidExecutionProof";
            readonly type: "tuple";
        }];
        readonly name: "getInvalidExecutionProofId";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "invalidExecutionProofId";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "originChainId";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "destinationChainId";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "assetId";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "contractId";
            readonly type: "uint256";
        }];
        readonly name: "getPathwayId";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "pathwayId";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "hash";
            readonly type: "bytes32";
        }, {
            readonly components: readonly [{
                readonly components: readonly [{
                    readonly internalType: "uint256";
                    readonly name: "nonce";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "amount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "fee";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "address";
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly internalType: "address";
                    readonly name: "recipient";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "executionTime";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "callDataGasLimit";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "bytes";
                    readonly name: "callData";
                    readonly type: "bytes";
                }, {
                    readonly internalType: "bool";
                    readonly name: "cancel";
                    readonly type: "bool";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "cancellationFeeRefund";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "address";
                    readonly name: "negatedBandwidthProvider";
                    readonly type: "address";
                }, {
                    readonly internalType: "bool";
                    readonly name: "initialNegation";
                    readonly type: "bool";
                }, {
                    readonly internalType: "bytes32";
                    readonly name: "invalidExecutionProofId";
                    readonly type: "bytes32";
                }];
                readonly internalType: "struct LayerCakeExecutionProof.Operations";
                readonly name: "operations";
                readonly type: "tuple";
            }, {
                readonly internalType: "uint256";
                readonly name: "partialAmount";
                readonly type: "uint256";
            }, {
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
            }];
            readonly internalType: "struct LayerCakeExecutionProof.ExecutionProof";
            readonly name: "executionProof";
            readonly type: "tuple";
        }];
        readonly name: "recoverSigner";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }];
    static createInterface(): LayerCakeToolsInterface;
    static connect(address: string, runner?: ContractRunner | null): LayerCakeTools;
}
export {};
