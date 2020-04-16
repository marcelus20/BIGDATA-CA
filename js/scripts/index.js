

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
const calcInEuroButton = $('#calcInEuroButton');
const calcInDolarButton = $('#calcInDolarButton');




//titles
const currentBlockResult = $('#currentBlockRateResult');
const transactionsCountResult = $('#transactionsCountResult');



//Whenever the button calcInEuroButton is pressed, the correspondent BTC value in 
//EUR will show. 
const calcPriceInEuro = () => {
    const priceInEuroResult = $('#priceInEuroResultH3');
    const inputValue = $('#priceInEuroInputValue').val();
    blockchainController.requestCurrentPriceInEuro(inputValue, res=>{
        priceInEuroResult.html(res);
    });

}


//Whenever the button calcInDolarButton is pressed, the correspondent BTC value in 
//USD will show. 
const calcPriceInDolar = () => {
    const priceInDolarResult = $('#priceInDolarResultH3');
    const inputValue = $('#priceInDolarInputValue').val();
    blockchainController.requestCurrentPriceInDolar(inputValue, res=>{
        priceInDolarResult.html(res);
    });

}


const requestHashRate = () => {
    blockchainController.requestLatestTeraHash(res=>{
        
        currentBlockResult.html(res);
    });
}

const requestTransactionCount = () => {
    blockchainController.requestTransactionsInTheLast24H(res=>{
        transactionsCountResult.html(res);
    });
}

const requestAllCurrenciesExchangesRate = () => {
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


//Adding the click event listener to calcInEuroButton
calcInEuroButton.on('click', calcPriceInEuro);

//Adding the click event listener to calcInDolarButton
calcInDolarButton.on('click', calcPriceInDolar);


$(document).ready(()=>{

    requestHashRate();
    requestTransactionCount();
    requestAllCurrenciesExchangesRate();

});

