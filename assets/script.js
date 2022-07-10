var apiCode = "f5dce06a4fd223bfc5a4e39f294f5b5b";
var todayMoment = moment().format('ll LT'); //preset format from https://devhints.io/moment
var searchHist = [];


function weatherNow(city) {

    console.log("Yo Mamas House")

    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiCode}`; //https://openweathermap.org/forecast5#name5

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(cityWeatherResponse) {
        console.log(cityWeatherResponse);

        $("#weatherContent").css("display", "block");
        $("#cityDetail").empty();

        var iconCode = cityWeatherResponse.weather[0].icon;
        var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`

        var currentCity = $(`

        `);
    })







};

weatherNow();