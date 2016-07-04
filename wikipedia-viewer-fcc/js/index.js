function getRequest() {
    var text = document.getElementById("text").value;
    var display = document.getElementById("display");
    display.innerHTML="";
    $.ajax({
        url: "http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srwhat=text&srsearch=" + text,
        dataType: "jsonp",
        success: function(response) {
            response.query.search.forEach(function(curr) {
                //console.log(curr);
                var searchItem = document.createElement('div');
                searchItem.className='display';
                var href= "https://en.wikipedia.org/wiki/"+curr.title;
                var title = document.createElement("h4");
                var link= document.createElement("a");
                title.textContent=curr.title;
                link.setAttribute("href", href);
                link.appendChild(title);
                link.className='title';
                console.log(link);
                var snippet = document.createElement("p");
                snippet.innerHTML=curr.snippet;
                searchItem.appendChild(link);
                searchItem.appendChild(snippet);
                //console.log(searchItem);
                display.appendChild(searchItem);

            });
        },
        error: function() {
            console.log("error");
        }

    });
}
function goToRandom(){
  window.open("https://en.wikipedia.org/wiki/Special:Random","wiki_page");
}
var submitBtn = document.getElementById("submitBtn");

var randomBtn= document.getElementById("randomBtn");
var randomAction= randomBtn.addEventListener("click",goToRandom);
var submitAction = submitBtn.addEventListener("click", getRequest);
