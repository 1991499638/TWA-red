import {
    Address,
    beginCell,
    contractAddress,
    toNano,
    TonClient4,
    internal,
    fromNano,
    WalletContractV4,
} from "@ton/ton";
import { deploy } from "../utils/deploy";
import { printAddress, printDeploy, printHeader, printSeparator } from "../utils/print";
import { mnemonicToPrivateKey } from "ton-crypto";
import * as dotenv from "dotenv";
dotenv.config();
// ================================================================= //
import { redEnvelope, storeDeploy } from "../contracts/tact_redEnvelope";
import { TonEnvelpoe } from "../contracts/tact_TonEnvelpoe";
// ================================================================= //



export async function deployRedEnvelope(amount: bigint, size: bigint, initContent: string, min: bigint) {
    const client4 = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // Test-net
    });
    let mnemonics = (process.env.mnemonics || "").toString(); // 🔴 Change to your own, by creating .env file!
    let keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    let wallet_contract = client4.open(wallet);
    console.log("Wallet address: ", wallet_contract.address);


    // init pragma
    let content = beginCell().storeInt(0x01, 8).storeStringRefTail(initContent).endCell();
    let init = await redEnvelope.init(amount, size, content, min);
    let deployContract = contractAddress(0, init);
    let packed = beginCell()
    .store(
        storeDeploy({
            $$type: 'Deploy',
            queryId: BigInt(0),
        })
    ).endCell();

    let seqno: number = await wallet_contract.getSeqno();
    let deployAmount = toNano("0.3");

    await wallet_contract.sendTransfer({
        seqno,
        secretKey,
        messages: [
            internal({
                to: deployContract,
                value: deployAmount,
                init: { code: init.code, data: init.data },
                bounce: true,
                body: packed,
            }),
        ],
    });

    console.log("Deployed RedEnvelope contract: ", deployContract);
    return deployContract;
}

(async ()=>{
    // printHeader("Deploy RedEnvelope Contract");
    await deployRedEnvelope(toNano("100"), BigInt(10), "11515", BigInt(0));
    // printSeparator();
    // process.exit(0);
})();
