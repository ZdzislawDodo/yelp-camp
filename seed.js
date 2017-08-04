var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    
var data = [
        {
            name: "Salmon's Creek",
            image: "https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ultricies magna, ac pretium leo. Phasellus tristique, metus a pulvinar vulputate, massa arcu rutrum turpis, bibendum condimentum magna quam at metus. Integer pellentesque ex enim, vel aliquam turpis dignissim sit amet. Maecenas tincidunt sed sem ut convallis. Quisque luctus dolor blandit orci interdum commodo. Etiam convallis malesuada justo. Vivamus ut posuere purus. Vivamus malesuada, mi lacinia faucibus facilisis, ante odio tincidunt enim, quis viverra eros diam et risus. Mauris tristique molestie ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed maximus, magna ac eleifend imperdiet, leo odio varius felis, at dapibus eros tortor eget dolor. Nam ac leo semper, laoreet arcu rhoncus, dapibus arcu. Ut placerat consequat lorem sodales malesuada.",
            author: {username: "Jamie", id: "3533636"}
        },
        {
            author: {username: "Sam", id: "364748583"},
            name: "Giant's Toe",
            image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ultricies magna, ac pretium leo. Phasellus tristique, metus a pulvinar vulputate, massa arcu rutrum turpis, bibendum condimentum magna quam at metus. Integer pellentesque ex enim, vel aliquam turpis dignissim sit amet. Maecenas tincidunt sed sem ut convallis. Quisque luctus dolor blandit orci interdum commodo. Etiam convallis malesuada justo. Vivamus ut posuere purus. Vivamus malesuada, mi lacinia faucibus facilisis, ante odio tincidunt enim, quis viverra eros diam et risus. Mauris tristique molestie ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed maximus, magna ac eleifend imperdiet, leo odio varius felis, at dapibus eros tortor eget dolor. Nam ac leo semper, laoreet arcu rhoncus, dapibus arcu. Ut placerat consequat lorem sodales malesuada."
        },
        {
            author: {username: "Unkown One", id: "66666666"},
            name: "Nihil Forest",
            image: "https://farm9.staticflickr.com/8041/7930201874_6c17ed670a.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget ultricies magna, ac pretium leo. Phasellus tristique, metus a pulvinar vulputate, massa arcu rutrum turpis, bibendum condimentum magna quam at metus. Integer pellentesque ex enim, vel aliquam turpis dignissim sit amet. Maecenas tincidunt sed sem ut convallis. Quisque luctus dolor blandit orci interdum commodo. Etiam convallis malesuada justo. Vivamus ut posuere purus. Vivamus malesuada, mi lacinia faucibus facilisis, ante odio tincidunt enim, quis viverra eros diam et risus. Mauris tristique molestie ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed maximus, magna ac eleifend imperdiet, leo odio varius felis, at dapibus eros tortor eget dolor. Nam ac leo semper, laoreet arcu rhoncus, dapibus arcu. Ut placerat consequat lorem sodales malesuada. HE COMES."
        },
    ];

function seedDb() {
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Campgrounds removed");
            data.forEach(function(seed) {
                Campground.create(seed, function(err, newCampground) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Campground created");
                        Comment.create({
                            author: {username: "Homer"},
                            text: "This place is so good!"
                        }, function(err, newComment) {
                            if(err) {
                                console.log(err);
                            } else {
                                newCampground.comments.push(newComment);
                                newCampground.save();
                                console.log("Created a new comment");
                            }
                        });
                    }
                });
            });
        }
    });
}

module.exports = seedDb;