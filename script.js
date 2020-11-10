$(document).ready(function() {

    // search functionality for imput and button 
    $("#search-button").on("click", function() {
            var searchTerm = $("#search-value").val()


            console.log(searchTerm);
            veatherSearch(searchTerm);
            forecast(searchTerm);
        })
        // need local storage for search history 

    // first ajax call for todays weather 
    function veatherSearch(searchTerm) {
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=1cf95ad11d72a2e012ce0c21a97cfeab&units=imperial"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            response.name
            $("#today").empty()
            console.log(response)
            var title = $("<h3>").addClass("card-title").text(response.name + " (" + new Date().toLocaleDateString() + ")");
            var card = $("<div>").addClass("card");
            var wind = $("<p>").addClass("card-text").text("Wind Speed: " + response.wind.speed + " MPH");
            var humid = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%");
            var temp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp + " °F");
            var uv = $("<p>").addClass("card-text").text("uv index: " + response.main.uv + "");
            var cardBody = $("<div>").addClass("card-body");
            var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
            title.append(img);
            cardBody.append(title, temp, humid, wind, uv);
            card.append(cardBody);
            $("#today").append(card);
        });
    }

    function forecast(searchTerm) {
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid=1cf95ad11d72a2e012ce0c21a97cfeab&units=imperial"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            response.name
            console.log(response)
            $("#forecast").html(("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">"));
            for (var i = 0; i < response.list.length; i++) {
                if (response.list[i].dt_txt.indexOf("9:00:00") !== -1) {
                    $("#forecast").append(card);


                }
            }

        });

    }
    // third ajax call for UV










})