import { TonApiClient, Api, JettonsBalances, Account } from '@ton-api/client';
import { Address } from '@ton/core';

async function getTokenApi(network: string) {
    const httpClient = new TonApiClient({
        baseUrl: network == "-3" ? import.meta.env.VITE_API_TESTNET_URL : import.meta.env.VITE_API_BASE_URL,
        baseApiParams: {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                'Content-type': 'application/json'
            }
        }
    });

    // Initialize the API client
    return new Api(httpClient);
}

export async function getTokenLists(address: string, network: string): Promise<JettonsBalances> {
    const api = await getTokenApi(network);
    const lists = api.accounts.getAccountJettonsBalances(Address.parse(address));
    return lists;
}

export async function getAccount(address: string, network: string): Promise<Account> {
    const api = await getTokenApi(network);
    const account = api.accounts.getAccount(Address.parse(address));
    return account;
}