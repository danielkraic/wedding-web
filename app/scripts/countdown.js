var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var getMonthDays = function(year, month) {
    return (month == 2 && year % 4 == 0) ? monthDays[month] + 1 : monthDays[month];
};

var formatStr = {
    yy: ["rok", "roky", "rokov"],
    mn: ["mesiac", "mesiace", "mesiacov"],
    dd: ["deň", "dni", "dní"],
    hh: ["hodina", "hodiny", "hodín"],
    mi: ["minuta", "minúty", "minút"],
    ss: ["sekunda", "sekundy", "sekúnd"]
};

var getFormatString = function(val, formatString) {
    var ret;

    if (val === 0) {
        ret = "";
    } else if (val === 1) {
        ret = val + " " + formatString[0];
    } else if (val < 5) {
        ret = val + " " + formatString[1];
    } else {
        ret = val + " " + formatString[2];
    }

    return ret;
};

var getDateObj = function(d) {
    return {
        yy: d.getFullYear(),
        mn: d.getMonth() + 1,
        dd: d.getDate(),
        hh: d.getHours(),
        mi: d.getMinutes(),
        ss: d.getSeconds()
    };
};

var getDateDiff = function(date1, date2) {
    var startDate = (date1 > date2) ? getDateObj(date2) : getDateObj(date1);
    var endDate = (date1 <= date2) ? getDateObj(date2) : getDateObj(date1);

    var diff = {
        yy: endDate.yy - startDate.yy,
        mn: endDate.mn - startDate.mn,
        dd: endDate.dd - startDate.dd,
        hh: endDate.hh - startDate.hh,
        mi: endDate.mi - startDate.mi,
        ss: endDate.ss - startDate.ss
    };

    if (diff.ss < 0) {
        diff.ss += 60;
        --diff.mi;
    }
    if (diff.mi < 0) {
        diff.mi += 60;
        --diff.hh;
    }
    if (diff.hh < 0) {
        diff.hh += 24;
        --diff.dd;
    }
    if (diff.dd < 0) {
        diff.dd += getMonthDays(startDate.yy, startDate.mn);
        --diff.mn;
    }
    if (diff.mn < 0) {
        diff.mn += 12;
        --diff.yy;
    }

    return diff;
};

var getWeddingCountdown = function() {
    var weddingDate = new Date(2016, 3, 16, 15, 0, 0);
    var currentDate = new Date();
    var dateDiffObj = getDateDiff(weddingDate, currentDate);

    var arr = [];
    arr.push(getFormatString(dateDiffObj.yy, formatStr.yy));
    arr.push(getFormatString(dateDiffObj.mn, formatStr.mn));
    arr.push(getFormatString(dateDiffObj.dd, formatStr.dd));
    arr.push(getFormatString(dateDiffObj.hh, formatStr.hh));
    arr.push(getFormatString(dateDiffObj.mi, formatStr.mi));
    arr.push(getFormatString(dateDiffObj.ss, formatStr.ss));

    arr = arr.filter(function(d) {
        return d;
    });

    var res;
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        var val = arr[i];

        if (!res) {
            res = arr[i];
        } else if (res && (i + 1) == arr.length) {
            res += " a " + arr[i];
        } else {
            res += ", " + arr[i];
        }
    }
    return res;
};

var updateCountdown = function () {
  document.getElementById("countdown").innerHTML = getWeddingCountdown();
};

updateCountdown();
var timeoutID = window.setInterval(updateCountdown, 1000);
