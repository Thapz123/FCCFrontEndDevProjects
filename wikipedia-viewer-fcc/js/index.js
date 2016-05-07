function getRequest() {
  $.ajax({
    url: "http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srwhat=text&srsearch=hello",
    dataType: jsonp,
    success: function(data) {
      console.log(data);
    },
    error: function() {
      console.log("error");
    }

  })
}
var submitBtn= document.getElementById("submitBtn");
if(submitBtn){
  console.log(found);
}
var submitAction = submitBtn.addEventListener("click", getRequest);