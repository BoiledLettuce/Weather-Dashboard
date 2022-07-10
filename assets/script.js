var apiCode = "f5dce06a4fd223bfc5a4e39f294f5b5b";
var todayMoment = moment().format('ll LT'); //preset format from https://devhints.io/moment
var searchHist = [];


function weatherNow(city) {

    var queryURL = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiCode}`; //https://openweathermap.org/forecast5#name5

    $.ajax({
        
    })







};