import { useEffect, useState } from "react";
import { toNano, fromNano } from "ton";
import { TonClient4 } from "@ton/ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card, FlexBoxCol, FlexBoxRow, Button, Input, Select, Option, Label } from "./styled/styled";
import { useIsConnectionRestored, useTonConnectUI, toUserFriendlyAddress } from '@tonconnect/ui-react';
//----------------------------------------------
import { getTokenLists, getAccount } from "../api/api";
import { JettonBalance } from '@ton-api/client';
import axios from 'axios';
import { sendJetton, strToCell } from '../hooks/useSendJetton';
import { Address, beginCell } from "@ton/core";
import * as Jetton from "../contracts/tact_SampleJetton";
import { JettonDefaultWallet, storeTokenTransfer, TokenTransfer } from "../contracts/tact_JettonDefaultWallet";
import { CHAIN } from "@tonconnect/protocol";
import * as Factory from "../contracts/tact_factory";
import { getHttpEndpoint, getHttpV4Endpoint } from "@orbs-network/ton-access";

export function SendEnvelope() {
  const { sender, connected, network } = useTonConnect();
  const [tonConnectUI] = useTonConnectUI();
  tonConnectUI.connectWallet();

  const [amount, setAmount] = useState("0.01");
  const [size, setSize] = useState("10");
  const queryParams = new URLSearchParams(window.location.search);
  const chatIdFromUrl = queryParams.get('chatId') || ''; // 如果 URL 中没有 chatId 参数，则默认为空字符串
  const [chatId, setChatId] = useState(chatIdFromUrl);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // 新增状态变量
  const [options, setOptions] = useState<JettonBalance[]>([]);

  function toAmount(amount: string, decimals: number) {
    return BigInt(Number(amount) * 10 ** decimals);
  }

  function fromAmount(amount: BigInt | string, decimals: number) {
    return Number(amount) / 10 ** decimals;
  }

  useEffect(() => {
    const fetchData = async () => {
      const address = tonConnectUI.account?.address as string ?? "";
      try {
        const data = await getTokenLists(address, network as string);
        setOptions(data.balances);
        // console.log(data);
      } catch (error) {
        console.error("Failed to fetch token lists:", error);
      }
    };

    if (connected) { // 如果钱包已连接，则尝试获取数据
      fetchData();
    }
  }, [connected, tonConnectUI.account?.address]); // 依赖项数组，确保当这些值变化时重新获取数据

  return (
    <Card>
      <FlexBoxCol>
        <h3>Send Envelope!</h3>
        <FlexBoxRow>
          <Label>Select Token: </Label>
          <Select
            style={{ marginRight: 8 }}
            onChange={(e) => setSelectedIndex(Number(e.target.value))}>
            {options.map((option, index) => (
              <Option key={index} value={index}>
                {option.jetton.name}    {fromAmount(option.balance, option.jetton.decimals)} {option.jetton.symbol}
              </Option>
            ))}
          </Select>
        </FlexBoxRow>
        <FlexBoxRow>
          <Label>Amount </Label>
          <Input
            style={{ marginRight: 8 }}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <FlexBoxRow>
          <Label>Size </Label>
          <Input
            style={{ marginRight: 8 }}
            value={size} // Convert size to string
            onChange={(e) => setSize(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <FlexBoxRow>
          <Label>chatId </Label>
          <Input
            style={{ marginRight: 8 }}
            value={chatId} // Convert size to string
            onChange={(e) => setChatId(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <Button
          disabled={!connected}
          style={{ marginTop: 18 }}
          onClick={async () => {
            // console.log(options[selectedIndex as number].jetton.address);
            // if (options[selectedIndex as number].jetton.address === undefined) alert('jetton is valid');
            const sender = tonConnectUI.account?.address as string;
            const option = options[selectedIndex as number];
            const jettonAddress = option.jetton.address;
            const decimal = option.jetton.decimals;
            const realAmount = toAmount(amount, decimal);

            // Check if the amount and size are greater than 0
            if (parseFloat(realAmount.toString()) <= 0 || parseFloat(size) <= 0) {
              alert('Amount and size must be greater than 0');
              return;
            }

            // 计算红包地址
            // const tx = await tonConnectUI.
            const client = new TonClient4({
              endpoint: await getHttpV4Endpoint({
                network: network === CHAIN.MAINNET ? "mainnet" : "testnet",
              })});
            
            const fc = client.open(Factory.factory.fromAddress(
              Address.parse(
                network === CHAIN.MAINNET
                ? "EQBPEDbGdwaLv1DKntg9r6SjFIVplSaSJoJ-TVLe_2rqBOmH"
                : "kQDaycdxp9-4cHQH0KcR4KHxPLpXvQLDfpuGwQlYyaW_2rLx"
            )))

            const id = BigInt(Math.floor(Math.random() * 1000000000));
            const packageAddress =  await fc.getGetRedPackageAddress(realAmount, BigInt(size), id);
            // console.log(packageAddress.toString());
            // 计算wallet地址
            const jetton = client.open(Jetton.SampleJetton.fromAddress(jettonAddress));
            const packageWallet = await jetton.getGetWalletAddress(packageAddress);

            // 发送消息和jetton
            // tx1
            const deployAmount = toNano("0.05");
            const body1 = beginCell()
              .store(
                storeTokenTransfer({
                  $$type: 'TokenTransfer',
                  queryId: BigInt(0),
                  amount: realAmount,
                  destination: packageAddress,
                  response_destination: packageAddress,
                  custom_payload: strToCell('send jetton to red package'),
                  forward_ton_amount: 0n,
                  forward_payload: strToCell(''),
                })
              )
            .endCell();

            // tx2
            const body2 = beginCell()
              .store(
                Factory.storeSendPackage({
                  $$type: 'SendPackage',
                  wallet: packageWallet,
                  amount: realAmount,
                  size: BigInt(size),
                  id: id,
                })
              )
            .endCell();

            const tx = await tonConnectUI.sendTransaction({
              validUntil: Math.round(Date.now() / 1000) + 60,
              messages: [
                {
                  amount: deployAmount.toString(),
                  address: option.walletAddress.address.toString(),
                  payload: body1.toBoc().toString("base64"),
                },
                {
                  amount: deployAmount.toString(),
                  address: fc.address.toString(),
                  payload: body2.toBoc().toString("base64"),
                },
              ]
            })
            
            // 监测红包合约部署
            let ac = await getAccount(packageAddress.toString(), network as string);
            let attempt = 0;
            const intervalId = setInterval(async () => {
              ac = await getAccount(packageAddress.toString(), network as string);
              console.log(attempt, ac.status);
              attempt++;
            
              if (ac.status === 'active' || attempt >= 20) {
                clearInterval(intervalId);
                // 发送红包信息给服务器
                const active = async () => {
                  try {
                    const response = await axios.post(
                      'http://101.32.218.251:3000/NewEnvelope',
                      {
                        sender: tonConnectUI.account?.address as string,
                        network: network,
                        token: jettonAddress,
                        amount: realAmount,
                        size: size,
                        decimals: decimal,
                        chatId: chatId,
                        redPackageAddress: packageAddress.toString(),
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json' // 手动设置Content-Type
                        }
                      }
                    );
                    console.log(response.data);
                  } catch (error) {
                    console.error('Failed to send info to server:', error);
                  }
                }
                if (ac.status == 'active') {
                  console.log('Account is active');
                  await active();
                } else {
                  console.log('red package create failed');
                }
              }
            }, 2000);
          }}
        >
          Send
        </Button>
      </FlexBoxCol>

    </Card>
  );
}
