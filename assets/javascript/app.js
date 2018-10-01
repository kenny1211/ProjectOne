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
            $("<td>").html(productsArray.items[i].salePrice),
            $("<td>").html(productsArray.items[i].name),
            $("<td>").html("null"),
          );
          }
          // Append the new row to the table
          $("#data-table").append(newRow);
              
        });

        // puts everything in product div
        $("#product-results").append(productDiv);
      
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

  /* google.charts.load("current", {packages:["corechart"]});
   google.charts.setOnLoadCallback(drawChart);
   function drawChart() {
     var data = google.visualization.arrayToDataTable([
       ['Task', 'Hours per Day'],
       ['Work',     11],
       ['Eat',      2],
       ['Commute',  2],
       ['Watch TV', 2],
       ['Sleep',    7]
     ]);

     var options = {
       title: 'My Budget',
       is3D: true,
     };

     var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
     chart.draw(data, options);
   }*/

  /*function initialize() {
          var opts = {sendMethod: 'auto'};
          // Replace the data source URL on next line with your data source URL.
          var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/15Kbfior06IfOAUhNcoyMfb7kzdVU8dSMuBZlSYaDRIs/edit?usp=sharing', opts);
  
          // Optional request to return only column C and the sum of column B, grouped by C members.
          query.setQuery('select A');
  
          // Send the query with a callback function.
          query.send(handleQueryResponse);
        }
  
        function handleQueryResponse(response) {
          // Called when the query response is returned.
  
        }

        function handleQueryResponse(response) {

          if (response.isError()) {
            alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
            return;
          }
  
          var data = response.getDataTable();
          var chart = new google.visualization.PieChart(document.getElementById('chart-div'));
          chart.draw(data, {width: 400, height: 240, is3D: true});
        }*/
  // Initialize Firebase



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



 /* google.charts.load("current", {
    packages: ["corechart"]
  });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 2],
      ['Commute', 2],
      ['Watch TV', 2],
      ['Sleep', 7]
    ]);

    var options = {
      title: 'My Daily Activities',
      is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(data, options);
  }


  var ctx = document.getElementById("myChart");
  var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
      spanGaps: false,
    }]
  };
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data
  });*/