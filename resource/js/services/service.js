/**
 * 方案模型类
 */
angular.module('myServices', []).factory('Plan', function($http, $q) {
	return {
		getDaily : function(date) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/getPlansByDay/day/' + date;
			$http.get(url, {
				cache : true
			}).success(function(ret) {
				var data = ret.data;
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		getPreviousDay : function(date) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/getPlansPreviousDay/day/' + date;
			$http.get(url).success(function(ret) {
				var data = ret.data.previous;
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		getByType : function(type, style, last_id) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/getListByType/type/' + type + '/style/' + style + '/id/' + last_id;
			$http.get(url).success(function(ret) {
				var data = ret.data;
				deferred.resolve(data);

			});
			return deferred.promise;
		},
		getInfo : function(CloudID) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/getPlan/id/' + CloudID;
			$http.get(url).success(function(ret) {
				var data = ret.data;
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		addGood : function(CloudID) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/setPlanGood/id/' + CloudID;
			$http.get(url).success(function(ret) {
				var status = ret.status;
				deferred.resolve(status);
			});
			return deferred.promise;
		},
		addComment : function(reply) {
			reply.username = _userInfo.username;
			reply.deviceuid = _userInfo.deviceuid;
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/setPlanComment/';
			$http.post(url, reply).success(function(ret) {
				var data = ret.data;
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		getComments : function(CloudID, last_id) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/getPlanComments/id/' + CloudID + '/last_id/' + last_id;
			$http.get(url).success(function(ret) {
				var data = ret.data;
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		addFavor : function(CloudID) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/setFavor/username/' + _userInfo.username + '/CloudID/' + CloudID;
			$http.get(url).success(function(ret) {
				var status = ret.status;
				deferred.resolve(status);
			});
			return deferred.promise;
		},
		delFavor : function(obj) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/delFavor/username/' + _userInfo.username + '/CloudID/' + obj.CloudID;
			$http.get(url).success(function(ret) {
				var status = ret.status;
				deferred.resolve(status);
			});
			return deferred.promise;
		},
		match : function(CloudID) {
			var deferred = $q.defer();
			var url = _GLOBAL.matchapi + '/match/CloudID/' + CloudID;
			$http.get(url).success(function(ret) {
				var data = ret.data;
				deferred.resolve(data);
			});
			return deferred.promise;
		}
	}
}).factory('User', function($http, $q, $ionicModal, $rootScope) {
	return {
		home : function(username) {
			$ionicModal.fromUrl('/indexUser/' + username, {
				scope : $rootScope,
				controller : "IndexCtrl",
			}).then(function(modal) {
				modal.show()
			})
		},
		isSignIn : function(username) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/isSignIn/username/' + username;
			$http.get(url).success(function(ret) {
				var ret = ret.status;
				deferred.resolve(ret);
			});
			return deferred.promise;
		},
		signIn : function(username) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/signIn/username/' + username;
			$http.get(url).success(function(ret) {
				var ret = ret.status;
				deferred.resolve(ret);
			});
			return deferred.promise;
		},
		// 用户概况
		getInfo : function(username) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/getUserSummary/username/' + username;
			$http.get(url, {
				cache : true
			}).success(function(ret) {
				var data = ret.data;
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		getFavor : function(username, last_id) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/getFavor/username/' + username + '/id/' + last_id;
			$http.get(url).success(function(ret) {
				var data = ret.data;
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		getPlans : function(username, last_id) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/getMyPlans/username/' + username + '/id/' + last_id;
			$http.get(url).success(function(ret) {
				var data = ret.data;
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		getCusList : function(username, token) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/getCustomerList/username/' + username + '/token/' + token;
			$http.get(url).success(function(ret) {
				var data = ret.data;
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		getResourceList : function(username, cid, last_id) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/getResourceByCid/username/' + username + "/cid/" + cid + "/id/" + last_id;
			$http.get(url).success(function(ret) {
				var data = ret.data;
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		getComments : function(username, last_id) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/getMyComments/username/' + username + '/id/' + last_id;
			$http.get(url).success(function(ret) {
				var data = ret.data;
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		getMessages : function(username, last_id) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/getMyNews/username/' + username + '/id/' + last_id;
			$http.get(url).success(function(ret) {
				var data = ret.data;
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		// 关注某人
		addStar : function(username, star_username, catalog) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/addStar/username/' + username + '/star/' + star_username + "/catalog/" + catalog;
			$http.get(url).success(function(ret) {
				var status = ret.status;
				deferred.resolve(status);
			});
			return deferred.promise;
		},
		// 取消关注
		delStar : function(username, obj) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/delStar/username/' + username + '/id/' + obj.id;
			$http.get(url).success(function(ret) {
				var status = ret.status;
				deferred.resolve(status);
			});
			return deferred.promise;
		},
		// 获取所有关注
		getStars : function(username, last_id) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/getStars/username/' + username + '/id/' + last_id;
			$http.get(url).success(function(ret) {
				var data = ret.data;
				deferred.resolve(data);
			});
			return deferred.promise;
		}
	}
}).factory('Comment', function($http, $q) {
	return {
		// 获取方案评论
		getComment : function(CloudID, last_id) {
			var deferred = $q.defer();
			var url = _GLOBAL.api + '/getPlanComments/id/' + CloudID + '/last_id/' + last_id;
			$http.get(url).success(function(ret) {
				var data = ret.data;
				deferred.resolve(data);
			});
			return deferred.promise;
		}
	}
});
