  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBDZazEgwwzBBqhyPQsvfoKXDjzsSSbZSw",
    authDomain: "budgetary-app.firebaseapp.com",
    databaseURL: "https://budgetary-app.firebaseio.com",
    projectId: "budgetary-app",
    storageBucket: "budgetary-app.appspot.com",
    messagingSenderId: "165118016154"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  
  $(document).ready(function () {
    // prints product array
    function printProducts(productsArray) {
      // emptys out div
      $("#product-results").empty();
      // if nothing comes up in search
      if (productsArray.length === 0) {
        return false;
      }
      // iterates through array
      for (var i = 0; i < productsArray.items.length; i++) {
        // everything we print will fit in here
        var productDiv = $("<div>").addClass("card mb-5")
        // print product name
        var productName = $("<div>");
        productName
          .addClass("card-header bg-info text-light")
          .text(productsArray.items[i].name) //product name 
          .appendTo(productDiv);
        // product info will have it's on div below name
        var productBody = $("<div>")
          .addClass("card-body")
          .appendTo(productDiv);
        // print product price
        var productPrice = $("<p>");
        productPrice
          .addClass("card-text")
          .html(productsArray.items[i].salePrice) //product price
          .appendTo(productBody)
        // print product image
        var image = $("<img>")
          .addClass("preview-image")
        var imageSource = productsArray.items[i].imageEntities[0].mediumImage
        image.attr({
            src: imageSource
          })
          .html(image)
          .appendTo(productBody)
        //print product link 
        var productLink = $("<a>");
        productLink
          .addClass("btn btn-block btn-outline-dark")
          .text("View on Walmart.com")
          .attr({
            href: productsArray.items[i].productUrl,
            target: "_blank"
          })
          .appendTo(productBody);
        //print preview

        //button to add to table
        var addButton = $("<button>");
        addButton
          .addClass("btn btn-block btn-outline-dark")
          .addClass("table-button")
          .text("Add to Table")
          .appendTo(productBody)
          .attr("data-name", productsArray.items[i].name)
          .attr("data-price", productsArray.items[i].salePrice)

       
        // puts everything in product div
        $("#product-results").append(productDiv);
      
      }
    }
    // ajax jquery pull
    $("#search-form").on("submit", function (event) {

      event.preventDefault();

      var searchTerm = $("#search-term").val();

      if (!searchTerm) {
        return false;
      }

      $("#search-term").val("");

      var queryURL = "https://api.walmartlabs.com/v1/search?apiKey=4vqcppc7kjbk8zsktvkry97c&query=" + searchTerm;
      $.ajax({
        url: queryURL,
        method: "GET",
        data: {
          format: "json"
        },
        dataType: 'jsonp',
        error: function (error) {
          console.log(error);
        }
      }).then(function (productData) {
        console.log(productData);

        printProducts(productData);
      }).catch(function (err) {
        console.log(err);
      })


    });
  });
 // click function
 $(document).on("click",".table-button",function (event) {
  event.preventDefault();
  $("#product-results").empty();
  
  var product = $(this).attr("data-name");
  var price = $(this).attr("data-price");
  var date = today;
  var type = "expense";
  
  var purchase = {
    product: product,
    price: price,
    date: date,
    type: type
  };

  database.ref("shoppingList").push(purchase);      
});

  database.ref("shoppingList").on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var product = childSnapshot.val().product;
    var price = childSnapshot.val().price;
    var date = childSnapshot.val().date;

    // Employee Info
    console.log(product);
    console.log(price);
    console.log(date);

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(product),
      $("<td>").text(price),
      $("<td>").text(date),
    );

    // Append the new row to the table
    $("#walmart-table").append(newRow);
  });



 
  // button to add new item to budget
  $("#submit").on("click", function (event) {
    event.preventDefault();
  
    if(!$("input:radio[name=type]").is(":checked")){
      return false;
    } else {
      var newType = $("input:radio[name=type]:checked").val(); 
    };
      
    
    // Grabs user input
    var newName = $("#name").val().trim();
    var newAmount = $("#amount").val().trim();
    var newDate = $("#date").val().trim();
    // Creates local "temporary" object for holding budget item
    var newBudget = {

      name: newName,
      amount: newAmount,
      date: newDate,
      type: newType
    };

    // Uploads data to the databas
    
    database.ref("budget").push(newBudget);

    // Logs everything to console
    console.log(newBudget.name);
    console.log(newBudget.amount);
    console.log(newBudget.date);

    alert("Expense successfully added");

    // Clears all of the text-boxes
    $("#name").val("");
    $("#amount").val("");
    $("#date").val("");

  });

  // Create Firebase event for adding expense to the database and a row in the html when a user adds an entry
  database.ref("budget").on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var newName = childSnapshot.val().name;
    var newAmount = childSnapshot.val().amount;
    var newDate = childSnapshot.val().date;

    // Make sure we are getting the info
    console.log(newName);
    console.log(newAmount);
    console.log(newDate);

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(newName),
      $("<td>").text(newAmount),
      $("<td>").text(newDate),
    );

    // Append the new row to the table
    $("#data-table").append(newRow);
  });

// create today's date n mm/dd/yyyy
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = mm + '/' + dd + '/' + yyyy;

// CHART ***************************************************
var myChart = new Chart(document.getElementById("budgetByMonth"), {
  type: 'bar',
  data:{
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decembner"],

    datasets: [{label: "Total Income",
    fillColor: "rgba(67, 214, 92, 0.5)", 
    strokeColor: "rgba(67, 214, 92, 1)",
    pointColor: "rgba(67, 214, 92,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(67, 214, 92,1)",
    data: []
},
{
    label: "Total Expense",
    fillColor: "rgba(218, 233, 39, 0.5)", 
    strokeColor: "rgba(218, 233, 39, 1)",
    pointColor: "rgba(218, 233, 39,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(218, 233, 39,1)",
    data: []
    }]
  },
});

database.ref("budget").on("value", function(snapshot){
console.log(snapshot.val());
var income = [];
var expense = [];
var data = snapshot.val();

// one way to iterate through objects/
// console.log(typeof data);

// for (record in data) {
//   console.log(record)
//   console.log(typeof record)
// } 

// another way to iterate through objects

Object.entries(data).forEach(function(record){
  // console.log(record[1])
  // console.log(typeof record)

  // step one: while iterating through object push respective types of income/expense into arrays
  if (record[1].type === "income") {
    income.push(record[1]);
  } else if (record[1].type === "expense"){
    expense.push(record[1]);
  };
  // step two: iterate through income and expense arrays in order to separate them into respective months and total them in correct index to match labels of graph
  
});

console.log(income);
console.log(expense);
});

