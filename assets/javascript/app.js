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
          .addClass("card-header bg-success text-light")
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
          .appendTo(productBody);
        //click function
        $(".table-button").on("click", function (event) {
          event.preventDefault();
//added for loop not it prints entire array
          for (var i = 0; i < productsArray.items.length; i++) {

          var price = productsArray.items[i].salePrice
          var product = productsArray.items[i].name

          console.log(product)
        
          var newRow = $("<tr>").append(
            $("<td>").html(productsArray.items[i].name),
            $("<td>").html(productsArray.items[i].salePrice),
            $("<td>").html("null"),
          );
          }
          // Append the new row to the table
          $("#data-table").append(newRow);
              
        });

        // puts everything in product div 
        $("#product-results").append(productDiv);
        //here
        $("#product-results").css({"height": "400px"});
      
      }
    }
    // ajax jquery pull
    $("#search-form").on("submit", function (event) {

      event.preventDefault();

      var searchTerm = $("#search-term").val();
      console.log(searchTerm);

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

  var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=SPX&interval=1min&apikey=TESSEDWF9MRZHWLA";

  $("#stockIndicator").show();
  doAjax(url);

  $('.ajaxtrigger').click(function() {
    $("#stockIndicator").show();
    doAjax(url);
    return false;
  });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
  }

  function doAjax(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      contentType: "application/json",
      success: function(data) {
        console.log(data)
        
        var symbol = data['Meta Data']['2. Symbol']
        var lastRefreshed = data['Meta Data']['3. Last Refreshed']
        var lastTradePriceOnly = data['Time Series (1min)'][lastRefreshed]['4. close']
        
        $('#stockSymbol').html(symbol + " is currently worth $" + lastTradePriceOnly + " USD<br>");
        $("#stockIndicator").hide();
        
      }
    });
  }

 
  doAjax()

  var json = new XMLHttpRequest(); // start a new variable to store the JSON in
  json.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { // if HTTP header 200 - ok
      var object = JSON.parse(this.responseText); // set the variable 'object' to whatever we get back, in our case it is an array of 10 different arrays
  
      object.forEach(function(currency) { // for each of those arrays, split it into chunks called 'currency'
        $("#coincap").html(currency.name +
          " is currently worth $" +
          currency.price_usd +
          " USD<br>")
         // get the array keys from the API
      });
    }
  };
  json.open(
    "GET", // method
    "https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=1", // url
    true // async
  ); // initialise the request
  json.send(); //send request
  
 //HERE

  var database = firebase.database();

  // 2. Button for adding Employees
  $("#submit").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var newName = $("#name").val().trim();
    var newAmount = $("#amount").val().trim();
    var newDate = $("#date").val().trim();
    // Creates local "temporary" object for holding employee data
    var newBudget = {

      name: newName,
      amount: newAmount,
      date: newDate,
    };

    // Uploads employee data to the database
    database.ref().push(newBudget);

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

  // 3. Create Firebase event for adding expense to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var newName = childSnapshot.val().name;
    var newAmount = childSnapshot.val().amount;
    var newDate = childSnapshot.val().date;

    // Employee Info
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


