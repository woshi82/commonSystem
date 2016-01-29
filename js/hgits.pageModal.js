/*!
 pageModal 1.0.0
*/
/**
 * @author C杰
 * 
 */
var pageModal = {
	init: function(){
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
    },
    switchTab: function(tabId){
        $("#page-"+tabId+",#tab-"+tabId).addClass("active").siblings(".active").removeClass("active");
    },
    openModal: function(url, rel, title, options){
        var op = $.extend({title:"新建页面", type:"GET", data:{}, fresh:true, external:false}, options);
        var modal = $("#modal");
        modal.find(".modal-title").html(title);
        modal.find(".modal-body").ajaxUrl({
          type:op.type, 
          url:url, 
          data:op.data, 
          callback:function(response){
            modal.find(".modal-body").html(response);
            modal.modal('show');
          }
        });
    },
    closeTab: function(tabid){
    	var tab = $("#tab-"+tabid);
        if(tab.hasClass("active")){
            tab.prev().addClass("active");
            $("#page-"+tab.prev().attr("aria-controls")).addClass("active");
        }
        $("#page-"+tabid).add(tab).remove();
    }

};