

//Helper methods to be stored right here. 

class Utils {


    static turnArrayOfObjectsIntoAnHTMLDivTable = (arrayOfObjects) => {
        const table = $('<table class="table"></table>');
        const body = $('<tbody></tbody>');
        table.append(body);
        arrayOfObjects.forEach((obj, index) => {
            const keys = Object.keys(obj);
            
             if(!body.is(':parent')){
                    table.append(`<thead>${
                     keys.map(key=>`<th>${key}</th>`)
                         .reduce((acc,item)=>acc+item,"")
                 }</thead>`);
             }


            const row = $(`<tr id="${keys[0]}${index}"></tr>`);
            body.append(row);
            keys.forEach((key,index_)=>{
                row.append(`<td id="${key}${index}x${index_}">${obj[key]}</td>`);
            });
            
        });
        return table;        
    }


    static turnArrayOfStringsIntoHTMLList       = (arrayOfStrings) => {
        const ul = $(`<ul class="list-group"></ul>`);

        arrayOfStrings.forEach(string=>ul.append(`<li class="list-group-item" height="10px" id="${string}"><h6 id="display-5" class="hashrateValue">${string}</h6></li>`));

        return ul;
    }

}