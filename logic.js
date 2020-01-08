var resultEl = $(".resultBox");
var cityInputEl = $(".cityBox");
var submitBtn = $("#submit");

$("#submit").on("click", function(event) {
    event.preventDefault();
    
    // AJAX query to get city code based on user input (city code needed to do further search)
    var city = cityInputEl.val();
    var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + city + "&count=1&apikey=0be82c0991914e9afe82f36e7fbdf1e6";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // AJAX query using city code pulled from above to search restaurant options
        var cityID = response.location_suggestions[0].id;
        var queryURL1 = "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityID + "&entity_type=city&count=20&apikey=0be82c0991914e9afe82f36e7fbdf1e6";
        $.ajax({
            url: queryURL1,
            method: "GET"
        }).then(function (response) {
                var randomNum = Math.floor(Math.random() * 20 + 1);
                
                var restName = $("<h5>").text(response.restaurants[randomNum].restaurant.name);
                var restAddr = $("<h6>").text("Address: " + response.restaurants[randomNum].restaurant.location.address);
                var restPhone = $("<h6>").text("Phone Number: " + response.restaurants[randomNum].restaurant.phone_numbers);
                var restRtng = $("<h6>").text("User Rating: " + response.restaurants[randomNum].restaurant.user_rating.aggregate_rating + "/5");
                var restUrl = $("<a>").text("Link to Website");
                restUrl.attr("href", response.restaurants[randomNum].restaurant.url);
                restUrl.attr("target", "_blank");
                var lineBreak = $("<br>");
                var nextBtn = $("<button>").text("Not Satisfied? Next!");
                
                $(".resultBox").append(restName, restAddr, restPhone, restRtng, restUrl, lineBreak, nextBtn);
        });
    });
    // Add functionality to STOP submit button from working after clicking once. Tried "return" - did not work
});


