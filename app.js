app = {};

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
  // console.log(response);
  let data = JSON.parse(response);
  coords = { long: data.location.longitude, lat: data.location.latitude };

  let weatherUrl = "https://weathersync.herokuapp.com/weather/" + coords.lat +"," + coords.long;

  let weatherData = new app.HttpClient()
    .get(weatherUrl, function(response) {
      let data = JSON.parse(response);
      console.log(data);
    });
});

