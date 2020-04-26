




$(document).ready(()=>{

    const blockchainController = BlockchainController.getInstance();


    //buttons
    const calcInEuroButton                      = $('#calcInEuroButton');
    const calcInDolarButton                     = $('#calcInDolarButton');
    const requestWalletInfoButton               = $('#requestWalletInfoButton');
    const requestSpecificBlockButton            = $('#requestSpecificBlockButton');
    //titles
    const currentBlockResult                    = $('#currentBlockRateResult');
    const transactionsCountResult               = $('#transactionsCountResult');
    const circulationResult                     = $('#circulationResult');
    /**
     * This function will unhide the alert div and display the message
     * @param {String} message 
     */
    const showAlert                             = (message) => {
        const alertDiv = $('#alertArea');
        const alertMessage = $('#alertMessage').html('');
        alertMessage.html(message);
        show(alertDiv);
        setTimeout(()=>{
            hide($('.alert-warning'));
        },6000);
    }
    /**
     * This is the error handling callback for failed requests
     * @param {Request} request 
     * @param {Number} status 
     * @param {String} error 
     */
    const handleRequestError                    = (request, status, error) => {
        console.log(error);
        showAlert(request.responseText);
        hideSpinner()
    }
    //const statsTab                              = $('#statsTab');
    //Whenever the button calcInEuroButton is pressed, the correspondent BTC value in 
    //EUR will show. 
    const calcPriceInEuro                       = (e) => {
        e.preventDefault();
        e.stopPropagation();
        showSpinner();
        const priceInEuroResult = $('#priceInEuroResultH3');
        const inputValue        = $('#priceInEuroInputValue').val();

        blockchainController.requestCurrentPriceInEuro(inputValue, res=>{
            priceInEuroResult.html(res);
            hideSpinner();
        },handleRequestError);

    }
    //Whenever the button calcInDolarButton is pressed, the correspondent BTC value in 
    //USD will show. 
    const calcPriceInDolar                      = (e) => {
        e.preventDefault();
        e.stopPropagation();
        showSpinner();
        const priceInDolarResult = $('#priceInDolarResultH3');
        const inputValue         = $('#priceInDolarInputValue').val();
        blockchainController.requestCurrentPriceInDolar(inputValue, res=>{
            priceInDolarResult.html(res);
            hideSpinner();
        }, handleRequestError);

    }
    /**
     * Whenever the request hash option is pressed, this request will be activated
     */
    const requestHashRate                       = () => {
        showSpinner();
        blockchainController.requestLatestTeraHash(res=>{
            hideSpinner();
            currentBlockResult.html(res);
        },handleRequestError);
    }
    /**
     * When block count tab is loaded, this is the function to call
     */
    const requestTransactionCount               = () => {
        showSpinner();
        
        blockchainController.requestTransactionsInTheLast24H(res=>{
            hideSpinner();
            console.log(res);
            transactionsCountResult.html(res);
        },handleRequestError);
    }
    /**
     * When fiat table tab is pressed, this is the request to execute
     */
    const requestAllCurrenciesExchangesRate     = () => {
        showSpinner();
        blockchainController.requestCurrentAllExchangingRates(res=>{
            
            const table = Utils.turnArrayOfObjectsIntoAnHTMLDivTable(Object.keys(res).map(key => {
                const obj = res[key];
                const currency = new Currency(key, obj["15m"], obj.last, obj.buy, obj.sell, obj.symbol);
                return currency;
            }));

            const currenciesExchangeTableArea = $('#currenciesExchangeTableArea').html(``);
            hideSpinner();
            currenciesExchangeTableArea.html(table);
            
        },handleRequestError);
    }
    /**
     * When details about wallet is pressed, this function is to be called. 
     */
    const requestAddressInfo                    = () => {
        showSpinner();
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
            resultTransactionsHashes.html('');


            resultHash160.html(wallet.hash160);
            resultAddress.html(wallet.address);
            resultNumberOfTransactions.html(wallet.nTx);
            resultTotalReceived.html(wallet.totalReceived);
            resultTotalSent.html(wallet.totalSent);
            resultFinalBalance.html(wallet.finalBalance);
            resultTransactionsHashes.append(Utils.turnArrayOfStringsIntoHTMLList(wallet.txs));
            hideSpinner();

        },handleRequestError);
    }
    /**
     * When the tab about block info is pressed, this function will be called.
     */
    const requestLatestBlockInfoArea            = () => {
        showSpinner();
        blockchainController.requestLatestBlock(res=>{
            const block = new Block(res.hash, new Date(res.time * 1000), res.block_index, res.height);
            const resultBlockHash        = $('#resultBlockHash');
            const resultBlockDateAndTime = $('#resultBlockDateAndTime');
            const resultBlockIndex       = $('#resultBlockIndex');
            const resultBlockHeight      = $('#resultBlockHeight');
            resultBlockHash.html(block.hash);
            resultBlockDateAndTime.html(block.time);
            resultBlockIndex.html(block.blockIndex);
            resultBlockHeight.html(block.height);
            hideSpinner();
        },handleRequestError)
    }
    /**
     * When the circulation tab is pressed, this function is called
     */
    const requestCirculation                    = () => {
        showSpinner();
        blockchainController.requestTotalBTCInCirculation(res=>{
            circulationResult.html(res);
            hideSpinner();
        },handleRequestError);
    }
    /**
     * When the specific block form is submitted, this function is calld. 
     * @param {Event} e 
     */
    const requestSpecificBlock                  = (e) => {
        e.preventDefault();
        e.stopPropagation();
        showSpinner();
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
            hideSpinner();
        },handleRequestError);
    }
    /**
     * When the marketcap tab is pressed, this function is called. 
     */
    const requestMarketCap                      = () => {
        showSpinner();
        blockchainController.requestMarketcap(res=>{
            $('#marketCapTitle').html(Number(res));
            hideSpinner();
        },handleRequestError);
    }
    /**
     * When the ETA tab is requested, this function is called. 
     */
    const requestETA                            = () => {
        showSpinner();
        blockchainController.requestExpectedTimeOfArrival(res=>{
            $('#etaTitle').html(res);
            hideSpinner();
        },handleRequestError);
    }
    /**
     * When the probability tab is pressed, this function is called. 
     */
    const requestProbability                    = () => {
        showSpinner();
        blockchainController.requestProbability(res=>{
            $('#probabilityValue').html(res);
            hideSpinner();
        },handleRequestError);
    }
    /**
     * When the difficulty rate is called, this function is to be called. 
     */
    const requestDifficultyRate                 = () => {
        showSpinner();
        blockchainController.requestDifficulty(res=>{
            $('#difficultyValue').html(Number(res));
            hideSpinner();
        },handleRequestError);
    }
    /**
     * When the reward tab is pressed, this function is to be called. 
     */
    const currentBlockReward                    = () => {
        showSpinner();
        blockchainController.requestCurrentBlockReward(res=>{
            $('#btcBlockReward').html(res);
            hideSpinner();
        },handleRequestError);
    }
    /**
     * When mined block count tab is pressed, this function is to be called. 
     */
    const requestCurrentMinedBlockAmount        = () => {
        showSpinner();
        blockchainController.requestBlockCount(res=>{
            $('#minedBlocksAmount').html(res);
            hideSpinner();
        },handleRequestError);
    }
    /**
     * When the weighed price is pressed, this function is to be called; 
     */
    const requestWeighted24HPrice               = () => {
        showSpinner();
        blockchainController.requestPriceInTheLast24H(res=>{
            $('#weightedPriceTitle').html(res)
            hideSpinner();
        },handleRequestError);
    }
    /**
     * Show the spinner div
     */
    const showSpinner                           = () => {
        show($('#spinnerid'));
    }
    /**
     * Hide the spinner div
     */
    const hideSpinner                           = () => {
        hide($('#spinnerid'));
    }
    /**
     * Object to represent which tab should be displayed or hidden. 
     * If a user press the stats tab, for example, all the other
     * hides should be hidden and the state will update this change.
     */
    const state                                 = {
        tabs : {
            homeTab           : new Tab($('#hometab')),
            allCurrenciesTab  : new Tab($('#priceInExchangesDate')),
            specificWalletTab : new Tab($('#infoAboutASpecificWalletAddressArea')),
            latestBlockTab    : new Tab($('#latestBlock')),
            statsTab          : new Tab($('#statsTab')),
            specificBlockTab  : new Tab($('#specificBlock')),
            
        }
        
    }
    /**
     * Nav options jquery elements
     */
    const tool0                                 = $('#t0');
    const tool1                                 = $('#t1');
    const tool2                                 = $('#t2');
    const tool3                                 = $('#t3');
    const tool4                                 = $('#t4');
    const tool5                                 = $('#t5');
    /**
     * Set all tabs to false so that they become hidden
     */
    const constFalsifyAllTabs                   = () => {
        const tabs = state.tabs;
        Object.keys(tabs).forEach(key=>tabs[key].show=false);
    }
    /**
     * Set only one tab to not hidden. The tab passed as parameter
     * @param {Tab} tab 
     */
    const makeOneTabTrue                        = (tab) => {
        constFalsifyAllTabs();
        tab.show = true;
        render();
    }
    /**
     * Hide a generic jquery element by adding the hide class from the index.css file
     * @param {JqueryElement} element 
     */
    const hide                                  = (element) => {
        try{
            element.addClass('hide');
        }catch(e){
            console.log(element)
        }
    }
    /**
     * Show a gneric jquery element by removing the hide css class from it.
     * @param {JqueryElement} element 
     */
    const show                                  = (element) => {
        element.removeClass('hide');
    }
    /**
     * Iterates through the state tabs and display the ones set to  show=true. 
     */
    const render                                = () => {
        Object.keys(state.tabs).forEach(key=>{
            const tab = state.tabs[key];
            if(tab.show){//if show == true
                show(tab.element);
            }else{// if show == false, hide element. 
                hide(tab.element);
            }
        });
    }
    /**
     * Unhide the hometab and carry out the following requests:
     * requestHashRate
     * requestTransactionCount
     */
    const showHomeTab                           = () => {
        requestHashRate();
        requestTransactionCount();
        makeOneTabTrue(state.tabs.homeTab);
    }
    /**
     * Unhide the fiat currencies tab and carry out the following requests:
     * requestAllCurrenciesExchangesRate
     */
    const showAllCurrenciesTab                  = () => {
        requestAllCurrenciesExchangesRate();
        makeOneTabTrue(state.tabs.allCurrenciesTab);
    }
    /**
     * Make info about wallet visible.
     * Request is called at the form submittion.  
     */
    const showInfoAboutWallet                   = () => {
        makeOneTabTrue(state.tabs.specificWalletTab);
    }
    /**
     * Make latest block tab visible and carry out the following request. 
     * requestLatestBlockInfoArea
     */
    const showLatestBlock                       = () => {
        requestLatestBlockInfoArea();
        makeOneTabTrue(state.tabs.latestBlockTab);
    }
    /**
     * Make the specific block tab visible. 
     * Requests are sent at the form submittion. 
     */
    const showSpecificBlock                     = () => {
        makeOneTabTrue(state.tabs.specificBlockTab);
    }
    /**
     * Makes the Misc Network Stats visible. The following requests are called:
     * requestMarketCap
     * requestETA
     * requestProbability
     * requestDifficultyRate
     * currentBlockReward
     *  requestCurrentMinedBlockAmount
     *  requestCirculation
     * requestWeighted24HPrice
     */
    const showNetStats                          = () => {
        requestMarketCap();
        requestETA();
        requestProbability();
        requestDifficultyRate();
        currentBlockReward();
        requestCurrentMinedBlockAmount();
        requestCirculation();
        requestWeighted24HPrice();
        makeOneTabTrue(state.tabs.statsTab);
    }
    
    /**
     * The refresh icon for each of the api request components
     */
    const pointer1                             = $('#p1');
    const pointer2                             = $('#p2');
    const pointer3                             = $('#p3');
    const pointer4                             = $('#p4');
    const pointer5                             = $('#p5');
    const pointer6                             = $('#p6');
    const pointer7                             = $('#p7');
    const pointer8                             = $('#p8');
    const pointer9                             = $('#p9');
    const pointer10                            = $('#p10');
    const pointer11                            = $('#p11');
    const pointer12                            = $('#p12');

    /**
     * Assigning listener to each refresh icons: Hover and click.
     * Hover:
     *     Mouse in: increase the icon size
     *     Mouse out: diminish the icon size back to normal
     * Click:
     *     carry out once again the request to reload the data. 
     */
    pointer1.hover(()=>increasePointer(pointer1), ()=>decreasePointer(pointer1));
    pointer1.click(requestHashRate)
    pointer2.hover(()=>increasePointer(pointer2), ()=>decreasePointer(pointer2));
    pointer2.click(requestTransactionCount);
    pointer3.hover(()=>increasePointer(pointer3), ()=>decreasePointer(pointer3));
    pointer3.click(requestAllCurrenciesExchangesRate);
    pointer4.hover(()=>increasePointer(pointer4), ()=>decreasePointer(pointer4));
    pointer4.click(requestLatestBlockInfoArea)
    pointer5.hover(()=>increasePointer(pointer5), ()=>decreasePointer(pointer5));
    pointer5.click(requestCirculation);
    pointer6.hover(()=>increasePointer(pointer6), ()=>decreasePointer(pointer6));
    pointer6.click(requestMarketCap);
    pointer7.hover(()=>increasePointer(pointer7), ()=>decreasePointer(pointer7));
    pointer7.click(requestETA);
    pointer8.hover(()=>increasePointer(pointer8), ()=>decreasePointer(pointer8));
    pointer8.click(requestProbability);
    pointer9.hover(()=>increasePointer(pointer9), ()=>decreasePointer(pointer9));
    pointer9.click(requestCurrentMinedBlockAmount);
    pointer10.hover(()=>increasePointer(pointer10), ()=>decreasePointer(pointer10));
    pointer10.click(requestDifficultyRate);
    pointer11.hover(()=>increasePointer(pointer11), ()=>decreasePointer(pointer11));
    pointer11.click(requestWeighted24HPrice);
    pointer12.hover(()=>increasePointer(pointer12), ()=>decreasePointer(pointer12));

    /**
     * Increase the size of the jqueryElement. Designed for the pointers declared above. 
     * @param {jqueryElement} pointer 
     */
    const increasePointer                       = (pointer) => {
        pointer.width("2em").height("2em")
    }
    /**
     * Diminish the size of the elemnt. Designed for the pointer declared above. 
     * @param {JqueryElement} pointer 
     */
    const decreasePointer                       = (pointer) => {
        pointer.width("1em").height("1em")
    }

    /**
     * Assigning click listener to each one of the nav bars. 
     */
    tool0.on('click', showHomeTab); // make hometab visible when clicked
    tool1.on('click', showAllCurrenciesTab); //make currencies tab visible when clicked.
    tool2.on('click', showInfoAboutWallet); // make wallet tab visible when clicked.
    tool3.on('click', showLatestBlock); // make latest block tab visible when clicked. 
    tool4.on('click', showSpecificBlock); // make specific block tab visible when cliekdd
    tool5.on('click', showNetStats); // make netStats visible when clicked
    //Adding the click event listener to calcInEuroButton
    calcInEuroButton.submit(calcPriceInEuro);

    //Adding the click event listener to calcInDolarButton
    calcInDolarButton.submit(calcPriceInDolar);

    //Adding the click event listener to requestWalletInfoButton
    requestWalletInfoButton.on('click', requestAddressInfo);

    requestSpecificBlockButton.submit(requestSpecificBlock);
    /**
     * By default, hometab is visible when first accessed or page reloaded. 
     */
    showHomeTab();

});

