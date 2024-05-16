// generate wallets using private key and mnemonic

const ethers = require('ethers');
const { Wallet } = ethers;

require('dotenv').config();

const { TEST_PRIVATE_KEY, TEST_MNEMONIC } = process.env;

// create a wallet with a private key
const wallet1 = new Wallet( TEST_PRIVATE_KEY );

// create a wallet from mnemonic
const wallet2 = Wallet.fromPhrase( TEST_MNEMONIC );

console.log('Wallet 1 Address:', wallet1.address);
console.log('Wallet 2 Address:', wallet2.address);

module.exports = {
    wallet1,
    wallet2,
}
