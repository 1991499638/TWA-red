import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { SampleJetton } from "../contracts/tact_SampleJetton";
import { Address, Cell, OpenedContract, beginCell } from "@ton/core";
import {JettonDefaultWallet, storeTokenTransfer, TokenTransfer} from "../contracts/tact_JettonDefaultWallet";
import { useQuery } from "@tanstack/react-query";

export function sendJetton(msg: TokenTransfer) {
  return beginCell()
  .store(
      storeTokenTransfer(msg)
  )
  .endCell();
}

export function strToCell(str: string): Cell {
  return beginCell().storeBit(1).storeUint(0, 32).storeStringTail(str).endCell();
}
