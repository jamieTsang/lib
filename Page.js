/**
 * Created by Administrator on 2014/4/20.
 */
var Page={};
Page.version='';
Page.location=String(window.location);
Page.Editor=[];
Page.getDocumentName=function(){
    if(this.location.match(/\?\S*(\d{6}_\w+_*\w+)/i))
        return this.location.match(/\?\S*(\d{6}_\w+_*\w+)/i)[1];
};
Page.getHashNumber=function(){
    if(this.location.match("#"))
       return this.location.match(/#(\d+)/i)[1];
};
Page.checkAccout=function(func){
    var _this=this;
    $.ajax({
        url: '/Users/AjaxHandler/LoginCheck.aspx',
        type: "post",
        async: true,
        data: "checktype=getinfouser",
        error: function (XMLHttpRequest, strError, strObject) {
            alert("ajax服务器请求超时！错误详情" + strObject);
            return false;
        },
        success: function (json) {
            var arrJson = new Array();
            var models = eval("(" + json + ")");
            if ( models.UserID > 0) {
                $.ajax({
                    type: "POST",
                    data: {
                        name: encodeURI(models.UserName),
                        url: encodeURI(_this.getDocumentName())
                    },
                    sync:false,
                    url: '/subject/edit/login.aspx',
                    timeout: 20000,
                    error: function (XMLHttpRequest, strError, strObject) {
                        Page.returnToLogin();
                        return false;
                    },
                    success: function (response) {
                        if (response == "True") {
                            var adminCookie = new GzlCookie("admin");
                            adminCookie.setCookie("Checked", 30);
                            func.call();
                        } else {
                            $body.text("非指定用户！");
                            var t = setTimeout("window.location.href ='http://www.gzl.com.cn/error/Error404.html'", 1000);
                            return false;
                        }
                    }
                })
            } else {
                Page.returnToLogin();
                return false;
            }
        }
    });
};
Page.clearEditor=function(){
    Page.Editor=[];
};
Page.returnToLogin=function (){
    window.location.href = "/subject/edit/LoginFail.html";
};