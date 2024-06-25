import { HttpClient, Api, JettonsBalances } from 'tonapi-sdk-js';
import * as dotenv from "dotenv";
dotenv.config();

export async function getTokenApi(network: string) {
    // Configure the HTTP client with your host and token
    console.log("network: ", network);
    const httpClient = new HttpClient({
        baseUrl: network == "-3" ? 'https://testnet.tonapi.io' : 'https://tonapi.io',
        baseApiParams: {
            headers: {
                Authorization: `Bearer AHLRNAY5KDTVAAIAAAAKKQ4TXOPBVC5IIG26BKHKAVJRN3K7PNHLHKWDROQW4FEKOLFERCY`,
                'Content-type': 'application/json'
            }
        }
    });

    // Initialize the API client
    return new Api(httpClient);

}

export async function getTokenLists(address: string, network: string): Promise<JettonsBalances> {
    const api = await getTokenApi(network);
    const lists = api.accounts.getAccountJettonsBalances(address);
    return lists;
}