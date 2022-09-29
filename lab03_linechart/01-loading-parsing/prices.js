// helper function to parse date information
let parseDate = d3.timeParse("%m/%d/%Y");

// let's load our data
d3.csv('data/prices.csv').then(function(data){
    
    // TASKS 1
    // task: console log the first row
    // task: console log the first value of the first row
    // task: console log the second value of the first row
    // question: what data types are each of the values

    //format our data (make data a date, make price a number) 
    data.forEach(function(n){
        n.month = parseDate(n.month); // what does this do?
        n.price = Number(n.price.trim().slice(1)); // what does this do?
    })
    
    // TASKS 2
    // task: console log the first value of the first row
    // task: console log the second value of the first row
    // question: what data types are each of the values

    // select the html body and add a div with one price
    d3.select("body")                
    .append('div')
    .html("The first price is: " + data[0].price);    

    // TASKS 3
    //write out the entire data set in html 

}); 