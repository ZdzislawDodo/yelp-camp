

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    flash = require("connect-flash"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    seedDb = require("./seed");

//ROUTES    
var indexRoutes = require("./routes/index.js"),
    campgroundRoutes = require("./routes/campgrounds.js"),
    commentRoutes = require("./routes/comments.js");
    
mongoose.connect(process.env.DATABASEURL);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
//POPULATE DB
// seedDb();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Shieeet",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.ID, function() {
    console.log("Yelp Camp Server is on");
})