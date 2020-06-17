"use strict";


var $ = function (id) {
    return document.getElementById(id);
};

var calculateFV = function (investment, years, rate) {
    var futureValue;
    futureValue = investment;
    for (var i = 1; i <= years; i++) {
        futureValue = futureValue + (futureValue * rate / 100);
    }
    futureValue = futureValue.toFixed(2);
    return futureValue;
};

var processEntries = function () {
    var investment = parseFloat($("investment").value);
    var years = parseFloat($("years").value);
    var rate = parseFloat($("rate").value);


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