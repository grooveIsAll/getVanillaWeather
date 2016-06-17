app = {};

const kelvinToFahrenheit = function(temp) {
  return Math.floor(temp * 9/5 - 459.67);
}

app.HttpClient = function() {
  this.get = function(url, callback) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if(httpRequest.readyState == 4 && httpRequest.status == 200) {
        callback(httpRequest.responseText);
      }
    }
    httpRequest.open("GET", url, true);
    httpRequest.send(null);
  }
}

app.client = new app.HttpClient();
app.client.get("https://weathersync.herokuapp.com/ip", function(response) {

  let data = JSON.parse(response);
  coords = { long: data.location.longitude, lat: data.location.latitude };

  let weatherUrl = "https://weathersync.herokuapp.com/weather/" + coords.lat +"," + coords.long;

  let weatherData = new app.HttpClient()
    .get(weatherUrl, function(response) {
      let data = JSON.parse(response);

      let temp = kelvinToFahrenheit(Number(data.main.temp));

      let weatherIcon = data.weather[0].icon;
      let iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";

      let locData = document.getElementById("location").innerHTML = data.name;
      let tempData = document.getElementById("temperature").innerHTML = String(temp) + "&deg" + "F" ;
      let iconData = document.getElementById("icon").src = iconUrl;
      let conditionData = document.getElementById("condition").innerHTML = data.weather[0].description;

    });
});

