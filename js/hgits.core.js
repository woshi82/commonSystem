/**
 * @author C杰
 * 
 */
(function($){
$.fn.extend({
/**
 * @param {Object} op: {type:GET/POST, url:ajax请求地址, data:ajax请求参数列表, callback:回调函数 }
 */
    ajaxUrl: function(op){
        var $this = $(this);
        $.ajax({
            type: op.type || 'GET',
            dataType:"html",
            url: op.url,
            data: op.data,
            cache: false,
            beforeSend:function(){
              Pace.restart();
            },
            success: function(response){
                op.callback(response);
            },
            error: function(){
            }
        });
    },
    loadUrl: function(url,data,callback){
        $(this).ajaxUrl({url:url, data:data, callback:callback});
    },
    initUI: function(){
        return this.each(function(){
            if($.isFunction(initUI)) initUI(this);
        });
    },
    /**
     * 判断当前元素是否已经绑定某个事件
     * @param {Object} type
     */
    isBind:function(type) {
        var _events = $(this).data("events");
        return _events && type && _events[type];
    },
    /**
     * 输出firebug日志
     * @param {Object} msg
     */
    log:function(msg){
        return this.each(function(){
            if (console) console.log("%s: %o", msg, this);
        });
    }
});
    
/**
 * 扩展String方法
 */
    $.extend(String.prototype, {
        isPositiveInteger:function(){
            return (new RegExp(/^[1-9]\d*$/).test(this));
        },
        isInteger:function(){
            return (new RegExp(/^\d+$/).test(this));
        },
        isNumber: function(value, element) {
            return (new RegExp(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/).test(this));
        },
        trim:function(){
            return this.replace(/(^\s*)|(\s*$)|\r|\n/g, "");
        },
        startsWith:function (pattern){
            return this.indexOf(pattern) === 0;
        },
        endsWith:function(pattern) {
            var d = this.length - pattern.length;
            return d >= 0 && this.lastIndexOf(pattern) === d;
        },
        replaceSuffix:function(index){
            return this.replace(/\[[0-9]+\]/,'['+index+']').replace('#index#',index);
        },
        trans:function(){
            return this.replace(/&lt;/g, '<').replace(/&gt;/g,'>').replace(/&quot;/g, '"');
        },
        encodeTXT: function(){
            return (this).replaceAll('&', '&amp;').replaceAll("<","&lt;").replaceAll(">", "&gt;").replaceAll(" ", "&nbsp;");
        },
        replaceAll:function(os, ns){
            return this.replace(new RegExp(os,"gm"),ns);
        },
        replaceTm:function($data){
            if (!$data) return this;
            return this.replace(RegExp("({[A-Za-z_]+[A-Za-z0-9_]*})","g"), function($1){
                return $data[$1.replace(/[{}]+/g, "")];
            });
        },
        replaceTmById:function(_box){
            var $parent = _box || $(document);
            return this.replace(RegExp("({[A-Za-z_]+[A-Za-z0-9_]*})","g"), function($1){
                var $input = $parent.find("#"+$1.replace(/[{}]+/g, ""));
                return $input.val() ? $input.val() : $1;
            });
        },
        isFinishedTm:function(){
            return !(new RegExp("{[A-Za-z_]+[A-Za-z0-9_]*}").test(this)); 
        },
        skipChar:function(ch) {
            if (!this || this.length===0) {return '';}
            if (this.charAt(0)===ch) {return this.substring(1).skipChar(ch);}
            return this;
        },
        isValidPwd:function() {
            return (new RegExp(/^([_]|[a-zA-Z0-9]){6,32}$/).test(this)); 
        },
        isValidMail:function(){
            return(new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(this.trim()));
        },
        isSpaces:function() {
            for(var i=0; i<this.length; i+=1) {
                var ch = this.charAt(i);
                if (ch!=' '&& ch!="\n" && ch!="\t" && ch!="\r") {return false;}
            }
            return true;
        },
        isPhone:function() {
            return (new RegExp(/(^([0-9]{3,4}[-])?\d{3,8}(-\d{1,6})?$)|(^\([0-9]{3,4}\)\d{3,8}(\(\d{1,6}\))?$)|(^\d{3,8}$)/).test(this));
        },
        isUrl:function(){
            return (new RegExp(/^[a-zA-z]+:\/\/([a-zA-Z0-9\-\.]+)([-\w .\/?%&=:]*)$/).test(this));
        },
        isExternalUrl:function(){
            return this.isUrl() && this.indexOf("://"+document.domain) == -1;
        }
    });
})(jQuery);