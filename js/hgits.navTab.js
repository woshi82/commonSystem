/*!
 navTab 1.0.0
*/
/**
 * @author C杰
 * 
 */
var navTab = {
	init: function(){
		//载入首页
		this.openTab("home", "home.html", {
              title: "首页"
        });

        //tab头部点击
        $(".navTab-tab").delegate("li","click",function(){
          var id = $(this).attr("aria-controls");
          $("#page-"+id).add($(this)).addClass("active").siblings(".active").removeClass("active");
        });

        //删除头部tab 
        $(".navTab-tab").on("click","button.close",function(e){
          navTab.closeTab($(this).parent().attr("aria-controls"));
          e.stopPropagation();
        });
         
        //左侧菜单点击
        $("a[target='navTab']").on("click",function(){
          var $this = $(this);
          var title = $this.attr("title") || $this.text();
          var tabid = $this.attr("rel") || "_blank";
          var url = $this.attr("href");
          var fresh = eval($this.attr("fresh") || "true");
          var external = eval($this.attr("external") || "false");

          navTab.openTab(tabid, url, {
              title: title,
              fresh: fresh,
              external: external
          });
          return false;
        });
        var index,tid;
        $('.navTab-tab').bind('contextmenu','li',function(e){ 
              return false;         
         });
       $('.navTab-tab').on('contextmenu','li',function(e){
            var e=e||window.event;
            if(3==e.which){
                    e.returnValue=false;
                    var x=e.pageX;
                    var y=e.pageY;
                    $('.right_tab').show();
                    $('.right_tab').css({
                        left: x+'px',
                        top: y+'px'
                    });
                }
                index=$(this).index();
                tid = $(this).attr("aria-controls");
            });
        $('.right_tab  li').eq(0).unbind('click').click(function(e) {
                    if(index!=0){
                         navTab.closeTab(tid);
                         $('.right_tab').hide();
                         return false;
                    }
           });
            $('.right_tab li').eq(1).unbind('click').click(function(event) {
                navTab.closeAllTab()
            });
            $('.right_tab li').eq(2).unbind('click').click(function(event) {
                      navTab.closeOtherTab(tid);
            });
            $(document).click(function(event) {
                $('.right_tab').hide();
             });  
    
    },
    switchTab: function(tabId){
        $("#page-"+tabId+",#tab-"+tabId).addClass("active").siblings(".active").removeClass("active");
    },
    openTab: function(tabid, url, options){
        var op = $.extend({title:"新建页面", type:"GET", data:{}, fresh:true, external:false}, options);
        var iOpenTab = $("#tab-"+tabid);
        if(iOpenTab.length > 0){
        	iOpenTab.find("span").html(op.title);
        	if(!iOpenTab.hasClass("active")){
            	this.switchTab(tabid);
        	}
        }
        else{
          var closeBtn = '<button type="button" class="close">&times;</button>';;
          if(tabid == "home") closeBtn = '';
        	$("#navTab .tabsPageHeader .navTab-tab > li.active,#navTab .tabsPageContent > .page.active").removeClass("active");
        	$("#navTab .tabsPageHeader .navTab-tab").append('<li class="active" id="tab-'+ tabid +'" aria-controls="'+ tabid +'"><span>'+ op.title +'</span>'+ closeBtn +'</li>');
        	$("#navTab .tabsPageContent").append('<div class="page active" id="page-'+ tabid +'">'+ op.title +'</div>');

        	var $page = $("#page-"+tabid);
			$page.ajaxUrl({
				type:op.type, url:url, data:op.data, callback:function(response){
					$page.html(response);
				}
			});
        }
        $("#page-"+tabid+",#tab-"+tabid).addClass("active").siblings(".active").removeClass("active");
    },
    closeTab: function(tabid){
    	var tab = $("#tab-"+tabid);
        if(tab.hasClass("active")){
            tab.prev().addClass("active");
            $("#page-"+tab.prev().attr("aria-controls")).addClass("active");
        }
        $("#page-"+tabid).add(tab).remove();
    },
    
    closeAllTab: function(){ //关闭所有
        $(".navTab-tab li").not('#tab-home').remove();
        $(".page").not('#page-home').remove();
        $("#page-home").addClass('active');
    },

    closeOtherTab: function(tabid){ //关闭其他
        var tab = $("#tab-"+tabid);
        $(".navTab-tab li").not('#tab-home').not("#tab-"+tabid).remove();
        $(".page").not('#page-home').not('#page-'+tabid).remove();
    }
};