var gameObj;
var completed = 0;
var extraParameters ='';
var getParameters;
var levelWiseMaxScores = "0";
var lastLevelCleared;
var previousLevelLock;
var levelsAttempted= "L1"; //"L1|L2|L3";
var levelWiseStatus = "0";//0|1|2 – 0: In progress, 1: Pass, 2: Fail
var levelWiseScore = 0;
var levelWiseTimeTaken= "";//250|120 (in seconds)
var numberLanguage;
var idDisabled = '';
var correctlyAnswered = 0;

$(document).ready(function (e) {
    $('select').change(function () {
        if (gameObj.currentScreen == 1) {
            if ($("#Q1DD" + gameObj.currentDD + " option:selected").text() == gameObj.AnswerForQ1DD) {
                gameObj.isAnswerCorrect = 1;
                $(this).attr('disabled', true).addClass('GreenBorder');
                generateValues(1);
            }
            else {
                gameObj.noOfAttempt++;
                $(this).attr('disabled', true).addClass('RedBorder');
                $(".high").show();
                if (gameObj.optionSelected[0] == "+") {
                    $("#highLight1").css({ "top": "153px" });
                }
                else {
                    $("#highLight1").removeAttr("style");
                    $("#highLight1").show();
                }
                if (gameObj.noOfAttempt == 1) {
                    $('#msg1').html(replaceDynamicText(promptArr['p_1'], gameObj.numberLanguage, 'gameObj'));
                }
                else {
                    if (gameObj.optionSelected[0] == "+")
                        $('#msg1').html(replaceDynamicText(promptArr['p_2'], gameObj.numberLanguage, 'gameObj') + " <br />So, " + gameObj.optionSelected[0] + "(" + gameObj.optionSelected[1] + replaceDynamicText(gameObj.numberSelected, gameObj.numberLanguage, 'gameObj') + ") is " + gameObj.AnswerForQ1DD + ".");
                    else if (gameObj.optionSelected[0] == "-")
                        $('#msg1').html(replaceDynamicText(promptArr['p_3'], gameObj.numberLanguage, 'gameObj') + " <br />So, " + gameObj.optionSelected[0] + "(" + gameObj.optionSelected[1] + replaceDynamicText(gameObj.numberSelected, gameObj.numberLanguage, 'gameObj') + ") is " + gameObj.AnswerForQ1DD + ".");
                }
                gameObj.ShowMsgBox();
            }
        }
    });

    $('#Q1Next').click(function () {
        if (gameObj.previousClicked == 0)
            ShowScreen(2);
        else {
            gameObj.previousClicked = 0;
            $('#Q1').hide();
            $('#Q2').fadeIn('slow');
            $('#Q1T0').html(replaceDynamicText(quesArr["q_3"], gameObj.numberLanguage, 'gameObj'));
        }
    });

    $('#Q2Prev').click(function () {
        $('#Q1T0').html(replaceDynamicText(quesArr["q_1"], gameObj.numberLanguage, 'gameObj'));
        gameObj.previousClicked = 1;
        $('#Q2').hide();
        $('#Q1').fadeIn('slow');
    });

    $('#Q2Next').click(function () {
        if (gameObj.previousClicked == 0)
            ShowScreen(3);
        else {
            gameObj.previousClicked = 0;
            $('#Q2').hide();
            $('#Q3').fadeIn('slow');
            $('#Q1T0').html(replaceDynamicText(quesArr["q_4"], gameObj.numberLanguage, 'gameObj'));
            $('#Q1Header').html('');
        }
    });

    $('#Q3Prev').click(function () {
        $('#Q1T0').html(replaceDynamicText(quesArr["q_3"], gameObj.numberLanguage, 'gameObj'));
        $('#Q1Header').html(replaceDynamicText(instArr["i_1"], gameObj.numberLanguage, 'gameObj'));
        gameObj.previousClicked = 1;
        $('#Q3').hide();
        $('#Q2').fadeIn('slow');
    });

    $('#Q3Next').click(function () {
        if (gameObj.previousClicked == 0)
            ShowScreen(4);
        else {
            gameObj.previousClicked = 0;
            $('#Q3').hide();
            $('#Q4').fadeIn('slow');
            $('#Q1Header').html(replaceDynamicText(quesArr["q_5"] + '&nbsp;<input type="text" class="textbox disabled" disabled value="+6-3"/>&nbsp;=&nbsp;<input type="text" class="textbox disabled" disabled value="3"/>', gameObj.numberLanguage, 'gameObj'));
            $('#Q1T0').html(replaceDynamicText(quesArr["q_6"] + '&nbsp;<input type="text" class="textbox disabled" disabled value="+6-3"/>&nbsp;=&nbsp;<input type="text" class="textbox disabled" disabled value="3"/>', gameObj.numberLanguage, 'gameObj'));
        }
    });

    $('#Q4Prev').click(function () {
        $('#Q1T0').html(replaceDynamicText(quesArr["q_4"], gameObj.numberLanguage, 'gameObj'));
        $('#Q1Header').html('');
        gameObj.previousClicked = 1;
        $('#Q4').hide();
        $('#Q3').fadeIn('slow');
    });
});

/* Constructor created */
function REM() {
    $("#MsgBox").draggable({ containment: "#container", scroll: false });
    getParameters = getURLParameters();
    if (typeof getParameters['numberLanguage'] == "undefined")
        this.numberLanguage = 'english';
    else
        this.numberLanguage = getParameters['numberLanguage'];

    this.IsIpad = 0;
    this.IsTbBlank = 0; 		// If the textbox is blank, the values is set to 1.
    this.CounterForTime = 0;
    this.currentScreen;
    this.rangeForQ1 = arrayShuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
    this.rangeForQ2 = arrayShuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
    this.rangeForQ3 = arrayShuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    this.rangeForQ4 = arrayShuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    this.optionsForQ1 = arrayShuffle(["--", "++", "+-", "-+"]);
    this.optionsForQ2 = arrayShuffle(["--", "++", "+-", "-+"]);
    this.optionsForQ3 = arrayShuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]); //[1,2,3,4,5,6,7,8,9]
    this.optionsForQ4 = arrayShuffle(["--", "++", "+-", "-+"]);
    this.numberSelected;
    this.numberSelected2;
    this.optionSelected;
    this.AnswerForQ1DD;
    this.AsnwerForQ2TB;
    this.currentDD = 0;
    this.noOfAttempt = 0;
    this.previousClicked = 0;
    this.totalQuestionsAttempted = 0;
    this.questionString; 			// -(-5) is one of the examples
    this.AsnwerForQ2TB;
    this.poolOfCorrectAnswers = new Array();
    this.type; 						// Stores the type of question : -- ++ -+ +- 
    this.Prompt1;
    this.Prompt2;
    this.checkForThisIncorrectValueInQ3;
    this.FinalAnswerForQ3
    this.totalCorrectAnswers = 0;
    this.Q2CorrectTypes = [0, 0, 0, 0];
}

REM.prototype.loadHome = function () {
    if (osDetection())
        gameObj.IsIpad = 1;
    $('#container').fadeIn(200);
    $('#PreLoader').css({ 'display': 'none' });
    gameObj.fillXMLData();
    StartTimer();
    ShowScreen(1);
}

REM.prototype.fillXMLData = function () {
    $('#dragText').html(miscArr["drag"]);
    $('#ok').html(miscArr["ok"]);
    $('.submit').html(miscArr["submit"]);
    $('.next').val(miscArr["next"]);
    $('.previous').val(miscArr["previous"]);

    $('#Q1Header').html(replaceDynamicText(instArr["i_1"], gameObj.numberLanguage, 'gameObj'));
    $('#Q1T0').html(replaceDynamicText(quesArr["q_1"], gameObj.numberLanguage, 'gameObj'));
}

function ShowScreen(No) {
    gameObj.currentScreen = No;
    switch (No) {
        case 1:
            $('#Q1').fadeIn('slow');
            generateValues(No);
            break;
        case 2:
            $('#Q1').hide();
            $('#Q2').fadeIn('slow');
            $('#Q1T0').html(replaceDynamicText(quesArr["q_3"], gameObj.numberLanguage, 'gameObj'));
            $('#sampleText').html(replaceDynamicText(miscArr["m_3"], gameObj.numberLanguage, 'gameObj'));
            generateValues(No);
            break;
        case 3:
            $('#Q2').hide();
            $('#Q3').fadeIn('slow');
            $('#Q1T0').html(replaceDynamicText(quesArr["q_4"], gameObj.numberLanguage, 'gameObj'));
            $('#Q1Header').html('');
            gameObj.totalQuestionsAttempted = 0;
            $('#sampleText3_1').html(replaceDynamicText(miscArr["m_4"], gameObj.numberLanguage, 'gameObj'));
            $('#sampleText3_2').html(replaceDynamicText(miscArr["m_5"], gameObj.numberLanguage, 'gameObj'));
            generateValues(No);
            break;
        case 4:
            $('#Q3').hide();
            $('#Q4').fadeIn('slow');
            $('#Q1Header').html(replaceDynamicText(quesArr["q_5"] + '&nbsp;<input type="text" class="textbox disabled" disabled value="+6-3"/>&nbsp;=&nbsp;<input type="text" class="textbox disabled" disabled value="3"/>', gameObj.numberLanguage, 'gameObj'));
            $('#Q1T0').html(replaceDynamicText(quesArr["q_6"] + '&nbsp;<input type="text" class="textbox disabled" disabled value="+6-3"/>&nbsp;=&nbsp;<input type="text" class="textbox disabled" disabled value="3"/>', gameObj.numberLanguage, 'gameObj'));
            gameObj.totalCorrectAnswers = 0;
            gameObj.totalQuestionsAttempted = 0;
            generateValues(No);
            break;
    }
}

function generateValues(No) {
    switch (No) {
        case 1:
            {
                if (gameObj.optionsForQ1.length > 0) {
                    gameObj.currentDD++;
                    $('#DDContainer1_' + gameObj.currentDD).fadeIn('slow');
                    gameObj.noOfAttempt = 0;
                    gameObj.numberSelected = gameObj.rangeForQ1.pop();
                    gameObj.optionSelected = gameObj.optionsForQ1.pop();
                    switch (gameObj.optionSelected) {
                        case "--":
                            {
                                gameObj.AnswerForQ1DD = miscArr["m_2"] + gameObj.optionSelected[1] + gameObj.numberSelected;
                                break;
                            }
                        case "++":
                            {
                                gameObj.AnswerForQ1DD = miscArr["m_1"] + gameObj.optionSelected[1] + gameObj.numberSelected;
                                break;
                            }
                        case "-+":
                            {
                                gameObj.AnswerForQ1DD = miscArr["m_2"] + gameObj.optionSelected[1] + gameObj.numberSelected;
                                break;
                            }
                        case "+-":
                            {
                                gameObj.AnswerForQ1DD = miscArr["m_1"] + gameObj.optionSelected[1] + gameObj.numberSelected;
                                break;
                            }
                    }
                    if (gameObj.numberSelected < 9) {
                        
                        var str = gameObj.optionSelected[0] + "(" + gameObj.optionSelected[1] + gameObj.numberSelected + "&nbsp;) ";
                    }
                    else {
                        var str = gameObj.optionSelected[0] + "(" + gameObj.optionSelected[1] + gameObj.numberSelected + ") ";
                    }
                    $('#Q1T' + gameObj.currentDD).html(replaceDynamicText(str + quesArr["q_2"], gameObj.numberLanguage, 'gameObj'));

                    $('#Q1DD' + gameObj.currentDD).html('<option>' + replaceDynamicText(miscArr['select'], gameObj.numberLanguage, 'gameObj') + '</option>');
                    var tempArr = new Array();
                    tempArr = arrayShuffle([miscArr['m_1'] + gameObj.optionSelected[1] + gameObj.numberSelected, miscArr['m_2'] + gameObj.optionSelected[1] + gameObj.numberSelected]);
                    for (var i = 0; i < 2; i++) {
                        $('#Q1DD' + gameObj.currentDD).append('<option>' + replaceDynamicText(tempArr[i], gameObj.numberLanguage, 'gameObj') + '</option>');
                    }
                }
                else {
                    $('#Q1Next').fadeIn('slow');
                    gameObj.optionsForQ1 = arrayShuffle(["--", "++", "+-", "-+"]); 	// re using the same in Q2
                }
                break;
            }
        case 2:
            {
                if (gameObj.optionsForQ2.length > 0) {
                    // Counting if all 4 types of questions are done or not
                    var cnt = 0;
                    for (var i = 0; i < 4; i++) {
                        if (gameObj.Q2CorrectTypes[i] == 1)
                            cnt++;
                    }

                    if (cnt == 4)
                        $('#Q2Next').fadeIn('slow');
                    else {
                        gameObj.totalQuestionsAttempted++;
                        gameObj.noOfAttempt = 0;
                        gameObj.numberSelected = gameObj.rangeForQ2.pop();
                        gameObj.optionSelected = gameObj.optionsForQ2.pop();
                        gameObj.questionString = gameObj.optionSelected[0] + "(" + gameObj.optionSelected[1] + gameObj.numberSelected + ")";
                        $('#Q2QuestionsTable').append("<tr><td><span class='LittleLeft'>" + gameObj.questionString + " =&nbsp;</span></td><td><input type='text' pattern='[0-9]*' class='textbox LittleTop' id='Q2TB" + gameObj.totalQuestionsAttempted + "' /></td></tr>");
                        if (!gameObj.IsIpad)
                            $('#Q2TB' + gameObj.totalQuestionsAttempted).focus();

                        switch (gameObj.optionSelected) {
                            case "--":
                                {
                                    gameObj.type = 0;
                                    gameObj.AsnwerForQ2TB = "+" + gameObj.numberSelected;
                                    break;
                                }
                            case "++":
                                {
                                    gameObj.type = 1;
                                    gameObj.AsnwerForQ2TB = "+" + gameObj.numberSelected;
                                    break;
                                }
                            case "-+":
                                {
                                    gameObj.type = 2;
                                    gameObj.AsnwerForQ2TB = "-" + gameObj.numberSelected;
                                    break;
                                }
                            case "+-":
                                {
                                    gameObj.type = 3;
                                    gameObj.AsnwerForQ2TB = "-" + gameObj.numberSelected;
                                    break;
                                }
                        }
                    }
                }
                else {
                    if (gameObj.totalQuestionsAttempted < 12) {
                        gameObj.optionsForQ2 = gameObj.optionsForQ1.slice(0);
                        generateValues(No);
                    }
                    else
                        $('#Q2Next').fadeIn('slow');
                }
                break;
            }
        case 3:
            {
                if (gameObj.totalCorrectAnswers < 6 && gameObj.totalQuestionsAttempted < 16) {
                    gameObj.totalQuestionsAttempted++;
                    if (gameObj.totalQuestionsAttempted == 1) { 
                        $("#Q3QuestionsTable").html("");
                    }
                    gameObj.noOfAttempt = 0;
                    gameObj.numberSelected = getRandomFromArray(gameObj.rangeForQ3);
                    gameObj.numberSelected2 = getRandomFromArray(gameObj.rangeForQ3);
                    // Making sure that both the numbers are not same
                    if (gameObj.numberSelected == gameObj.numberSelected2) {
                        while (gameObj.numberSelected == gameObj.numberSelected2) {
                            gameObj.numberSelected2 = getRandomFromArray(gameObj.rangeForQ3);
                        }
                    }
                    // Making sure that the first number is always greater that the second number
                    if (gameObj.numberSelected < gameObj.numberSelected2) {
                        var temp = gameObj.numberSelected;
                        gameObj.numberSelected = gameObj.numberSelected2;
                        gameObj.numberSelected2 = temp;
                    }
                    if (gameObj.optionsForQ3.length <= 0)
                        gameObj.optionsForQ3 = arrayShuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

                    gameObj.poolOfCorrectAnswers = new Array();
                    gameObj.optionSelected = gameObj.optionsForQ3.pop();
                    switch (gameObj.optionSelected) {
                        case 1:
                            {
                                gameObj.questionString = gameObj.numberSelected + " – (-" + gameObj.numberSelected2 + ") = ";
                                gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected + '+' + gameObj.numberSelected2);
                                gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected + '+' + gameObj.numberSelected2);
                                gameObj.poolOfCorrectAnswers.push(parseInt(gameObj.numberSelected) + parseInt(gameObj.numberSelected2));
                                gameObj.poolOfCorrectAnswers.push('+' + (parseInt(gameObj.numberSelected) + parseInt(gameObj.numberSelected2)));
                                gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                gameObj.Prompt1 = instArr["i_2"] + " – (- " + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_3"] + " -" + gameObj.numberSelected2 + "?";
                                gameObj.FinalAnswerForQ3 = gameObj.numberSelected + "+" + gameObj.numberSelected2;
                                gameObj.Prompt2 = " –(-" + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                gameObj.checkForThisIncorrectValueInQ3 = "-" + gameObj.numberSelected2;
                                break;
                            }
                        case 2:
                            {
                                gameObj.questionString = gameObj.numberSelected + " + (+" + gameObj.numberSelected2 + ") = ";
                                gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected + '+' + gameObj.numberSelected2);
                                gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected + '+' + gameObj.numberSelected2);
                                gameObj.poolOfCorrectAnswers.push(parseInt(gameObj.numberSelected) + parseInt(gameObj.numberSelected2));
                                gameObj.poolOfCorrectAnswers.push('+' + (parseInt(gameObj.numberSelected) + parseInt(gameObj.numberSelected2)));
                                gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                gameObj.Prompt1 = instArr["i_2"] + " + (+ " + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_3"] + " -" + gameObj.numberSelected2 + "?";
                                gameObj.FinalAnswerForQ3 = gameObj.numberSelected + "+" + gameObj.numberSelected2;
                                gameObj.Prompt2 = " +(+" + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                gameObj.checkForThisIncorrectValueInQ3 = "-" + gameObj.numberSelected2;
                                break;
                            }
                        case 3:
                            {
                                gameObj.questionString = gameObj.numberSelected + " – (+" + gameObj.numberSelected2 + ") = ";
                                gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                gameObj.poolOfCorrectAnswers.push(parseInt(gameObj.numberSelected) - parseInt((gameObj.numberSelected2)));
                                gameObj.poolOfCorrectAnswers.push('-' + gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                gameObj.poolOfCorrectAnswers.push('+' + (parseInt(gameObj.numberSelected) - parseInt((gameObj.numberSelected2))));
                                gameObj.Prompt1 = instArr["i_2"] + " – (+ " + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_3"] + " -" + gameObj.numberSelected2 + "?";
                                gameObj.FinalAnswerForQ3 = gameObj.numberSelected + "–" + gameObj.numberSelected2;
                                gameObj.Prompt2 = " –(+" + gameObj.numberSelected2 + ") = –" + gameObj.numberSelected2 + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                gameObj.checkForThisIncorrectValueInQ3 = "+" + gameObj.numberSelected2;
                                break;
                            }
                        case 4:
                            {
                                gameObj.questionString = gameObj.numberSelected + " + (-" + gameObj.numberSelected2 + ") = ";
                                gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                gameObj.poolOfCorrectAnswers.push(parseInt(gameObj.numberSelected) - parseInt((gameObj.numberSelected2)));
                                gameObj.poolOfCorrectAnswers.push('-' + gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                gameObj.poolOfCorrectAnswers.push('+' + (parseInt(gameObj.numberSelected) - parseInt((gameObj.numberSelected2))));
                                gameObj.Prompt1 = instArr["i_2"] + " + (– " + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_3"] + " -" + gameObj.numberSelected2 + "?";
                                gameObj.FinalAnswerForQ3 = gameObj.numberSelected + "–" + gameObj.numberSelected2;
                                gameObj.Prompt2 = " +(–" + gameObj.numberSelected2 + ") = –" + gameObj.numberSelected2 + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                gameObj.checkForThisIncorrectValueInQ3 = "+" + gameObj.numberSelected2;
                                break;
                            }
                        case 5:
                            {
                                gameObj.questionString = "-(-" + gameObj.numberSelected + ") + " + gameObj.numberSelected2 + " = ";
                                gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected + '+' + gameObj.numberSelected2);
                                gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected + '+' + gameObj.numberSelected2);
                                gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                gameObj.poolOfCorrectAnswers.push('+' + (parseInt(gameObj.numberSelected) + parseInt((gameObj.numberSelected2))));
                                gameObj.poolOfCorrectAnswers.push(parseInt(gameObj.numberSelected) + parseInt((gameObj.numberSelected2)));
                                gameObj.Prompt1 = instArr["i_2"] + "- (-" + gameObj.numberSelected + ")" + " = +" + gameObj.numberSelected + instArr["i_3"] + " -" + gameObj.numberSelected + "?";
                                gameObj.FinalAnswerForQ3 = gameObj.numberSelected + "+" + gameObj.numberSelected2;
                                gameObj.Prompt2 = " -(-" + gameObj.numberSelected + ") = +" + gameObj.numberSelected + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                gameObj.checkForThisIncorrectValueInQ3 = "-" + gameObj.numberSelected;
                                break;
                            }
                        case 6:
                            {
                                gameObj.questionString = "-(-" + gameObj.numberSelected + ") - " + gameObj.numberSelected2 + " = ";
                                gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                gameObj.poolOfCorrectAnswers.push('-' + gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                gameObj.poolOfCorrectAnswers.push('+' + (parseInt(gameObj.numberSelected) - parseInt((gameObj.numberSelected2))));
                                gameObj.poolOfCorrectAnswers.push(parseInt(gameObj.numberSelected) - parseInt((gameObj.numberSelected2)));
                                gameObj.Prompt1 = instArr["i_2"] + "- (-" + gameObj.numberSelected + ")" + " = +" + gameObj.numberSelected + instArr["i_3"] + " -" + gameObj.numberSelected + "?";
                                gameObj.FinalAnswerForQ3 = gameObj.numberSelected + "–" + gameObj.numberSelected2;
                                gameObj.Prompt2 = " -(-" + gameObj.numberSelected + ") = +" + gameObj.numberSelected + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                gameObj.checkForThisIncorrectValueInQ3 = "-" + gameObj.numberSelected;
                                break;
                            }
                        case 7:
                            {
                                gameObj.questionString = "-" + gameObj.numberSelected + " – (-" + gameObj.numberSelected2 + ") = ";
                                gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected2 + '-' + gameObj.numberSelected);
                                gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected2 + '-' + gameObj.numberSelected);
                                gameObj.poolOfCorrectAnswers.push('-' + gameObj.numberSelected + '+' + gameObj.numberSelected2);
                                gameObj.poolOfCorrectAnswers.push((parseInt(gameObj.numberSelected * -1) + parseInt((gameObj.numberSelected2))));
                                gameObj.Prompt1 = instArr["i_2"] + " – (- " + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_3"] + " -" + gameObj.numberSelected2 + "?";
                                gameObj.FinalAnswerForQ3 = "–" + gameObj.numberSelected + "+" + gameObj.numberSelected2;
                                gameObj.Prompt2 = " -(-" + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                gameObj.checkForThisIncorrectValueInQ3 = "-" + gameObj.numberSelected2;
                                break;
                            }
                        case 8:
                            {
                                gameObj.questionString = "-" + gameObj.numberSelected + " – (+" + gameObj.numberSelected2 + ") = ";
                                gameObj.poolOfCorrectAnswers.push('-' + gameObj.numberSelected2 + '-' + gameObj.numberSelected);
                                gameObj.poolOfCorrectAnswers.push('-' + gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                gameObj.poolOfCorrectAnswers.push((parseInt(gameObj.numberSelected * -1) - parseInt((gameObj.numberSelected2))));
                                gameObj.Prompt1 = instArr["i_2"] + " – (+ " + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_3"] + " -" + gameObj.numberSelected2 + "?";
                                gameObj.FinalAnswerForQ3 = "–" + gameObj.numberSelected + "–" + gameObj.numberSelected2;
                                gameObj.Prompt2 = " -(+" + gameObj.numberSelected2 + ") = -" + gameObj.numberSelected2 + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                gameObj.checkForThisIncorrectValueInQ3 = "+" + gameObj.numberSelected2;
                                break;
                            }
                        case 9:
                            {
                                gameObj.questionString = "-" + gameObj.numberSelected + " + (-" + gameObj.numberSelected2 + ") = ";
                                gameObj.poolOfCorrectAnswers.push('-' + gameObj.numberSelected2 + '-' + gameObj.numberSelected);
                                gameObj.poolOfCorrectAnswers.push('-' + gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                gameObj.poolOfCorrectAnswers.push((parseInt(gameObj.numberSelected * -1) - parseInt((gameObj.numberSelected2))));
                                gameObj.Prompt1 = instArr["i_2"] + " + (– " + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_3"] + " -" + gameObj.numberSelected2 + "?";
                                gameObj.FinalAnswerForQ3 = "–" + gameObj.numberSelected + "–" + gameObj.numberSelected2;
                                gameObj.Prompt2 = " +(-" + gameObj.numberSelected2 + ") = -" + gameObj.numberSelected2 + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                gameObj.checkForThisIncorrectValueInQ3 = "+" + gameObj.numberSelected2;
                                break;
                            }
                    }
                    $('#Q3QuestionsTable').append("<tr><td><span class='LittleLeft'>" + gameObj.questionString + "</span></td><td><input type='text' pattern='[0-9]*' class='textbox LittleTop' id='Q3TB" + gameObj.totalQuestionsAttempted + "' /></td></tr>");
                    if (!gameObj.IsIpad)
                        $('#Q3TB' + gameObj.totalQuestionsAttempted).focus();
                }
                else {
                    $('#Q3Next').fadeIn('slow');
                }
                break;
            }
        case 4:
            {
                if (gameObj.totalCorrectAnswers < 5 && gameObj.totalQuestionsAttempted < 12) {
                    gameObj.totalQuestionsAttempted++;
                    gameObj.noOfAttempt = 0;
                    gameObj.numberSelected = getRandomFromArray(gameObj.rangeForQ4);
                    gameObj.numberSelected2 = getRandomFromArray(gameObj.rangeForQ4);
                    // Making sure that both the numbers are not same
                    if (gameObj.numberSelected == gameObj.numberSelected2) {
                        while (gameObj.numberSelected == gameObj.numberSelected2) {
                            gameObj.numberSelected2 = getRandomFromArray(gameObj.rangeForQ4);
                        }
                    }

                    if (gameObj.optionsForQ4.length >= 0)
                        gameObj.optionsForQ4 = arrayShuffle([1, 2, 3]);
                    //gameObj.poolOfCorrectAnswers = new Array();
                    //gameObj.optionsForQ4 = arrayShuffle(["--", "++", "+-", "-+"]);
                    //gameObj.optionsForQ4 = arrayShuffle(["--", "++", "+-", "-+"]);
                    gameObj.optionSelected = gameObj.optionsForQ4[0];
                    gameObj.poolOfCorrectAnswers = [];
                    //gameObj.optionsForQ4.push(gameObj.optionSelected);
                    if (gameObj.optionSelected <= 2) {
                        gameObj.checkForThisIncorrectValueInQ31 = '';
                        gameObj.optionsForQ4 = arrayShuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                        gameObj.optionSelected = gameObj.optionsForQ4[0];
                        switch (gameObj.optionSelected) {
                            case 1:
                                {
                                    gameObj.questionString = gameObj.numberSelected + " – (-" + gameObj.numberSelected2 + ") = ";
                                    gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected + '+' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected + '+' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push(parseInt(gameObj.numberSelected) + parseInt(gameObj.numberSelected2));
                                    gameObj.poolOfCorrectAnswers.push('+' + (parseInt(gameObj.numberSelected) + parseInt(gameObj.numberSelected2)));
                                    gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                    gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                    gameObj.Prompt1 = instArr["i_2"] + " – (- " + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_3"] + " -" + gameObj.numberSelected2 + "?";
                                    gameObj.FinalAnswerForQ3 = gameObj.numberSelected + "+" + gameObj.numberSelected2;
                                    gameObj.Prompt2 = " –(-" + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                    gameObj.checkForThisIncorrectValueInQ3 = "-" + gameObj.numberSelected2;
                                    break;
                                }
                            case 2:
                                {
                                    gameObj.questionString = gameObj.numberSelected + " + (+" + gameObj.numberSelected2 + ") = ";
                                    gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected + '+' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected + '+' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push(parseInt(gameObj.numberSelected) + parseInt(gameObj.numberSelected2));
                                    gameObj.poolOfCorrectAnswers.push('+' + (parseInt(gameObj.numberSelected) + parseInt(gameObj.numberSelected2)));
                                    gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                    gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                    gameObj.Prompt1 = instArr["i_2"] + " + (+ " + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_3"] + " -" + gameObj.numberSelected2 + "?";
                                    gameObj.FinalAnswerForQ3 = gameObj.numberSelected + "+" + gameObj.numberSelected2;
                                    gameObj.Prompt2 = " +(+" + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                    gameObj.checkForThisIncorrectValueInQ3 = "-" + gameObj.numberSelected2;
                                    break;
                                }
                            case 3:
                                {
                                    gameObj.questionString = gameObj.numberSelected + " – (+" + gameObj.numberSelected2 + ") = ";
                                    gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push(parseInt(gameObj.numberSelected) - parseInt((gameObj.numberSelected2)));
                                    gameObj.poolOfCorrectAnswers.push('-' + gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                    gameObj.poolOfCorrectAnswers.push('+' + (parseInt(gameObj.numberSelected) - parseInt((gameObj.numberSelected2))));
                                    gameObj.Prompt1 = instArr["i_2"] + " – (+ " + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_3"] + " -" + gameObj.numberSelected2 + "?";
                                    gameObj.FinalAnswerForQ3 = gameObj.numberSelected + "–" + gameObj.numberSelected2;
                                    gameObj.Prompt2 = " –(+" + gameObj.numberSelected2 + ") = –" + gameObj.numberSelected2 + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                    gameObj.checkForThisIncorrectValueInQ3 = "+" + gameObj.numberSelected2;
                                    break;
                                }
                            case 4:
                                {
                                    gameObj.questionString = gameObj.numberSelected + " + (-" + gameObj.numberSelected2 + ") = ";
                                    gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push(parseInt(gameObj.numberSelected) - parseInt((gameObj.numberSelected2)));
                                    gameObj.poolOfCorrectAnswers.push('-' + gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                    gameObj.poolOfCorrectAnswers.push('+' + (parseInt(gameObj.numberSelected) - parseInt((gameObj.numberSelected2))));
                                    gameObj.Prompt1 = instArr["i_2"] + " + (– " + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_3"] + " -" + gameObj.numberSelected2 + "?";
                                    gameObj.FinalAnswerForQ3 = gameObj.numberSelected + "–" + gameObj.numberSelected2;
                                    gameObj.Prompt2 = " +(–" + gameObj.numberSelected2 + ") = –" + gameObj.numberSelected2 + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                    gameObj.checkForThisIncorrectValueInQ3 = "+" + gameObj.numberSelected2;
                                    break;
                                }
                            case 5:
                                {
                                    gameObj.questionString = "-(-" + gameObj.numberSelected + ") + " + gameObj.numberSelected2 + " = ";
                                    gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected + '+' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected + '+' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                    gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                    gameObj.poolOfCorrectAnswers.push('+' + (parseInt(gameObj.numberSelected) + parseInt((gameObj.numberSelected2))));
                                    gameObj.poolOfCorrectAnswers.push(parseInt(gameObj.numberSelected) + parseInt((gameObj.numberSelected2)));
                                    gameObj.Prompt1 = instArr["i_2"] + "- (-" + gameObj.numberSelected + ")" + " = +" + gameObj.numberSelected + instArr["i_3"] + " -" + gameObj.numberSelected + "?";
                                    gameObj.FinalAnswerForQ3 = gameObj.numberSelected + "+" + gameObj.numberSelected2;
                                    gameObj.Prompt2 = " -(-" + gameObj.numberSelected + ") = +" + gameObj.numberSelected + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                    gameObj.checkForThisIncorrectValueInQ3 = "-" + gameObj.numberSelected;
                                    break;
                                }
                            case 6:
                                {
                                    gameObj.questionString = "-(-" + gameObj.numberSelected + ") - " + gameObj.numberSelected2 + " = ";
                                    gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push('-' + gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                    gameObj.poolOfCorrectAnswers.push('+' + (parseInt(gameObj.numberSelected) - parseInt((gameObj.numberSelected2))));
                                    gameObj.poolOfCorrectAnswers.push(parseInt(gameObj.numberSelected) - parseInt((gameObj.numberSelected2)));
                                    gameObj.Prompt1 = instArr["i_2"] + "- (-" + gameObj.numberSelected + ")" + " = +" + gameObj.numberSelected + instArr["i_3"] + " -" + gameObj.numberSelected + "?";
                                    gameObj.FinalAnswerForQ3 = gameObj.numberSelected + "–" + gameObj.numberSelected2;
                                    gameObj.Prompt2 = " -(-" + gameObj.numberSelected + ") = +" + gameObj.numberSelected + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                    gameObj.checkForThisIncorrectValueInQ3 = "-" + gameObj.numberSelected;
                                    break;
                                }
                            case 7:
                                {
                                    gameObj.questionString = "-" + gameObj.numberSelected + " – (-" + gameObj.numberSelected2 + ") = ";
                                    gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected2 + '-' + gameObj.numberSelected);
                                    gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected2 + '-' + gameObj.numberSelected);
                                    gameObj.poolOfCorrectAnswers.push('-' + gameObj.numberSelected + '+' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push((parseInt(gameObj.numberSelected * -1) + parseInt((gameObj.numberSelected2))));
                                    gameObj.Prompt1 = instArr["i_2"] + " – (- " + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_3"] + " -" + gameObj.numberSelected2 + "?";
                                    gameObj.FinalAnswerForQ3 = "–" + gameObj.numberSelected + "+" + gameObj.numberSelected2;
                                    gameObj.Prompt2 = " -(-" + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                    gameObj.checkForThisIncorrectValueInQ3 = "-" + gameObj.numberSelected2;
                                    break;
                                }
                            case 8:
                                {
                                    gameObj.questionString = "-" + gameObj.numberSelected + " – (+" + gameObj.numberSelected2 + ") = ";
                                    gameObj.poolOfCorrectAnswers.push('-' + gameObj.numberSelected2 + '-' + gameObj.numberSelected);
                                    gameObj.poolOfCorrectAnswers.push('-' + gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push((parseInt(gameObj.numberSelected * -1) - parseInt((gameObj.numberSelected2))));
                                    gameObj.Prompt1 = instArr["i_2"] + " – (+ " + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_3"] + " -" + gameObj.numberSelected2 + "?";
                                    gameObj.FinalAnswerForQ3 = "–" + gameObj.numberSelected + "–" + gameObj.numberSelected2;
                                    gameObj.Prompt2 = " -(+" + gameObj.numberSelected2 + ") = -" + gameObj.numberSelected2 + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                    gameObj.checkForThisIncorrectValueInQ3 = "+" + gameObj.numberSelected2;
                                    break;
                                }
                            case 9:
                                {
                                    gameObj.questionString = "-" + gameObj.numberSelected + " + (-" + gameObj.numberSelected2 + ") = ";
                                    gameObj.poolOfCorrectAnswers.push('-' + gameObj.numberSelected2 + '-' + gameObj.numberSelected);
                                    gameObj.poolOfCorrectAnswers.push('-' + gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push((parseInt(gameObj.numberSelected * -1) - parseInt((gameObj.numberSelected2))));
                                    gameObj.Prompt1 = instArr["i_2"] + " + (– " + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_3"] + " -" + gameObj.numberSelected2 + "?";
                                    gameObj.FinalAnswerForQ3 = "–" + gameObj.numberSelected + "–" + gameObj.numberSelected2;
                                    gameObj.Prompt2 = " +(-" + gameObj.numberSelected2 + ") = -" + gameObj.numberSelected2 + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                    gameObj.checkForThisIncorrectValueInQ3 = "+" + gameObj.numberSelected2;
                                    break;
                                }
                        }
                    }
                    else {
                        gameObj.optionsForQ4 = arrayShuffle(["--", "++", "+-", "-+"]);
                        gameObj.optionSelected = gameObj.optionsForQ4[0];
                        switch (gameObj.optionSelected) {
                            case "--":
                                {

                                    gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected + '+' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected + '+' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push(parseInt(gameObj.numberSelected) + parseInt(gameObj.numberSelected2));
                                    gameObj.poolOfCorrectAnswers.push('+' + (parseInt(gameObj.numberSelected) + parseInt(gameObj.numberSelected2)));
                                    gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                    gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                    gameObj.Prompt1 = instArr["i_2"] + " – (- " + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_3"] + " -" + gameObj.numberSelected2 + "?";
                                    gameObj.Prompt22 = instArr["i_2"] + " - (- " + gameObj.numberSelected + ") = +" + gameObj.numberSelected + instArr["i_3"] + " -" + gameObj.numberSelected + "?";
                                    console.log("1. " + gameObj.Prompt1 + " " + gameObj.Prompt22);
                                    gameObj.FinalAnswerForQ3 = gameObj.numberSelected + "+" + gameObj.numberSelected2;
                                    gameObj.checkForThisIncorrectValueInQ3 = "-" + gameObj.numberSelected2;
                                    gameObj.checkForThisIncorrectValueInQ31 = "-" + gameObj.numberSelected;
                                    break;
                                }
                            case "++":
                                {
                                    gameObj.questionString = gameObj.numberSelected + " + (+" + gameObj.numberSelected2 + ") = ";
                                    gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected + '+' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected + '+' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push(parseInt(gameObj.numberSelected) + parseInt(gameObj.numberSelected2));
                                    gameObj.poolOfCorrectAnswers.push('+' + (parseInt(gameObj.numberSelected) + parseInt(gameObj.numberSelected2)));
                                    gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                    gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                    gameObj.Prompt1 = instArr["i_2"] + " + (+ " + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_3"] + " -" + gameObj.numberSelected2 + "?";
                                    gameObj.Prompt22 = instArr["i_2"] + " - (- " + gameObj.numberSelected + ") = +" + gameObj.numberSelected + instArr["i_3"] + " -" + gameObj.numberSelected + "?";
                                    console.log("2. " + gameObj.Prompt1 + " " + gameObj.Prompt22);
                                    gameObj.FinalAnswerForQ3 = gameObj.numberSelected + "+" + gameObj.numberSelected2;
                                    gameObj.Prompt2 = " +(+" + gameObj.numberSelected + ") = +" + gameObj.numberSelected + "<br/>" + " +(+" + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                    gameObj.checkForThisIncorrectValueInQ3 = "-" + gameObj.numberSelected2;
                                    gameObj.checkForThisIncorrectValueInQ31 = "-" + gameObj.numberSelected;
                                    break;
                                }
                            case "+-":
                                {
                                    gameObj.questionString = gameObj.numberSelected + " – (+" + gameObj.numberSelected2 + ") = ";
                                    gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push(parseInt(gameObj.numberSelected) - parseInt((gameObj.numberSelected2)));
                                    gameObj.poolOfCorrectAnswers.push('-' + gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                    gameObj.poolOfCorrectAnswers.push('+' + (parseInt(gameObj.numberSelected) - parseInt((gameObj.numberSelected2))));
                                    gameObj.Prompt1 = instArr["i_2"] + " + (- " + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_3"] + " -" + gameObj.numberSelected2 + "?";
                                    gameObj.Prompt22 = instArr["i_2"] + " - (- " + gameObj.numberSelected + ") = +" + gameObj.numberSelected + instArr["i_3"] + " -" + gameObj.numberSelected + "?";
                                    console.log("3. " + gameObj.Prompt1 + " " + gameObj.Prompt22);
                                    gameObj.FinalAnswerForQ3 = gameObj.numberSelected + "–" + gameObj.numberSelected2;
                                    gameObj.Prompt2 = " –(+" + gameObj.numberSelected2 + ") = –" + gameObj.numberSelected2 + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                    gameObj.checkForThisIncorrectValueInQ3 = "+" + gameObj.numberSelected2;
                                    gameObj.checkForThisIncorrectValueInQ31 = "-" + gameObj.numberSelected;
                                    break;
                                }
                            case "-+":
                                {
                                    gameObj.questionString = gameObj.numberSelected + " + (-" + gameObj.numberSelected2 + ") = ";
                                    gameObj.poolOfCorrectAnswers.push(gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push('+' + gameObj.numberSelected + '-' + gameObj.numberSelected2);
                                    gameObj.poolOfCorrectAnswers.push(parseInt(gameObj.numberSelected) - parseInt((gameObj.numberSelected2)));
                                    gameObj.poolOfCorrectAnswers.push('-' + gameObj.numberSelected2 + '+' + gameObj.numberSelected);
                                    gameObj.poolOfCorrectAnswers.push('+' + (parseInt(gameObj.numberSelected) - parseInt((gameObj.numberSelected2))));
                                    gameObj.Prompt1 = instArr["i_2"] + " - (+ " + gameObj.numberSelected2 + ") = +" + gameObj.numberSelected2 + instArr["i_3"] + " -" + gameObj.numberSelected2 + "?";
                                    gameObj.Prompt22 = instArr["i_2"] + " - (– " + gameObj.numberSelected + ") = +" + gameObj.numberSelected + instArr["i_3"] + " -" + gameObj.numberSelected + "?";
                                    console.log("4. " + gameObj.Prompt1 + " " + gameObj.Prompt22);
                                    gameObj.FinalAnswerForQ3 = gameObj.numberSelected + "–" + gameObj.numberSelected2;
                                    gameObj.Prompt2 = " +(–" + gameObj.numberSelected2 + ") = –" + gameObj.numberSelected2 + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                                    gameObj.checkForThisIncorrectValueInQ3 = "+" + gameObj.numberSelected2;
                                    gameObj.checkForThisIncorrectValueInQ31 = "-" + gameObj.numberSelected;
                                    break;
                                }
                        }
                        var a = gameObj.optionSelected[0] + " (" + gameObj.optionSelected[1] + gameObj.numberSelected2 + ")";
                        gameObj.questionString = "-(-" + gameObj.numberSelected + ") " + gameObj.optionSelected[0] + " (" + gameObj.optionSelected[1] + gameObj.numberSelected2 + ") = ";
                        if (eval(a) > 0) {
                            gameObj.Prompt2 = " –(-" + gameObj.numberSelected + ") = +" + gameObj.numberSelected + "<br /> " + a + " = +" + eval(a) + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                        }
                        else {
                            gameObj.Prompt2 = " –(-" + gameObj.numberSelected + ") = +" + gameObj.numberSelected + "<br /> " + a + " = " + eval(a) + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                        }
                    }
                    //var a = gameObj.optionSelected[0] + " (" + gameObj.optionSelected[1] + gameObj.numberSelected2 + ")";
                    //gameObj.questionString = "-(-" + gameObj.numberSelected + ") " + gameObj.optionSelected[0] + " (" + gameObj.optionSelected[1] + gameObj.numberSelected2 + ") = ";
                    //if (eval(a) > 0) {
                    //    gameObj.Prompt2 = " –(-" + gameObj.numberSelected + ") = +" + gameObj.numberSelected + "<br /> " + a + " = +" + eval(a) + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                    //}
                    //else {
                    //    gameObj.Prompt2 = " –(-" + gameObj.numberSelected + ") = +" + gameObj.numberSelected + "<br /> " + a + " = " + eval(a) + instArr["i_4"] + gameObj.questionString + gameObj.FinalAnswerForQ3 + ".";
                    //}
                    $('#Q4QuestionsTable').append("<tr id='gameTable" + gameObj.totalQuestionsAttempted + "'><td><span>" + gameObj.questionString + "</span></td><td colspan='2' id='asd" + gameObj.totalQuestionsAttempted + "'><input type='text' pattern='[0-9]*' class='textbox LittleTop' id='Q4TB1_" + gameObj.totalQuestionsAttempted + "' /></td></tr>");
                    if (!gameObj.IsIpad)
                        $('#Q4TB1_' + gameObj.totalQuestionsAttempted).focus();
                    console.log(gameObj.questionString);
                }
                else {
                    endGame();
                }
                break;
            }
    }
}

$('.textbox').live("keypress", function (e) {
    var TextBoxID;
    TextBoxID = $(this).attr("Id");
    valueOfTB = $(this).val().replace(/\s/g, ""); // remove space

    e.keyCode = (e.keyCode != 0) ? e.keyCode : e.which; // Mozilla hack..
    if (e.keyCode == 13)// Enter press or Tab
    {
        if (valueOfTB != "") {
            if (gameObj.currentScreen == 2) {
                if (valueOfTB == gameObj.AsnwerForQ2TB) {	// correct answer
                    $(this).addClass('disabled GreenBorder').attr('disabled', true);
                    gameObj.Q2CorrectTypes[gameObj.type] = 1;
                    generateValues(2);
                }
                else {
                    gameObj.noOfAttempt++;
                    $(this).addClass('disabled RedBorder').attr('disabled', true);
                    if (gameObj.noOfAttempt == 1) {		// 1st incorrect attempt
                        if (Math.abs(parseInt(valueOfTB)) == gameObj.numberSelected) {		// number correct
                            if (valueOfTB.indexOf('-') == -1 && valueOfTB.indexOf('+') == -1) {		// number correct but no sign
                                $('#msg1').html(replaceDynamicText(promptArr['p_6'], gameObj.numberLanguage, 'gameObj'));
                            }
                            else {	// number correct but sign incorrect
                                var Str;
                                if (gameObj.optionSelected[0] == "-")
                                    Str = miscArr['m_2'] + "(" + gameObj.optionSelected[1] + gameObj.numberSelected + ").";
                                else
                                    Str = miscArr['m_1'] + "(" + gameObj.optionSelected[1] + gameObj.numberSelected + ").";
                                $('#msg1').html(replaceDynamicText(promptArr['p_7'] + Str, gameObj.numberLanguage, 'gameObj'));
                                //$('#msg1').html(replaceDynamicText(promptArr['p_7'], gameObj.numberLanguage, 'gameObj'));
                            }
                        }
                        else {
                            $('#msg1').html(replaceDynamicText(promptArr['p_5'], gameObj.numberLanguage, 'gameObj'));
                        }
                    }
                    else {		// 2nd incorrect attempt
                        var Str;
                        if (gameObj.optionSelected[0] == "-")
                            Str = miscArr['m_2'] + "(" + gameObj.optionSelected[1] + gameObj.numberSelected + "). <br/>So, " + gameObj.questionString + " = " + gameObj.AsnwerForQ2TB + ".";
                        else
                            Str = miscArr['m_1'] + "(" + gameObj.optionSelected[1] + gameObj.numberSelected + "). <br/>So, " + gameObj.questionString + " = " + gameObj.AsnwerForQ2TB + ".";

                        $('#msg1').html(replaceDynamicText(promptArr['p_7'] + Str, gameObj.numberLanguage, 'gameObj'));
                    }
                    gameObj.ShowMsgBox();
                }
            }
            if (gameObj.currentScreen == 3) {
                if (in_array(valueOfTB, gameObj.poolOfCorrectAnswers)) {	// correct answer
                    $(this).addClass('disabled GreenBorder').attr('disabled', true);
                    gameObj.totalCorrectAnswers++;
                    generateValues(3);
                }
                else {
                    gameObj.noOfAttempt++;
                    $(this).addClass('disabled RedBorder').attr('disabled', true);
                    if (gameObj.noOfAttempt == 1 || gameObj.noOfAttempt == 2) {		// 1st incorrect attempt
                        if (valueOfTB.indexOf('-') != -1 && valueOfTB.indexOf('+') != -1)		// if both the signs are entered
                        {
                            if (Math.abs(valueOfTB.indexOf('-') - valueOfTB.indexOf('+')) == 1)
                                $('#msg1').html(replaceDynamicText(instArr['i_5'], gameObj.numberLanguage, 'gameObj'));
                            else {
                                var tempVar = Math.abs(parseInt(gameObj.checkForThisIncorrectValueInQ3));
                                if (valueOfTB.indexOf(tempVar) != -1) {
                                    if (valueOfTB.indexOf(gameObj.checkForThisIncorrectValueInQ3) != -1)		// correct bracket sign used
                                        $('#msg1').html(replaceDynamicText(gameObj.Prompt1, gameObj.numberLanguage, 'gameObj'));
                                    else
                                        $('#msg1').html(replaceDynamicText(promptArr['p_8'], gameObj.numberLanguage, 'gameObj'));
                                }
                                else
                                    $('#msg1').html(replaceDynamicText(promptArr['p_8'], gameObj.numberLanguage, 'gameObj'));
                            }
                        }
                        else {
                            var tempVar = Math.abs(parseInt(gameObj.checkForThisIncorrectValueInQ3));
                            if (valueOfTB.indexOf(tempVar) != -1) {
                                if (valueOfTB.indexOf(gameObj.checkForThisIncorrectValueInQ3) != -1)		// correct bracket sign used
                                    $('#msg1').html(replaceDynamicText(gameObj.Prompt1, gameObj.numberLanguage, 'gameObj'));
                                else
                                    $('#msg1').html(replaceDynamicText(promptArr['p_8'], gameObj.numberLanguage, 'gameObj'));
                            }
                            else
                                $('#msg1').html(replaceDynamicText(promptArr['p_8'], gameObj.numberLanguage, 'gameObj'));
                        }
                    }
                    else {		// 3rd incorrect attempt
                        $('#msg1').html(replaceDynamicText(gameObj.Prompt2, gameObj.numberLanguage, 'gameObj'));
                    }
                    gameObj.ShowMsgBox();
                }
            }
            if (gameObj.currentScreen == 4) {
                if (this.id == "Q4TB" + gameObj.totalQuestionsAttempted) {
                    idDisabled = '#Q4TB';
                    if (valueOfTB == gameObj.poolOfCorrectAnswers['2'].toString() || valueOfTB == gameObj.poolOfCorrectAnswers['3']) {
                        $(this).addClass('disabled GreenBorder').attr('disabled', true);
                        $("#Q4TB" + gameObj.totalQuestionsAttempted).focus();
                        gameObj.noOfAttempt = 0;
                        gameObj.totalCorrectAnswers++;
                        generateValues(4);
                    }
                    else {
                        gameObj.noOfAttempt++;
                        $(this).addClass('disabled RedBorder').attr('disabled', true);
                        if (gameObj.noOfAttempt == 1) {		// 1st incorrect attempt
                            var temp1 = $("#Q4TB1_" + gameObj.totalQuestionsAttempted).val();
                            $("#msg1").html("If " + temp1 + " is same as first ");
                            if (temp1[0] == "+") {
                                temp1 = temp1.slice(1, 10);
                            }
                            if (temp1[0] == '-') {
                                $("#msg1").append("losing Rs." + gameObj.numberSelected);
                            }
                            else {
                                $("#msg1").append("gaining Rs." + gameObj.numberSelected);
                            }
                            $("#msg1").append(" and then ");
                            var temp2 = temp1.indexOf("-");
                            var temp3 = temp1.indexOf("+");
                            if (temp2 > 0) {
                                $("#msg1").append("losing Rs." + gameObj.numberSelected2);
                            }
                            else if (temp3 > 0) {
                                $("#msg1").append("gaining Rs." + gameObj.numberSelected2);
                            }
                            $("#msg1").append(", then how much will you gain or lose in the end? If your answer is gain remember to put a '+' sign, and if your answer is loss then put a '-' sign.");
                        }
                        else if (gameObj.noOfAttempt == 2) {
                            var temp1 = $("#Q4TB1_" + gameObj.totalQuestionsAttempted).val();
                            $("#msg1").html(temp1 + " is same as first ");
                            if (temp1[0] == "+") {
                                temp1 = temp1.slice(1, 10);
                            }
                            if (temp1[0] == '-') {
                                $("#msg1").append("losing Rs." + gameObj.numberSelected);
                            }
                            else {
                                $("#msg1").append("gaining Rs." + gameObj.numberSelected);
                            }
                            $("#msg1").append(" and then ");
                            var temp2 = temp1.indexOf("-");
                            var temp3 = temp1.indexOf("+");
                            console.log(temp1);
                            if (temp2 > 0) {
                                $("#msg1").append("losing Rs." + gameObj.numberSelected2);
                            }
                            else if (temp3 > 0) {
                                $("#msg1").append("gaining Rs." + gameObj.numberSelected2 + ".<br />So, " + temp1 + " = " + eval(temp1.replace("–", "-")) + ".");
                            }
                            if (eval(temp1.replace("–", "-")) > 0) {
                                $("#msg1").append(". In total, you would have a gain of Rs." + eval(temp1.replace("–", "-")) + ".<br />So, " + temp1 + " = " + eval(temp1.replace("–", "-")) + ".");
                            }
                            else {
                                $("#msg1").append(". In total, you would have a loss of Rs." + Math.abs(eval(temp1.replace("–", "-"))) + ".<br />So, " + temp1 + " = " + eval(temp1.replace("–", "-")) + ".");
                            }
                        }
                        gameObj.ShowMsgBox();
                    }
                }
                else {
                    idDisabled = '#Q4TB1_';
                    if (in_array(valueOfTB, gameObj.poolOfCorrectAnswers)) {	// correct answer
                        if (valueOfTB != gameObj.poolOfCorrectAnswers['2'].toString() && valueOfTB != gameObj.poolOfCorrectAnswers['3']) {
                            $(this).addClass('disabled GreenBorder').attr('disabled', true);
                            $("#msg1").html(promptArr['p_9']);
                            gameObj.ShowMsgBox();
                            gameObj.noOfAttempt = 0;
                            correctlyAnswered = 1;
                            $("#Q4TB" + gameObj.totalQuestionsAttempted).focus();
                        }
                        else {
                            $(this).addClass('disabled GreenBorder').attr('disabled', true);
                            gameObj.noOfAttempt = 0;
                            gameObj.totalCorrectAnswers++;
                            generateValues(4);
                        }

                    }
                    else {
                        gameObj.noOfAttempt++;
                        $(this).addClass('disabled RedBorder').attr('disabled', true);
                        if (gameObj.noOfAttempt == 1 || gameObj.noOfAttempt == 2) {		// 1st incorrect attempt
                            if (valueOfTB.indexOf('-') != -1 && valueOfTB.indexOf('+') != -1) {		// if both the signs are entered
                                if (Math.abs(valueOfTB.indexOf('-') - valueOfTB.indexOf('+')) == 1)
                                    $('#msg1').html(replaceDynamicText(instArr['i_5'], gameObj.numberLanguage, 'gameObj'));
                                else {
                                    var tempVar = Math.abs(parseInt(gameObj.checkForThisIncorrectValueInQ3));
                                    var tempVar1 = Math.abs(parseInt(gameObj.checkForThisIncorrectValueInQ31));
                                    if (valueOfTB.indexOf(tempVar) != -1 || valueOfTB.indexOf(tempVar1) != -1) {
                                        if (valueOfTB.indexOf(gameObj.checkForThisIncorrectValueInQ3) != -1 || valueOfTB.indexOf(gameObj.checkForThisIncorrectValueInQ31) != -1) {		// correct bracket sign used
                                            if (valueOfTB.indexOf(gameObj.checkForThisIncorrectValueInQ3) != -1 && valueOfTB.indexOf(gameObj.checkForThisIncorrectValueInQ31) != -1 && gameObj.checkForThisIncorrectValueInQ31 != '') {
                                                $('#msg1').html(replaceDynamicText(gameObj.Prompt22, gameObj.numberLanguage, 'gameObj'));
                                                $("#msg1").append("<br />" + replaceDynamicText(gameObj.Prompt1, gameObj.numberLanguage, 'gameObj'));
                                            }
                                            else if (valueOfTB.indexOf(gameObj.checkForThisIncorrectValueInQ3) != -1) {
                                                $('#msg1').html(replaceDynamicText(gameObj.Prompt1, gameObj.numberLanguage, 'gameObj'));
                                            }
                                            else if (valueOfTB.indexOf(gameObj.checkForThisIncorrectValueInQ31) != -1 && gameObj.checkForThisIncorrectValueInQ31 != '') {
                                                $('#msg1').html(replaceDynamicText(gameObj.Prompt22, gameObj.numberLanguage, 'gameObj'));
                                            }

                                        }
                                        else
                                            $('#msg1').html(replaceDynamicText(promptArr['p_8'], gameObj.numberLanguage, 'gameObj'));
                                    }
                                    else
                                        $('#msg1').html(replaceDynamicText(promptArr['p_8'], gameObj.numberLanguage, 'gameObj'));
                                }

                            }
                            else {
                                var tempVar = Math.abs(parseInt(gameObj.checkForThisIncorrectValueInQ3));
                                var tempVar1 = Math.abs(parseInt(gameObj.checkForThisIncorrectValueInQ31));
                                if (valueOfTB.indexOf(tempVar) != -1 || valueOfTB.indexOf(tempVar1) != -1) {
                                    if (valueOfTB.indexOf(gameObj.checkForThisIncorrectValueInQ3) != -1 || valueOfTB.indexOf(gameObj.checkForThisIncorrectValueInQ31) != -1) {		// correct bracket sign used
                                        if (valueOfTB.indexOf(gameObj.checkForThisIncorrectValueInQ3) != -1 && valueOfTB.indexOf(gameObj.checkForThisIncorrectValueInQ31) != -1 && gameObj.checkForThisIncorrectValueInQ31 != '') {
                                            $('#msg1').html(replaceDynamicText(gameObj.Prompt22, gameObj.numberLanguage, 'gameObj'));
                                            $("#msg1").append("<br />" + replaceDynamicText(gameObj.Prompt1, gameObj.numberLanguage, 'gameObj'));
                                        }
                                        else if (valueOfTB.indexOf(gameObj.checkForThisIncorrectValueInQ3) != -1) {
                                            $('#msg1').html(replaceDynamicText(gameObj.Prompt1, gameObj.numberLanguage, 'gameObj'));
                                        }
                                        else if (valueOfTB.indexOf(gameObj.checkForThisIncorrectValueInQ31) != -1 && gameObj.checkForThisIncorrectValueInQ31 != '') {
                                            $('#msg1').html(replaceDynamicText(gameObj.Prompt22, gameObj.numberLanguage, 'gameObj'));
                                        }
                                        else
                                            $('#msg1').html(replaceDynamicText(promptArr['p_8'], gameObj.numberLanguage, 'gameObj'));
                                    }
                                    else {
                                        $('#msg1').html(replaceDynamicText(promptArr['p_8'], gameObj.numberLanguage, 'gameObj'));
                                    }
                                }
                                else
                                    $('#msg1').html(replaceDynamicText(promptArr['p_8'], gameObj.numberLanguage, 'gameObj'));
                            }
                        }
                        else {		// 3rd incorrect attempt
                            $('#msg1').html(replaceDynamicText(gameObj.Prompt2, gameObj.numberLanguage, 'gameObj'));
                        }
                        gameObj.ShowMsgBox();
                    }
                }
            }
        }
        else {
            $('#msg1').html(promptArr['p_4']);
            gameObj.IsTbBlank = 1;
            gameObj.ShowMsgBox();
        }
        return false;
    }
    else {
        if ($(this).val().length > 3) {
            return false;
        }
        if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 9 && e.keyCode != 8 && e.keyCode != 43 && e.keyCode != 45 && e.keyCode != 8 && e.keyCode != 46) {
            return false;
        }
    }
});

REM.prototype.ShowMsgBox = function () {
    $('#BlockMainDiv').show();
    $('#container');
    $('#MsgBox').show();
    $('#ok').focus();
}

REM.prototype.OkClick = function (e) {
    $('#BlockMainDiv').hide();
    $('#MsgBox').hide();
    if (gameObj.IsTbBlank == 1)		// if the textbox was left empty
    {
        if (gameObj.currentScreen == 2) {
            if (!gameObj.IsIpad)
                $('#Q2TB' + gameObj.totalQuestionsAttempted).focus();
        }
        gameObj.IsTbBlank = 0;
    }
    else {
        if (gameObj.currentScreen == 1) {	// will come here only when the answer is incorrect. On correct answer there is no prompt. Direct next question
            $(".high").hide();
            if (gameObj.noOfAttempt == 1) {
                $('#Q1DD' + gameObj.currentDD).removeClass('RedBorder disabled').val('').removeAttr('disabled');
                $("#Q7DD" + gameObj.currentDD + " option:contains(" + miscArr['select'] + ")").attr('selected', 'selected');
                $('#Q1DD' + gameObj.currentDD)[0].selectedIndex = 0;
            }
            else {
                $("#Q1DD" + gameObj.currentDD + " option").each(function () {
                    if ($(this).text() == gameObj.AnswerForQ1DD)
                        $(this).attr('selected', 'selected');
                });

                $("#Q1DD" + gameObj.currentDD).attr('disabled', true).addClass('BlueBorder').css({ 'font-weight': '600' });
                generateValues(1);
            }
        }
        if (gameObj.currentScreen == 2) {
            if (gameObj.noOfAttempt == 1) {
                $('#Q2TB' + (gameObj.totalQuestionsAttempted)).removeClass('disabled RedBorder').attr('disabled', false).val('');
                if (!gameObj.IsIpad)
                    $('#Q2TB' + (gameObj.totalQuestionsAttempted)).focus();
            }
            else {
                $('#Q2TB' + (gameObj.totalQuestionsAttempted)).removeClass('RedBorder').addClass('BlueBorder').val(gameObj.AsnwerForQ2TB);
                generateValues(2);
            }
        }
        if (gameObj.currentScreen == 3) {
            if (gameObj.noOfAttempt == 1 || gameObj.noOfAttempt == 2) {
                $('#Q3TB' + gameObj.totalQuestionsAttempted).removeClass('disabled RedBorder').attr('disabled', false).val('');
                if (!gameObj.IsIpad)
                    $('#Q3TB' + gameObj.totalQuestionsAttempted).focus();
            }
            else {
                $('#Q3TB' + gameObj.totalQuestionsAttempted).removeClass('RedBorder').addClass('BlueBorder').val(gameObj.FinalAnswerForQ3);
                generateValues(3);
            }
        }
        if (gameObj.currentScreen == 4) {
            if (correctlyAnswered == 1) {
                correctlyAnswered = 0;
                $("#gameTable" + gameObj.totalQuestionsAttempted).append("<td>&nbsp;&nbsp; = &nbsp;&nbsp;<input id='Q4TB" + gameObj.totalQuestionsAttempted + "' type='text' pattern='[0-9]*' class='textbox LittleTop'></input></td>");
                $("#Q4TB" + gameObj.totalQuestionsAttempted).focus();
            }
            else {
                if (gameObj.noOfAttempt == 1 || gameObj.noOfAttempt == 2) {
                    $(idDisabled + gameObj.totalQuestionsAttempted).removeClass('disabled RedBorder').attr('disabled', false).val('');
                    if (idDisabled == "#Q4TB" && gameObj.noOfAttempt == 2) {
                        $(idDisabled + gameObj.totalQuestionsAttempted).removeClass('RedBorder').addClass('BlueBorder').val(eval(gameObj.FinalAnswerForQ3.replace("–", "-")));
                        $(idDisabled + gameObj.totalQuestionsAttempted).attr({ "disabled": true });
                        gameObj.noOfAttempt = 0;
                        generateValues(4);
                        return;
                    }
                    if (!gameObj.IsIpad)
                        $(idDisabled + gameObj.totalQuestionsAttempted).focus();
                }
                else {
                    if (idDisabled == "#Q4TB") {
                        $(idDisabled + gameObj.totalQuestionsAttempted).removeClass('RedBorder').addClass('BlueBorder').val(eval(gameObj.FinalAnswerForQ3.replace("–", "-"))).attr({ "disabled": disabled });
                        $(idDisabled + gameObj.totalQuestionsAttempted).attr({ "disabled": true });
                    }
                    else {
                        $(idDisabled + gameObj.totalQuestionsAttempted).removeClass('RedBorder').addClass('BlueBorder').val(gameObj.FinalAnswerForQ3);
                        $(idDisabled + gameObj.totalQuestionsAttempted).attr({ "disabled": true });
                        $("#gameTable" + gameObj.totalQuestionsAttempted).append("<td>&nbsp;&nbsp; = &nbsp;&nbsp;<input id='Q4TB" + gameObj.totalQuestionsAttempted + "' type='text' pattern='[0-9]*' class='textbox LittleTop'></input></td>");
                        $("#Q4TB" + gameObj.totalQuestionsAttempted).focus();
                        gameObj.noOfAttempt = 0;
                        return;
                    }
                    generateValues(4);
                }
            }
        }
    }
    gameObj.isAnswerCorrect = 0;
}

function StartTimer() {
    gameObj.CounterForTime = window.setInterval(function () {
        levelWiseTimeTaken++;
    }, 1000);
}

function endGame() {
    $('#container').html(miscArr['gameOver']).css({ 'text-align': 'center', 'font-size': '40px', 'line-height': '550px', 'color': 'Black' });
    levelWiseStatus = 1;
    window.clearInterval(gameObj.CounterForTime);
    completed = 1;
}