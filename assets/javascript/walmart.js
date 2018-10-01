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
      .appendTo(productBody);
//print product link 
    var productLink = $("<a>");
    productLink
      .addClass("btn btn-block btn-outline-dark")
      .text("???")
      .attr({href:productsArray.items[i].productUrl, target: "_blank"})
      .appendTo(productBody);
// product image 

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