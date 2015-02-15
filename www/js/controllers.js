angular.module("Controllers", ["firebase"])

.controller('AndroidController', AndroidController)
.controller('JSController', JSController)
.controller('AngularjsController', AngularjsController)
.controller('HTML5Controller', HTML5Controller)
.controller('PythonController', PythonController)
.controller('SuccessController', SuccessController)
.controller('MainController', MainController)
.controller('GlobalController', GlobalController)
.controller('ProfileController', ProfileController)
;

function ProfileController(auth) {
	var vm = this;
}

function GlobalController($state) {
	var vm = this;
	vm.$state = $state;
}

function MainController(store, $location, $scope, auth, $state) {
	var vm = this;
	vm.hello = "Login";
	vm.auth = auth;
	console.log(auth)
	vm.auth0login = function() {
		
		console.log('Logging in...');
		auth.signin({}, function(profile, token) {
	      // Success callback
	      store.set('profile', profile);
	      store.set('token', token);
	      // $location.path('/');
	      // $state.go('android');
	      console.log("You're logged in!");
	    }, function() {
	      // Error callback
	    });
	}
	vm.auth0logout = function() {
		console.log("logging out")
		auth.signout();
  	store.remove('profile');
  	store.remove('token');
  	// $state.go('angularjs');
}
	
}

function SuccessController(auth) {
	var vm = this;
	vm.auth = auth;
	console.log(auth)
}

function AndroidController(auth) {
	var vm = this;
	vm.auth = auth;
	console.log(auth)
}

function JSController() {

}

function AngularjsController($firebase, store, $location, $scope, auth, $state) {
	var vm = this;
	vm.auth = auth
	vm.name = '';
	vm.comment = '';

	var ref = new Firebase("https://jacksondevsfirebase.firebaseio.com/messages");

	vm.comments = $firebase(ref);
    // download the data into a local object
  vm.maincomments = vm.comments.$asArray();	

  vm.addComment = function() {
		console.log("adding comment");
  	if (vm.comment == '') {return};

		vm.comments.$push({	
			name: vm.auth.profile.given_name + ' ' +  vm.auth.profile.family_name,
			comment: vm.comment,
			time: Date.now()
		})  

		vm.name = '';
		vm.comment = '';

  }

}

function HTML5Controller() {

}

function PythonController() {

}

