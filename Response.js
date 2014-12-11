/**
 * Created by Administrator on 2014/4/20.
 */
var Response = {
    resultSuccess: 0,
    resultFalure: 0,
    clearResultCount: function () {
        Response.resultSuccess = Response.resultFalure = 0;
    }
};


Response.uiController = {
    BoxStyle: '#loading_unit{display:none;border-radius:8px;box-shadow:0 0 4px rgba(0,0,0,.5),inset 0 0 60.5px rgba(225,225,225,.4);position:fixed;z-index:9999;width:310px;height:auto;left:50%;top:50%;margin-left:-155px;margin-top:-60px;background:white;text-align:center;font-size:16px;}#loading_unit p{margin:0;}#loading_unit h1{font-size:16px;color:#555;font-weight:bold;padding:0;margin:16px 0 5px 0;letter-spacing:-.0125em;background:none;}#loading_unit h2{font-size:12px;color:#555;font-weight:400;padding:0;letter-spacing:-.0125em;margin:0.83em;',
    boxObject: null,
    drawBox: function () {
        //var _this=this;
        var oLoadingBox = document.createElement('div');
        oLoadingBox.id = 'loading_unit';
        oLoadingBox.innerHTML = '<h1>正在保存...</h1><p></p><h2>如长时间无响应，请刷新页面重新保存</h2>';
        this.boxObject = oLoadingBox;
        var oBoxStyle = document.createElement('style');
        oBoxStyle.innerHTML = Response.uiController.BoxStyle;
        document.body.appendChild(oLoadingBox);
        document.body.appendChild(oBoxStyle);
        $(Response.uiController.boxObject).ajaxStart(
            function(){
                Response.uiController.showLoadingBox();
            }
        );
        $(Response.uiController.boxObject).ajaxStop(function() {
            Response.uiController.completeHideResultBox();
        });
    },
    showLoadingBox: function () {
        $(this.boxObject).show();
        $(this.boxObject).html('<h1>正在操作</h1><p><img src="/subject/edit/images/loading_bar.gif" /></p><h2>如长时间无响应，请刷新页面重新操作</h2>');
    },
    showSuccess: function () {
        var param = ["操作成功！", "执行结果"];
        for (i = 0; i < arguments.length; i++) {
            param[i] = arguments[i];
        }
        if (this.boxObject)
            this.boxObject.innerHTML = '<h1>' + param[1] + '</h1><p><img src="/subject/edit/images/onebit_34.png" /></p><h2>' + param[0] + '</h2>';
        this.completeHideResultBox();
    },
    errorShowResultBox: function () {
        var title = "保存结果";
        var param = [];
        for (i = 0; i < arguments.length; i++) {
            param.push(arguments[i]);
        }
		
        if (this.boxObject){
            this.boxObject.innerHTML = '<h1>' + param[0] + '</h1><p><img src="/subject/edit/images/onebit_33.png" /></p><h2>操作失败，请刷新浏览器重新操作！<br/>';
			(arguments.length)&&(this.boxObject.innerHTML +='<b>详细情况：</b><br/>' + param.join('<br/>')+ '</h2>');
		}
    },
    showComputedResult: function () {
        var intTimes = Response.resultSuccess + Response.resultFalure;
        var strLogo = '';
        if (!Response.resultFalure) {
            strLogo = "<img src='/subject/edit/images/onebit_34.png' />";
        } else {
            strLogo = "<img src='/subject/edit/images/onebit_33.png' />";
        }
        this.boxObject.innerHTML = '<h1>保存结果</h1><p>' + strLogo + '</p><h2>修改项目：' + intTimes + '项；成功：' + Response.resultSuccess + '项；失败：' + Response.resultFalure + '项</h2>';
    },
    hideLoadingBar: function () {
        $('#loading_unit .progress').hide();
    },
    successShowResultBox: function () {
		var title = "保存结果";
        var param = [];
        var result = '';
        var regexWarnning='';
        var fileName='';
        for (i = 0; i < arguments.length; i++) {
            param.push(arguments[i]);
        }
        var strLogo = '';
        if (/True/.test(param[0])&& !/_file/.test(param[0]) && !/False/.test(param[0])) {
            strLogo = "<img src='/subject/edit/images/onebit_34.png' />";
            result = '保存成功';
            this.completeHideResultBox();
        }
        else if(/True\(x\d+\)_file=\S+/.test(param[0])&& !/False/.test(param[0])){
            regexWarnning=param[0].match(/True\(x(\d+)\)/i)[1];
            fileName=param[0].match(/_file=(\S+)/i)[1];
            //console.log(regexWarnning,fileName);
            if(regexWarnning=='0001'){
                strLogo = "<img width='30' height='30' src='/subject/edit/images/onebit_35.png' />";
                result = '保存成功,警告系统未能检测到模板'+fileName+'含有基本的数据统计{$static}代码！搞唔好会影响绩效哦！';
            }
            this.completeHideResultBox(3000);
        }
        else {
            strLogo = "<img src='/subject/edit/images/onebit_33.png' />";
            result = '保存失败，请检查相关文件后刷新浏览器重新操作！<br/>';
			arguments.length&&(result +='<b>详细情况：</b><br/>' + param.join('<br/>'));
        }
        this.boxObject.innerHTML = '<h1>' + title + '</h1><p>' + strLogo + '</p><h2>' + result + '</h2>';

    },
    completeHideResultBox: function (m) {
        this.hideTime=m||1000;
        setTimeout('$(Response.uiController.boxObject).fadeOut(Response.hideTime)', 15000);
    }
};

