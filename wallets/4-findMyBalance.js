// generate wallets using private key and mnemonic

const ethers = require('ethers');
const { Wallet } = ethers;

require('dotenv').config();

const { TEST_PRIVATE_KEY, SEAN_PRIVATE_KEY, ALCHEMY_API_KEY } = process.env;

// Setting up the provider for the Sepolia testnet
const provider = new ethers.AlchemyProvider("sepolia", ALCHEMY_API_KEY);

// create a wallet with a private key
const testWallet = new Wallet( TEST_PRIVATE_KEY, provider );
const seanWallet = new Wallet( SEAN_PRIVATE_KEY, provider );

console.log('Test Wallet Address:', testWallet.address);
console.log('Sean Wallet Address:', seanWallet.address);

// get the balance of the wallets
async function findMyBalance(wallet) {
    const balance = await provider.getBalance(wallet.address);
    console.log('Balance:', ethers.formatEther(balance));
}

findMyBalance(testWallet);
findMyBalance(seanWallet);