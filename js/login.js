$(function(){
    var errorMsg = "";
    $('.form-group input').focus(function(){
        $(this).parents(".form-group").addClass("focus");
    }).blur(function(){
        $(this).parents(".form-group").removeClass("focus");
        if($(this).val()){
            $(this).parents(".form-group").removeClass("has-error");
            $("#errorMsg").html("").addClass("hidden");
        }
    });
    
    $("#loginBtn").on("click",function(e){
        e.preventDefault();
        if(check()){
            $("form").submit();
        }
        else{
            if(errorMsg){
                $("#errorMsg").html(errorMsg).removeClass("hidden");
            }
        }
    });

    $(".showPwd").on("click",function(){
        var type = "text";
        if($(".showPwd").hasClass("active")){
            $(".showPwd").removeClass("active");
            type = "password";
        }
        else{
            $(".showPwd").addClass("active");
        }
        $("#password").attr("type",type);
    });

    function check(){
        var ur = $("#username").val();
        var pwd = $("#password").val();
        if(ur == "" && pwd == ""){
            $("#ur-group,#pwd-group").addClass("has-error");
            $("#username").focus();
            errorMsg = "请输入用户名和密码";
            return false;
        }
        else if(ur == ""){
            $("#ur-group").addClass("has-error");
            $("#username").focus();
            errorMsg = "请输入用户名";
            return false;
        }
        else if(pwd == ""){
            $("#pwd-group").addClass("has-error");
            $("#password").focus();
            errorMsg = "请输入密码";
            return false;
        }
        return true;
    }
});

