// in ethers v6 the getHistory function is not available, so we have to use the alchemy API to get the transaction history

// Setup: npm install alchemy-sdk
const { Alchemy, Network } = require('alchemy-sdk');
const ethers = require('ethers');
const { Wallet } = ethers;

require('dotenv').config();

const { TEST_PRIVATE_KEY, SEAN_PRIVATE_KEY, ALCHEMY_API_KEY } = process.env;

const config = {
    apiKey: ALCHEMY_API_KEY,
    // network: Network.ETH_MAINNET,
    network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(config);

// Setting up the provider for the Sepolia testnet
const provider = new ethers.AlchemyProvider("sepolia", ALCHEMY_API_KEY);

// create a wallet with a private key
const seanWallet = new Wallet(SEAN_PRIVATE_KEY, provider);

console.log('Sean Wallet Address:', seanWallet.address);

async function findTransactionHistory(address) {
    try {
        const history = await alchemy.core.getAssetTransfers({
            fromBlock: "0x0",
            fromAddress: address,
            category: ["external", "internal", "erc20", "erc721", "erc1155"],
        });
        console.log('Transaction History:', history);
        return history;
    }
    catch (error) {
        console.error('Error:', error);
    }
}

findTransactionHistory(seanWallet.address);