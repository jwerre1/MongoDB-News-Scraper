$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.collapsible').collapsible();
    $('.fixed-action-btn').floatingActionButton();
    // $("#savedResults").empty();
    initSaved();
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
    getSaves: function () {
        return $.ajax({
            url: "api/saved",
            type: "GET"
        });
    },
    getArticle: function (id) {
        return $.ajax({
            url: "api/articles/" + id,
            type: "GET"
        });
    },
    getSavedArticle: function (id) {
        return $.ajax({
            url: "api/saved/" + id,
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
    deleteSaved: function (id) {
        return $.ajax({
            url: "api/saved/" + id,
            type: "DELETE"
        });
    },
    deleteAllSavedArt: function () {
        return $.ajax({
            url: "api/saved/",
            type: "DELETE"
        });
    }
};

var initSaved = function () {
    $("#savedResults").empty();
    API.getSaves().then(function (data) {
        var $saves = data.map(function (artic) {
            var $li = $("<li>");

            var deleteButton = $("<button>").addClass("btn-small waves-effect waves-light right deleteIt").attr("type", "submit").attr("name", "action").text("Delete From Saved");
            var title = $("<div>").text(artic.title).addClass("collapsible-header");

            var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
            var body = $("<div>").attr("data-id", artic._id).addClass("collapsible-body").append(span).append(deleteButton);

            $li.append(title).append(body);

            return $li;
        });
        $("#savedResults").append($saves);
    });
};

var deleteAllSaved = function() {
    API.deleteAllSavedArt().then(function () {
        $("#savedResults").empty();
        API.getSaves().then(function (data) {
            var $saves = data.map(function (artic) {
                var $li = $("<li>");
    
                var deleteButton = $("<button>").addClass("btn-small waves-effect waves-light right deleteIt").attr("type", "submit").attr("name", "action").text("Delete From Saved");
                var title = $("<div>").text(artic.title).addClass("collapsible-header");
    
                var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
                var body = $("<div>").attr("data-id", artic._id).addClass("collapsible-body").append(span).append(deleteButton);
    
                $li.append(title).append(body);
    
                return $li;
            });
            $("#savedResults").append($saves);
        });
    })
};


var deleteSavedArt = function () {
    var id = $(this).parent().attr("data-id");

console.log(id);
    API.deleteSaved(id).then(function (dataTwo) {
        $("#savedResults").empty();
        API.getSaves().then(function (data) {
            var $saves = data.map(function (artic) {
                var $li = $("<li>");
    
                var deleteButton = $("<button>").addClass("btn-small waves-effect waves-light right deleteIt").attr("type", "submit").attr("name", "action").text("Delete From Saved");
                var title = $("<div>").text(artic.title).addClass("collapsible-header");
    
                var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
                var body = $("<div>").attr("data-id", artic._id).addClass("collapsible-body").append(span).append(deleteButton);
    
                $li.append(title).append(body);
    
                return $li;
            });
            $("#savedResults").append($saves);
        });
    });
};


$("#savedResults").on("click", ".deleteIt", deleteSavedArt);
$("#clearSavedArticles").on("click", deleteAllSaved);