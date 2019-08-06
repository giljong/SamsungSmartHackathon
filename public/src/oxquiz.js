$("h3").hide();
$("h4").hide();
$("h6").hide();
$(".pic").hide();
$("#retryButton").hide();
$("correct").hide();
$("wrong").hide();
function sfondo(color) {
    document.body.style.background = color;
}
;
$(document).ready(function () {
    $("#ask1").show();
    var correctPoints = 0;
    var counter = 10;
    var arr = [];
    var tot = "";
    var num = 1;
    var solutions = ["False", "False", "True", "False", "True", "True", "True", "False", "False", "False"];
    var interval = setInterval(function () {
        counter -= 0;
        $("#time").text(counter);
        if (counter == 6) {
            $("#timer").css("color", "yellow");
        }
        if (counter == 0 && num <= 10) {
            $("button").hide();
            $("h3").hide();
            $("#time").hide();
            $("h1").hide();
            $("#questionMark").hide();
            $("#timeout").show();
            $("#retryButton").show();
            sfondo("black");
        } //set timeout
    }, 1000); //set interval
    //false section start
    $("#F").click(function () {
        arr.push("False");
        $("#ans" + num).text("False");
        counter = 10;
        num += 1;
        tot = "ask" + num;
        if (num <= 10) {
            $(".question").hide();
            $("#" + tot).show();
        } //if continue
        else {
            $("button").hide();
            $("#time").hide();
            $("h3").show(); //domande
            $("h4").show(); //risposte date e titoli
            $("#retryButton").show();
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === solutions[i]) {
                    $("#correct" + i).show();
                    correctPoints += 1;
                } //if show correct solutions
                else {
                    $("#wrong" + i).show();
                } //else show wrong solutions
                $("#score").text("Score: " + correctPoints + "/10");
            } //for
            if (correctPoints >= 8) {
                $("#good").show();
                sfondo("linear-gradient(to top, rgba(35,40,30,0.13), rgba(35,40,30,0.13))");
            }
            else if (correctPoints > 4 && correctPoints < 8) {
                $("#normal").show();
                sfondo("linear-gradient(to top, rgba(35,40,30,0.13), rgba(35,40,30,0.13)");
            }
            else {
                $("#loser").show();
                sfondo("linear-gradient(to top, rgba(35,40,30,0.13), rgba(35,40,30,0.13)");
            }
        } //else test complete
    });
    //true section start
    $("#V").click(function () {
        arr.push("True");
        $("#ans" + num).text("True");
        num += 1;
        tot = "ask" + num;
        counter = 10;
        if (num <= 10) {
            $(".question").hide();
            $("#" + tot).show();
        } //if continue
        else {
            $("button").hide();
            $("#time").hide();
            $("h3").show(); //domande
            $("h4").show(); //risposte date e titoli
            $("#retryButton").show();
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === solutions[i]) {
                    $("#correct" + i).show();
                    correctPoints += 1;
                } //if show correct solutions
                else {
                    $("#wrong" + i).show();
                } // else show wrong solutions
                $("#score").text("Score " + correctPoints + " /10");
            } //for
            if (correctPoints >= 8) {
                $("#good").show();
                sfondo("linear-gradient(to top, rgba(35,40,30,0.13), rgba(35,40,30,0.13))");
            }
            else if (correctPoints > 4 && correctPoints < 8) {
                $("#normal").show();
                sfondo("linear-gradient(to top, rgba(35,40,30,0.13), rgba(35,40,30,0.13)");
            }
            else {
                $("#loser").show();
                sfondo("linear-gradient(to top, rgba(35,40,30,0.13), rgba(35,40,30,0.13)");
            }
        } // else test complete
    }); //V click
    $('#retryButton').click(function () {
        location.reload(false);
    });
}); //document ready
