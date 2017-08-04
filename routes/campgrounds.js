var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware");

//INDEX PAGE
router.get("/", function(req, res) {
    console.log(req.user);
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {data: allCampgrounds});
        }
    });
});

//NEW CAMPGROUND FORM
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//SHOW PAGE
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkUserOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkUserOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE CAMPGROUND ROUTE
router.delete("/:id", middleware.checkUserOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
            res.redirect("/");
        } else {
            req.flash("success", "Campground removed");
            res.redirect("/campgrounds");
        }
    });
});

//POST
router.post("/", middleware.isLoggedIn, function(req, res) {
    var newCampground = req.body.campground;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    newCampground.author = author;
    Campground.create(newCampground, function(err, newCampground) {
        if(err) {
            console.log(err);
        } else {
            console.log(newCampground);
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;
