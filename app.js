const express = require("express");
const https = require("https");
const bodyParse = require("body-parser")

const app = express();

app.use(bodyParse.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
 })

app.post("/", function(req,res){
     //console.log("post received");
    const query = req.body.cityName;
    const apiKey = "appid=095731ead27794ab1d8bb42849a1a9d7";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&"+apiKey+"&units=metric"
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
          const weatherData = JSON.parse(data);
          const temp = weatherData.main.temp;
          const weatherDescription = weatherData.weather[0].description
          const weatherIcon = weatherData.weather[0].icon
          const imageURL = "http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png"
          console.log(temp);
          console.log(weatherDescription);
          res.write("<h1>The temperate in "+ query + " is " + temp + " degrees</h1>");
          res.write("<h2>The weather description is "+weatherDescription+"</h2>")
          res.write("<img src="+imageURL+">")
          res.send()
          //Only one res.send method in app.get method
        });
    })
 })
    
    
   
    /* use https.get to make a get request across the internet, not 
    across our server and index.html*/

    // comment out previous: res.send("Sever is up and running");



app.listen(3000, function(){
    console.log("Server running on port 3000");
})