const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

//Public key:  04b78045547ccb7b3ee829ab6d572d78e5f03deba00c9539c98000bcc7a4423b8815f237f42e6d8e669c5961b76ce7219db96470fcc2eb4d82829c72721396c308
const myKey = ec.keyFromPrivate('88001a0689656587ba470d44b6f63e0ffc8d92d6dcf7631a6aa95cdcb0c966f6');
const myWalletAddress = myKey.getPublic('hex');

let paivaCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
paivaCoin.addTransaction(tx1);

console.log('\n Starting the miner \n');

paivaCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of Bruno is ', paivaCoin.getBalanceOfAddress(myWalletAddress));

console.log('\nBLOCK CHAIN:\n');
console.log(JSON.stringify(paivaCoin, null, 4));


