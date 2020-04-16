


class BlockchainController{

    static instance = null;

    constructor(){
        this.difficultyLink = 'https://blockchain.info/q/getdifficulty?cors=true';
    }

    static getInstance(){
        if (BlockchainController.instance == null){
            BlockchainController.instance = new BlockchainController();
        }
        return BlockchainController.instance;
    }


    getDifficulty(callback){
        get(this.difficultyLink, callback);
    }





}


