/* eslint-disbaled */
var translateKeys;

var Re = {
    addDay:function(date, count) {
      date = this.convertToDate(date);
      return (date.setDate(date.getDate() + count)); //获取AddDayCount天后的日期
    },
    getDaysInfo:function (date){
      var Re = [];
      var monthDayCount = Re.getMonthDayCount(date);
      var monthInfo = Re.getDateInfo(date);
      var firstDayWhichDayInWeek = Re.getMonthFirstDayWhicDayInWeek(date);
      var nextMonthCount = (6 * 7) - firstDayWhichDayInWeek - monthDayCount;
      if (firstDayWhichDayInWeek > 0) {
        var preMonth = Re.getPreMonth(date);
        var preMonthLastDay = Re.getMonthDayCount(preMonth);
        var preMonthInfo = Re.getDateInfo(preMonth);
        for (var i = 0; i < firstDayWhichDayInWeek; i++) {
          var day = (preMonthLastDay - firstDayWhichDayInWeek + i + 1);
          var date = new Date(preMonthInfo.year,preMonthInfo.month-1,day);
          Re.push({
            date:date,
            dateStr :Re.ConvertDateToStr(date),
            year: preMonthInfo.year,
            month: preMonthInfo.month,
            day: day,
            mark: "premonth"
          });
        }
      }
      for (var i = 1; i <= monthDayCount; i++) {
        var date = new Date(monthInfo.year,monthInfo.month-1,i);
        Re.push({
          date:date,
          dateStr :Re.ConvertDateToStr(date),
          year: monthInfo.year,
          month: monthInfo.month,
          day: i,
          mark: "curmonth"
        });
      }
      if (nextMonthCount > 0) {
        var nextMonth = Re.getNextMonth(date);
        var nextMonthInfo = Re.getDateInfo(nextMonth);
        for (var i = 1; i <= nextMonthCount; i++) {
          var date = new Date(nextMonthInfo.year,nextMonthInfo.month-1,i);
          Re.push({
            date:date,
            dateStr :Re.ConvertDateToStr(date),
            year: nextMonthInfo.year,
            month: nextMonthInfo.month,
            day: i,
            mark: "nextmonth"
          });
        }
      }
      return Re;
    },
    convertStrToDate: function (str) {
        if (!str) {
            return new Date();
        }
        var str_arr = str.split(" ");
        var yearmonthday = str_arr[0];
        var hourminsecond = str_arr[1] || "";
        var hourminsecond_arr = hourminsecond.split(":");
        var yearmonthday_arr = yearmonthday.split("-");
        if (yearmonthday_arr.length != 3) {
            yearmonthday_arr = yearmonthday.split("/");
        }
        if (yearmonthday_arr.length != 3) {
            return new Date();
        }
        if (!hourminsecond) {
            return new Date(yearmonthday_arr[0], parseInt(yearmonthday_arr[1]) - 1, yearmonthday_arr[2]);
        }
        return new Date(yearmonthday_arr[0], parseInt(yearmonthday_arr[1]) - 1, yearmonthday_arr[2], hourminsecond_arr[0] || 0, hourminsecond_arr[1] || 0, hourminsecond_arr[2] || 0);

    },
    getPreMonth: function (date) {
        var dateInfo = this.getDateInfo(date);
        var nextMonth = new Date(dateInfo.year, dateInfo.month - 1, 0);
        return nextMonth;
    },
    getPreMonthFirstDay: function (date) {
       return this.getCurMonthFirstDay(this.getPreMonth(date));
    },
    getNextMonthFirstDay: function (date) {
        return this.getCurMonthFirstDay(this.getNextMonth(date));
     },
    getCurMonthFirstDay: function (date) {
        date = this.convertToDate(date);
        var dateInfo = this.getDateInfo(date);
        return new Date(dateInfo.year, dateInfo.month - 1, 1);
    },
    getPreYear: function (date) {
        var dateInfo = this.getDateInfo(date);
        var preYear = new Date(dateInfo.year - 1, dateInfo.month - 1, 1);
        return preYear;
    },
    setDateToYear: function (date, year) {
        var dateInfo = this.getDateInfo(date);
        var preYear = new Date(year, dateInfo.month - 1, 1);
        return preYear;
    },
    setMonthToDate: function (date, month) {
        month = parseInt(month);
        var dateInfo = this.getDateInfo(date);
        return new Date(dateInfo.year, month - 1, 1);
    },
    getNextYear: function (date) {
        var dateInfo = this.getDateInfo(date);
        var nextYear = new Date(dateInfo.year + 1, dateInfo.month - 1, 1);
        return nextYear;
    },
    getNextMonth: function (date) {
        var dateInfo = this.getDateInfo(date);
        var nextMonth = new Date(dateInfo.year, dateInfo.month + 1, 0);
        return nextMonth;
    },
    getMonthFirstDayWhicDayInWeek: function (date) {
        date = this.convertToDate(date);
        var d = new Date(date.getFullYear(), date.getMonth(), 1);
        return d.getDay();
    },
    getDateWhichDayInWeek: function (date) {
        date = this.convertToDate(date);
        return date.getDay();
    },
    timestampToDate: function (timestamp) {
        if (!timestamp) return new Date();

        // 特殊处理php时间戳
        if (timestamp.length === 10) {
            timestamp = timestamp * 1000;
        }
        return new Date(parseInt(timestamp));
    },
    ConvertDateToStr: function (date, formart) {
        date = this.convertToDate(date);
        var info = this.getDateInfo(date);
        info.month = info.month < 10 ? "0" + info.month : info.month;
        info.day = info.day < 10 ? "0" + info.day : info.day;
        info.min = info.min < 10 ? "0" + info.min : info.min;
        info.second = info.second < 10 ? "0" + info.second : info.second;
        info.hour = info.hour < 10 ? "0" + info.hour : info.hour;
        if (formart == "yyyy-MM-dd") {
            return info.year + "-" + info.month + "-" + info.day;
        } else if (formart == "yyyy-MM") {
            return info.year + "-" + info.month;
        } else if (formart == "yyyy-MM-dd hh:mm:ss") {
            return info.year + "-" + info.month + "-" + info.day + " " + info.hour + ":" + info.min + ":" + info.second;
        } else if (formart == "MM-dd hh:mm") {
            return info.month + "-" + info.day + " " + info.hour + ":" + info.min;
        } else if (formart == "hh:mm") {
            return info.hour + ":" + info.min;
        } else if (formart == "MM-dd week") {
            return info.month + "-" + info.day + " " + info.week;
        } else if (formart == "yyyy-MM-dd weekFullStr") {
            return info.year + "-" + info.month + "-" + info.day + " " + info.weekFullStr;
        } else if (formart == "yyyy-MM-dd week") {
            return info.year + "-" + info.month + "-" + info.day + " " + info.week;
        } else if (formart == "yyyy-MM-dd hh:mm") {
            return info.year + "-" + info.month + "-" + info.day + " " + info.hour + ":" + info.min;
        } else if (formart == "yyyy年MM月dd日") {
            return info.year + "年" + info.month + "月" + info.day + "日";
        } else if (formart === "all") {
            return {
                "yyyy-MM-dd": info.year + "-" + info.month + "-" + info.day,
                "yyyy年MM月dd日": info.year + "年" + info.month + "月" + info.day + "日"
            };
        }

        return info.year + "-" + info.month + "-" + info.day;
    },
    getMonthDayCount: function (date) {
        date = this.convertToDate(date);
        var newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return newDate.getDate();
    },
    convertToDate: function (date) {
        try {
            if (date instanceof Date) {
                return date;
            } else if (!isNaN(date)) {
                return this.timestampToDate(date);
            } else if (typeof(date) == "string") {
                return this.convertStrToDate(date);
            }
        } catch (e) {
            return new Date();
        }

        return new Date();
    },
    _processtime: function (num) {
        return (num < 10 ? ("0" + num) : num);
    },
    weekArr: ["日", "一", "二", "三", "四", "五", "六"],
    getDateInfo: function (date) {
        date = this.convertToDate(date);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var second = date.getSeconds();
        var week = date.getDay();
        var timestamp = date.getTime();

        return {
            year: date.getFullYear(),
            month: month,
            weekStr: this.weekArr[week],
            week: this.weekArr[week],
            weekFullStr: "星期" + this.weekArr[week],
            monthStr: this._processtime(month),
            day: day,
            dayStr: this._processtime(day),
            hour: hour,
            hourStr: this._processtime(hour),
            min: min,
            minStr: this._processtime(min),
            second: second,
            secondStr: this._processtime(second),
            timestamp: timestamp
        };
    },
    
	getTransitionKeys () {
        if (translateKeys) {
            return translateKeys;
        }
        var testStyle = document.createElement("DIV").style;
        var me = {};
        if ("-webkit-transform" in testStyle) {
            me.transitionend = "webkitTransitionEnd";
            me.transform = "WebkitTransform";
            me.cssTransform = "-webkit-transform";
            me.transition = "WebkitTransition";
        } else if("-ms-transform" in testStyle) {
            me.transitionend = "msTransitionEnd";
            me.transform = "msTransform";
            me.cssTransform = "-ms-transform";
            me.transition = "msTransition";
        } else {
            me.transitionend = "transitionend";
            me.transform = "transform";
            me.cssTransform = "transform";
            me.transition = "transition";
        }
        translateKeys = me;
        return me;
    },
    throttle(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options) options = {};
        var later = function() {
            previous = options.leading === false ? 0 : new Date().valueOf();;
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function() {
            var now = new Date().valueOf();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    },
};

export default Re;