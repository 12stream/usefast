function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time.toFixed(0)

  return ([minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatTimeS(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time.toFixed(0);

  return ([hour,minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}
//将秒数转成时分秒
function toTimeHMS(value) {
    var theTime = parseInt(value);// 秒 
    var theTime1 = 0;// 分 
    var theTime2 = 0;// 小时 
    // alert(theTime); 
    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        // alert(theTime1+"-"+theTime); 
        if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
        }
    }
    var result = "" + parseInt(theTime) + "秒";
    if (theTime1 > 0) {
        result = "" + parseInt(theTime1) + "分" + result;
    }
    if (theTime2 > 0) {
        result = "" + parseInt(theTime2) + "小时" + result;
    }
    return result;
}
// 提取标准时间中的 月份，日期
 function filter(obj){
     console.log("开始");
     var objT = new Date(obj);
     var objMo = objT.getMonth() + 1;
     var objD = objT.getDate();
     var objH = objT.getHours();
     var objM = objT.getMinutes();

     var nowTime = new Date();
     var nowYear = nowTime.getFullYear();
     // console.log(obj);
     // console.log(objT);
     // console.log(objT.getMonth());
     // console.log(objMo);
     // console.log(objD);
     // console.log(objH);
     // console.log(objM);
     // console.log(nowTime);
     // console.log(nowYear);
     // console.log("结束");
               if (new Date(obj).getFullYear < nowYear){
                     return obj
               }else {
                   return obj= objMo + "-"+objD +"  "+objH+":"+ objM;
               }

     return obj
 }

function getDateDiff(dateTimeStamp) {
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var year = day * 365;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    //非法操作
    return '数据出错';
  }
  var yearC = diffValue / year;
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (yearC >= 1) {
    result = parseInt(yearC) + '年以前';
  } else if (monthC >= 1) {
    result = parseInt(monthC) + '个月前';
  } else if (weekC >= 1) {
    result = parseInt(weekC) + '星期前';
  } else if (dayC >= 1) {
    result = parseInt(dayC) + '天前';
  } else if (hourC >= 1) {
    result = parseInt(hourC) + '小时前';
  } else if (minC >= 5) {
    result = parseInt(minC) + '分钟前';
  } else {
    result = '刚刚播放';
  }
  return result;
}

module.exports = {
  formatTime: formatTime,
  formatTimeS: formatTimeS,
  getDateDiff: getDateDiff,
  toTimeHMS: toTimeHMS,
  filter: filter
}
