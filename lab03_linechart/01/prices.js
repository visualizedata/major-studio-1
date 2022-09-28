// helper function to parse date information
let parseDate = d3.timeParse("%m/%d/%Y");

// let's load our data
d3.csv('data/prices.csv').then(function(data){
    console.log(data[0]);

    //format our data (make data a date, make price a number) 
    data.forEach(function(n){
        n.month = parseDate(n.month); // what does this do?
        n.price = Number(n.price.trim().slice(1)); // what does this do?
    })
    console.log(data[0]);
}); 