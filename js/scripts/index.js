

const blockchainController = BlockchainController.getInstance();


blockchainController.requestDifficulty(res=>console.log(res));
blockchainController.requestBlockCount(res=>console.log(res));
//blockchainController.requestLatestTeraHash(res=>console.log(res));
blockchainController.requestCurrentBlockReward(res=>console.log(res));
blockchainController.requestTotalBTCInCirculation(res=>console.log(res));
blockchainController.requestProbability(res=>console.log(res));
blockchainController.requestExpectedTimeOfArrival(res=>console.log(res));
blockchainController.requestAddressLookup("1EcH7pHYTHLo3cbdXfkf6e6Zh5JzCPGumc",res=>console.log(res));
blockchainController.requestPriceInTheLast24H(res=>console.log(res));
blockchainController.requestTransactionInTheLast24H(res=>console.log(res));
blockchainController.requestCurrentAllExchangingRates(res=>console.log(res));
blockchainController.requestRawBlock("00000000000003823fa3667d833a354a437bdecf725f1358b17f949c991bfe0a",res=>console.log(res));
blockchainController.requestLatestBlock(res=>console.log(res));
blockchainController.requestCurrentPriceInEuro(50,res=>console.log(res));
blockchainController.requestCurrentPriceInDolar(100,res=>console.log(res));