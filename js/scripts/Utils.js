

//Helper methods to be stored right here. 

class Utils {


    static turnArrayOfObjectsIntoAnHTMLDivTable = (arrayOfObjects) => {
        const table = $('<div class="divTable"></div>');
        const body = $('<div class="divTableBody"></div>');
        table.append(body);
        arrayOfObjects.forEach((obj, index) => {
            const keys = Object.keys(obj);
            
             if(!body.is(':parent')){
                    table.append(`<div class="divTableHeading">${
                     keys.map(key=>`<div class="divTableHead">${key}</div>`)
                         .reduce((acc,item)=>acc+item,"")
                 }</tr>`);
             }


            const row = $(`<div class="divTableRow" id="${keys[0]}${index}"></div>`);
            body.append(row);
            keys.forEach((key,index_)=>{
                row.append(`<div class="divTableCell" id="${key}${index}x${index_}">${obj[key]}</div>`);
            });
            
        });
        return table;        
    }


    static turnArrayOfStringsIntoHTMLList       = (arrayOfStrings) => {
        const ul = $(`<ul class="list-group"></ul>`);

        arrayOfStrings.forEach(string=>ul.append(`<li class="list-group-item" height="10px" id="${string}"><h2 class="hashrateValue">${string}</h3></li>`));

        return ul;
    }

}