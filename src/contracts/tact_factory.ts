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

function loadGetterTupleStateInit(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
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
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
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

function loadGetterTupleSendParameters(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
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

function loadGetterTupleDeploy(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
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

function loadGetterTupleDeployOk(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
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

function loadGetterTupleFactoryDeploy(source: TupleReader) {
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type redPackage$Data = {
    $$type: 'redPackage$Data';
    sponsor: Address;
    factory: Address;
    amount: bigint;
    size: bigint;
    id: bigint;
    jettonWalletAddress: Address;
    flag: boolean;
}

export function storeredPackage$Data(src: redPackage$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.sponsor);
        b_0.storeAddress(src.factory);
        b_0.storeCoins(src.amount);
        b_0.storeInt(src.size, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.id, 257);
        b_1.storeAddress(src.jettonWalletAddress);
        b_1.storeBit(src.flag);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadredPackage$Data(slice: Slice) {
    let sc_0 = slice;
    let _sponsor = sc_0.loadAddress();
    let _factory = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _size = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _id = sc_1.loadIntBig(257);
    let _jettonWalletAddress = sc_1.loadAddress();
    let _flag = sc_1.loadBit();
    return { $$type: 'redPackage$Data' as const, sponsor: _sponsor, factory: _factory, amount: _amount, size: _size, id: _id, jettonWalletAddress: _jettonWalletAddress, flag: _flag };
}

function loadTupleredPackage$Data(source: TupleReader) {
    let _sponsor = source.readAddress();
    let _factory = source.readAddress();
    let _amount = source.readBigNumber();
    let _size = source.readBigNumber();
    let _id = source.readBigNumber();
    let _jettonWalletAddress = source.readAddress();
    let _flag = source.readBoolean();
    return { $$type: 'redPackage$Data' as const, sponsor: _sponsor, factory: _factory, amount: _amount, size: _size, id: _id, jettonWalletAddress: _jettonWalletAddress, flag: _flag };
}

function loadGetterTupleredPackage$Data(source: TupleReader) {
    let _sponsor = source.readAddress();
    let _factory = source.readAddress();
    let _amount = source.readBigNumber();
    let _size = source.readBigNumber();
    let _id = source.readBigNumber();
    let _jettonWalletAddress = source.readAddress();
    let _flag = source.readBoolean();
    return { $$type: 'redPackage$Data' as const, sponsor: _sponsor, factory: _factory, amount: _amount, size: _size, id: _id, jettonWalletAddress: _jettonWalletAddress, flag: _flag };
}

function storeTupleredPackage$Data(source: redPackage$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.sponsor);
    builder.writeAddress(source.factory);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.size);
    builder.writeNumber(source.id);
    builder.writeAddress(source.jettonWalletAddress);
    builder.writeBoolean(source.flag);
    return builder.build();
}

function dictValueParserredPackage$Data(): DictionaryValue<redPackage$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeredPackage$Data(src)).endCell());
        },
        parse: (src) => {
            return loadredPackage$Data(src.loadRef().beginParse());
        }
    }
}

export type Claim = {
    $$type: 'Claim';
    amount: bigint;
    receiver: Address;
}

export function storeClaim(src: Claim) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4146162596, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.receiver);
    };
}

export function loadClaim(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4146162596) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _receiver = sc_0.loadAddress();
    return { $$type: 'Claim' as const, amount: _amount, receiver: _receiver };
}

function loadTupleClaim(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    return { $$type: 'Claim' as const, amount: _amount, receiver: _receiver };
}

function loadGetterTupleClaim(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    return { $$type: 'Claim' as const, amount: _amount, receiver: _receiver };
}

function storeTupleClaim(source: Claim) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.receiver);
    return builder.build();
}

function dictValueParserClaim(): DictionaryValue<Claim> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaim(src)).endCell());
        },
        parse: (src) => {
            return loadClaim(src.loadRef().beginParse());
        }
    }
}

export type SetjettonWalletAddress = {
    $$type: 'SetjettonWalletAddress';
    wallet: Address;
}

export function storeSetjettonWalletAddress(src: SetjettonWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2333539951, 32);
        b_0.storeAddress(src.wallet);
    };
}

export function loadSetjettonWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2333539951) { throw Error('Invalid prefix'); }
    let _wallet = sc_0.loadAddress();
    return { $$type: 'SetjettonWalletAddress' as const, wallet: _wallet };
}

function loadTupleSetjettonWalletAddress(source: TupleReader) {
    let _wallet = source.readAddress();
    return { $$type: 'SetjettonWalletAddress' as const, wallet: _wallet };
}

function loadGetterTupleSetjettonWalletAddress(source: TupleReader) {
    let _wallet = source.readAddress();
    return { $$type: 'SetjettonWalletAddress' as const, wallet: _wallet };
}

function storeTupleSetjettonWalletAddress(source: SetjettonWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.wallet);
    return builder.build();
}

function dictValueParserSetjettonWalletAddress(): DictionaryValue<SetjettonWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetjettonWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadSetjettonWalletAddress(src.loadRef().beginParse());
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
    forward_payload: Slice;
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
    let _forward_payload = sc_0;
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
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
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type Data = {
    $$type: 'Data';
    sponsor: Address;
    factory: Address;
    amount: bigint;
    size: bigint;
    id: bigint;
    jettonWalletAddress: Address;
    flag: boolean;
}

export function storeData(src: Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.sponsor);
        b_0.storeAddress(src.factory);
        b_0.storeCoins(src.amount);
        b_0.storeInt(src.size, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.id, 257);
        b_1.storeAddress(src.jettonWalletAddress);
        b_1.storeBit(src.flag);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadData(slice: Slice) {
    let sc_0 = slice;
    let _sponsor = sc_0.loadAddress();
    let _factory = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _size = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _id = sc_1.loadIntBig(257);
    let _jettonWalletAddress = sc_1.loadAddress();
    let _flag = sc_1.loadBit();
    return { $$type: 'Data' as const, sponsor: _sponsor, factory: _factory, amount: _amount, size: _size, id: _id, jettonWalletAddress: _jettonWalletAddress, flag: _flag };
}

function loadTupleData(source: TupleReader) {
    let _sponsor = source.readAddress();
    let _factory = source.readAddress();
    let _amount = source.readBigNumber();
    let _size = source.readBigNumber();
    let _id = source.readBigNumber();
    let _jettonWalletAddress = source.readAddress();
    let _flag = source.readBoolean();
    return { $$type: 'Data' as const, sponsor: _sponsor, factory: _factory, amount: _amount, size: _size, id: _id, jettonWalletAddress: _jettonWalletAddress, flag: _flag };
}

function loadGetterTupleData(source: TupleReader) {
    let _sponsor = source.readAddress();
    let _factory = source.readAddress();
    let _amount = source.readBigNumber();
    let _size = source.readBigNumber();
    let _id = source.readBigNumber();
    let _jettonWalletAddress = source.readAddress();
    let _flag = source.readBoolean();
    return { $$type: 'Data' as const, sponsor: _sponsor, factory: _factory, amount: _amount, size: _size, id: _id, jettonWalletAddress: _jettonWalletAddress, flag: _flag };
}

function storeTupleData(source: Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.sponsor);
    builder.writeAddress(source.factory);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.size);
    builder.writeNumber(source.id);
    builder.writeAddress(source.jettonWalletAddress);
    builder.writeBoolean(source.flag);
    return builder.build();
}

function dictValueParserData(): DictionaryValue<Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeData(src)).endCell());
        },
        parse: (src) => {
            return loadData(src.loadRef().beginParse());
        }
    }
}

export type factory$Data = {
    $$type: 'factory$Data';
    owner: Address;
}

export function storefactory$Data(src: factory$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

export function loadfactory$Data(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    return { $$type: 'factory$Data' as const, owner: _owner };
}

function loadTuplefactory$Data(source: TupleReader) {
    let _owner = source.readAddress();
    return { $$type: 'factory$Data' as const, owner: _owner };
}

function loadGetterTuplefactory$Data(source: TupleReader) {
    let _owner = source.readAddress();
    return { $$type: 'factory$Data' as const, owner: _owner };
}

function storeTuplefactory$Data(source: factory$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserfactory$Data(): DictionaryValue<factory$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storefactory$Data(src)).endCell());
        },
        parse: (src) => {
            return loadfactory$Data(src.loadRef().beginParse());
        }
    }
}

export type SetOwner = {
    $$type: 'SetOwner';
    owner: Address;
}

export function storeSetOwner(src: SetOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3072093686, 32);
        b_0.storeAddress(src.owner);
    };
}

export function loadSetOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3072093686) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    return { $$type: 'SetOwner' as const, owner: _owner };
}

function loadTupleSetOwner(source: TupleReader) {
    let _owner = source.readAddress();
    return { $$type: 'SetOwner' as const, owner: _owner };
}

function loadGetterTupleSetOwner(source: TupleReader) {
    let _owner = source.readAddress();
    return { $$type: 'SetOwner' as const, owner: _owner };
}

function storeTupleSetOwner(source: SetOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserSetOwner(): DictionaryValue<SetOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetOwner(src)).endCell());
        },
        parse: (src) => {
            return loadSetOwner(src.loadRef().beginParse());
        }
    }
}

export type SendPackage = {
    $$type: 'SendPackage';
    wallet: Address;
    amount: bigint;
    size: bigint;
    id: bigint;
}

export function storeSendPackage(src: SendPackage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3349531688, 32);
        b_0.storeAddress(src.wallet);
        b_0.storeInt(src.amount, 257);
        b_0.storeInt(src.size, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.id, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSendPackage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3349531688) { throw Error('Invalid prefix'); }
    let _wallet = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _size = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _id = sc_1.loadIntBig(257);
    return { $$type: 'SendPackage' as const, wallet: _wallet, amount: _amount, size: _size, id: _id };
}

function loadTupleSendPackage(source: TupleReader) {
    let _wallet = source.readAddress();
    let _amount = source.readBigNumber();
    let _size = source.readBigNumber();
    let _id = source.readBigNumber();
    return { $$type: 'SendPackage' as const, wallet: _wallet, amount: _amount, size: _size, id: _id };
}

function loadGetterTupleSendPackage(source: TupleReader) {
    let _wallet = source.readAddress();
    let _amount = source.readBigNumber();
    let _size = source.readBigNumber();
    let _id = source.readBigNumber();
    return { $$type: 'SendPackage' as const, wallet: _wallet, amount: _amount, size: _size, id: _id };
}

function storeTupleSendPackage(source: SendPackage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.wallet);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.size);
    builder.writeNumber(source.id);
    return builder.build();
}

function dictValueParserSendPackage(): DictionaryValue<SendPackage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendPackage(src)).endCell());
        },
        parse: (src) => {
            return loadSendPackage(src.loadRef().beginParse());
        }
    }
}

 type factory_init_args = {
    $$type: 'factory_init_args';
    owner: Address;
}

function initfactory_init_args(src: factory_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function factory_init(owner: Address) {
    const __code = Cell.fromBase64('te6ccgECEwEABFUAART/APSkE/S88sgLAQIBYgIDAs7QAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zzy4ILI+EMBzH8BygABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wye1UDgQCA32IDA0D9gGSMH/gcCHXScIflTAg1wsf3iCCELccbfa64wIgghDHpcwouo7JMNMfAYIQx6XMKLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDUAdCBAQHXADAUQzBsFNs8f+CCEJRqmLa64wIwcAUGBwDyMNMfAYIQtxxt9rry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMYEbFlMhxwWz8vSCAIj0+EFvJBAjXwNQA8cFEvL0gQ8GjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIscFs/L0fwL0EDTbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiHBwgEAHyAGCEIsW/m9Yyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyRA2RUAQCAFO0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/CQESEDdZEEYQRds8CgE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwKAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAsAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwAEKq+7UTQ0gABAhKo29s8VSDbPDEODwCy7UTQ1AH4Y9IAAY4g+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHg+CjXCwqDCbry4In6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdEBhts8cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgQARj4Q/goVBQFUEQD2zwRAVoF0PQEMG0BgU4+AYAQ9A9vofLghwGBTj4iAoAQ9BfIAcj0AMkBzHABygBVQAYSAKhQVCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAALIgQEBzwCBAQHPAMkBzMk=');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initfactory_init_args({ $$type: 'factory_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const factory_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
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
    3846: { message: `The owner cannot be empty` },
    6934: { message: `The owner is the same as the current owner` },
    11116: { message: `The jettonWalletAddress is not set!` },
    13014: { message: `The size of red package is not enough!` },
    17579: { message: `The address is not correct!` },
    26030: { message: `Only the factory can call this function!` },
    35060: { message: `Only the owner can change the owner` },
    52818: { message: `The amount of Jetton is not enough!` },
    61816: { message: `Only the sponsor can call this function!` },
}

const factory_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"redPackage$Data","header":null,"fields":[{"name":"sponsor","type":{"kind":"simple","type":"address","optional":false}},{"name":"factory","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"size","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"jettonWalletAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"flag","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"Claim","header":4146162596,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetjettonWalletAddress","header":2333539951,"fields":[{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Data","header":null,"fields":[{"name":"sponsor","type":{"kind":"simple","type":"address","optional":false}},{"name":"factory","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"size","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"jettonWalletAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"flag","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"factory$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetOwner","header":3072093686,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SendPackage","header":3349531688,"fields":[{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"size","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const factory_getters: ABIGetter[] = [
    {"name":"getRedPackageAddress","arguments":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"size","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const factory_getterMapping: { [key: string]: string } = {
    'getRedPackageAddress': 'getGetRedPackageAddress',
}

const factory_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"SetOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SendPackage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class factory implements Contract {
    
    static async init(owner: Address) {
        return await factory_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await factory_init(owner);
        const address = contractAddress(0, init);
        return new factory(address, init);
    }
    
    static fromAddress(address: Address) {
        return new factory(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  factory_types,
        getters: factory_getters,
        receivers: factory_receivers,
        errors: factory_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SetOwner | SendPackage | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetOwner') {
            body = beginCell().store(storeSetOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SendPackage') {
            body = beginCell().store(storeSendPackage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetRedPackageAddress(provider: ContractProvider, amount: bigint, size: bigint, id: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(amount);
        builder.writeNumber(size);
        builder.writeNumber(id);
        let source = (await provider.get('getRedPackageAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}