

const blockchainController = BlockchainController.getInstance();


// blockchainController.requestDifficulty(res=>console.log(res));
// blockchainController.requestBlockCount(res=>console.log(res));
// blockchainController.requestCurrentBlockReward(res=>console.log(res));
// blockchainController.requestTotalBTCInCirculation(res=>console.log(res));
// blockchainController.requestProbability(res=>console.log(res));
// blockchainController.requestExpectedTimeOfArrival(res=>console.log(res));
// blockchainController.requestAddressLookup("1EcH7pHYTHLo3cbdXfkf6e6Zh5JzCPGumc",res=>console.log(res));
// blockchainController.requestPriceInTheLast24H(res=>console.log(res));
// blockchainController.requestTransactionInTheLast24H(res=>console.log(res));
// blockchainController.requestCurrentAllExchangingRates(res=>console.log(res));
// blockchainController.requestRawBlock("00000000000003823fa3667d833a354a437bdecf725f1358b17f949c991bfe0a",res=>console.log(res));
// blockchainController.requestLatestBlock(res=>console.log(res));

// blockchainController.requestCurrentPriceInDolar(100,res=>console.log(res));


//buttons
const calcInEuroButton                      = $('#calcInEuroButton');
const calcInDolarButton                     = $('#calcInDolarButton');
const requestWalletInfoButton               = $('#requestWalletInfoButton');
const requestSpecificBlockButton            = $('#requestSpecificBlockButton');
//titles
const currentBlockResult                    = $('#currentBlockRateResult');
const transactionsCountResult               = $('#transactionsCountResult');
const circulationResult                     = $('#circulationResult');
//Whenever the button calcInEuroButton is pressed, the correspondent BTC value in 
//EUR will show. 
const calcPriceInEuro                       = () => {
    const priceInEuroResult = $('#priceInEuroResultH3');
    const inputValue        = $('#priceInEuroInputValue').val();
    blockchainController.requestCurrentPriceInEuro(inputValue, res=>{
        priceInEuroResult.html(res);
    });

}
//Whenever the button calcInDolarButton is pressed, the correspondent BTC value in 
//USD will show. 
const calcPriceInDolar                      = () => {
    const priceInDolarResult = $('#priceInDolarResultH3');
    const inputValue         = $('#priceInDolarInputValue').val();
    blockchainController.requestCurrentPriceInDolar(inputValue, res=>{
        priceInDolarResult.html(res);
    });

}
const requestHashRate                       = () => {
    blockchainController.requestLatestTeraHash(res=>{
        
        currentBlockResult.html(res);
    });
}

const requestTransactionCount               = () => {
    blockchainController.requestTransactionsInTheLast24H(res=>{
        transactionsCountResult.html(res);
    });
}
const requestAllCurrenciesExchangesRate     = () => {
    blockchainController.requestCurrentAllExchangingRates(res=>{
        
        const table = Utils.turnArrayOfObjectsIntoAnHTMLDivTable(Object.keys(res).map(key => {
             const obj = res[key];
             const currency = new Currency(key, obj["15m"], obj.last, obj.buy, obj.sell, obj.symbol);
             return currency;
        }));

        const currenciesExchangeTableArea = $('#currenciesExchangeTableArea');
        console.log(table);
        currenciesExchangeTableArea.append(table);
        
    });
}
const requestAddressInfo                    = () => {
    const walletAddressValue = $('#walletAddressValue');
    blockchainController.requestAddressLookup(walletAddressValue.val(), res =>{
        
        const wallet = new Wallet(res.hash160, res.address, res.n_tx, res.total_received, res.total_sent, res.final_balance, res.txs.map(t=>t.hash));
        console.log(wallet);
        const resultHash160              = $('#resultHash160');
        const resultAddress              = $('#resultAddress');
        const resultNumberOfTransactions = $('#resultNumberOfTransactions');
        const resultTotalReceived        = $('#resultTotalReceived');
        const resultTotalSent            = $('#resultTotalSent');
        const resultFinalBalance         = $('#resultFinalBalance');
        const resultTransactionsHashes   = $('#resultTransactionsHashes');


        resultHash160.html(wallet.hash160);
        resultAddress.html(wallet.address);
        resultNumberOfTransactions.html(wallet.nTx);
        resultTotalReceived.html(wallet.totalReceived);
        resultTotalSent.html(wallet.totalSent);
        resultFinalBalance.html(wallet.finalBalance);
        resultTransactionsHashes.append(Utils.turnArrayOfStringsIntoHTMLList(wallet.txs));

        //assign click event handler to each transaction hash
        wallet.txs.forEach(hash=>{
        
            const transactionItemList = $(`#${hash}`);
            //transactionItemList.on('click', ()=>{});//colapse later on
            transactionItemList.addClass("pointer highlight")

        });


    });
}
const requestLatestBlockInfoArea            = () => {
    blockchainController.requestLatestBlock(res=>{
        const block = new Block(res.hash, new Date(res.time * 1000), res.block_indexes, res.height);
        const resultBlockHash        = $('#resultBlockHash');
        const resultBlockDateAndTime = $('#resultBlockDateAndTime');
        const resultBlockIndex       = $('#resultBlockIndex');
        const resultBlockHeight      = $('#resultBlockHeight');
        resultBlockHash.html(block.hash);
        resultBlockDateAndTime.html(block.time);
        resultBlockIndex.html(block.blockIndex);
        resultBlockHeight.html(block.height);

    })
}

const requestCirculation                    = () => {
    blockchainController.requestTotalBTCInCirculation(res=>circulationResult.html(res));
}
const requestSpecificBlock                  = () => {
    const specificBlockHashValue = $('#specificBlockHashValue');
    blockchainController.requestRawBlock(specificBlockHashValue.val(), res=>{
        const fullBlock                       = new FullBlock(
            res.hash, 
            new Date(res.time * 1000), 
            res.block_index, 
            res.height, 
            res.size, 
            res.nonce, 
            res.prev_block,
        );
        const resultSpecificBlockHash         = $('#resultSpecificBlockHash');
        const resultSpecificBlockDateAndTime  = $('#resultSpecificBlockDateAndTime');
        const resultSpecificIndex             = $('#resultSpecificIndex');
        const resultSpecificBlockHeight       = $('#resultSpecificBlockHeight');
        const resultSpecificBlockNonce        = $('#resultSpecificBlockNonce');
        const resultSpecificPreviousBlockHash = $('#resultSpecificPreviousBlockHash');

        resultSpecificBlockHash.html(fullBlock.hash);
        resultSpecificBlockDateAndTime.html(fullBlock.time);
        resultSpecificIndex.html(fullBlock.blockIndex);
        resultSpecificBlockHeight.html(fullBlock.height);
        resultSpecificBlockNonce.html(fullBlock.nonce);
        resultSpecificPreviousBlockHash.html(fullBlock.prevBlockHash);
    });
}


//Adding the click event listener to calcInEuroButton
calcInEuroButton.on('click', calcPriceInEuro);

//Adding the click event listener to calcInDolarButton
calcInDolarButton.on('click', calcPriceInDolar);

//Adding the click event listener to requestWalletInfoButton
requestWalletInfoButton.on('click', requestAddressInfo);

requestSpecificBlockButton.on('click', requestSpecificBlock);

$(document).ready(()=>{

    requestHashRate();
    requestTransactionCount();
    requestAllCurrenciesExchangesRate();
    requestLatestBlockInfoArea();
    requestCirculation();

});

