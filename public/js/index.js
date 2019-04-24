$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.collapsible').collapsible();
    $('.fixed-action-btn').floatingActionButton();
    $("#scrapeResults").empty();
    initArticles();
});

var API = {
    getScrape: function () {
        return $.ajax({
            url: "api/scrape",
            type: "GET"
        });
    },
    init: function () {
        return $.ajax({
            url: "api/articles",
            type: "GET"
        });
    },
    getArticle: function (id) {
        return $.ajax({
            url: "api/articles/" + id,
            type: "GET"
        });
    },
    save: function (article) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/saved",
            data: JSON.stringify(article)
        });
    },
    deleteArticle: function (id) {
        return $.ajax({
            url: "api/articles/" + id,
            type: "DELETE"
        });
    },
    deleteAllScrapedArt: function () {
        return $.ajax({
            url: "api/articles/",
            type: "DELETE"
        });
    }
};

var initArticles = function () {
    $("#scrapeResults").empty();
    API.init().then(function (data) {
        if (data.length > 0) {
            var $arts = data.map(function (artic) {
                var $li = $("<li>");

                var saveButton = $("<button>").addClass("btn-small waves-effect waves-light indigo right saveIt").attr("type", "submit").attr("name", "action").text("Save Article");
                var title = $("<div>").text(artic.title).addClass("collapsible-header");

                var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
                var body = $("<div>").attr("data-id", artic._id).addClass("collapsible-body").append(span).append(saveButton);

                $li.append(title).append(body);

                return $li;
            });
            $("#scrapeResults").append($arts);
        }
        else {
            var $li = $("<li>");

            var title = $("<h5>").text("No More Articles. Get Scraping By Clicking The Button Above!").addClass("center-align");

            $li.append(title);
            $("#scrapeResults").append($li);
        }
    });

};

var newScrape = function () {
    $("#scrapeResults").empty();
    API.getScrape().then(function (data) {
        // var $arts = data.map(function (artic) {
        //     var $li = $("<li>");

        //     var saveButton = $("<button>").addClass("btn-small waves-effect waves-light right").attr("type", "submit").attr("name", "action").text("Save Article");
        //     var title = $("<div>").text(artic.title).addClass("collapsible-header");

        //     var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
        //     var body = $("<div>").addClass("collapsible-body").append(span).append(saveButton);

        //     $li.append(title).append(body);

        //     return $li;
        // });
        // $("#scrapeResults").append($arts);
        API.init().then(function (data) {
            if (data.length > 0) {
                var $arts = data.map(function (artic) {
                    var $li = $("<li>");
    
                    var saveButton = $("<button>").addClass("btn-small waves-effect waves-light indigo right saveIt").attr("type", "submit").attr("name", "action").text("Save Article");
                    var title = $("<div>").text(artic.title).addClass("collapsible-header");
    
                    var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
                    var body = $("<div>").attr("data-id", artic._id).addClass("collapsible-body").append(span).append(saveButton);
    
                    $li.append(title).append(body);
    
                    return $li;
                });
                $("#scrapeResults").append($arts);
            }
            else {
                var $li = $("<li>");
    
                var title = $("<h5>").text("No More Articles. Get Scraping By Clicking The Button Above!").addClass("center-align");
    
                $li.append(title);
                $("#scrapeResults").append($li);
            }
        });
    });
};

var deleteAllScraped = function () {
    API.deleteAllScrapedArt().then(function () {
        $("#scrapeResults").empty();
        API.init().then(function (data) {
            if (data.length > 0) {
                var $arts = data.map(function (artic) {
                    var $li = $("<li>");
    
                    var saveButton = $("<button>").addClass("btn-small waves-effect waves-light indigo right saveIt").attr("type", "submit").attr("name", "action").text("Save Article");
                    var title = $("<div>").text(artic.title).addClass("collapsible-header");
    
                    var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
                    var body = $("<div>").attr("data-id", artic._id).addClass("collapsible-body").append(span).append(saveButton);
    
                    $li.append(title).append(body);
    
                    return $li;
                });
                $("#scrapeResults").append($arts);
            }
            else {
                var $li = $("<li>");
    
                var title = $("<h5>").text("No More Articles. Get Scraping By Clicking The Button Above!").addClass("center-align");
    
                $li.append(title);
                $("#scrapeResults").append($li);
            }
        });
    })
};

var saveArticle = function () {
    var id = $(this).parent().attr("data-id");

    API.getArticle(id).then(function (data) {
        console.log(data);
        API.save(data).then(function (dataTwo) {
        });
        API.deleteArticle(id).then(function (dataThree) {
            $("#scrapeResults").empty();
            API.init().then(function (data) {
                if (data.length > 0) {
                    var $arts = data.map(function (artic) {
                        var $li = $("<li>");
        
                        var saveButton = $("<button>").addClass("btn-small waves-effect waves-light indigo right saveIt").attr("type", "submit").attr("name", "action").text("Save Article");
                        var title = $("<div>").text(artic.title).addClass("collapsible-header");
        
                        var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
                        var body = $("<div>").attr("data-id", artic._id).addClass("collapsible-body").append(span).append(saveButton);
        
                        $li.append(title).append(body);
        
                        return $li;
                    });
                    $("#scrapeResults").append($arts);
                }
                else {
                    var $li = $("<li>");
        
                    var title = $("<h5>").text("No More Articles. Get Scraping By Clicking The Button Above!").addClass("center-align");
        
                    $li.append(title);
                    $("#scrapeResults").append($li);
                }
            });
        });
    });

    // API.deleteArticle(id).then(function (dataThree) {
    // });
};



// Grab the articles as a json
$.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});





// Whenever someone clicks a p tag
$(document).on("click", "p", function () {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);
            // The title of the article
            $("#notes").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' >");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // Value taken from title input
            title: $("#titleinput").val(),
            // Value taken from note textarea
            body: $("#bodyinput").val()
        }
    })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});




$("#newScrape").on("click", newScrape);
$("#scrapeResults").on("click", ".saveIt", saveArticle);

$("#clearScrapedArticles").on("click", deleteAllScraped);
