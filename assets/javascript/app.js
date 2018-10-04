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
        productDiv
          .addClass("product")

        // print product name
        var productName = $("<div>");
        productName
          .addClass("card-header bg-dark text-light")
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
          .html("$" + productsArray.items[i].salePrice) //product price
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
      $("#search-form").hide();
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
          //console.log(error);
        }
      }).then(function (productData) {
        //console.log(productData);

        printProducts(productData);
      }).catch(function (err) {
        //console.log(err);
      })


    });

  // click function
  $(document).on("click", ".table-button", function (event) {
    event.preventDefault();
    $("#product-results").empty();
   
    $("#search-form").show();

    var product = $(this).attr("data-name");
    var price = $(this).attr("data-price");
    var date = today;
    var type = "expense";

    var purchase = {
      name: product,
      amount: price,
      date: date,
      type: type
    };

    database.ref("budget").push(purchase);
  });

  database.ref("shoppingList").on("child_added", function (childSnapshot) {
    //console.log(childSnapshot.val());

    // Store everything into a variable.
    var product = childSnapshot.val().name;
    var price = childSnapshot.val().amount;
    var date = childSnapshot.val().date;

    // Employee Info
    //console.log(product);
    //console.log(price);
    //console.log(date);

    // Create the new row
 

    

    // Append the new row to the table
    
  });




  // button to add new item to budget
  $("#submit").on("click", function (event) {
    event.preventDefault();

    if (!$("input:radio[name=type]").is(":checked")) {
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
    //console.log(newBudget.name);
    //console.log(newBudget.amount);
    //console.log(newBudget.date);
    // Clears all of the text-boxes
    $("#name").val("");
    $("#amount").val("");
    $("#date").val("");


  });

  // Create Firebase event for adding expense to the database and a row in the html when a user adds an entry
  database.ref("budget").on("child_added", function (childSnapshot) {
    //console.log(childSnapshot.val());

    // Store everything into a variable.
    var newName = childSnapshot.val().name;
    var newAmount = childSnapshot.val().amount;
    var newDate = childSnapshot.val().date;

    // Make sure we are getting the info
    //console.log(newName);
    //console.log(newAmount);
    //console.log(newDate);

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
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  today = mm + '/' + dd + '/' + yyyy;

  

  // var tempdata = 0;
  var exp1 = 0;
  var exp2 = 0;
  var exp3 = 0;
  var exp4 = 0;
  var exp5 = 0;
  var exp6 = 0;
  var exp7 = 0;
  var exp8 = 0;
  var exp9 = 0;
  var exp10 = 0;
  var exp11 = 0;
  var exp12 = 0;
  var inc1 = 0;
  var inc2 = 0;
  var inc3 = 0;
  var inc4 = 0;
  var inc5 = 0;
  var inc6 = 0;
  var inc7 = 0;
  var inc8 = 0;
  var inc9 = 0;
  var inc10 = 0;
  var inc11 = 0;
  var inc12 = 0;
  var income = [];
  var expense = [];

  database.ref("budget").once("value", function (snapshot) {
    console.log(snapshot.val());

    var records = snapshot.val();

    // console.log(exp, inc);
    Object.values(records).forEach(function (record) {
      // console.log(record);
      var date = record.date;
      var type = record.type;
      var amount = record.amount;
      // console.log("date, type. amount: ", date, type, amount);

      var check = moment(date, "MM/DD/YYYY");
      var m = check.format("M");

      if (m == 1) {
        //console.log(item.type)
        if (type == "expense") {
          exp1 += parseInt(amount);
        } else if (type = "income") {
          inc1 += parseInt(amount)
        }
      }
      else if (m == 2) {
        //console.log(item.type)
        if (type == "expense") {
          exp2 += parseInt(amount)

        } else if (type = "income") {
          inc2 += parseInt(amount)

        }
      }
      else if (m == 3) {
        //console.log(item.type)
        if (type == "expense") {
          exp3 += parseInt(amount)

        } else if (type = "income") {
          inc3 += parseInt(amount)

        }
      }
      else if (m == 4) {
        //console.log(item.type)
        if (type == "expense") {
          exp4 += parseInt(amount)

        } else if (type = "income") {
          inc4 += parseInt(amount)

        }
      }
      else if (m == 5) {
        //console.log(item.type)
        if (type == "expense") {
          exp5 += parseInt(amount)

        } else if (type = "income") {
          inc5 += parseInt(amount)

        }
      }
      else if (m == 6) {
        //console.log(item.type)
        if (type == "expense") {
          exp6 += parseInt(amount)

        } else if (type = "income") {
          inc6 += parseInt(amount)

        }
      }
      else if (m == 7) {
        //console.log(item.type)
        if (type == "expense") {
          exp7 += parseInt(amount)

        } else if (type = "income") {
          inc7 += parseInt(amount)

        }
      }
      else if (m == 8) {
        //console.log(item.type)
        if (type == "expense") {
          exp8 += parseInt(amount)

        } else if (type = "income") {
          inc8 += parseInt(amount)

        }
      }
      else if (m == 9) {
        //console.log(item.type)
        if (type == "expense") {
          exp9 += parseInt(amount)

        } else if (type = "income") {
          inc9 += parseInt(amount)

        }
      }
      else if (m == 10) {
        //console.log(item.type)
        if (type == "expense") {
          exp10 += parseInt(amount)

        } else if (type = "income") {
          inc10 += parseInt(amount)

        }
      }
      else if (m == 11) {
        //console.log(item.type)
        if (type == "expense") {
          exp11 += parseInt(amount)

        } else if (type = "income") {
          inc11 += parseInt(amount)

        }
      }
      else if (m == 12) {
        //console.log(item.type)
        if (type == "expense") {
          exp12 += parseInt(amount)

        } else if (type = "income") {
          inc12 += parseInt(amount)

        }
      }
    })

    income.push(inc1, inc2, inc3, inc4, inc5, inc6, inc7, inc8, inc9, inc10, inc11, inc12);
    expense.push(exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8, exp9, exp10, exp11, exp12);
    console.log(inc1);
    console.log(exp1);
   
    //   var income = [];
    //   var expense = [];
    // data.push(snapshot.val());
    // datasets();
  });
  console.log(expense, income);
  // CHART ***************************************************
  var myChart = new Chart(document.getElementById("budgetByMonth"), {
    type: 'bar',
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

      datasets: [{
          label: "Total Income",
          fillColor: "rgba(67, 214, 92, 0.5)",
          strokeColor: "rgba(67, 214, 92, 1)",
          pointColor: "rgba(67, 214, 92,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(67, 214, 92,1)",
          data: income
        },
        {
          label: "Total Expense",
          fillColor: "rgba(218, 233, 39, 0.5)",
          strokeColor: "rgba(218, 233, 39, 1)",
          pointColor: "rgba(218, 233, 39,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(218, 233, 39,1)",
          data: expense
        }
      ]
    },
  });
 

  // function datasets() {
  //     data.forEach(function(item){
  //       //   console.log(item)
  //          var check = moment(item.date, "MM/DD/YYYY");
  //             var m = check.format("M");
  //          // console.log(m)
  //           if(m == 5){
  //               //console.log(item.type)
  //               if(item.type=="expense"){
  //                   exp+=parseInt(item.Amount)
  //               }else if(item.type="income"){
  //                   inc+=parseInt(item.Amount)
  //               }

  //           }

  //         })
  //         console.log("EXP "+exp)
  //         console.log("INC "+inc)
  //  // };


  //   // console.log(data)
  //   // //console.log(data.date);

  //   //console.log(data.length);
  //   for (var i = 0; i < data.length; i++) {
  //     console.log(i)
  // var check = moment(data[i].date, "MM/DD/YYYY");
  // var month = check.format("M");
  // // console.log(month);


  // if (month == 5) {
  //   // console.log(month);
  //   if (data[i].type == "expense") {
  //     // console.log(tempdata)
  //     // console.log(data[i].type)
  //     //console.log(data[i].amount);
  //     tempdata += Number(data[i].amount);
  //     // var temporary = data[i].amount)
  //   }

  //     } 
  //     console.log(tempdata);
  //   }
  // });



  // one way to iterate through objects/
  // //console.log(typeof data);

  // for (record in data) {
  //   //console.log(record)
  //   //console.log(typeof record)
  // } 

  // another way to iterate through objects

  // Object.entries(data).forEach(function(record){
  //   // //console.log(record[1])
  //   // //console.log(typeof record)
  //   var entry = record[1];
  //   var check = moment(data[i].date, "MM/DD/YYYY");
  //   var month = check.format("M");
  //   // console.log(month);


  //   if (month == 5) {
  //     // console.log(month);
  //     if (entry.type == "expense") {
  //       // console.log(tempdata)
  //       // console.log(data[i].type)
  //       //console.log(data[i].amount);
  //       tempdata += Number(data[i].amount);
  //       console.log(tempdata);
  //       // var temporary = data[i].amount)
  //     }
  //   }
  // step one: while iterating through object push respective types of income/expense into arrays
  // if (entry.type === "income") {

  //   income.push(entry);
  // } else if (entry.type === "expense"){

  //   expense.push(entry);
  // };




  //   // step two: iterate through income and expense arrays in order to separate them into respective months and total them in correct index to match labels of graph

  // });

  // //console.log(income);
  // //console.log(expense);


  // AJAX REQUEST FOR STOCKS///////////////////////////////////
  var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=SPX&interval=1min&apikey=TESSEDWF9MRZHWLA";

  $("#stockIndicator").show();
  doAjax(url);

  $('.ajaxtrigger').click(function () {
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
      success: function (data) {
        //console.log(data)

        var symbol = data['Meta Data']['2. Symbol']
        var lastRefreshed = data['Meta Data']['3. Last Refreshed']
        var lastTradePriceOnly = data['Time Series (1min)'][lastRefreshed]['4. close']

        $('#stockSymbol').html("The S&P 500 is currently at " + lastTradePriceOnly);
        $("#stockIndicator").hide();

      }
    });
  }


  doAjax()

  var json = new XMLHttpRequest(); // start a new variable to store the JSON in
  json.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) { // if HTTP header 200 - ok
      var object = JSON.parse(this.responseText); // set the variable 'object' to whatever we get back, in our case it is an array of 10 different arrays

      object.forEach(function (currency) { // for each of those arrays, split it into chunks called 'currency'
        $("#coincap").html(currency.name +
          " is currently worth $" +
          currency.price_usd)
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
  // END OF AJAX FOR STOCKS ///////////////////////////////////////////////
});