

class Requests{
    constructor(){
        this.get = (url, callbck) => {
            $.ajax({
                url: url,
                success : callbck
            });
        }
    }
}