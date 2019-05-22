var that=null;
var pageThat=null;
var tip={
    onEvent:function (_that) {
        that=this;
        pageThat=_that;

        _that.tooltip=that.tooltip;
    },
    tooltip:function (text) {
        pageThat.setData({
            'tip.tipText':text,
            'tip.tip':1
        });
        setTimeout(function () {
            pageThat.setData({'tip.tip':0})

        },2000);
    }
};
module.exports=tip;