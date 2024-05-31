"use client";
import { FC, FormEventHandler, useState } from "react";
import { useConnect, useAccount, useWriteContract } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { mainnet, sepolia } from 'viem/chains';
import { DAI_ABI } from '../../config/abi';

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";


export const ProductCard: FC = () => {
    const { primaryWallet } = useDynamicContext();
    const { connectAsync } = useConnect()
    const { address } = useAccount()
    const [txnHash, setTxnHash] = useState("");
    const { writeContractAsync } = useWriteContract()
    const [started, setStarted] = useState(false)
    const [errors, setErrors] = useState<string>("")
    const [completed, setCompleted] = useState(false)

    if (!primaryWallet) return null;

    const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);

            const address = formData.get("address") as string;
            const amount = formData.get("amount") as string;
            handlePayment(address, Number(amount));
        } catch (err) {
            console.log("nob", err);
            setErrors("An error ocurred!");
        }
    }


    const handlePayment = async (recAddr: string, amt: number) => {
        try {
            setErrors('')
            setStarted(true)
            console.log("Hm yes chainium", sepolia.id);
            if (!address) {
                await connectAsync({ chainId: sepolia.id, connector: injected() })
            }
            console.log("wallet address", recAddr);

            // `${recAddr}`
            const data = await writeContractAsync({
                chainId: sepolia.id,
                address: recAddr,
                functionName: 'transfer',
                abi: DAI_ABI,
                args: [
                    `0xdAC17F958D2ee523a2206206994597C13D831ec7`,       // contract address, ERC20 sepolia net contract
                    // `0x6B175474E89094C44Da98b954EedeAC495271d0F`,
                    BigInt(amt * 1000000),
                ],
            })
            setCompleted(true)
            console.log(data)
        } catch (err) {
            console.log(err)
            setStarted(false)
            setErrors("Payment failed. Please try again.")
        }
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
                Send ETH
            </h2>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="address"
                        className="block text-gray-700 font-semibold mb-2"
                    >
                        ETH Address
                    </label>
                    <input
                        className="w-full px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg border border-gray-400 outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="address"
                        type="text"
                        required
                        placeholder="Enter ETH address"
                    />
                </div>
                <div>
                    <label
                        htmlFor="amount"
                        className="block text-gray-700 font-semibold mb-2"
                    >
                        Amount (ETH)
                    </label>
                    <input
                        className="w-full px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg border border-gray-400 outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="amount"
                        type="text"
                        required
                        placeholder="0.05"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        Send ETH
                    </button>
                </div>
                <div className="mb-4">
                    <span data-testid="transaction-section-result-hash">{txnHash}</span>
                </div>
                <p className="text-red-500 font-semibold">{errors}</p>
            </form>
        </div>
    );
};

export default ProductCard;