var apiCode = "f5dce06a4fd223bfc5a4e39f294f5b5b";
var todayMoment = moment().format('ll LT'); //preset format from https://devhints.io/moment
var searchHist = [];


function weatherNow(city) {

    // var city = "daly city"; //remove this later

    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiCode}`; //https://openweathermap.org/forecast5#name5

    $.ajax({
        url: queryURL,
        method: "GET",
        
    }).then(function(cityWeatherResponse) {
        console.log(cityWeatherResponse);

        $("#weatherContent").css("display", "block");
        $("#cityDetail").empty();

        var iconCode = cityWeatherResponse.weather[0].icon;
        var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`

        var currentCity = $(`
            <h2 id="currentCity">
                ${cityWeatherResponse.name} ${todayMoment} <img src="${iconURL}" alt="${cityWeatherResponse.weather[0].description}" />
            </h2>
            <p>Temperature: ${cityWeatherResponse.main.temp} C</p>
            <p>Humidity: ${cityWeatherResponse.main.humidity} \%</p>
            <p>Wind Speed: ${cityWeatherResponse.wind.speed} MPH</p>
        `);

        $("#cityDetail").append(currentCity);

        var latidude = cityWeatherResponse.coord.lat;
        var lon = cityWeatherResponse.coord.lon;
        var part = 'alerts';
        var uviURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latidude}&lon=${lon}&exclude=${part}&appid=${apiCode}`;

        console.log('latitude = ' + latidude);
        console.log('longitude = ' + lon);

        $.ajax({
            url: uviURL,
            method: "GET"
        }).then(function(uviResponse) {
            console.log(uviResponse);

            var uvIndex = uviResponse.value;
            var uvIndexP = $(`
                <p>UV Index:
                    <span id="uvIndexColor" class="px-2 py-2 rounded">${uvIndex}</span>
                </p>
            `);

            $("#cityDetail").append(uvIndexP);


            var latidudebro = cityWeatherResponse.coord.lat; //hmm

            weatherFuture(latidudebro, lon); //hmm the culprit


            if (uvIndex >= 0 && uvIndex <= 2) {
                $("#uvIndexColor").css("background-color", "#3EA72D").css("color", "white");
            } else if (uvIndex >= 3 && uvIndex <= 5) {
                $("#uvIndexColor").css("background-color", "#FFF300");
            } else if (uvIndex >= 6 && uvIndex <= 7) {
                $("#uvIndexColor").css("background-color", "#F18B00");
            } else if (uvIndex >= 8 && uvIndex <= 10) {
                $("#uvIndexColor").css("background-color", "#E53210").css("color", "white");
            } else {
                $("#uvIndexColor").css("background-color", "#B567A4").css("color", "white");
            };

        });
    });
};


function weatherFuture(lat, lon) {

    var futureURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperal&exclude=current,minutely,hourly,alerts&appid=${apiCode}`;

    $.ajax({
        url: futureURL,
        method: "GET"
    }).then(function(futureResponse) {
        console.log(futureResponse);
        $("#fiveDay").empty();

        for (let i = 1; i < 6; i++) {
            var cityInfo = {
                data: futureResponse.daily[i].dt,
                icon: futureResponse.daily[i].weather[0].icon,
                temp: futureResponse.daily[i].temp.day,
                humidity: futureResponse.daily[i].humidity
            };

            var currentDate = moment.unix(cityInfo.date).format('ll LT');
            var iconURL = `<img src="https://openweathermap.org/img/w/${cityInfo.icon}.png" alt="${futureResponse.daily[i].weather[0].main}" />`;

            var futureCard = $(`
                <div class="pl-3">
                    <div class="card pl-3 pt-3 mb-3 bg-primary text-light" style="width: 12rem;>
                        <div class="card-body">
                            <h5>${currentDate}</h5>
                            <p>${iconURL}</p>
                            <p>Temp: ${cityInfo.temp} C</p>
                            <p>Humidity: ${cityInfo.humidity} %</p>
                        </div>
                    </div>
                </div>
            `);

            $("#fiveDay").append(futureCard);
        }
    });
}


// JQUERY Type event listener

$(document).keypress(function(event) {
    if (event.key === "Enter") {
        // Do something

        event.preventDefault();
        
        var city = $("#enterCity").val();                   //need to fix html to get these working
        weatherNow(city);
        if (!searchHist.includes(city)) {
            searchHist.push(city);
            var searchCity = $(`
                <li class="list-group-item">${city}</li>
                `);
            $("#searchHist").append(searchCity);
        };

        localStorage.setItem("city", JSON.stringify(searchHist));
        console.log(searchHist);
    };

});




$(document).on("click", ".list-group-item", function() { //targeting stuff made from line 126
    var cityList = $(this).text();
    weatherNow(cityList);
});


$(document).ready(function() {
    var getHistory = JSON.parse(localStorage.getItem("city"));

    if (getHistory !== null) {
        var lastSearchIndex = getHistory.length - 1;
        var lastSearchedCity = getHistory[lastSearchIndex];
        weatherNow(lastSearchedCity);
        console.log(`Last searched city: ${lastSearchedCity}`);
    }
});












// Random console clearing using arrowup

$(document).keyup(function(event) {
    if (event.key === "ArrowUp") {
        // Do something
        console.clear();
    }
});

// Random console error

console.error('ERROR Just Kidding');