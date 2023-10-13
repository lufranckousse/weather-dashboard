var today = dayjs().format('M/D/YYYY');
var openWeatherKey = "81274b6b41cb15dc0dd390c01fc36c70";
var city;
var lat;
var lon;
var currentCity = $('#CityDate');
var currentIcon = $('#icon');
var currentTemp = $('#temp');
var currentWind = $('#wind');
var currentHumidity = $('#humidity');
var searchCity = $('input[name="search"]');
var searchBtn = $('#searchBtn');
var searchResults = $('#searchResults');
var day1 = $('#day1');
var day2 = $('#day2');
var day3 = $('#day3');
var day4 = $('#day4');
var day5 = $('#day5');
var refineSearch = $('#top-hits');
var fiveDay = [];
var searchInput = $('#searchInput');
var closeBtn = $('.btn-close');


function currentWeatherAPI() {
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherKey + "&units=imperial";
    fetch(currentWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
       
            var currentDay = {
                icon: (data.weather[0].icon).slice(0, -1),
                temp: "Temp: " + + data.main.temp + "°F",
                wind: "Wind: " + data.wind.speed + " MPH",
                humid: "Humidity: " + data.main.humidity + '%'
            }
            var iconURL = 'https://openweathermap.org/img/wn/' + currentDay.icon + 'd@2x.png'
            var icon = $('<img>');
            icon.attr("src", iconURL);
            currentCity.append(icon);
            currentTemp.text(currentDay.temp);
            currentWind.text(currentDay.wind);
            currentHumidity.text(currentDay.humid);
        });

}

function openWeatherAPI() {
    var openWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherKey + "&units=imperial";
    fetch(openWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        
            var dayInfo;
            for (let i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.includes("12:00:00")) {
                    var dayInfo = {
                        icon: data.list[i].weather[0].icon.slice(0, -1),
                        date: dayjs.unix(data.list[i].dt).format("MM/DD/YY"),
                        temp: "Temp: " + data.list[i].main.temp + "°F",
                        wind: "Wind: " + data.list[i].wind.speed + " MPH",
                        humid: "Humidity: " + data.list[i].main.humidity + '%'
                    }
                    fiveDay.push(dayInfo);
                }

            }
            fiveDayForcast();
        });
}

function geoCodeAPI() {
    var geoCodingURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + openWeatherKey;
    fetch(geoCodingURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
            for (let i = 0; i < data.length; i++) {
        
                var buttonEl = $("<button>");
                buttonEl.text(data[i].name + ', ' + data[i].state);
                buttonEl.attr('data-lat', data[i].lat);
                buttonEl.attr('data-lon', data[i].lon);
                buttonEl.attr('data-city', data[i].name);
                buttonEl.attr("data-state", data[i].state);
                buttonEl.attr('data-bs-dismiss', 'modal');
                buttonEl.addClass('refineBtn btn btn-dark w-100 gap-2');
                refineSearch.append(buttonEl);      
            }
        });
}

searchBtn.on('click', function () {
    if (searchCity.val() === " ") {
        return;
    } else {
        city = $.trim(searchCity.val());
    }

    geoCodeAPI();
})

function fiveDayForcast() {

    // Day+1
    date1 = $('<h6>');
    date1.text(fiveDay[0].date);
    day1.children('.date').html(date1);
    var weatherInfo1 = day1.children('.weatherInfo');
    var temp1 = $('<li>');
    temp1.text(fiveDay[0].temp);
    weatherInfo1.html(temp1);
    var wind1 = $('<li>');
    wind1.text(fiveDay[0].wind);
    weatherInfo1.append(wind1);
    var humid1 = $('<li>');
    humid1.text(fiveDay[0].humid);
    weatherInfo1.append(humid1);
    var icon1 = $('<img>');
    icon1.attr('src', 'https://openweathermap.org/img/wn/' + fiveDay[0].icon + 'd@2x.png')
    weatherInfo1.append(icon1);

    // day+2
    date2 = $('<h6>');
    date2.text(fiveDay[1].date);
    day2.children('.date').html(date2);
    var weatherInfo2 = day2.children('.weatherInfo');
    var temp2 = $('<li>');
    temp2.text(fiveDay[1].temp);
    weatherInfo2.html(temp2);
    var wind2 = $('<li>');
    wind2.text(fiveDay[1].wind);
    weatherInfo2.append(wind2);
    var humid2 = $('<li>');
    humid2.text(fiveDay[1].humid);
    weatherInfo2.append(humid2);
    var icon2 = $('<img>');
    icon2.attr('src', 'https://openweathermap.org/img/wn/' + fiveDay[1].icon + 'd@2x.png')
    weatherInfo2.append(icon2);

    // day+3
    date3 = $('<h6>');
    date3.text(fiveDay[2].date);
    day3.children('.date').html(date3);
    var weatherInfo3 = day3.children('.weatherInfo');
    var temp3 = $('<li>');
    temp3.text(fiveDay[2].temp);
    weatherInfo3.html(temp3);
    var wind3 = $('<li>');
    wind3.text(fiveDay[2].wind);
    weatherInfo3.append(wind3);
    var humid3 = $('<li>');
    humid3.text(fiveDay[2].humid);
    weatherInfo3.append(humid3);
    var icon3 = $('<img>');
    icon3.attr('src', 'https://openweathermap.org/img/wn/' + fiveDay[2].icon + 'd@2x.png')
    weatherInfo3.append(icon3);

    // day+4
    date4 = $('<h6>');
    date4.text(fiveDay[3].date);
    day4.children('.date').html(date4);
    var weatherInfo4 = day4.children('.weatherInfo');
    var temp4 = $('<li>');
    temp4.text(fiveDay[3].temp);
    weatherInfo4.html(temp4);
    var wind4 = $('<li>');
    wind4.text(fiveDay[3].wind);
    weatherInfo4.append(wind4);
    var humid4 = $('<li>');
    humid4.text(fiveDay[3].humid);
    weatherInfo4.append(humid4);
    var icon4 = $('<img>');
    icon4.attr('src', 'https://openweathermap.org/img/wn/' + fiveDay[3].icon + 'd@2x.png')
    weatherInfo4.append(icon4);

    // day+5
    date5 = $('<h6>');
    date5.text(fiveDay[4].date);
    day5.children('.date').html(date5);
    var weatherInfo5 = day5.children('.weatherInfo');
    var temp5 = $('<li>');
    temp5.text(fiveDay[4].temp);
    weatherInfo5.html(temp5);
    var wind5 = $('<li>');
    wind5.text(fiveDay[4].wind);
    weatherInfo5.append(wind5);
    var humid5 = $('<li>');
    humid5.text(fiveDay[4].humid);
    weatherInfo5.append(humid5);
    var icon5 = $('<img>');
    icon5.attr('src', 'https://openweathermap.org/img/wn/' + fiveDay[4].icon + 'd@2x.png')
    weatherInfo5.append(icon5);
}

function saveSearch() {
    var storedSearch = JSON.parse(localStorage.getItem("weatherAPI")) || [];
    searchResults.html(" ");
    if (storedSearch.length > 7){
    for (var i = storedSearch.length -1; i > storedSearch.length-7; i--) {
        var buttonEl = $("<button>");
        buttonEl.text(storedSearch[i].city + ', ' + storedSearch[i].state)
        buttonEl.attr('data-lat', storedSearch[i].lat);
        buttonEl.attr('data-lon', storedSearch[i].lon);
        buttonEl.attr('data-city', storedSearch[i].city);
        buttonEl.attr("data-state", storedSearch[i].state);
        buttonEl.addClass('pastBtn btn btn-dark w-100 gap-2')
        searchResults.append(buttonEl);
    }} else { for (var i = storedSearch.length -1; i >= 0; i--) {
        var buttonEl = $("<button>");
        buttonEl.text(storedSearch[i].city + ', ' + storedSearch[i].state);
        buttonEl.attr('data-lat', storedSearch[i].lat);
        buttonEl.attr('data-lon', storedSearch[i].lon);
        buttonEl.attr('data-city', storedSearch[i].city);
        buttonEl.attr("data-state", storedSearch[i].state);
        buttonEl.addClass('pastBtn btn btn-dark w-100 gap-2')
        searchResults.append(buttonEl);}
    }
}
saveSearch();

searchResults.on('click', '.pastBtn', function () {
    lat = $(this).attr('data-lat');
    lon = $(this).attr('data-lon');
    currentCity.text($(this).attr('data-city') + ", " + $(this).attr('data-state') + " - " + today);
    fiveDay = [];
    openWeatherAPI();
    currentWeatherAPI();
}); 

refineSearch.on('click', '.refineBtn', function(){
    
    lat = $(this).attr('data-lat');
    lon = $(this).attr('data-lon');
    currentCity.text($(this).attr('data-city') + ", " + $(this).attr('data-state') + " - " + today);
    
    var cityInfo = {
        city: $(this).attr('data-city'),
        state: $(this).attr('data-state'),
        lat: $(this).attr('data-lat'),
        lon: $(this).attr('data-lon')
    }

    var storedSearch = JSON.parse(localStorage.getItem("weatherAPI")) || [];
    storedSearch.push(cityInfo);
    localStorage.setItem("weatherAPI", JSON.stringify(storedSearch));
    fiveDay = [];
    saveSearch();
    openWeatherAPI();
    currentWeatherAPI();
    refineSearch.html(' '); 
});

closeBtn.on('click', function(){
    refineSearch.html(' ');
})