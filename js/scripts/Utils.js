

//Helper methods to be stored right here. 

class Utils {


    static turnArrayOfObjectsIntoAnHTMLDivTable = (arrayOfObjects) => {
        const table = $('<div class="table"></div>');
        arrayOfObjects.forEach((obj, index) => {
            const keys = Object.keys(obj);
            const row = $(`<div class="table-row" id="${keys[0]}${index}"></div>`);
            
            keys.forEach((key,index_)=>{
                row.append(`<div class="table-cell" id="${key}${index}x${index_}">${obj[key]}</div>`);
            });
            table.append(row);
        });
        return table;
    }

}