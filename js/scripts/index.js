




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
        });

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
        });

    }
    const requestHashRate                       = () => {
        showSpinner();
        blockchainController.requestLatestTeraHash(res=>{
            hideSpinner();
            currentBlockResult.html(res);
        });
    }

    const requestTransactionCount               = () => {
        showSpinner();
        
        blockchainController.requestTransactionsInTheLast24H(res=>{
            hideSpinner();
            console.log(res);
            transactionsCountResult.html(res);
        });
    }
    const requestAllCurrenciesExchangesRate     = () => {
        showSpinner();
        blockchainController.requestCurrentAllExchangingRates(res=>{
            
            const table = Utils.turnArrayOfObjectsIntoAnHTMLDivTable(Object.keys(res).map(key => {
                const obj = res[key];
                const currency = new Currency(key, obj["15m"], obj.last, obj.buy, obj.sell, obj.symbol);
                return currency;
            }));

            const currenciesExchangeTableArea = $('#currenciesExchangeTableArea');
            hideSpinner();
            currenciesExchangeTableArea.append(table);
            
        });
    }
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


            resultHash160.html(wallet.hash160);
            resultAddress.html(wallet.address);
            resultNumberOfTransactions.html(wallet.nTx);
            resultTotalReceived.html(wallet.totalReceived);
            resultTotalSent.html(wallet.totalSent);
            resultFinalBalance.html(wallet.finalBalance);
            resultTransactionsHashes.append(Utils.turnArrayOfStringsIntoHTMLList(wallet.txs));
            hideSpinner();

        });
    }
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
        })
    }

    const requestCirculation                    = () => {
        showSpinner();
        blockchainController.requestTotalBTCInCirculation(res=>{
            circulationResult.html(res);
            hideSpinner();
        });
    }
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
        });
    }
    const requestMarketCap                      = () => {
        showSpinner();
        blockchainController.requestMarketcap(res=>{
            $('#marketCapTitle').html(Number(res));
            hideSpinner();
        });
    }
    const requestETA                            = () => {
        showSpinner();
        blockchainController.requestExpectedTimeOfArrival(res=>{
            $('#etaTitle').html(res);
            hideSpinner();
        });
    }
    const requestProbability                    = () => {
        showSpinner();
        blockchainController.requestProbability(res=>{
            $('#probabilityValue').html(res);
            hideSpinner();
        });
    }
    const requestDifficultyRate                 = () => {
        showSpinner();
        blockchainController.requestDifficulty(res=>{
            $('#difficultyValue').html(Number(res));
            hideSpinner();
        });
    }
    const currentBlockReward                    = () => {
        showSpinner();
        blockchainController.requestCurrentBlockReward(res=>{
            $('#btcBlockReward').html(res);
            hideSpinner();
        });
    }
    const requestCurrentMinedBlockAmount        = () => {
        showSpinner();
        blockchainController.requestBlockCount(res=>{
            $('#minedBlocksAmount').html(res);
            hideSpinner();
        });
    }
    const requestWeighted24HPrice               = () => {
        showSpinner();
        blockchainController.requestPriceInTheLast24H(res=>{
            $('#weightedPriceTitle').html(res)
            hideSpinner();
        });
    }

    const showSpinner                           = () => {
        show($('#spinnerid'));
    }

    const hideSpinner                           = () => {
        hide($('#spinnerid'));
    }
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
    const tool0                                 = $('#t0');
    const tool1                                 = $('#t1');
    const tool2                                 = $('#t2');
    const tool3                                 = $('#t3');
    const tool4                                 = $('#t4');
    const tool5                                 = $('#t5');
    const tool6                                 = $('#t6');
    const tool7                                 = $('#t7');
    const tool8                                 = $('#t8');
    const tool9                                 = $('#t9');
    const tool10                                = $('#t10');
    const tool11                                = $('#t11');
    const tool12                                = $('#t12');

    const constFalsifyAllTabs                   = () => {
        const tabs = state.tabs;
        Object.keys(tabs).forEach(key=>tabs[key].show=false);
    }
    const makeOneTabTrue                        = (tab) => {
        constFalsifyAllTabs();
        tab.show = true;
        render();
    }
    const hide                                  = (element) => {
        try{
            element.addClass('hide');
        }catch(e){
            console.log(element)
        }
    }
    const show                                  = (element) => {
        element.removeClass('hide');
    }
    const render                                = () => {
        Object.keys(state.tabs).forEach(key=>{
            const tab = state.tabs[key];
            if(tab.show){
                show(tab.element);
            }else{
                hide(tab.element);
            }
        });
    }
    const showHomeTab                           = () => {
        requestHashRate();
        requestTransactionCount();
        makeOneTabTrue(state.tabs.homeTab);
    }
    const showAllCurrenciesTab                  = () => {
        requestAllCurrenciesExchangesRate();
        makeOneTabTrue(state.tabs.allCurrenciesTab);
    }
    const showInfoAboutWallet                   = () => {
        makeOneTabTrue(state.tabs.specificWalletTab);
    }
    const showLatestBlock                       = () => {
        requestLatestBlockInfoArea();
        makeOneTabTrue(state.tabs.latestBlockTab);
    }
    const showSpecificBlock                     = () => {
        makeOneTabTrue(state.tabs.specificBlockTab);
    }

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

    



    const increasePointer                       = (pointer) => {
        pointer.width("2em").height("2em")
    }

    const decreasePointer                       = (pointer) => {
        pointer.width("1em").height("1em")
    }

    tool0.on('click', showHomeTab);
    tool1.on('click', showAllCurrenciesTab);
    tool2.on('click', showInfoAboutWallet);
    tool3.on('click', showLatestBlock);
    tool4.on('click', showSpecificBlock);//showCirculation);
    tool5.on('click', showNetStats);//showWeighted24HPrice);
    // tool6.on('click', showSpecificBlock);
    // tool7.on('click', showMarketcap);
    // tool8.on('click', showRemainingTab);
    // tool9.on('click', showProbabilityTab);
    // tool10.on('click', showDifficulty);
    // tool11.on('click', showBlockReward);
    // tool12.on('click', showMinedBlockAmount);
    
    
    
    //Adding the click event listener to calcInEuroButton
    calcInEuroButton.submit(calcPriceInEuro);

    //Adding the click event listener to calcInDolarButton
    calcInDolarButton.submit(calcPriceInDolar);

    //Adding the click event listener to requestWalletInfoButton
    requestWalletInfoButton.on('click', requestAddressInfo);

    requestSpecificBlockButton.submit(requestSpecificBlock);


    
    
    

    showHomeTab();

});

