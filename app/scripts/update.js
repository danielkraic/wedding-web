var updateCountdown = function () {
    // '3' as month is caused by Javacript indexing months from '0'
    // 0: Jan, 1: Feb, 2: Mar, 3: Apr, ... 
    var wc = new Countdown(new Date(2016,3,16,14,0,0));
    if (wc.isValid()) {
        document.getElementById("countdown").innerHTML = wc.getWeddingCountdown();
    } else {
        $("#remaining").remove();
    }
};

updateCountdown();
var timeoutID = window.setInterval(updateCountdown, 1000);
