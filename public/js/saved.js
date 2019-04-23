$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.collapsible').collapsible();
    $('.fixed-action-btn').floatingActionButton();
    // $("#savedResults").empty();
    $('.modal').modal();

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
            type: "GET",
        });
    },
    getNote: function (id) {
        return $.ajax({
            url: "api/notes/" + id,
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
    },
    saveNote: function (id, note) {
        return $.ajax({
            url: "api/notes/" + id,
            type: "POST",
            data: {
                body: note
            }
        });
    }
};

var initSaved = function () {
    $("#savedResults").empty();
    API.getSaves().then(function (data) {
        var $saves = data.map(function (artic) {
            var $li = $("<li>");

            var deleteButton = $("<button>").addClass("buttonMargin btn-small waves-effect waves-light right deleteIt").attr("type", "submit").attr("name", "action").text("Delete From Saved");
            var noteButton = $("<button>").addClass("buttonMargin btn-small waves-effect waves-light modal-trigger right indigo addNote").attr("type", "submit").attr("name", "action").text("Add Note").attr("data-target", "modal1");

            var title = $("<div>").text(artic.title).addClass("collapsible-header");

            var buttonDiv = $("<div>").attr("data-id", artic._id).append(deleteButton).append(noteButton)

            var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
            var body = $("<div>").addClass("collapsible-body").append(span).append(buttonDiv);

            $li.append(title).append(body);

            return $li;
        });
        $("#savedResults").append($saves);
    });
};

var deleteAllSaved = function () {
    API.deleteAllSavedArt().then(function () {
        $("#savedResults").empty();
        API.getSaves().then(function (data) {
            var $saves = data.map(function (artic) {
                var $li = $("<li>");

                var deleteButton = $("<button>").addClass("buttonMargin btn-small waves-effect waves-light right deleteIt").attr("type", "submit").attr("name", "action").text("Delete From Saved");
                var noteButton = $("<button>").addClass("buttonMargin btn-small waves-effect waves-light modal-trigger right indigo addNote").attr("type", "submit").attr("name", "action").text("Add Note").attr("data-target", "modal1");

                var title = $("<div>").text(artic.title).addClass("collapsible-header");

                var buttonDiv = $("<div>").attr("data-id", artic._id).append(deleteButton).append(noteButton)

                var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
                var body = $("<div>").addClass("collapsible-body").append(span).append(buttonDiv);

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

                var deleteButton = $("<button>").addClass("buttonMargin btn-small waves-effect waves-light right deleteIt").attr("type", "submit").attr("name", "action").text("Delete From Saved");
                var noteButton = $("<button>").addClass("buttonMargin btn-small waves-effect waves-light modal-trigger right indigo addNote").attr("type", "submit").attr("name", "action").text("Add Note").attr("data-target", "modal1");

                var title = $("<div>").text(artic.title).addClass("collapsible-header");

                var buttonDiv = $("<div>").attr("data-id", artic._id).append(deleteButton).append(noteButton)

                var span = $("<a>").attr("href", artic.link).attr("target", "_blank").append($("<span>").text(artic.summary));
                var body = $("<div>").addClass("collapsible-body").append(span).append(buttonDiv);

                $li.append(title).append(body);

                return $li;
            });
            $("#savedResults").append($saves);
        });
    });
};

var addNote = function () {
    $("#modalHeader").empty();
    $("#oldNotes").empty();

    $("#textarea1").val("");
    M.textareaAutoResize($("#textarea1"));

    var id = $(this).parent().attr("data-id");
    API.getSavedArticle(id).then(function (data) {
        console.log(data);
        // console.log(data._id);
        $("#saveNote").attr("data-id", data._id);
        $("#modalHeader").append($("<h5>").text(data.title));

        var $row = $("<row>").append($("<div>").addClass("col s10").append($("<h6>").text(data.note.body)));
        var button = $("<div>").addClass("col s2").append($("<a>").addClass("waves-effect waves-light right btn-floating").attr("id", "clearSavedArticles").append($("<i>").addClass("material-icons red").text("close")))
        $row.append(button);


        $("#oldNotes").append($row);

    });
};

var saveNewNote = function () {
    // $("#modalHeader").empty();
    // $("#oldNotes").empty();

    var id = $(this).attr("data-id");
    console.log(id);
    var note = $("#textarea1").val().trim();
    console.log(note);

    API.saveNote(id, note).then(function (data) {
        console.log(data);
    });
    $("#textarea1").val("");
    M.textareaAutoResize($("#textarea1"));
};

$("#savedResults").on("click", ".deleteIt", deleteSavedArt);
$("#clearSavedArticles").on("click", deleteAllSaved);

$("#savedResults").on("click", ".addNote", addNote);

$("#saveNote").on("click", saveNewNote);