$(document).ready(function() {

    // search functionality for imput and button 
    $("#search-button").on("click", function() {
            var searchTerm = $("#search-value").val()

            console.log(searchTerm);
            veatherSearch(searchTerm);
            forecast(searchTerm);

        })
        // need local storage for search history 

    $(".history").on("click", "li", function() {
        veatherSearch($(this).text());
    });

    function addRow(text) {
        var li = $("<li>").addClass("list-group-item ").text(text);
        $(".history").append(li);
    }

    // first ajax call for todays weather 
    function veatherSearch(searchTerm) {
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=1cf95ad11d72a2e012ce0c21a97cfeab&units=imperial"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            if (searchHistory.indexOf(searchTerm) === -1) {
                searchHistory.push(searchTerm)
                localStorage.setItem("history", JSON.stringify(searchHistory))
                addRow(searchTerm)
            }
            $("#today").empty()
            console.log(response)
            var title = $("<h3>").addClass("card-title").text(response.name + " (" + new Date().toLocaleDateString() + ")");
            var card = $("<div>").addClass("card");
            var wind = $("<p>").addClass("card-text").text("Wind Speed: " + response.wind.speed + " MPH");
            var humid = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%");
            var temp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp + " °F");
            var cardBody = $("<div>").addClass("card-body");
            var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
            title.append(img);
            cardBody.append(title, temp, humid, wind);
            card.append(cardBody);
            $("#today").append(card);
            getUVIndex(response.coord.lat, response.coord.lon)
        });
    }

    function forecast(searchTerm) {
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid=1cf95ad11d72a2e012ce0c21a97cfeab&units=imperial"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            for (var i = 0; i < response.list.length; i++) {
                console.log(response)
                if (response.list[i].dt_txt.indexOf("09:00:00") !== -1) {

                    var cardContainer = $("<div class='card col-md-2' style= 'float: left'>");
                    var cardBody = $("<div class='card-body'>");
                    var cardTitle = $("<h5 class='card-title'>").text(new Date(response.list[i].dt_txt).toLocaleDateString());
                    var cardText1 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                    var cardText2 = $("<p class='card-text'>").text("Temperature: " + response.list[i].main.temp + " °F");
                    var cardText3 = $("<p class='card-text'>").text("Humidity: " + response.list[i].main.humidity + "%");
                    console.log(cardText1)
                    cardContainer.append(cardBody.append(cardTitle, cardText1, cardText2, cardText3));
                    $("#forecast").append(cardContainer);
                }
            }
        })
    }

    function getUVIndex(lat, lon) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=1cf95ad11d72a2e012ce0c21a97cfeab&lat=" + lat + "&lon=" + lon,
            dataType: "json",
            success: function(response) {
                console.log(response)
                var uv = $("<p>").text("UV Index: :");
                var btn = $("<span>").addClass("btn btn-sm").text(response.value);
                $("#today .card-body").append(uv.append(btn))
            }
        })
    }
    var searchHistory = JSON.parse(window.localStorage.getItem("history")) || [];

    if (searchHistory.length > 0) {
        veatherSearch(searchHistory[searchHistory.length - 1]);
    }
    for (var i = 0; i < searchHistory.length; i++) {
        addRow(searchHistory[i]);

    }

})