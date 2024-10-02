// import { useAsyncInitialize } from "./useAsyncInitialize";
// import * as Factory from "../contracts/tact_factory";
// import { CHAIN } from "@tonconnect/protocol";
// import { Address } from "@ton/core";
// import { TonClient4 } from "@ton/ton";
// import { useTonConnect } from "./useTonConnect";
// import { getHttpEndpoint } from "@orbs-network/ton-access";
// import { useQuery } from "@tanstack/react-query";

// function useTonClient4() {
//     const { network } = useTonConnect();
  
//     return {
//       client: useAsyncInitialize(async () => {
//         if (!network) return;
//         return new TonClient4({
//           endpoint: await getHttpEndpoint({
//             network: network === CHAIN.MAINNET ? "mainnet" : "testnet",
//           }),
//         });
//       }, [network]),
//     };
//   }

// export function useFactory(amount: bigint, size: bigint, id: bigint) {
//     const { client } = useTonClient4();
//     const { sender, network } = useTonConnect();

//     const factoryContract = useAsyncInitialize(async () => {
//         if (!client) return;
//         const contract = Factory.factory.fromAddress(
//             Address.parse(
//                 network === CHAIN.MAINNET
//                 ? "EQBPEDbGdwaLv1DKntg9r6SjFIVplSaSJoJ-TVLe_2rqBOmH"
//                 : "kQDaycdxp9-4cHQH0KcR4KHxPLpXvQLDfpuGwQlYyaW_2rLx"
//             ) 
//         );
//         return client.open(contract);
//       }, [client]);

//       const { data, isFetching } = useQuery(
//         ["factory"],
//         async () => {
//           if (!factoryContract) return null;
//           return (await factoryContract!.getGetRedPackageAddress(amount, size, id)).toString();
//         },
//         { refetchInterval: 3000 }
//       );
    
//       return {
//         factory: factoryContract,
//         address: isFetching ? null : data,
//       };
// }
