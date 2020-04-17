

//Helper methods to be stored right here. 

class Utils {


    static turnArrayOfObjectsIntoAnHTMLDivTable = (arrayOfObjects) => {
        const table = $('<div class="container-fluid"></div>');
        arrayOfObjects.forEach((obj, index) => {
            const keys = Object.keys(obj);
            
             if(!table.is(':parent')){
                 table.append(`<div class="table-header row">${
                     keys.map(key=>`<div class="table-cell col">${key}</div>`)
                         .reduce((acc,item)=>acc+item,"")
                 }</div>`);
             }


            const row = $(`<div class="table-row row" id="${keys[0]}${index}"></div>`);
            table.append(row);
            keys.forEach((key,index_)=>{
                row.append(`<div class="table-cell col" id="${key}${index}x${index_}">${obj[key]}</div>`);
            });
            
        });
        return table;        
    }


    static turnArrayOfStringsIntoHTMLList       = (arrayOfStrings) => {
        const ul = $(`<ul class="list-group"></ul>`);

        arrayOfStrings.forEach(string=>ul.append(`<li class="list-group-item" id="${string}"><h4>${string}</h4></li>`));

        return ul;
    }

}