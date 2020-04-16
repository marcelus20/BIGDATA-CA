

//Blueprint to represent the Block object
class Block {
    constructor(hash, time, block_index, height){
        this.hash = hash;
        this.time = time;
        this.blockIndex = block_index;
        this.height = height;
    }
}