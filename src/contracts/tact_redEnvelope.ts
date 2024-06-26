import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    totalSupply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    walletCode: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.totalSupply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.walletCode);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _totalSupply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _walletCode = sc_0.loadRef();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function loadTupleJettonData(source: TupleReader) {
    let _totalSupply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _walletCode = source.readCell();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.walletCode);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    walletCode: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.walletCode);
    };
}

export function loadJettonWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _walletCode = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, walletCode: _walletCode };
}

function loadTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _walletCode = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, walletCode: _walletCode };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.walletCode);
    return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type TokenTransferInternal = {
    $$type: 'TokenTransferInternal';
    queryId: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransferInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenTransferInternal(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransferInternal(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    queryId: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Cell;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenBurn = {
    $$type: 'TokenBurn';
    queryId: bigint;
    amount: bigint;
    owner: Address;
    response_destination: Address;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function loadTupleTokenBurn(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _response_destination = source.readAddress();
    return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function storeTupleTokenBurn(source: TokenBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurn(src.loadRef().beginParse());
        }
    }
}

export type TokenBurnNotification = {
    $$type: 'TokenBurnNotification';
    queryId: bigint;
    amount: bigint;
    owner: Address;
    response_destination: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    queryId: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type TokenUpdateContent = {
    $$type: 'TokenUpdateContent';
    content: Cell;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2937889386, 32);
        b_0.storeRef(src.content);
    };
}

export function loadTokenUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2937889386) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCell();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadTokenUpdateContent(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type EnvelopeInfo = {
    $$type: 'EnvelopeInfo';
    jetton: Address;
    MyJettonWallet: Address;
    content: Cell;
    queryId: bigint;
    min: bigint;
}

export function storeEnvelopeInfo(src: EnvelopeInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.jetton);
        b_0.storeAddress(src.MyJettonWallet);
        b_0.storeRef(src.content);
        b_0.storeInt(src.queryId, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.min, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadEnvelopeInfo(slice: Slice) {
    let sc_0 = slice;
    let _jetton = sc_0.loadAddress();
    let _MyJettonWallet = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _queryId = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _min = sc_1.loadIntBig(257);
    return { $$type: 'EnvelopeInfo' as const, jetton: _jetton, MyJettonWallet: _MyJettonWallet, content: _content, queryId: _queryId, min: _min };
}

function loadTupleEnvelopeInfo(source: TupleReader) {
    let _jetton = source.readAddress();
    let _MyJettonWallet = source.readAddress();
    let _content = source.readCell();
    let _queryId = source.readBigNumber();
    let _min = source.readBigNumber();
    return { $$type: 'EnvelopeInfo' as const, jetton: _jetton, MyJettonWallet: _MyJettonWallet, content: _content, queryId: _queryId, min: _min };
}

function storeTupleEnvelopeInfo(source: EnvelopeInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.jetton);
    builder.writeAddress(source.MyJettonWallet);
    builder.writeSlice(source.content);
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.min);
    return builder.build();
}

function dictValueParserEnvelopeInfo(): DictionaryValue<EnvelopeInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeEnvelopeInfo(src)).endCell());
        },
        parse: (src) => {
            return loadEnvelopeInfo(src.loadRef().beginParse());
        }
    }
}

export type GetEnvelope = {
    $$type: 'GetEnvelope';
    to: Address;
    queryId: bigint;
}

export function storeGetEnvelope(src: GetEnvelope) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3122589741, 32);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.queryId, 257);
    };
}

export function loadGetEnvelope(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3122589741) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    let _queryId = sc_0.loadIntBig(257);
    return { $$type: 'GetEnvelope' as const, to: _to, queryId: _queryId };
}

function loadTupleGetEnvelope(source: TupleReader) {
    let _to = source.readAddress();
    let _queryId = source.readBigNumber();
    return { $$type: 'GetEnvelope' as const, to: _to, queryId: _queryId };
}

function storeTupleGetEnvelope(source: GetEnvelope) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserGetEnvelope(): DictionaryValue<GetEnvelope> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetEnvelope(src)).endCell());
        },
        parse: (src) => {
            return loadGetEnvelope(src.loadRef().beginParse());
        }
    }
}

export type SetMyJettonWallet = {
    $$type: 'SetMyJettonWallet';
    wallet: Address;
}

export function storeSetMyJettonWallet(src: SetMyJettonWallet) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1592300119, 32);
        b_0.storeAddress(src.wallet);
    };
}

export function loadSetMyJettonWallet(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1592300119) { throw Error('Invalid prefix'); }
    let _wallet = sc_0.loadAddress();
    return { $$type: 'SetMyJettonWallet' as const, wallet: _wallet };
}

function loadTupleSetMyJettonWallet(source: TupleReader) {
    let _wallet = source.readAddress();
    return { $$type: 'SetMyJettonWallet' as const, wallet: _wallet };
}

function storeTupleSetMyJettonWallet(source: SetMyJettonWallet) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.wallet);
    return builder.build();
}

function dictValueParserSetMyJettonWallet(): DictionaryValue<SetMyJettonWallet> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetMyJettonWallet(src)).endCell());
        },
        parse: (src) => {
            return loadSetMyJettonWallet(src.loadRef().beginParse());
        }
    }
}

export type SendToken = {
    $$type: 'SendToken';
    to: Address;
    amount: bigint;
    queryId: bigint;
    value: bigint;
}

export function storeSendToken(src: SendToken) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3688979113, 32);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.amount, 257);
        b_0.storeInt(src.queryId, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.value, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSendToken(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3688979113) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _queryId = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _value = sc_1.loadIntBig(257);
    return { $$type: 'SendToken' as const, to: _to, amount: _amount, queryId: _queryId, value: _value };
}

function loadTupleSendToken(source: TupleReader) {
    let _to = source.readAddress();
    let _amount = source.readBigNumber();
    let _queryId = source.readBigNumber();
    let _value = source.readBigNumber();
    return { $$type: 'SendToken' as const, to: _to, amount: _amount, queryId: _queryId, value: _value };
}

function storeTupleSendToken(source: SendToken) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserSendToken(): DictionaryValue<SendToken> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendToken(src)).endCell());
        },
        parse: (src) => {
            return loadSendToken(src.loadRef().beginParse());
        }
    }
}

export type SendEnvelope = {
    $$type: 'SendEnvelope';
    queryId: bigint;
}

export function storeSendEnvelope(src: SendEnvelope) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1408225311, 32);
        b_0.storeInt(src.queryId, 257);
    };
}

export function loadSendEnvelope(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1408225311) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadIntBig(257);
    return { $$type: 'SendEnvelope' as const, queryId: _queryId };
}

function loadTupleSendEnvelope(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'SendEnvelope' as const, queryId: _queryId };
}

function storeTupleSendEnvelope(source: SendEnvelope) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserSendEnvelope(): DictionaryValue<SendEnvelope> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendEnvelope(src)).endCell());
        },
        parse: (src) => {
            return loadSendEnvelope(src.loadRef().beginParse());
        }
    }
}

 type redEnvelope_init_args = {
    $$type: 'redEnvelope_init_args';
    amount: bigint;
    size: bigint;
    content: Cell;
    min: bigint;
}

function initredEnvelope_init_args(src: redEnvelope_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.amount, 257);
        b_0.storeInt(src.size, 257);
        b_0.storeRef(src.content);
        b_0.storeInt(src.min, 257);
    };
}

async function redEnvelope_init(amount: bigint, size: bigint, content: Cell, min: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initredEnvelope_init_args({ $$type: 'redEnvelope_init_args', amount, size, content, min })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const redEnvelope_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4159: { message: `Invalid value!!` },
    4429: { message: `Invalid sender` },
    6898: { message: `The total supply will be overlapping.` },
    17579: { message: `The address is not correct!` },
    42708: { message: `Invalid sender!` },
    43422: { message: `Invalid value - Burn` },
    52818: { message: `The amount of Jetton is not enough!` },
    62972: { message: `Invalid balance` },
}

const redEnvelope_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"walletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"walletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenUpdateContent","header":2937889386,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"EnvelopeInfo","header":null,"fields":[{"name":"jetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"MyJettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"slice","optional":false}},{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"min","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GetEnvelope","header":3122589741,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SetMyJettonWallet","header":1592300119,"fields":[{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SendToken","header":3688979113,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SendEnvelope","header":1408225311,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const redEnvelope_getters: ABIGetter[] = [
    {"name":"MyJettonWallet","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"flag","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"amount","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"size","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"Rund","arguments":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"min","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"size","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const redEnvelope_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"TokenExcesses"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetMyJettonWallet"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetEnvelope"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SendToken"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class redEnvelope implements Contract {
    
    static async init(amount: bigint, size: bigint, content: Cell, min: bigint) {
        return await redEnvelope_init(amount, size, content, min);
    }
    
    static async fromInit(amount: bigint, size: bigint, content: Cell, min: bigint) {
        const init = await redEnvelope_init(amount, size, content, min);
        const address = contractAddress(0, init);
        return new redEnvelope(address, init);
    }
    
    static fromAddress(address: Address) {
        return new redEnvelope(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  redEnvelope_types,
        getters: redEnvelope_getters,
        receivers: redEnvelope_receivers,
        errors: redEnvelope_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: TokenExcesses | SetMyJettonWallet | GetEnvelope | SendToken | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenExcesses') {
            body = beginCell().store(storeTokenExcesses(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetMyJettonWallet') {
            body = beginCell().store(storeSetMyJettonWallet(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetEnvelope') {
            body = beginCell().store(storeGetEnvelope(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SendToken') {
            body = beginCell().store(storeSendToken(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getMyJettonWallet(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('MyJettonWallet', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getFlag(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('flag', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getAmount(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('amount', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getSize(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('size', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getRund(provider: ContractProvider, amount: bigint, min: bigint, size: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(amount);
        builder.writeNumber(min);
        builder.writeNumber(size);
        let source = (await provider.get('Rund', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}