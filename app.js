"use strict";

process.title = "Bulk Dogecoin Wallet Generator by Corvus Codex";

//Creaded by: Corvus Codex
//Github: https://github.com/CorvusCodex/
//Licence : MIT License

//Support my work:
//BTC: bc1q7wth254atug2p4v9j3krk9kauc0ehys2u8tgg3
//ETH & BNB: 0x68B6D33Ad1A3e0aFaDA60d6ADf8594601BE492F0
//Buy me a coffee: https://www.buymeacoffee.com/CorvusCodex

// Importing required modules
const CoinKey = require('coinkey');
const ci = require('coininfo');
const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');
// Creating a readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let wallets = [];
// Prompting the user for the number of wallets to generate
rl.question("How many wallets do you want to generate? ", (numWallets) => {
    console.log(`User entered: ${numWallets}`);

    // Parsing the user input as an integer
    numWallets = parseInt(numWallets);


    // Generating the specified number of wallets
    for (let i = 0; i < numWallets; i++) {
        console.log(`Generating wallet ${i + 1} of ${numWallets}`);

        let privateKeyHex = crypto.randomBytes(32).toString('hex');
    
        let ck = new CoinKey(Buffer.from(privateKeyHex, 'hex'), ci('DOGE').versions);
  

        // Adding the generated wallet to the array
        wallets.push({
            private_key: ck.privateWif,
            public_address: ck.publicAddress
        });
    }

    console.log(`Generated ${numWallets} wallets`);

    try {
        // Saving the generated wallets to a file using fs.writeFileSync
        fs.writeFileSync('./generated.txt', JSON.stringify(wallets, null, 4));
        console.log(`Saved generated wallets to generated.txt`);
    } catch (err) {
        console.error(`An error occurred while writing to the file: ${err.message}`);
    }

    // Closing the readline interface
    rl.close();
});
