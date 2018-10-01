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

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "My First dataset",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45],
            }]
        },
    
        // Configuration options go here
        options: {}
    });
    