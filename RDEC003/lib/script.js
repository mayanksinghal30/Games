var levelsAttempted = 'L1';
var levelWiseStatus = '0';
var _levelWiseStatus = [];
var levelWiseScore = 0;
var levelWiseAttempt = 0;
var extraParameters = '';
var completed = 0;
var noOfLevels;
var lastLevelCleared;
var previousLevelLock=0;
var interactiveObj;
var totalTimeTaken=0;
var levelWiseTimeTaken = "";
var timer = [];
timer[0] = 0;
var counter = 0;
var currentQues = 0;
var parameterMissing = '';
var stripAdded = 0;
var stripToAdd = '';
var topPos = 0;
var leftPos = 0;
var displayPrompt = 0;
var attempts = 0;
var attemptQ1 = 0;
var attemptQ2 = 0;
var attemptQ3 = 0;
var tp = 0;
var animated = 0;
var animateFurther = 0;
var textAdded = 1;
var remedialAttempted = 0;

$(document).ready(function (e) {
    $(function () {
        interactiveObj = new questionInteractive();
        var imageArray = new Array('bg.png', 'sparkie.png', 'wall.png');
        var loader = new PxLoader();
        $.each(imageArray, function (key, value1) {
            var pxImage = new PxLoaderImage('../assets/' + value1);
            loader.add(pxImage);
        });
        loader.addCompletionListener(function () {
            loadXML("xml.xml", function () {
                $("#loader").hide();
                xmlText();
                if (counter > 0) {
                    $("#container").html(parameterMissing + " are missing");
                }
                else if (parseInt(lastLevelCleared) > 1) {
                    $("#container").show();
                    $("#container").html("lastLevelCleared parameter is not set properly..!!");
                }
                else {
                    $("#content").show();
                    $("#quest1").show();
                    currentQues++;
                    for (var temp = 1; temp <= 11; temp++) {
                        $("#container").append("<div class='strip2' id='s" + temp + "'></div>");
                    }
                    for (var temp = 1; temp <= 11; temp++) {
                        $("#container").append("<div class='strip3' id='sx" + temp + "'></div>");
                    }
                    setTimeout(function () {
                        $("#ans1").focus();
                    }, 200)
                    StartTimer();
                }

                $(".inp").forceNumeric();
                $(".inp").live('keypress', onKeyPress);
                $("#add").bind("click", function () {
                    if (stripAdded < 10) {
                        stripAdded++;
                        canvasText(Math.pow(10, currentQues));
                        $("#" + stripToAdd + stripAdded).show();
                        $("#" + stripToAdd + stripAdded).css({ "top": topPos + "px", "left": leftPos + "px" });
                        leftPos += tp;
                    }
                    else {
                        displayPrompt = 2;
                        $("#prompt").show();
                        if (currentQues == 1) {
                            $("#promptText").html("The orange strip is completely covered.<br /> You don't have to add any more tenths to cover it.<br />Click on submit to proceed.");
                        }
                        else {
                            $("#promptText").html("The tenth strip is completely covered.<br /> You don't have to add any more hundredths to cover it.<br />Click on submit to proceed.");
                        }
                    }
                });

                $("#remv").bind('click', function () {
                    if (stripAdded > 0) {
                        $("#" + stripToAdd + stripAdded).removeAttr("style");
                        leftPos -= tp;
                        stripAdded--;
                        canvasText(Math.pow(10, currentQues));
                    }
                });

                $("#nxt").bind('click', function () {
                    $("#total").hide();
                    $(".rem").remove();
                    $(".remove").remove();
                    $(".animT").hide();
                    remedialAttempted++;
                    animateFurther = 0;
                    if (remedialAttempted == 1) {
                        attemptQ1 = 0;
                        $(".strip3").removeAttr("style");
                        $(".strip2").removeAttr("style");
                        $("#strip1").removeAttr("style");
                        currentQues = 1;
                        attemptQ2 = 0;
                        attemptQ3 = 0;
                        attempts = 0;
                        animated = 0;
                        stripAdded = 0;
                        xmlText();
                        $("#ans1").show();
                        $("#ans1").css({ "border": "1px solid black" });
                        $("#ans2").css({ "border": "1px solid black" });
                        $("#ans3").css({ "border": "1px solid black" });
                        $("#ans1").attr({ "disabled": false, "value": "" });
                        setTimeout(function () {
                            $("#ans1").focus();
                        }, 200)
                        $("#quest2").hide();
                        $("#quest3").hide();
                        $("#nxt").hide();
                    }
                });

                $("#prompt").draggable({
                    containment: "#container"
                });

                $("#sbmt").bind('click', function () {
                    attempts++;
                    if (stripAdded == 10) {
                        displayPrompt = 6;
                        $("#sbmt").hide();
                        $("#remv").attr({ "disabled": true });
                        $("#add").attr({ "disabled": true });
                        $("#prompt").show();
                        $("#promptText").html("Well done!<br />Try answering the question again.");
                    }
                    else {
                        if (attempts == 1) {
                            displayPrompt = 2;
                            $("#prompt").show();
                            if (currentQues == 1) {
                                $("#promptText").html("You have not covered the orange strip completely with tenths.<br />Try again!");
                            }
                            else {
                                $("#promptText").html("You have not covered the tenth strip completely with hunderdths.<br />Try again!");
                            }
                        }
                        else {
                            displayPrompt = 3;
                            $("#prompt").show();
                            if (currentQues == 1) {
                                $("#promptText").html("You have not covered the orange strip completely.<br />The remaining strips are being placed for you.");
                            }
                            else {
                                $("#promptText").html("You have not covered the tenth strip completely.<br />The remaining strips are being placed for you.");
                            }
                        }
                    }
                });

                $("#kk").bind('click', function () {
                    $("#prompt").hide();
                    switch (displayPrompt) {
                        case 1:
                            $("#sbmt").attr({ "disabled": false });
                            $("#remv").attr({ "disabled": false });
                            $("#add").attr({ "disabled": false });
                            break;
                        case 3:
                            $("#add").hide();
                            $("#sbmt").hide();
                            $("#remv").hide();
                            stripAdded++;
                            if (currentQues == 2) {
                                $("#text2").html("Count the number of hundredths ( <div class='fraction'><div class='frac numerator'>1</div><div class='frac'>100</div></div>) that make a tenth.");
                            }
                            animation();
                            break;
                        case 4:
                            $("#ans" + currentQues).css({ "border": "1px solid black" });
                            $("#ans" + currentQues).attr({ "value": "", "disabled": false });
                            setTimeout(function () {
                                $("#ans" + currentQues).focus();
                            }, 200)
                            break;
                        case 5:
                            if (currentQues == 1) {
                                $(".strip2").removeAttr("style");
                                $(".strip2").show();
                            }
                            else {
                                $(".strip3").removeAttr("style");
                                $(".strip3").show();
                            }
                            stripAdded = 1;
                            textAdded = 1;
                            $("#text1").html("");
                            $("#text1").removeAttr("style");
                            textAnim();
                            animation();
                            break;
                        case 6:
                            $("#ans" + currentQues).attr({ "value": "", "disabled": false });
                            $("#ans" + currentQues).css({ "border": "1px solid black" });
                            setTimeout(function () {
                                $("#ans" + currentQues).focus();
                            }, 200)
                            //document.getElementById("ans" + currentQues).focus();
                            break;
                        case 7:
                            $("#ans3").attr({ "value": "", "disabled": false });
                            setTimeout(function () {
                                $("#ans3").focus();
                            }, 200)
                            break;
                        case 8:
                            animation3();
                            break;
                        case 10:
                            $("#content").hide();
                            $("#thank").show();
                            completed = 1;
                            levelWiseStatus = "1";
                    }
                })
            });
        });
        loader.start();
    });
});

function StartTimer() {
    var timer1 = [];
    var i = 0;
    var j = 0;
    if (completed != 1) {
        CounterForInterval = setInterval(function () {
            
            //levelWiseTimeTaken = "";
            //levelWiseTimeTaken += timer;
            levelWiseTimeTaken++;
        }, 1000);
    }    
    else {
        clearInterval(CounterForInterval);
    }

}

function onKeyPress(e) {
    var key = e.which || e.keyCode;
    if ($(this).val().length > 3 && key != 8 && key != 13) {
        e.preventDefault();
    }
    else {
        if (key == 13 && $(this).val().length > 0) {
            switch (currentQues) {
                case 1:
                    if ($(this).val() == 10) {
                        currentQues++;
                        attemptQ1 = 0;
                        attempts = 0;
                        stripAdded = 0;
                        $("#strip1").hide();
                        $(".strip2").hide();
                        $("#add").hide();
                        $("#remv").hide();
                        $("#sbmt").hide();
                        $("#cntr").hide();
                        $("#total").hide();
                        $("#scaleText").hide();
                        $("#quest2").show();
                        $("#ans1").css({ "border": "1px solid green" });
                        $("#ans1").attr({ "disabled": true });
                        $("#ans2").show();
                        $("#ans2").attr({ "disabled": false, "value": "" });
                        setTimeout(function () {
                            $("#ans2").focus();
                        }, 200);
                        $("#quest1").append("<span class='rem'><br /> 10 tenths (or 10 &#215; <div class='fraction'><div class='frac numerator'>1</div><div class='frac'>10</div></div>) make a whole or 1.</span>");
                    }
                    else {
                        tp = 70;
                        attemptQ1++;
                        checkQ1();
                    }
                    break;
                case 2:
                    if ($(this).val() == 10) {
                        currentQues++;
                        attempts = 0;
                        $("#quest3").show();
                        $("#ans2").attr({ "disabled": true });
                        $("#ans3").show();
                        $("#ans3").attr({ "disabled": false, "value": "" });
                        setTimeout(function () {
                            $("#ans3").focus();
                        }, 200);
                        $("#scaleText").hide();
                        $("#cntr").hide();
                        $("#text2").hide();
                        $(".strip2").hide();
                        $("#add").hide();
                        $("#remv").hide();
                        $(".strip3").hide();
                        $("#ans2").css({ "border": "1px solid green" });
                        $("#quest2").append("<span class='rem'><br />10 hundredths (or 10 &#215;<div class='fraction'><div class='frac numerator'>1</div><div class='frac'>100</div></div>) make a tenths or <div class='fraction'><div class='frac numerator'>1</div><div class='frac'>10</div></div>.</span>");
                    }
                    else {
                        tp = 7;
                        attemptQ2++;
                        checkQ2();
                    }
                    break;
                case 3:
                    if ($(this).val() == 100) {
                        currentQues++;
                        attempts = 0;
                        $("#prompt").show();
                        $("#promptText").html("Suberb!!");
                        displayPrompt = 10;
                        $("#ans3").attr({ "disabled": true });
                        $("#ans3").css({ "border": "1px solid green" });
                        $("#prompt").css({ "width": "150px" });
                        $("#sparkie").css({ "position": "absolute" });
                        $("#kk").css({ "margin-top": "16px", "margin-left": "61px" });
                        $("#promptText").css({ "margin-left": "63px", "margin-top": "43px" });
                        //$("#quest3").html("10 tenths (or 10 * 1/10) make a whole or 1");
                    }
                    else {
                        checkQ3();
                    }
                    break;
            }
            e.preventDefault();
        }
    }
    
}

function questionInteractive() {
    if (typeof getParameters['noOfLevels'] == "undefined") {
        counter++;
        parameterMissing += ' noOfLevels ';
    }
    else {
        noOfLevels = getParameters['noOfLevels'];
        if (noOfLevels > 3) {
            $("#container").show();
            $("#container").html("noOfLevels parameter is not correct");
        }
    }
    if (typeof getParameters['lastLevelCleared'] == "undefined") {
        counter++;
        parameterMissing += ' lastLevelCleared ';
    }
    else {
        lastLevelCleared = parseInt(getParameters['lastLevelCleared']);
    }
    if (typeof getParameters['previousLevelLock'] == "undefined") {
        counter++;
        parameterMissing += ' previousLevelLock ';
    }
    else {
        previousLevelLock = parseInt(getParameters['previousLevelLock']);
    }
    if (typeof getParameters['numberLanguage'] == "undefined") {
        this.numberLanguage = "english";
    }
    else {
        this.numberLanguage = getParameters['numberLanguage'];
    }
    if (typeof getParameters['language'] == "undefined") {
        this.language = "english";
    }
    else {
        this.language = getParameters['language'];
    }
}

jQuery.fn.forceNumeric = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.which || e.keyCode;
            if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
            // numbers
            key >= 46 && key <= 57 ||
            // Numeric keypad
            key >= 96 && key <= 105 ||
            // Backspace and Tab 
            key == 8 || key == 9 || key == 13 ||
            // Home and End
            key == 35 || key == 36 ||
             // left and right arrows
            key == 37 || key == 39 || key == 14 || key == 15 || key == 188 || key == 110 || key == 190 || key == 191 || key == 114) 
            //alert(key);
            return true;
            
            return false;
            
        });
    });
}

function xmlText() {
    $("#q1text").html("How many tenths make a one?");
    $("#q2text").html("How many hundredths make a tenth?");
    $("#q3text").html("How many hundredths make a one?");
    $("#remedial_title").html(promptArr['game']);
    $("#landing_title").html(promptArr['game']);
    $(".game_name").html(promptArr['trtcrd']);
    $("#level").html(promptArr['level']);
    $("#question").html(promptArr['qustn']);
    $("#hnt").html(promptArr['ht']);
    $("#pl").html('SCORE : '+replaceDynamicText(0, interactiveObj.numberLanguage, ""));
    $("#hnt").html(promptArr['ht']);
    $("#instructions").html(promptArr['wd'] + "<br />" + promptArr['mvon']);
    $("#kk_text").html(promptArr['k']);
    $("#click11").append(promptArr['lvl'] + " " + replaceDynamicText(1, interactiveObj.numberLanguage, ""));
    $("#click12").append(promptArr['lvl'] + " " + replaceDynamicText(2, interactiveObj.numberLanguage, ""));
    $("#click13").append(promptArr['lvl'] + " " + replaceDynamicText(3, interactiveObj.numberLanguage, ""));
}

function drawCanvas() {
    $("#cnvsTxt1").html("0");
    if (currentQues == 1) {
        $("#cnvsTxt2").html("1");
    }
    else { 
        $("#cnvsTxt2").html("<div class='fraction'><div class='frac numerator'>1</div><div class='frac'>10</div></div>");
    }
    var c = $("#cntrCanvas");
    c[0].width = 350;
    c[0].height = 150;
    var ctx = c[0].getContext("2d");
    ctx.strokeStyle = "#006600";
    ctx.lineWidth = "1px";
    ctx.moveTo(30, 65);
    ctx.lineTo(302, 65);
    ctx.stroke();
    for (var i = 0; i <= 10; i++) {
        var temp = 31 + i * 27;
        if (i == 9) {
            temp = 272;
        }
        ctx.moveTo(temp, 65);
        ctx.lineTo(temp, 85);
        ctx.stroke();
    }
}

function checkQ1() {
    topPos = 300;
    leftPos = 50;
    stripToAdd = 's';
    $("#ans1").css({ "border": "1px solid red" });
    $("#ans1").attr({ "disabled": true });
    $("#cntr").show();
    $("#cnvs").html("");
    $("#cnvs1").html("");
    $("#prompt").show();
    if (attemptQ1 == 1) {
        displayPrompt = 1;
        $("#promptText").html("That's incorrect.<br />Add the tenths to the orange strip of length one to see how many tenths make a one.")
        $("#strip1").show();
        $(".strip2").show();
        $("#scaleText").show();
        $("#total").show();
        $("#add").show();
        $("#remv").show();
        $("#sbmt").show();
        drawCanvas();
    }
    else {
        displayPrompt = 5;
        $("#ans" + currentQues).css({ "border": "1px solid red" });
        $("#promptText").html("Let's look at the animation below.");
    }
}

function checkQ2() {
    topPos = 426;
    leftPos = 25;
    stripToAdd = 'sx';
    $("#s11").removeAttr("style");
    $("#s11").show();
    $("#ans2").attr({ "disabled": true });
    $("#ans2").css({ "border": "1px solid red" });
    $("#cntr").show();
    $("#cnvs").html("");
    $("#cnvs1").html("");
    $("#prompt").show();
    if (attemptQ2 == 1) {
        displayPrompt = 1;
        $("#promptText").html("That's incorrect.<br />Add the hundredths to the tenths to see how many hundredths make a tenth.")
        $("#s11").show();
        $(".strip3").show();
        $("#scaleText").html("one-hunderdth");
        $("#scaleText").show();
        $("#scaleText").css({ "top": "509px", "left": "15px" });
        $("#add").show();
        $("#remv").show();
        $("#sbmt").show();
        drawCanvas();
    }
    else {
        displayPrompt = 5;
        $("#promptText").html("Let's look at the animation below.");
    }
}

function animation() {
    var l = 50 + (20 * (currentQues - 1)) + (stripAdded - 1) * tp;
    if (currentQues == 2) { 
        var l = 5 + (20 * (currentQues - 1)) + (stripAdded - 1) * tp;
    }
    if(currentQues == 3){
        $("#total").show();
        if (animated == 1) {
            l = 25 + (stripAdded - 1) * tp;
        }
        else { 
            l = 50 + (stripAdded - 1) * tp;
        }
    }
    if (stripToAdd == 'sx' && currentQues == 3) {
        $("#animTxt1").show();
        $("#animTxt2").show();
        setTimeout(function(){
            $("#animTxt1").html(stripAdded + " hundredths.");    
        }, 900)
    }
    else if(currentQues == 3){ 
        $("#animTxt3").show();
        $("#animTxt5").show();
        $("#animTxt6").show();
        setTimeout(function(){
            $("#animTxt5").html(stripAdded + " tenths");
            $("#animTxt6").html(10*stripAdded + " hundredths");    
        }, 900)
    }
    $("#" + stripToAdd + stripAdded).show();
    $("#" + stripToAdd + stripAdded).animate({
        'top': topPos + "px",
        'left': l + "px"
    }, 1000, function () {
        if (stripAdded <= 10) {
            canvasText(Math.pow(10, currentQues));
        }
        if (stripAdded < 10) {

            stripAdded++;
            leftPos += tp;
            animation();
        }
        else {
            if (currentQues == 3) {
                if (animateFurther == 0) {
                    for (var temp = 1; temp <= 11; temp++) {
                        for (var temp1 = 1; temp1 <= 10; temp1++) {
                            var temp2 = $("#sx" + temp1).clone();
                            $(temp2).addClass("remove");
                            $("#s" + temp).append(temp2);
                            if (temp == 11) {
                                $("#s" + temp).css({ "z-index": 3 });
                            }
                        }
                    }
                    $(".strip3").css({ "position": "static", "float": "left", "box-sizing": "border-box", "border": "0px solid", "border-left": "1px solid" });
                    $(".strip2").css({"height":"22px","width":"72px"});
                    $("#strip1").css({"height":"22px"});                    
                    $("#s11").css({ "z-index": -1 });
                    $("#sx11").removeAttr("style");
                    $("#sx11").show();
                }
                animateFurther++;
                anim();
                return;
            }
            if (attemptQ1 == 1 || attemptQ2 == 1) {
                displayPrompt = 4;
                $("#prompt").show();
                $("#promptText").html("Try answering the question again.");

            }
            else {
                setTimeout(function () {
                    currentQues++;
                    stripAdded = 0;
                    attempts = 0;
                    attemptQ1 = 0;
                    $(".strip2").hide();
                    $("#strip1").hide();
                    $("#cntr").hide();
                    $("#add").hide();
                    $("#remv").hide();
                    $("#scaleText").hide();
                    $("#total").hide();
                    $("#text1").hide();
                    if (currentQues == 2) {
                        $("#quest2").show();
                        $("#total").hide();
                        $("#ans2").show();
                        $("#ans2").attr({ "disabled": false, "value": "" });
                        setTimeout(function () {
                            $("#ans2").focus();
                        }, 200)
                        $("#quest1").append("<span class='rem'><br />10 tenths (or 10 &#215;<div class='fraction'><div class='frac numerator'>1</div><div class='frac'>10</div></div>) make a whole or 1.</span>");
                        $("#ans1").css({ "border": "1px solid blue" });
                        $("#ans1").attr({ "disabled": true, "value": "10" });
                    }
                    else {
                        $(".strip3").hide();
                        $(".strip2").hide();
                        $("#text2").hide();
                        $("#text1").hide();
                        $("#quest3").show();
                        $("#ans3").show();
                        $("#ans3").attr({ "disabled": false, "value": "" });
                        setTimeout(function () {
                            $("#ans3").focus();
                        }, 200);
                        $("#ans2").css({ "border": "1px solid blue" });
                        $("#ans2").attr({ "disabled": true, "value": "10" });
                        $("#add").hide();
                        $("#remv").hide();
                        $("#quest2").append("<span class='rem'><br />10 hundredths (or 10 &#215;<div class='fraction'><div class='frac numerator'>1</div><div class='frac'>100</div></div>) make a tenths or <div class='fraction'><div class='frac numerator'>1</div><div class='frac'>10</div></div>.</span>");
                    }
                }, 1000);
            }
        }
    });
     
}

function checkQ3() {
    attemptQ3++;
    if (attemptQ3 == 1) {
        $("#prompt").show();
        $("#promptText").html("Look at the sentences above and try answering the question again.");
        var i = 0;
        function blink() {
            
            if (i % 2 == 0) {
                $("#quest1").hide();
                $("#quest2").hide();
            }
            else {
                $("#quest1").show();
                $("#quest2").show();
                $("#total").hide();
            }
            setTimeout(function () {
                if (i <= 6) {
                    i++;
                    blink();
                }
            }, 500)
        }
        blink();
        $("#ans3").attr({ "disabled": true });
        displayPrompt = 7;
    }
    else {
        displayPrompt = 8;
        $("#prompt").show();
        $("#ans3").attr({ "disabled": true });
        $("#ans3").css({ "border": "1px solid red" });
        $("#promptText").html("That's incorrect.<br />Let's look at the animation below.");
    }
}

function animation3() {
    animated++;
    $("#ans3").attr({ "disabled": true });
    $("#strip1").show();
    $(".strip2").removeAttr("style");
    $(".strip3").removeAttr("style");
    $(".strip2").show();
    $(".strip3").show();
    stripToAdd = 'sx';
    stripAdded = 1;
    topPos = 426;
    leftPos = 50;
    tp = 7;
    animation();
}

function anim() {
    animated++;
    if (animateFurther == 1) {
        stripToAdd = 's';
        stripAdded = 1;
        topPos = 300;
        leftPos = 50;
        tp = 70;
        animation();
    }
    else {
        setTimeout(function () {
            $("#ans3").attr({ "value": "100" });
            $("#ans3").css({ "border": "1px solid blue" });
            setTimeout(function () {
                $("#thank").show();
                $("#content").hide();
                $(".strip2").hide();
                $(".strip3").hide();
                completed = 1;
                levelWiseStatus = "1";
            }, 1000)
            return;
        }, 6000)
        setTimeout(function () {
            $("#animTxt4").show();
        }, 2000)
    }
}

function textAnim() {
    if (currentQues == 1) {
        if (textAdded == 1) {
            $("#text1").append("<span style='margin-left:35px'>" + textAdded + "</span>");
            textAdded++;
            setTimeout(function () {
                textAnim();
            }, 1500)
        }
        else {
            if (textAdded <= 10) {
                $("#text1").append("<span style='margin-left:60px'>" + textAdded + "</span>");
                textAdded++;
                setTimeout(function () {
                    textAnim();
                }, 1000)
            }
        }
    }
    else { 
        if (textAdded == 1) {
            $("#text1").css({ "position": "absolute", "left": "0px", "top": "403px", "font-size": "10px", "color": "blue" });
            $("#text1").append("<span style='margin-left:26px'>" + textAdded + "</span>");
            textAdded++;
            setTimeout(function () {
                textAnim();
            }, 1500)
        }
        else {
            if (textAdded <= 10) {
                $("#text1").append("<span style='margin-left:1px'>" + textAdded + "</span>");
                textAdded++;
                setTimeout(function () {
                    textAnim();
                }, 1000)
            }
        }
    }
}

function canvasText(a) {
    $("#cnvs").html("");
    if (currentQues == 1) {
        var wid = "15px";
    }
    else {
        var wid = "19px";
    }
    for (var i = 0; i < stripAdded; i++) {
        $("#cnvs").append("<div class='fraction' style='margin-left:10px;width:" + wid + "'><div class='farc numerator'>1</div><div class='frac'>" + a + "</div></div>");
    }
    $("#cnvs1").html("= <div class='fraction' style='margin-left:10px'><div class='farc numerator'>"+stripAdded+"</div><div class='frac'>"+a+"</div></div>")
    $(".fraction").css({ "margin-left": "0px", "margin-right": "12px" });
    $(".frac").css({ "padding": "0px", "padding-left": "0px", "padding-right": "0px" });
    if (currentQues == 2) {
        $(".fraction").css({ "margin-left": "0px", "margin-right": "8px", "width": "19px" });
        $("#cnvs,#cnvs1").css({ "font-size": "12px" });
    }
}

function anim3Txt() {
    $("#animTxt2").show();
    $("#animTxt1").show();
}