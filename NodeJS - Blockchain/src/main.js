const { Blockchain, Transaction } = require('./blockchain');

let paivaCoin = new Blockchain();
paivaCoin.createTransaction(new Transaction('address1', 'address2', 100));
paivaCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner \n');

paivaCoin.minePendingTransactions('bruno-address');

console.log('\nBalance of Bruno is ', paivaCoin.getBalanceOfAddress('bruno-address'));

console.log('\n Starting the miner again... \n');

paivaCoin.minePendingTransactions('bruno-address');

console.log('\nBalance of Bruno is ', paivaCoin.getBalanceOfAddress('bruno-address'));

console.log('\nBLOCK CHAIN:\n');
console.log(JSON.stringify(paivaCoin, null, 4));