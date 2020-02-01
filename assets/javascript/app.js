$(document).ready(function() { 
//Starting array that will be used to create button labels and create search term
var topics = ["Buffy The Vampire Slayer", "The Last Witch Hunter","Vampire Diaries","The Craft", "The Passage","The Covenant","True Blood", "Beautiful Creatures","Twilight", "Blade"];

//Function that will call the API and retun json results
function displayvampGif(){
    
    $(".gif-container").empty();
    
    var vampGif = $(this).attr("data-vampGif");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + vampGif + "&api_key=64O8bLIN8MebVhEg7hVRRlTAppg80b9y&limit=10&lang=en"

    $.ajax({
        url: queryUrl,
        method: "GET"
        }).then(function(response) {
            console.log(response);
    
            var results = response.data;
    
            for (var i = 0; i <= results.length; i++) {
    
                var gifDiv = $("<div>").attr("class", "gifDiv float-sm-left");
                var gifImage = $("<img>");
                gifImage.attr("class", "img-fluid gif");
                
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");
    
                var ratingP = $("<p>").text(" rating: " + results[i].rating).attr("class", "rating");
    
                gifDiv.append(gifImage);
                gifDiv.append(ratingP);
                    
                $(".gif-container").prepend(gifDiv);
                
            }
        });
    }
    

    //Function to call IMBD API
    function displaySummary(){
        $(".summary-container").empty();
        
        
        var vampGif = $(this).attr("data-vampGif");
        var queryUrl = "http://www.omdbapi.com/?t=" + vampGif + "&apikey=8c6e53eb"
    
        $.ajax({
            url: queryUrl,
            method: "GET"
            }).then(function(response) {
                console.log(response);
        
                var results = response.Plot;
                console.log(results);
        
               // for (var i = 0; i <= results.length; i++) {

                    var summaryDiv = $("<div>").attr("class", "summaryDiv");
                    var gifPlot = $("<p>");

                   summaryDiv.attr("src", results);
                   

                    summaryDiv.append(gifPlot);

                    $(".summary-container").prepend("<h4>Summary Plot: </h4>"  + results);
                    
                }
            );
            
        }

    
    //On click events to animate and pause gifs
    $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
    
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    
    });
    
    //Function to create new button
    function renderButtons() {
    
        $("#gif-buttons").empty();
    
        for (var i = 0; i < topics.length; i++) {
            var gifButton = $("<button>");
            gifButton.attr("type", "button").attr("class", "btn btn-danger vampGif").text(topics[i]).attr("data-vampGif", topics[i]).attr("id", "gif-button");
            $("#gif-buttons").append(gifButton);
        }
    }
    
    $("#submit-input").on("click", function(event) {
        event.preventDefault();
        var vampGif = $("#user-input").val().trim();
        topics.push(vampGif);
        renderButtons();
    });
    
    $(document).on("click", ".vampGif", displaySummary);
    $(document).on("click", ".vampGif", displayvampGif);
    
    
    renderButtons()});