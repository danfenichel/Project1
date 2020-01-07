var resultEl = $(".resultBox");
var cityInputEl = $(".cityBox");
var submitBtn = $("#submit");

$("#submit").on("click", function(event) {
    event.preventDefault();
    
    var city = cityInputEl.val();
    var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + city + "&count=1&apikey=0be82c0991914e9afe82f36e7fbdf1e6";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var cityID = response.location_suggestions[0].id;
        var queryURL1 = "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityID + "&entity_type=city&count=20&apikey=0be82c0991914e9afe82f36e7fbdf1e6";
        $.ajax({
            url: queryURL1,
            method: "GET"
        }).then(function (response) {
                console.log(response.restaurants[Math.floor(Math.random() * 20) + 1].restaurant.name);
        });
    });
});


