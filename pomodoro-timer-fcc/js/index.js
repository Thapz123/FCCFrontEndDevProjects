'use strict';
$(document).ready(function() {

    var display = document.getElementById("display");

    var toggleStart = 2,
        work = "",
        rest = "",
        mins = "",
        secs = "",
        time = "",
        on = false,
        init = true,
        rested = false;
    interval = 1000;
    retrieveValues();
    var interval = "";
    var stop_start = document.getElementById("start_stop");
    //Begin of function to get work time and rest time;
    //Begin of function to add padding for displaying
    function padding(num) {
        return (num >= 10 ? "" : "0") + num;
    }
    //End of function
    function retrieveValues() {
        work = document.getElementById("work");
        rest = document.getElementById("rest");

    }; //End of retrieveTime
    function decideMins(activity) {
        if (activity == "work") {
            mins = Number(work.innerHTML);

        } else if (activity == "rest") {
            mins = Number(rest.innerHTML);
            interval = setInterval(calculateTime, 1000);

        }

    }

    function calculateTime() {

        if (secs == 0 && mins != 0) {
            secs = 59;
            mins--;
        } else if (secs != 0) {
            secs--;
        } else if (mins == 0 && secs == 0) {
            clearInterval(interval);

            if (rested === false) {
                document.getElementById("start_stop_btn").innerText = "Start";
                toggleStart++;
                on = false;
                decideMins("rest");
                rested= true;
                
            }else if(rested===true){
              console.log("Rested")
               
            }

        }


        time = padding(mins) + ":" + padding(secs);
        rested ?  display.innerText="Continue? Click Start":display.innerText = time;
        
    };

    stop_start.addEventListener("click", function() {
        retrieveValues();
        rested=false;
        if (!on) {
            decideMins("work")

            on = true;
        }
        //Start of ToggleStart
        //console.log("ToggleStart " + toggleStart);
        if (toggleStart === 2) {
            document.getElementById("start_stop_btn").innerText = "Pause";
            toggleStart--;
            interval = setInterval(calculateTime, 1000);
        } else if (toggleStart === 1) {
            document.getElementById("start_stop_btn").innerText = "Start";
            toggleStart++;
            clearInterval(interval);
        }
        //End of ToggleStart

    })
    var add_rest = document.getElementById("add_rest"),
        add_work = document.getElementById("add_work"),
        minus_rest = document.getElementById("minus_rest"),
        minus_work = document.getElementById("minus_work");
    //Function to change rest time
    function changeRest(operation) {
        var temp = Number(rest.innerHTML);
        console.log("temp: " + temp);
        if (operation == "minus") {
            rest.innerHTML = temp - 1;
        } else if (operation == "add") {
            rest.innerHTML = temp + 1;
        }
    }
    add_rest.addEventListener("click", function() {
        changeRest("add");
    })
    minus_rest.addEventListener("click", function() {
            changeRest("minus");
        })
        //Function to change work time
    function changeWork(operation) {
        var temp = Number(work.innerHTML);
       // console.log("temp: " + temp);
        if (operation == "minus") {
            work.innerHTML = temp - 1;
        } else if (operation == "add") {
            work.innerHTML = temp + 1;
        }
    }
    add_work.addEventListener("click", function() {
        changeWork("add");
    })
    minus_work.addEventListener("click", function() {
        changeWork("minus");
    })

})
