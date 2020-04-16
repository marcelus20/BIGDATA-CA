


class BlockchainController{

    static instance = null;

    constructor(){
        this.requests = new Requests();
        this.api = new class{
            constructor(){
                const proxyByPassCors         = 'https://cors-anywhere.herokuapp.com/';
                const baseUrl                 = proxyByPassCors + 'https://blockchain.info/';
                this.difficulty               = baseUrl + 'q/getdifficulty';
                this.blockCount               = baseUrl + 'q/getblockcount';
                this.latestHash               = baseUrl + 'q/latesthash';
                this.latestBlock              = baseUrl + 'latestblock'
                this.currentBlockReward       = baseUrl + 'q/bcperblock';
                this.totalBTCInCirculation    = baseUrl + 'q/totalbc';
                this.probability              = baseUrl + 'q/probability';
                this.eta                      = baseUrl + 'q/eta';
                this.priceInTheLast24H        = baseUrl + 'q/24hrprice';
                this.marketcap                = baseUrl + 'q/marketcap';
                this.transactionsInTheLast24H = baseUrl + 'q/24hrtransactioncount'; 
                this.currentAllExchanginRates = baseUrl + 'ticker';
                this.rawBlock                 = (blockHash)    => baseUrl + 'rawblock/' + blockHash;
                this.addressLookup            = (address)      => baseUrl + 'rawaddr/' + address;
                this.currentPriceInDolar      = (valueInDolar) => baseUrl + 'tobtc?currency=USD&value=' + valueInDolar;
                this.currentPriceInEuro       = (valueInEuro)  => baseUrl + 'tobtc?currency=EUR&value=' + valueInEuro;
            }
        }
    }

    static getInstance(){
        if (BlockchainController.instance == null){
            BlockchainController.instance = new BlockchainController();
        }
        return BlockchainController.instance;
    }


    requestDifficulty(callback){
        this.requests.get(this.api.difficulty, callback);
    }

    requestBlockCount(callback){
        this.requests.get(this.api.blockCount, callback);
    }

    requestLatestTeraHash(callback){
        this.requests.get(this.api.latestHash, callback);
    }

    requestLatestBlock(callback){
        this.requests.get(this.api.latestBlock, callback)
    }

    requestCurrentBlockReward(callback){
        this.requests.get(this.api.currentBlockReward, callback);
    }

    requestTotalBTCInCirculation(callback){
        this.requests.get(this.api.totalBTCInCirculation, callback);
    }

    requestProbability(callback){
        this.requests.get(this.api.probability, callback);
    }

    requestExpectedTimeOfArrival(callback){
        this.requests.get(this.api.eta, callback);
    }

    requestAddressLookup(address, callback){
        this.requests.get(this.api.addressLookup(address), callback);
    }

    requestPriceInTheLast24H(callback){
        this.requests.get(this.api.priceInTheLast24H, callback);
    }

    requestMarketcap(callback){
        this.requests.get(this.api.marketcap, callback);
    }

    requestTransactionsInTheLast24H(callback){
        this.requests.get(this.api.transactionsInTheLast24H, callback);
    }

    requestCurrentAllExchangingRates(callback){
        this.requests.get(this.api.currentAllExchanginRates, callback);
    }

    requestRawBlock(blockHash, callback){
        this.requests.get(this.api.rawBlock(blockHash), callback);
    }

    requestCurrentPriceInDolar(valueInDolar,callback){
        this.requests.get(this.api.currentPriceInDolar(valueInDolar), callback);
    }

    requestCurrentPriceInEuro(valueInEuro, callback){
        this.requests.get(this.api.currentPriceInEuro(valueInEuro), callback);
    }




}


