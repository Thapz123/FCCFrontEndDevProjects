$(document).ready(function () {
    "use strict";
    //Move stuff that alters the data to controller
    //
    var model = {
        apiUrl: "https://api.twitch.tv/kraken/streams/",
        channels: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "conmster404"],
        baseUrl: "http://www.twitch.tv/",
        all: [],
        online: [],
        offline: [],
        currentStreamer: ""

    };
    var view = {
        //create the html

        source: function () {
            return $("#card_template").html();
        },
        template: function () {
            return Handlebars.compile(this.source());
        },
        createCard: function (cardObj) {
            var htmlTemp = this.template();
            var html = htmlTemp(cardObj);

            view.display.insertAdjacentHTML("beforeend", html);
        },
        display: document.getElementById("display")
    };
    var controller = {
        CreateStreamer: function (streamer) {
            this.username = streamer;
        },
        groupChannels: function (data) {

            if (data.stream) {
                return true;
            } else {
                return false;
            }


        },
        apiCall: function (url, stream) {
            var streamer = new controller.CreateStreamer(stream);

            //console.log("streamer:", streamer);
            $.ajax({
                url: url,
                dataType: "jsonp",
                error: function (jqXHR, textStatus, errorThrown) {
                    //display.textContent = "textStatus";
                    controller.generateIfNoUser(streamer);
                }, //Insert failure callBack which would do the account closed thing.
                success: function (data) {
                    console.log("streamer1: ", streamer);

                    if (data._links) {
                        controller.extractData(data, streamer);
                    } else {
                        console.log("No user Exists");
                        controller.generateIfNoUser(streamer);
                    }
                }

            });
        },
        generateIfNoUser: function (currentStreamer) {
            var data = {};
            data.src = "http://dummyimage.com/300.png/09f/fff";
            data.username = currentStreamer.username;
            data.link = model.baseUrl + currentStreamer;
            data.description = "User Doesn't Exist";
            data.online = false;
            model.all.push(data);
        },

        extractData: function (rawData, currentStreamer) {
            //console.log(currentStreamer);
            var data = {};
            if (this.groupChannels(rawData)) {
                var path = rawData.stream.channel;

                data.src = path.logo;
                data.username = path.name;
                data.link = path.url;
                data.description = path.game;
                data.online = true;
                model.online.push(data);
                model.all.push(data);


            } else {
                //console.log("currentStreamer:", controller.currentStreamer);
                data.username = currentStreamer.username;
                data.src = "http://dummyimage.com/300.png/09f/fff";

                data.link = model.baseUrl + currentStreamer.username;
                data.description = "Offline";
                data.online = false;
                model.offline.push(data);
                model.all.push(data);

            }

            //view.createCard(data);

        },
        //End of Api Call Function,
        generateUrl: function (streamers) { //Generates unique api call url for each streamer and calls the api with it
            console.log("");
            streamers.forEach(function (streamer) {
                var url = " https://api.twitch.tv/kraken/streams/" + streamer;
                controller.currentStreamer = streamer;
                console.log("url generated :" + url);

                controller.apiCall(url, streamer);
            });
        },
        init: function () {
            //console.log("Initialised");
            controller.generateUrl(model.channels);
        }

    };
    controller.init();
    //$("#all").click(apiCall(url));
    var nav = document.getElementById("nav").addEventListener("click", function (e) {

        if (e.target && e.target.matches("a#all")) {
            view.display.innerHTML = "";
            model.all.forEach(function (streamer) {
                view.createCard(streamer);
            });
        } else if (e.target && e.target.matches("a#online")) {
            view.display.innerHTML = "";
            model.online.forEach(function (streamer) {
                view.createCard(streamer);
            });
        } else if (e.target && e.target.matches("a#offline")) {
            //console.log("off clicked");
            view.display.innerHTML = "";
            model.offline.forEach(function (streamer) {
                view.createCard(streamer);
            });
        }
    });



});
