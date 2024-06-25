import { useEffect, useState } from "react";
import { toNano, fromNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card, FlexBoxCol, FlexBoxRow, Button, Input, Select, Option, Label } from "./styled/styled";
import { useIsConnectionRestored, useTonConnectUI, toUserFriendlyAddress } from '@tonconnect/ui-react';
//----------------------------------------------
import { getTokenApi, getTokenLists } from "../api/api";
import { JettonBalance } from 'tonapi-sdk-js';
import axios from 'axios';
import { sendJetton, strToCell } from '../hooks/useSendJetton';
import { Address, beginCell } from "@ton/core";
import {JettonDefaultWallet, storeTokenTransfer, TokenTransfer} from "../contracts/tact_JettonDefaultWallet";

interface message {
  address: string;
}

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
                {option.jetton.name}    {Number(option.balance) / 10 ** options[index].jetton.decimals}
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
            // Check if the amount and size are greater than 0
            if (parseFloat(amount) <= 0 || parseFloat(size) <= 0) {
              alert('Amount and size must be greater than 0');
              return;
            }

            // Send the info to the server
            const address = async () => {
              try {
                const response = await axios.post(
                  'http://101.32.218.251:3000/sendEnvelope',
                  {
                    sender: tonConnectUI.account?.address as string,
                    amount: parseInt(amount) * 10 ** options[selectedIndex as number].jetton.decimals,
                    size: parseInt(size),
                    chatId: chatId,
                    network: network,
                    token: options[selectedIndex as number].jetton.address
                  },
                  {
                    headers: {
                      'Content-Type': 'application/json' // 手动设置Content-Type
                    }
                  }
                );
                let data: message = response.data;
                return data.address;
              } catch (error) {
                console.error('Failed to send info to server:', error);
                return '';
              }
            }


            // add transaction to the contract
            const sender = tonConnectUI.account?.address as string;
            const senderAddress = toUserFriendlyAddress(sender);
            const jettonAddress = options[selectedIndex as number].jetton.address;
            const jettonAddressTo = toUserFriendlyAddress(jettonAddress);
            const envelopeAddress = await address();

            const deployAmount = toNano("0.15");

            const body = beginCell()
            .store(
              storeTokenTransfer({
                $$type: 'TokenTransfer',
                queryId: BigInt(0),
                amount: toNano(amount),
                destination: Address.parse(envelopeAddress),
                response_destination: Address.parse(senderAddress),
                custom_payload: strToCell('eeeeeee'),
                forward_ton_amount: toNano('0.1'),
                forward_payload: strToCell('eeeeeee'),
              })
            )
            .endCell();;

            const tx = await tonConnectUI.sendTransaction({
              validUntil: Math.round(Date.now() / 1000) + 60,
              messages: [
                {
                  amount: deployAmount.toString(),
                  address: options[selectedIndex as number].wallet_address.address,
                  payload: body.toBoc().toString("base64"),
                },
              ]
            }).then( async ()=>{
              try {
                const response = await axios.post(
                  'http://101.32.218.251:3000/receiveSuccessResponse',
                  {
                    message: envelopeAddress,
                  },
                  {
                    headers: {
                      'Content-Type': 'application/json' // 手动设置Content-Type
                    }
                  }
                );
                console.log(response.data);
              } catch (error) {
                console.error('Failed to send envelope:', error);
              }
            })
          }}
        >
          Send
        </Button>
      </FlexBoxCol>

    </Card>
  );
}
