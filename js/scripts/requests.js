//get request and callback 
const get = (url, callbck) => {
    $.ajax({
        url: url,
        success : callbck
    });
}

const post = (url, body,callback) => {
    $.ajax({
        type: "POST",
        url: url,
        data: body,
        success: callback,
      });
    /*
    const options = {
        "method"  : "post",
        "headers" : {
            "Content-Type" : "application/json"
        },
        "body": body
    }
    fetch(url, options)
        .then(res=>res.json())
        .then(callback(res));
        */
}

const put = () => {
    const options = {
        "method"  : "put",
        "headers" : {
            "Content-Type" : "application/json"
        },
        "body": body
    }
    fetch(url, options)
        .then(res=>res.json())
        .then(callback(res));
}