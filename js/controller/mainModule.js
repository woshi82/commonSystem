/**
 * Created by zyl.2016.1.18
 */
define(['app'], function (routerApp) {
	mainModule = angular.module('MainModule', []);
    routerApp.requires.push('MainModule');
	
	
		
    mainModule.run(['$rootScope','$urlMatcherFactory','Req_data','routerDataCache',function($rootScope,$urlMatcherFactory,Req_data,routerDataCache){


  //   	$rootScope.$on('$stateChangeError', 
		// 	function(evt, toState, toParams, fromState, fromParams) {
		// 	  // 如果需要阻止事件的完成
		// 	  console.log(toParams)
		// 	  // evt.preventDefault();
		// });

    	// var urlMatcher = $urlMatcherFactory.compile("/index/:routerType/:childFunc/{id}");
    	// $stateProvider.state('myState', {url: urlMatcher,template:template/index_main.html});

    }])

	mainModule.controller('MainConCtl', ['$scope','$stateParams',function($scope,$stateParams) {

                console.log('t')
                $scope.t = function(){
                    console.log('t')
                }
                // console.log($stateParams.routerType);
        }]);
    mainModule.service('Req_data', ['$rootScope','$http',function($rootScope,$http) {
    	var reqSideBar = function(){
	    		return $http({
	    			method: 'GET',
	    			url: 'js/data/sideBarData.json'
	    		}).error(function(){
	                console.log('请求失败');
	    		});
	    	},
	    	reqHtml = function(url){
	                // console.log(url);

	    		return $http({
	    			method: 'GET',
	    			url: url
	    		}).error(function(text,status){
	                console.log(status);
	                if(status == 404){
					    window.location.href = 'http://10.173.230.80:8022/webapp';
	                }
	                console.log('请求失败');
	    		});
	    	};
    	return {
    		'reqSideBarData': function(){
    			return reqSideBar();
    		},
    		'reqHtmlData': function(url){
    			return reqHtml(url);
    		}
    	}
            
    }]);
    mainModule.directive('bnPreload', ['$stateParams','$compile','$state','$timeout','$window','Req_data','routerDataCache',function($stateParams,$compile,$state,$timeout,$window,Req_data,routerDataCache) {
    	return({
			compile: compile,
			priority: 250,
			terminal: true,
			// replace:true,
			transclude: "element"
			// transclude: true,
			// template:'<div class="row" ng-transclude></div>'
		});

    	function compile(templateElement, templateAttribute, transclude){
    		function preLink($scope, element, attributes){
				var injectedElement = null;
				var isDestroyed = false;
				var strJSON = {};
	    		var sHtml = '';
	    		var nowState = $window.location.hash.split('/').pop(),
	    			isThis = false,
	    			bFirst = true;	
				Req_data.reqSideBarData().success(function(data){
					if ( isDestroyed ) {return;}
	    			angular.forEach(data, function(v,i) {
	    				var sSubHtml = '';
	    				var sParHtml = '';
	    				isThis = false;
					  	angular.forEach(v.subTitle, function(value,key) {
					  		if(nowState == key){
					  			isThis = true;
					  		}
					  		strJSON[key] = {};
		    				strJSON[key].Zh_name = value.Zh_name;
		    				strJSON[key].url = value.url;
		    				if(value.child){
			    				strJSON[key].child = value.child;
		    				}
		    				// 存储首页状态
		    				if(bFirst){
				    			bFirst = false;	
				    			oState = {
				    				"state": key
				    			};
			    				routerDataCache.put('firstState',oState);
		    				}

		    				sSubHtml += '<li> <a href="#/index/'+key+'">'+value.Zh_name+'</a></li>';

	    				});
	    				if(isThis){
		    				sParHtml = '<li class="active"> <a href="javascript:;"> <span class="glyphicon glyphicon-align-left" aria-hidden="true"></span> <span class="nav_title">'+v.title+'</span> </a><ul class="sub_nav" style="display:block">'+sSubHtml+'</li></ul>';

	    				}else{
		    				sParHtml = '<li> <a href="javascript:;"> <span class="glyphicon glyphicon-align-left" aria-hidden="true"></span> <span class="nav_title">'+v.title+'</span> </a><ul class="sub_nav">'+sSubHtml+'</li></ul>';
	    				}
		    			sHtml += sParHtml;
	    			});

	    			routerDataCache.put('strJSON',strJSON);
	    			routerDataCache.put('sidebarDom',sHtml);
	    			console.log(222)
	    			transclude($scope,function(){
	    				element.after('<div class="row" id="t"><div class="col-sm-3 col-md-2 sidebar nopadding" sidebar> <a class="side-btn"></a> <ul class="nav nav-sidebar"> </ul> </div> <div  ui-view="main"></div></div>') ;
	    			});
	    			$compile($('#t').contents())($scope);
	    			
	    		});

    			$scope.$on("$destroy",function() {
					isDestroyed = true;
				});
    		}
    		function postLink(scope, iElement, iAttrs, controller) {

    			
    		}
    		return {
    			pre: preLink,
    			post: postLink
    		};
    	}


	}]);
	mainModule.factory('routerDataCache', ['$cacheFactory', function($cacheFactory) {
	    return $cacheFactory('router-data-cache');
  	}]);
	mainModule.directive('sidebar', ['$stateParams','$compile','$state','$timeout','Req_data','routerDataCache',function($stateParams,$compile,$state,$timeout,Req_data,routerDataCache) {
		return {
	        restrict: 'AE',
	        transclude: true,
	        replace: true,
	        template: '<div class="col-sm-3 col-md-2 sidebar nopadding" ng-transclude></div>', 
	        controller: function($scope){
	        	$scope.sideBarData = [];
	    	},
	    	link: function(scope, element, attrs){
	    		var navSidebar = element.find('.nav-sidebar'),
	    			template = routerDataCache.get('sidebarDom');
    			
		        // var cacheStrJSON = routerDataCache.get('strJSON');
	    			console.log(333)
	    			console.log(routerDataCache.get('sidebarDom'))

    			initSideBar();

	    		function initSideBar(){
	    			navSidebar.append(template);
	    			console.log(navSidebar);
	    			$compile(navSidebar.contents())(scope);

    				$(".nav-sidebar li a").unbind('click');
			        $(".nav-sidebar li a").bind('click',function(){
			        	initSlide($(this));
			        });
			        //剩下导航图标
			        var show=false;
    				$(".side-btn").unbind('click');
			        $(".side-btn").bind('click',function(event) {
			            if(show){
			                sidebarShow();
			            }else{
			                $(".sidebar").css('width', 30+'px');
			                $(".nav_title").hide();
			                $(".sub_nav").hide();
			                show=true;
			                $("body").addClass('hide-sidebar');
			                $(".nav-sidebar li a").unbind('click',function(){
			                	initSlide($(this));
			                });
			            }
			           
			        });
			        function sidebarShow(){
			        	$(".sidebar").css('width','');
		                $(".nav_title").show();
		                $(".nav-sidebar li[class='active']").find(".sub_nav").show();
		                show=false;
		                $("body").removeClass('hide-sidebar');
		                $(".nav-sidebar li a").unbind('click');
		                $(".nav-sidebar li a").bind('click',function(){
		                	initSlide($(this));
		                });
			        }
					function initSlide(obj){
						if(!show){
				            var parentLi=obj.parent('li');
				            if(parentLi.hasClass('active')){
				                obj.siblings('.sub_nav').slideToggle(200);
				            }else{
				                parentLi.addClass('active').siblings('li').removeClass('active');
				                obj.siblings('.sub_nav').slideDown(200).parent('li').siblings('li').find('.sub_nav').slideUp(200);
				            }
						}
						else{
							sidebarShow();
						}
	
			        };
	    		}
	    	}
    	}
	}]);
	mainModule.directive('navtab', ['$rootScope','$stateParams','$compile','$state','routerDataCache','Req_data',function($rootScope,$stateParams, $compile,$state,routerDataCache,Req_data) {
		return {
	        restrict: 'AE',
	        replace: true,
	        template: '<ul class="navTab-tab"></ul>', 
	        controller: function($scope){
	    	},
	    	link: function(scope, element, attrs){
				var storageSession = window.sessionStorage,
					routerType = $stateParams.routerType,
		        	childFunc = $stateParams.childFunc,
		        	// id = $stateParams.childFunc,
					nowState,
					hasSave = false,
					sHtml = '';
					// console.log($state)
				var strJSON = routerDataCache.get('strJSON'),
					tabArr = JSON.parse(storageSession.getItem('tabArr')) || [];;
				if(childFunc){
					nowState = {
						state: routerType+'/'+childFunc
						// ,id: id?id:''
					};
				}else{
					nowState = {
						state: routerType
					};
				}
				init();
			  	function init(){
			  		
		    		angular.forEach(tabArr, function(value,i) {
					  	if(value.state == nowState.state){
					  		hasSave = true;
					  		// if(nowState.id){
					  		// 	value.id = nowState.id;
					  		// }
					  	}
					});
					if(!hasSave){
			    		tabArr.push(nowState);
					};
		    		storageSession.setItem('tabArr',JSON.stringify(tabArr));
		    		angular.forEach(tabArr, function(value,i) {
		    			var arr = value.state.split('/'),Zh_name,route;
	    				Zh_name = (arr.length > 1)?strJSON[arr[0]].child[arr[1]].Zh_name:strJSON[arr[0]].Zh_name;
	    				route = value.state;
	    				// route = value.state + ((value.id)?('/'+value.id):'')
		    			if(value.state == nowState.state){
		    				sHtml += '<li class="active" > <a href="#/index/'+route+'">'+Zh_name+'</a><button  ng-click="closepage('+"'"+value.state+"'"+')" type="button" class="close">×</button></li>';
		    			}
		    			else {
		    				sHtml += '<li> <a href="#/index/'+route+'">'+Zh_name+'</a><button  ng-click="closepage('+"'"+value.state+"'"+')" type="button" class="close">×</button></li>';
		    			}
		    		});
		    		element.append(angular.element(sHtml));
	    			$compile(element.contents())(scope);

	    			$rootScope.closepage = function(v){
	    				console.log(134)
	    				var iPos,nextState;
	    				angular.forEach(tabArr, function(value,i) {
	    					if(value.state == v){
						  		iPos = i;
						  	}
	    				});
	    				tabArr.splice(iPos,1);
	    				if(tabArr.length <= 0){
	    					//进入首页
			    			nextState = routerDataCache.get('firstState');
	    					tabArr.push(nextState);
	    				}else if(iPos-1 < 0){
	    					nextState = tabArr[iPos];
	    				}else{
	    					nextState = tabArr[iPos-1]
	    				};
	    				var arr = nextState.state.split('/'),
		    				params = {};
		    				if (arr.length>1) {
		    					params.childFunc = arr[1];
		    				};
		    				// if(nextState.id){
		    				// 	params.id = nextState.id;
		    				// }
	    					params.routerType = arr[0];

			    		storageSession.setItem('tabArr',JSON.stringify(tabArr));
	    				$state.go('index',params,{ reload:true });	
	    			}
			  	}
	    	}
    	}
	}]);
	
	mainModule.directive('pagecontent', ['$rootScope','$stateParams','$compile','$templateCache','$timeout','$location','routerDataCache','Req_data',function($rootScope,$stateParams,$compile,$templateCache,$timeout,$location,routerDataCache,Req_data) {
		return {
	        restrict: 'AE',
	        replace: true,
	        transclude: true,
	        template: '<div class="tabsPageContent" id="changeMain"></div>', 
	        controller: function($scope){
	    	},
	    	link: function(scope, element, attrs){
	    		var pageContentH = $(window).height() - $(".tabsPageContent").offset().top;
		        if($(".footer")){ 
		        	pageContentH -= $(".footer").outerHeight(); 
		        }
		        $(".tabsPageContent").height(pageContentH);
		        var cacheStrJSON = routerDataCache.get('strJSON'),
		        	URL,
		        	routerType = $stateParams.routerType,
		        	childFunc = $stateParams.childFunc;

		        if(childFunc){
		        	URL = cacheStrJSON[routerType].child[childFunc].url;
		        	if($location.$$search){
		        		var str = '?'
			    		angular.forEach($location.$$search, function(value,key) {
			    			str += key+'='+value;
	        			});
	        			URL += str;
		        	}

		        }else{
					URL = cacheStrJSON[routerType].url;
		        }
		        

				var template = $templateCache.get(URL);
				// if(template){
		  //       	element.append(template);
				// }
				// else{
			        Req_data.reqHtmlData(URL).success(function(data){
			        	element.append(angular.element(data));
			        	$templateCache.put(URL, data);
		    			$compile(element.contents())(scope);
			        })	
				// }
				

    		}
		}
	}]);

	return mainModule;

});