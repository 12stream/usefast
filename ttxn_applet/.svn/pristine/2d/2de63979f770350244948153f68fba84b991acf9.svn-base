var time={
    sConversionTime:function (time) {
        if (typeof time !== 'number' || time < 0) {
            return time
        }
        var hour = parseInt(time / 3600)
        time = time % 3600
        var minute = parseInt(time / 60)
        time = time % 60
        var second = time.toFixed(0);
        var str=([minute, second]).map(function (n) {
            n = n.toString()
            return n[1] ? n : '0' + n
        }).join(':');
        if(!str){
            str=0;
        }
        return str
    },
    isToday:function (time) {
        var todayMS =Date.now();
        var todayNoonMs=this._getTodayNoonMs();

        if(todayMS-time<todayNoonMs){
            return true
        }else{
            return false
        }
    },
    _getTodayNoonMs:function () {
        var temp=0;
        var todayMS =Date.now();
        var data=new Date(todayMS);
        temp=new Date(data.toLocaleDateString());
        var todayNoonMs=todayMS-temp.getTime();
        return todayNoonMs
    },
    isYesterday:function (time) {
        if(!time){
            return '刚刚'
        }
        console.log(new Date(time))
        if(this.isToday(time)){return false}
        var todayMS = Date.now();
        var todayNoonMs=this._getTodayNoonMs();

        if(todayMS-time<(todayNoonMs+86400000)){
            return true
        }else{
            return false
        }
    },
    timeDifference:function (dateTimeStamp){
        var result=0;
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var year=day*365;
        var now = new Date().getTime();
        var date=new Date(dateTimeStamp);
        var diffValue = now - dateTimeStamp;
        if(diffValue < 0){return;}
        var yearC=diffValue/year;
        var monthC =diffValue/month;
        var weekC =diffValue/(7*day);
        var dayC =diffValue/day;
        var hourC =diffValue/hour;
        var minC =diffValue/minute;
        if(yearC>=1){
            let temp=date.getMonth()+1;
            if(temp<10){
                temp='0'+temp;
            }
            let temp2=date.getDate();
            if(temp2<10){
                temp2='0'+temp2;
            }
            result =""+date.getFullYear()+"-"+ temp+"-"+ temp2;
        }
        else if(monthC>=1){
            let temp=date.getMonth()+1;
            if(temp<10){
                temp='0'+temp;
            }
            let temp2=date.getDate();
            if(temp2<10){
                temp2='0'+temp2;
            }
            result =""+ temp+"-"+ temp2;
            // result="" + parseInt(monthC) + "月前";
        }
        // else if(weekC>=1){
        //     result="" + parseInt(weekC) + "周前";
        // }
        else if(dayC>=1){
            result=""+ parseInt(dayC) +"天前";
        }
        else if(hourC>=1){
            result=""+ parseInt(hourC) +"小时前";
        }
        else if(minC>=1){
            result=""+ parseInt(minC) +"分钟前";
        }else {
            result="刚刚";
        }

        return result;
    }
};
module.exports=time;