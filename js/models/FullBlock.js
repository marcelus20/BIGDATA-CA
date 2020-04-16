


//Blueprint of a full block object
class FullBlock extends Block{
    constructor(hash, time, blockIndex, height, blockSize, nonce, prevBlockHash, transactions = []){
        super(hash, time, blockIndex, height);
        this.blockSize = blockSize;
        this.nonce = nonce;
        this.prevBlockHash = prevBlockHash;
    }
}