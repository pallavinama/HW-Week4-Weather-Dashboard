$(document).ready(function() {

    
    var currentCity;
    var searchBtn = $("#searchBtn");

    function getCurrent(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+",USA"+"&APPID=b3aed4fd9f6da379f1b4e453f38c089f";
        $.ajax({
            url: queryURL,
            method: "GET",
            error: function (){
                console.log("Testing Error");
            }
        }).then(function (response) {
            //create the card
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
            //display city name
            cardBody.append($("<h3>").attr("class", "card-title").text(response.name));
            //display last updated
            //var currdate = moment(response.dt, "X").format("dddd, MMMM Do YYYY, h:mm a");
            //cardBody.append($("<p>").attr("class", "card-text").append($("<small>").attr("class", "text-muted").text("Last updated: " + currdate)));
            //display Temperature
            cardBody.append($("<p>").attr("class", "card-text").html("Temperature: " + response.main.temp + " &#8457;"));
            //display Humidity
            cardBody.append($("<p>").attr("class", "card-text").text("Humidity: " + response.main.humidity + "%"));
            //display Wind Speed
            cardBody.append($("<p>").attr("class", "card-text").text("Wind Speed: " + response.wind.speed + " MPH"));
    
            
            cardRow.append(textDiv);
           
        });
    }    

    // Code for Onclick Operation on SearchBtn

    searchBtn.on("click", function() {
        var city = $("#searchInput").val().trim();
        if (city != ""){
            getCurrent(city);
           
          }
      });  
  });
    
    
  
  

   
