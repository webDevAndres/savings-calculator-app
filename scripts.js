"use strict";


var $ = function (id) {
    return document.getElementById(id);
};

var calculateFV = function (investment, years, rate) {
    var futureValue = investment;
    for (var i = 1; i <= years; i++) {
        futureValue = futureValue + (futureValue * rate / 100);
    }
    futureValue = futureValue.toFixed(2);
    return futureValue;
};

var formatFV = function (futureValue) {
    var deciLocation = futureValue.indexOf(".");
    var cents = futureValue.substring(deciLocation + 1, deciLocation + 3);
    var hundreds = futureValue.substring(deciLocation - 3, deciLocation);
    var thousands = "";
    var millions = "";

    if(deciLocation < 6 ) {
        thousands = futureValue.substring(0, deciLocation - 3);
        millions = "";
    }
    else {
        thousands = futureValue.substring(deciLocation - 6, deciLocation - 3);
        millions = futureValue.substring(0, deciLocation - 6);
    }
    var formattedValue = "";
    if(deciLocation >= 7) {
        formattedValue = "$" + millions + "," + thousands + "," + hundreds +
        "." + cents;
    }
    else {
        formattedValue = "$" + thousands + "," + hundreds + "." + cents;
    }
    return formattedValue;
};

var processEntries = function () {
    var futureValue;
    var investment = parseFloat($("investment").value);
    var years = parseFloat($("years").value);
    var rate = parseFloat($("rate").value);
    var isValid = true;

    if (isNaN(investment) || investment <= 0 || investment >= 100000) {
        $("investment_error").firstChild.nodeValue = "Enter a number between 1 and 99999";
        isValid = false;
    }
    else {
        $("investment_error").firstChild.nodeValue = "";
    }

    if (isNaN(years) || years <= 0 || years > 30) {
        $("years_error").firstChild.nodeValue = "Years are between 1 and 30";
        isValid = false;
    }
    else {
        $("years_error").firstChild.nodeValue = "";
    }

    if (isNaN(rate) || rate < 0 || rate > 18) {
        $("rate_error").firstChild.nodeValue = "Enter a rate between 0 and 18";
        isValid = false;
    }
    else {
        $("rate_error").firstChild.nodeValue = "";
    }

    if (isValid) {
        futureValue = calculateFV(investment, years, rate);
        $("result").value = formatFV(futureValue);
    }

};

var clearEntries = function () {
    $("investment").value = "";
    $("years").value = "1";
    $("rate").value = "";
    $("result").value = "";

};


window.onload = function () {
    $("calculate").onclick = processEntries;
    $("reset").onclick = clearEntries;
    $("investment").focus();
};