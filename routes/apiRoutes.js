// Require all models
var db = require("../models");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {
    // A GET route for scraping the news.ycombinator website
    app.get("/api/scrape", function (req, res) {
        // First, we grab the body of the html with axios

        axios.get("https://www.npr.org/").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Save an empty result array
            var result = {};
            $(".story-text").each(function (i, element) {
            result.title = $(this).find(".title").text();
            result.link = $(this).find(".title").parent().attr("href");
            result.summary = $(this).find(".teaser").text();

            // $(".story-text").each(function (i, element) {

            // var titlePush = $(this).find(".title").text();
            // var linkPush = $(this).find(".title").parent().attr("href");

            // var summaryPush = $(this).find(".teaser").text();

            // // check if the element has a title and link. If it does, push it to the results array.

            // if (titlePush && linkPush && summaryPush) {
            //     result.push({
            //         title: titlePush,
            //         link: linkPush,
            //         summary: summaryPush
            //     });
            // };
            db.Article.remove({}, function(err) {
                if (err) {
                    console.log(err)
                }
                else {
                    res.end('success')
                }
            });
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });
        // res.json(result);
        // console.log(result);
    });

});


// Route for getting all Articles from the db
app.get("/api/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for getting all Articles from the db
app.delete("/api/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.remove({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for getting all Articles from the db
app.delete("/api/saved", function (req, res) {
    // Grab every document in the Articles collection
    db.Save.remove({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for getting all Articles from the db
app.get("/api/saved", function (req, res) {
    // Grab every document in the Articles collection
    db.Save.find({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

//Route to find specific article for saving
app.get("/api/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
            
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

//Route to find specific article for saving
app.get("/api/saved/:id", function (req, res) {
    db.Save.findOne({ _id: req.params.id })
    .populate("note")
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
            
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

//Route to find specific article for saving
app.delete("/api/articles/:id", function (req, res) {
    db.Article.remove({ _id: req.params.id })
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

//Route to find specific article for saving
app.delete("/api/notes/:id", function (req, res) {
    db.Note.remove({ _id: req.params.id })
        .then(function (dbNote) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbNote);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

//Route to find specific article for saving
app.delete("/api/saved/:id", function (req, res) {
    db.Save.remove({ _id: req.params.id })
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});


app.post("/api/saved", function (req, res) {
    console.log(req.body);

    var result = {};

    result.title = req.body.title;
    result.link = req.body.link;
    result.summary = req.body.summary;

    db.Save.create(result)
    .then(function (dbSaved) {
        // View the added result in the console
        console.log(dbSaved);
    })
    .catch(function (err) {
        // If an error occurred, log it
        console.log(err);
    });
});


// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function (dbArticle) {
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// app.get("/api/notes/:id", function (req, res) {
//     // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//     db.Note.findOne({ _id: req.params.id })
//         // ..and populate all of the notes associated with it
//         .populate("note")
//         .then(function (dbArticle) {
//             // If we were able to successfully find an Article with the given id, send it back to the client
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//         });
// });

// Route for saving/updating an Article's associated Note
app.post("/api/notes/:id", function (req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
        .then(function (dbNote) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Save.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

}