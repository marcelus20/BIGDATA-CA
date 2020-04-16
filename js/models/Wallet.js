

//Wallet blueprint
class Wallet{
    constructor(hash160, address, nTx, totalReceived, totalSent, finalBalance, txs){
        this.hash160       = hash160;
        this.address       = address;
        this.nTx           = nTx;
        this.totalReceived = totalReceived
        this.totalSent     = totalSent;
        this.finalBalance  = finalBalance;
        this.txs           = txs;
    }
}