// after signing the transaction, we need to broadcast it to the network, to do this we have to connect to a provider

// The provider is the gateway to the Ethereum blockchain, it is the bridge between our application and the blockchain.

// for this example we will use the Alchemy API as our provider, you can use any other provider like Infura, Etherscan, or local nodes like Ganache.

// ethers.js's providers doc: https://docs.ethers.org/v6/api/providers/

const ethers = require('ethers');
require('dotenv').config();
const { SEAN_PRIVATE_KEY, ALCHEMY_API_KEY } = process.env;

// Setting up the provider for the Sepolia testnet
const provider = new ethers.AlchemyProvider("sepolia", ALCHEMY_API_KEY);

const wallet = new ethers.Wallet(SEAN_PRIVATE_KEY, provider);

async function sendEther({ value, to }) {
    console.log("Sending transaction to address:", to); // Logging the address

    // Estimate gas limit for the transaction
    const estimatedGasLimit = await provider.estimateGas({
        to,
        value,
    });

    // Get fee data for EIP-1559
    const feeData = await provider.getFeeData();

    // Displaying the fee data in gwei
    console.log("feeData:", feeData); 
    console.log("maxFeePerGas (gwei):", ethers.formatUnits(feeData.maxFeePerGas, "gwei"));
    console.log("maxPriorityFeePerGas (gwei):", ethers.formatUnits(feeData.maxPriorityFeePerGas, "gwei"));
    console.log("gasPrice (gwei):", ethers.formatUnits(feeData.gasPrice, "gwei"));
    console.log("estimatedGasLimit:", estimatedGasLimit.toString());

    // Get the current nonce for the wallet
    const nonce = await provider.getTransactionCount(wallet.address, 'pending');

    console.log('next nonce should be:', nonce);

    const tx = await wallet.sendTransaction({
        value,
        to,
        // gasLimit: 0x5208, // Standard Ethereum transaction gas limit
        gasLimit: estimatedGasLimit,
        // maxFeePerGas: ethers.parseUnits("600.0", "gwei"), // Example gas price in gwei
        maxFeePerGas: feeData.maxFeePerGas, // Base fee + priority fee
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas, // Miner tip
        // maxPriorityFeePerGas: ethers.parseUnits("30.0", "gwei"), // Example miner tip in gwei
        nonce: nonce // Set the nonce explicitly
    });

    // Logging the transaction hash
    console.log("Transaction hash:", tx.hash);

    // Waiting for the transaction to be mined
    await tx.wait();
    console.log("Transaction mined");

    return tx;
}

module.exports = sendEther;

(async () => {
    try {
        const tx = await sendEther({
            value: ethers.parseEther("0.01314"), // Converts 1 Ether to Wei
            to: "0x035102c76A54F5AFD71273900c0232b75427c5F9", // Destination address
        });

        console.log("Transaction successful:", tx);
    } catch (error) {
        console.error("Transaction failed:", error);
    }
})();