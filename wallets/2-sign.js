// sign transactions
// https://docs.ethers.org/v6/api/providers/#TransactionRequest

const ethers = require('ethers');
const { Wallet, utils } = ethers;
const { wallet1 } = require('./1-wallets');

// only using the legacy transaction format (type 0)
const signaturePromise = wallet1.signTransaction({
    value: ethers.parseEther('1'), // value in wei
    to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92",  // recipient address
    gasLimit: 21000, 
});

console.log(signaturePromise);

module.exports = signaturePromise;