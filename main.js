/**
 * Created by kenkozheng on 2015/7/10.
 */

'use strict';

(function (win) {
    //配置baseUrl
    var baseUrl = document.getElementById('main').getAttribute('data-baseurl');
    var base = 'lib/';
    /*
     * 文件依赖
     */
    var config = {
        baseUrl: baseUrl,

        paths: {
            // base: 'lib/', 
            jquery: 'lib/jquery/jquery-1.11.3.min',
            bootstrap : 'lib/bootstrap3/js/bootstrap.min',
            // ejs: 'js/sillyEjs',
            // underscore: 'lib/underscore',
            // text: 'lib/require/text' ,            //用于requirejs导入html类型的依赖
            css: 'lib/require/css.min' ,            //用于requirejs导入css类型的依赖
            angular: 'lib/angular/angular',
            uiRouter: 'lib/angular/angular-ui-router',
            app: 'js/app',
            mainModule: 'js/controller/mainModule',
            testModule: 'js/controller/testModule',

            jqDataTables: 'lib/datatables/jquery.dataTables.min',
            dataTablesBootstrap: 'lib/datatables/dataTables.bootstrap',

            dataTablesAngular: 'lib/datatables/angular-datatables',

            WdatePicker: 'lib/My97DatePicker/WdatePicker',
            jqtransform: 'lib/jqTransform/jquery.jqtransform',
            highcharts: 'lib/highcharts',
            kindeditor: 'lib/kindeditor/kindeditor',
            kindeditorZh_CN: 'lib/kindeditor/lang/zh_CN',
            jstree: 'lib/jstree/dist/jstree.min'
        },
        shim: {
            bootstrap : {
                deps : [ 'jquery' ],
                exports : 'bootstrap'
            } ,
            jqtransform : {
                deps : [ 'css!lib/jqTransform/jqtransform.css' ]
            } ,
            dataTablesBootstrap : {
                deps : [ 'jqDataTables','css!lib/datatables/dataTables.bootstrap.min.css' ]
            },
            dataTablesAngular : {
                deps : [ 'jqDataTables' ]
            } ,
            kindeditorZh_CN : {
                deps : ['kindeditor','css!lib/kindeditor/themes/default/default.css']
            },
            // underscore: {
            //     exports: '_'
            // },
            angular: {
                exports: 'angular'
            },
            uiRouter: {
                deps: ['angular']
            },
            app: {
                // deps: ['angular','uiRouter'],
                exports: 'routerApp'

            },
            jstree : {
                deps : [ 'css!lib/jstree/dist/themes/default/style.min.css' ]
            }
        }
    };

    require.config(config);
    require(['angular', 'app','mainModule'], function(angular){
        angular.bootstrap(document, ['routerApp']);
    });

    require(['jquery','bootstrap'], function(){
        //初始化页面
    });
})(window);
