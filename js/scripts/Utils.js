

//Helper methods to be stored right here. 

class Utils {


    static turnArrayOfObjectsIntoAnHTMLDivTable = (arrayOfObjects) => {
        const table = $('<div class="table"></div>');
        arrayOfObjects.forEach((obj, index) => {
            const keys = Object.keys(obj);

            if(!table.is(':parent')){
                table.append(`<div class="div-th-row">${
                    keys.map(key=>`<div class="div-th-cell">${key}</div>`)
                        .reduce((acc,item)=>acc+item,"")
                }</div>`);
            }


            const row = $(`<div class="table-row" id="${keys[0]}${index}"></div>`);
            keys.forEach((key,index_)=>{
                row.append(`<div class="table-cell" id="${key}${index}x${index_}">${obj[key]}</div>`);
            });
            table.append(row);
        });
        return table;
    }

}