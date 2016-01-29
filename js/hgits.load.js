(function() {
    require.config({
        baseUrl : './',
        paths: {
            jquery: 'lib/jquery/jquery-1.11.3.min',
            bootstrap : 'lib/bootstrap3/js/bootstrap.min'
        },
        shim : {  
            bootstrap : {  
            deps : [ 'jquery' ],  
            exports : 'bootstrap'  
            }  
        } 
    });
    require(['jquery'], function($) {
        alert($().jquery);
    });
    require(['bootstrap'], function($) {
        alert("all loaded");
    });
})(this); 