var validate={
    phone:function (v) {
        var myreg = /^1[34578]\d{9}$/;
        return myreg.test(v)
    },
    empty:function (v) {
        var t=true;
        if(!v){return false}
        if(v.trim()==""){t=false;}
        return t
    },
    minLength:function (str,num) {
        if(str.length >= num){
            return true
        }else{
            return false
        }
    }
};

module.exports=validate;