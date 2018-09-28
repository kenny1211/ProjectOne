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

  $(document).ready(function(){
    // prints product array
    function printProducts(productsArray) {
    // emptys out div
      $("#product-results").empty();
    // if nothing comes up in search
      if (productsArray.length === 0){
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
     //print product link 
        var productLink = $("<a>");
        productLink
          .addClass("btn btn-block btn-outline-dark")
          .text("???")
          .attr({href:productsArray.items[i].productUrl, target: "_blank"})
          .appendTo(productBody);
    // puts everything in product div
        $("#product-results").append(productDiv);
    
      }
    }
    // ajax jquery pull
    $("#search-form").on("submit", function(event){
    
        event.preventDefault();
    
        var searchTerm = $("#search-term").val();
        console.log(searchTerm);
    
        if(!searchTerm){
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
          error: function(error) {
            console.log(error);
          }
        }).then(function(productData){
          console.log(productData);
    
          printProducts(productData);
        }).catch(function(err) {
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