$(document).ready(function() {
    getNewQuote();


    function getNewQuote() {
        $.ajax({
            url: "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en",
            /*
                  data: {
                    method: "getQuote",
                    format: "jsonp",
                    lang: "en"
                  },*/

            contentType: "application/json",
            jsonp: "jsonp",
            type: "GET",
            dataType: "jsonp",
            success: function(json) {

                var quote = $("#quote");
                var author = $("#author");
                quote.text(json.quoteText);
                author.text(json.quoteAuthor);
                createTweet();

            },
            error: function(xhr, status, errorThrown) {
                alert("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            }

        });

    }


    function createTweet() {
        var tweetQuote = $("#quote").text();
        if (tweetQuote.length > 140) {
            tweetQuote = tweetQuote.slice(0, 135) + "...";
        }
        var url = "https://twitter.com/intent/tweet?text=" + tweetQuote;
        addURL(url);
    };

    function addURL(url) {
        $(".tweet").attr("href", url);
    };
    $(".tweet").click(function(event) {
        var width = 575,
            height = 400,
            left = ($(window).width() - width) / 2,
            top = ($(window).height() - height) / 2,
            url = this.href,
            opts = 'status=1' +
            ',width=' + width +
            ',height=' + height +
            ',top=' + top +
            ',left=' + left;
        window.open(url, 'twitter', opts);
        return false;
    });

    $(".new-quote").click(function() {

        getNewQuote();



    });

});
