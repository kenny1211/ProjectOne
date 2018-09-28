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

    google.charts.load("current", {
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
    datasets: [
        {
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
        }
    ]
};
var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data
});