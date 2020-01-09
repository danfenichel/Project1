var resultEl = $(".resultBox");

var formEl = $("#input-form");

var cityInputEl = $("#city-input");

var selectStateEl = $("#state-select");

var selectFoodEl = $("#food-select");

var submitBtn = $("#submit");

var errorText = $("<p>").text("Please fill out all required fields!");

// CHANGED establishmenttype to type-select

var typeSelect = $("#type-select");

// Hides the cuisine select box when user selects "Brewery"
typeSelect.on("change", function () {
    if (typeSelect.val() === "Brewery") {
        selectFoodEl.attr("style", "display:none");
    } else {selectFoodEl.attr("style", "display:block")};
});

$("#submit").on("click", function (event) {

    event.preventDefault();

    // Shows Error Text if required fields aren't populated

    if (cityInputEl.val() === "" || selectStateEl.val() === "Select State" || typeSelect.val() === "Select Restaurant or Brewery") {

        errorText.attr("style", "color: red; text-align: center; font-weight: 900; background: rgba(255,255,255, 0.7); width: 300px; border-radius: 25px; margin: 0 auto");

        formEl.append(errorText);

        return;

    };

    // Removes error text once required fields are populated

    errorText.remove();

    // Changes text of submit button to tell users to keep cycling through to next options

    $("#submit").text("Not Satisfied? Keep Fishing!");

    var matchBtn = $("<button>");
    var matchLink = $("<a>").text("It's a Match!");
    matchLink.attr("href", "https://www.opentable.com");
    matchLink.attr("target", "_blank");

    matchBtn.append(matchLink);
    $("#button-field").append(matchBtn);

    // AJAX query to get city code based on user input (city code needed to do further search)

    var city = cityInputEl.val();

    switch (typeSelect.val()) {

        case "Restaurant":

            showRestuarant(city)

            break;

        case "Brewery":

            showBrewery(city)

            break;

        default:

    };

});

function showBrewery(city) {

    var breweryAPI = "https://api.openbrewerydb.org/breweries?by_city="

    $.ajax({

        url: breweryAPI + city,

        method: "GET"

    }).then(function (response) {

        console.log(response.length);

        var brewery = response[Math.floor(Math.random() * Math.floor(20))]

        resultEl.empty();

        resultEl.append(`

          <h5>${brewery.name}</h5>

          <h6>Address: ${brewery.street} ${brewery.city} ${brewery.state}</h6>

          <h6>Phone Number: ${brewery.phone}</h6>

<<<<<<< HEAD
          <h6>Link to Website: ${brewery.website_url}</h6>

          `)

=======
          `);
>>>>>>> master

    });

};

function showRestuarant(city) {

    var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + city + "&count=1&apikey=0be82c0991914e9afe82f36e7fbdf1e6";

    $.ajax({

        url: queryURL,

        method: "GET"

    }).then(function (response) {

        // AJAX query using city code pulled from above to search random restaurant options

        var cityID = response.location_suggestions[0].id;

        var cuisineID = $("#food-select").val();

        var queryURL1 = "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityID + "&entity_type=city&count=20&cuisines=" + cuisineID + "&apikey=0be82c0991914e9afe82f36e7fbdf1e6";

        $.ajax({

            url: queryURL1,

            method: "GET"

        }).then(function (response) {

            var randomNum = Math.floor(Math.random() * 20 + 1);

            var restaurant = response.restaurants[randomNum].restaurant

            var restName = $("<h5>").text(restaurant.name);

            var restType = $("<h6>").text("Type of Food: " + restaurant.cuisines)

            var restAddr = $("<h6>").text("Address: " + restaurant.location.address);

            var restPhone = $("<h6>").text("Phone Number: " + restaurant.phone_numbers);

            var restHours = $("<h6>").text("Hours: " + restaurant.timings);

            var restRtng = $("<h6>").text("User Rating: " + restaurant.user_rating.aggregate_rating + "/5");

            var restUrl = $("<a>").text("Link to Website");

            restUrl.attr("href", restaurant.url);

            restUrl.attr("target", "_blank");

            var lineBreak = $("<br>");

            $(".resultBox").empty();

            $(".resultBox").append(restName, restType, restAddr, restPhone, restHours, restRtng, restUrl, lineBreak);

        });

    });

};