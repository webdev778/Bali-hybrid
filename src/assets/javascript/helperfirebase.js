
var config = {
			    apiKey: "AIzaSyCB2P2XT3xaSQ-B3bqlzozZA9oU0fA5k-g",
			    authDomain: "limit-2039d.firebaseapp.com",
			    databaseURL: "https://limit-2039d.firebaseio.com",
			    projectId: "limit-2039d",
			    storageBucket: "",
			    messagingSenderId: "826993530729"
 			 };

firebase.initializeApp(config);
    
function facebookLogin(){
  	
  	  var provider = new firebase.auth.FacebookAuthProvider();

	  firebase.auth().signInWithPopup(provider).then(function(result) {
	  	console.log(result);
	  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;

	  console.log(result)
	  // ...
	  }).catch(function(error) {
	  	console.log(error);
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});
} 

function googleLogin(){

  	var provider = new firebase.auth.GoogleAuthProvider();

  	firebase.auth().signInWithPopup(provider).then(function(result) {
	  	
	  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;

	  console.log(result)
	  // ...
	  }).catch(function(error) {
	  	console.log(error);
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});
}