

var HOST_API = 'https://life.hlej.com';


//请求等待动画
function waiting(){
    var _html = $('<div class="waiting"><div class="container"><div class="box box1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="box box2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="box box3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div></div>');

    this.hide = function(){
      remove();
    }

    function remove(){
      _html.remove(); 
    }

    _html.appendTo(document.body);
  }


//提示框
function toolTip(text){
    var _html = $('<div class="tool-tip"><p>'+text+'</p></div>');
    if (!$('.tool-tip').length) {
        _html.appendTo(document.body); 
        setTimeout(function(){
            _html.addClass('active');
            setTimeout(function(){
                _html.removeClass('active');
                setTimeout(function(){
                    _html.remove();
                },300)
            },2000)
        },50)  
    }
}


//ajax请求
var $http = function(type,url,data,callback,flag,errorRe){
  var wait = new waiting();
  $.ajax({
      type : type,
      url : HOST_API+url,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType : 'json',
      success : function(data){
        if (flag){
          callback(data);
        }else{
          if (data.resultCode == '0000') {
            callback(data); 
          }else{
            toolTip(data.resultMessage);
          }
        } 
        wait.hide();
      },
      error : function(data){
        toolTip('系统异常，请稍后再试！');
        wait.hide();
      }
  });
}


//获取url参数
function getUrlParam(name){
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  return r != null ? r[2] : '';
}