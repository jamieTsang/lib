/**
 * Created by Administrator on 2014/4/20.
 */
var Response = {
    resultSuccess: 0,
    resultFalure: 0
};

Response.uiController = {
    BoxStyle: '#loading_unit{display:none;border-radius:8px;box-shadow:0 0 4px rgba(0,0,0,.5),inset 0 0 60.5px rgba(225,225,225,.4);position:fixed;z-index:9999;width:310px;height:auto;left:50%;top:50%;margin-left:-155px;margin-top:-60px;background:white;text-align:center;font-size:16px;}#loading_unit p{margin:0;}#loading_unit h1{font-size:16px;color:#555;font-weight:bold;padding:0;margin:16px 0 5px 0;letter-spacing:-.0125em;background:none;}#loading_unit h2{font-size:12px;color:#555;font-weight:400;padding:0;letter-spacing:-.0125em;margin:0.83em;',
    boxObject: null,
    DrawBox: function () {
        var oLoadingBox = document.createElement('div');
        oLoadingBox.id = 'loading_unit';
        oLoadingBox.innerHTML = '<h1>正在保存...</h1><p></p><h2>如长时间无响应，请刷新页面重新保存</h2>';
        this.boxObject = oLoadingBox;
        var oBoxStyle = document.createElement('style');
        oBoxStyle.innerHTML = Response.uiController.BoxStyle;
        document.body.appendChild(oLoadingBox);
        document.body.appendChild(oBoxStyle);
    },
    showSuccess: function () {
        if (this.boxObject)
            this.boxObject.innerHTML = '<h1>保存结果</h1><p><img src="/subject/edit/images/onebit_34.png" /></p><h2>操作成功！</h2>';
        $(this.boxObject).fadeIn('normal');
    },
    showFailure: function (exp) {
        if (this.boxObject)
            this.boxObject.innerHTML = '<h1>保存结果</h1><p><img src="/subject/edit/images/onebit_33.png" /></p><h2>操作失败！详细情况：' + exp + '</h2>';
        $('#loading_unit').fadeIn('normal');
    },
    hideProgress: function () {
        $('#loading_unit .progress').fadeOut(1000);
    },
    showComputedResult: function (index) {
        var intTimes = Response.resultSuccess + Response.resultFalure;
        var strLogo = '';
        if (!Response.resultFalure) {
            strLogo = "<img src='/subject/edit/images/onebit_34.png' />";
        } else {
            strLogo = "<img src='/subject/edit/images/onebit_33.png' />";
        }
        this.boxObject.innerHTML = '<h1>保存结果</h1><p>' + strLogo + '</p><h2>修改项目：' + intTimes + '项；成功：' + Response.resultSuccess + '项；失败：' + Response.resultFalure + '项</h2>';
    },
    showLoadingBar: function () {
        $('#loading_unit p').html("<img src='/subject/edit/images/loading_bar.gif' />");
    },
    hideLoadingBar: function () {
        $('#loading_unit .progress').hide();
    },
    beforeSend: function () {
        $(this.boxObject).fadeIn('normal');
        $('#loading_unit p').html("<img src='/subject/edit/images/loading_bar.gif' />");
    },
    showResultBox: function (title,isSucess,result) {
        $(this.boxObject).fadeIn('100');
        var strLogo = '';
        if(isSucess)
            strLogo = "<img src='/subject/edit/images/onebit_34.png' />";
        else
            strLogo = "<img src='/subject/edit/images/onebit_33.png' />";
        this.boxObject.innerHTML = '<h1>'+title+'</h1><p>' + strLogo + '</p><h2>'+result+'</h2>';
        setTimeout("$(Response.uiController.boxObject).fadeOut(500)", 3000);
    }
};

