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

    // Get the current nonce for the wallet
    const nonce = await provider.getTransactionCount(wallet.address, 'pending');

    

    console.log('nonce:', nonce);
}

module.exports = sendEther;

(async () => {
    try {
        const tx = await sendEther({
            value: ethers.parseEther("0.01"), // Converts 1 Ether to Wei
            to: "0x035102c76A54F5AFD71273900c0232b75427c5F9", // Destination address
        });

        console.log("Transaction successful:", tx);
    } catch (error) {
        console.error("Transaction failed:", error);
    }
})();