$(document).ready(function() {
    // var currentCity;
    var searchBtn = $("#searchBtn");

    function getCurrent(city) {
        var apiURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+",USA"+"&units=imperial&APPID=b3aed4fd9f6da379f1b4e453f38c089f";
        $.ajax({
            url: apiURL,
            method: "GET",
            // error: function (){
            //     console.log("Testing Error");
            // }
        }).then(function (response) {
            //Creating the card for Current City Statistics
            var currCard = $("<div>").attr("class", "card bg-light");
            $("#locationWeather").append(currCard);
    
            //add location to card header
            var currCardHead = $("<div>").attr("class", "card-header").text("Current weather for " + response.name);
            currCard.append(currCardHead);
    
            var cardRow = $("<div>").attr("class", "row no-gutters");
            currCard.append(cardRow);
            var textDiv = $("<div>").attr("class", "col-md-8");
            var cardBody = $("<div>").attr("class", "card-body");
            textDiv.append(cardBody);
            //Displaying city name
            cardBody.append($("<h3>").attr("class", "card-title").text(response.name));
            //Displaying current date
            var currentDate = moment().format('MMMM Do, YYYY');
            cardBody.append($("<p>").attr("class", "card-text").html("Current Date: " + currentDate));
            // Temperature Display
            cardBody.append($("<p>").attr("class", "card-text").html("Temperature: " + response.main.temp + " &#8457;"));
            //Humidity Display
            cardBody.append($("<p>").attr("class", "card-text").text("Humidity: " + response.main.humidity + "%"));
            //Wind Speed Display
            cardBody.append($("<p>").attr("class", "card-text").text("Wind Speed: " + response.wind.speed + " MPH"));
            cardRow.append(textDiv);
           
        });
    }   
    
    // Function to get 5 Day Weather Forecast

    function get5Day(city) {
        console.log("inside get5Day");
        
        var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q="+city+",USA"+"&units=imperial&APPID=b3aed4fd9f6da379f1b4e453f38c089f";
        $.ajax({
            url: apiURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            //add container div for forecast cards
            var newrow = $("<div>").attr("class", "row");
            $("#locationWeather").append(newrow);
            //newrow.append($("<p>").html("5 Day Forecast"));
    
            //loop through array response to find the forecasts for 9:00
            for (var i = 0; i < response.list.length; i++) {
                if (response.list[i].dt_txt.indexOf("9:00:00") !== -1) {
                    var newCol = $("<div>").attr("class", "col-sm");
                    newrow.append(newCol);

                    newCol.append($("<p>").html("Date: "+moment(response.list[i].dt, "X").format("MMM Do")));
                    newCol.append($("<p>").html("Temp: "+response.list[i].main.temp+" &#8457"));
                    newCol.append($("<p>").html("Humidity: "+response.list[i].main.humidity+"%"));
                }
            }
        });
    }
        
    searchBtn.on("click", function() {
        var city = $("#searchInput").val().trim();
        if (city != ""){
            $("#locationWeather").empty();
            getCurrent(city);
            get5Day(city);
          }
      });  
  });
    
    
  
  

   
