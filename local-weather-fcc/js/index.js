// AIzaSyAZZ1rjBf6cLzKopinwIRBlYfWWxWTrpNs

$(document).ready(function() {
  var apiStr = "";
  var coordStr = "";

  function getPosition() {

    return navigator.geolocation.getCurrentPosition(getCoords);

  }

  function getCoords(position) {

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    coordStr = "lat=" + lat + "&lon=" + lon;
    apiStr = "http://api.openweathermap.org/data/2.5/weather?" +
      coordStr + "&APPID=" + apiKey;
    
    getWeather();

  }

  function getGeo() {

    if (Modernizr.geolocation) {
     getPosition();

    }

  }
  var apiKey = "0bdb78c6477f8e21266615aaa465c619";
  getGeo();

  function getWeather() {
    
    $.ajax({
      url: apiStr,

      jsonp: "jsonp",

      success: function(data) {
        var src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        
        var temp_display = $("#temp_display");
        var wind_display = $("#wind_display");
        wind_display.text("Wind speed:"+ data.wind.speed+"m/s");
        var weather_display = $("#weather_display");
        weather_display.text(data.weather[0].description);
       var icon=$("#icon");
        icon.attr("src", src);

        var temp = data.main.temp;
        temp = Math.round(temp - 272);

        temp_display.html(temp + "	&#8451");
        var body= document.getElementById("body");
        if(temp<10){
          body.setAttribute("class","cold")
        }if(temp>30){
          body.setAttribute("class",  "hot")
        }else{
          body.setAttribute("class", "normal")
        }
        
      },
      error: function(xhr, status, errorThrown) {
        alert("Sorry, there was a problem!");
        
        console.dir(xhr);
      }
    })

  }

})