

/**
 * Class responsible for sending request to the Blockchain.info API
 * I've made this a singleton
 */
class BlockchainController{

    /**
     * Singleton Instance
     */
    static instance = null;

    constructor(){
        /**
         * The request instance for sending requests
         */
        this.requests = new Requests();
        /**
         * Collection of the API features.
         */
        this.api = new class{
            constructor(){
                //const proxyByPassCors         = 'https://cors-anywhere.herokuapp.com/';
                const baseUrl                 = 'https://blockchain.info/';
                this.difficulty               = baseUrl + 'q/getdifficulty?cors=true';
                this.blockCount               = baseUrl + 'q/getblockcount?cors=true';
                this.latestHash               = baseUrl + 'q/latesthash?cors=true';
                this.latestBlock              = baseUrl + 'latestblock?cors=true'
                this.currentBlockReward       = baseUrl + 'q/bcperblock?cors=true';
                this.totalBTCInCirculation    = baseUrl + 'q/totalbc?cors=true';
                this.probability              = baseUrl + 'q/probability';
                this.eta                      = baseUrl + 'q/eta?cors=true';
                this.priceInTheLast24H        = baseUrl + 'q/24hrprice?cors=true';
                this.marketcap                = baseUrl + 'q/marketcap?cors=true';
                this.transactionsInTheLast24H = baseUrl + 'q/24hrtransactioncount?cors=true'; 
                this.currentAllExchanginRates = baseUrl + 'ticker?cors=true';
                this.rawBlock                 = (blockHash)    => baseUrl + 'rawblock/' + blockHash + "?cors=true";
                this.addressLookup            = (address)      => baseUrl + 'rawaddr/' + address + "?cors=true";
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


    /**
     * Retrieves the difficulty rate from the API
     * @param {Function} callback //success handling
     * @param {Function} callback2 //error handling
     */
    requestDifficulty(callback, callback2){
        this.requests.get(this.api.difficulty, callback, callback2);
    }
    /**
     * Retrieves the Amount of blocks mined so far
     * @param {Function} callback //success handling
     * @param {Function} callback2 //error handling
     */
    requestBlockCount(callback, callback2){
        this.requests.get(this.api.blockCount, callback, callback2);
    }
    /**
     * Retrieves the lates block hash
     * @param {Function} callback //success handling
     * @param {Function} callback2 //error handling
     */
    requestLatestTeraHash(callback, callback2){
        this.requests.get(this.api.latestHash, callback, callback2);
    }
    /**
     * Retrieves the latest block details
     * @param {Function} callback //success handling 
     * @param {Function} callback2 //error handling
     */
    requestLatestBlock(callback, callback2){
        this.requests.get(this.api.latestBlock, callback, callback2)
    }
    /**
     * Retrieves the current block reward
     * @param {Function} callback //success handling
     * @param {Function} callback2 //error handling
     */
    requestCurrentBlockReward(callback, callback2){
        this.requests.get(this.api.currentBlockReward, callback, callback2);
    }
    /**
     * Retrieves the total of bitcoin in the network economy. 
     * @param {Function} callback //success handling
     * @param {Function} callback2 //error handling
     */
    requestTotalBTCInCirculation(callback, callback2){
        this.requests.get(this.api.totalBTCInCirculation, callback, callback2);
    }
    /**
     * Retrieves the probability of mining one block in one attempt. 
     * @param {Function} callback //success handling
     * @param {Function} callback2 //error handling
     */
    requestProbability(callback, callback2){
        this.requests.get(this.api.probability, callback, callback2);
    }
    /**
     * Retrieves the expected time of arrival of the next block
     * @param {Function} callback //success handling
     * @param {Function} callback2 //error handling
     */
    requestExpectedTimeOfArrival(callback, callback2){
        this.requests.get(this.api.eta, callback, callback2);
    }
    /**
     * Retrives details of a specific wallet
     * @param {String} address 
     * @param {Function} callback //success handling
     * @param {Function} callback2 //error handling
     */
    requestAddressLookup(address, callback, callback2){
        this.requests.get(this.api.addressLookup(address), callback, callback2);
    }
    /**
     * Retrieves the weighed price in the last 24 hours in USD
     * @param {Function} callback //success handling
     * @param {Function} callback2 //error handling
     */
    requestPriceInTheLast24H(callback, callback2){
        this.requests.get(this.api.priceInTheLast24H, callback, callback2);
    }
    /**
     * Request the current BTC market cap in USD
     * @param {Function} callback //success handling
     * @param {Function} callback2 //error handling
     */
    requestMarketcap(callback, callback2){
        this.requests.get(this.api.marketcap, callback, callback2);
    }
    /**
     * Request the amount of transactions in the last 24 hours
     * @param {Function} callback //success handling
     * @param {Function} callback2 //error handling
     */
    requestTransactionsInTheLast24H(callback, callback2){
        this.requests.get(this.api.transactionsInTheLast24H, callback, callback2);
    }
    /**
     * Request the table of the bitcoin price in fiat (real world) money.
     * @param {Function} callback //success handling
     * @param {Function} callback2 //error handling
     */
    requestCurrentAllExchangingRates(callback, callback2){
        this.requests.get(this.api.currentAllExchanginRates, callback, callback2);
    }
    /**
     * Request details of a specific block in the blockchain
     * @param {String} blockHash 
     * @param {Function} callback //success handling
     * @param {Function} callback2 //error handling
     */
    requestRawBlock(blockHash, callback, callback2){
        this.requests.get(this.api.rawBlock(blockHash), callback, callback2);
    }
    /**
     * Request the equivalent dolar value in bitcoin
     * @param {String} valueInDolar 
     * @param {Function} callback //success handling
     * @param {Function} callback2 //error handling
     */
    requestCurrentPriceInDolar(valueInDolar,callback, callback2){
        this.requests.get(this.api.currentPriceInDolar(valueInDolar), callback, callback2);
    }
    /**
     * Request the equivalent euro value in bitcoin
     * @param {String} valueInEuro 
     * @param {Function} callback //success handling
     * @param {Function} callback2 //error handling
     */
    requestCurrentPriceInEuro(valueInEuro, callback, callback2){
        this.requests.get(this.api.currentPriceInEuro(valueInEuro), callback, callback2);
    }

}


