var jwt    = require('jsonwebtoken');
var Q = require('q');
var request = require('request');

/**
 * @param {secret} fbtoken - Facebook login token
 */
 
 module.exports = function(ctx, cb) {
	// We check the fbtoken with FB API
	verifyFacebookUserAccessToken(ctx.data.fbtoken).
	// If it is valid, we create a Json Web Token and return it to the user for using our API
	then(function(user) {
		var token = jwt.sign(user, 'bl@blaM1cEtLoLA');
		cb(null, {
			status: 200,
			success: true,
			message: "Authentication success!",
			token: token,
			user: user
		});
	}
	// If not, we return the error message
	, function(error) {
		cb(null, {
			status: 401,
			success: false,
			message: error.message,
		});
	}).
	catch(function(error){
		cb(null, {
			status: 500,
			success: false,
			message: error.message,
		});
	});
 
	// Call Facebook API to verify if the token is valid
	function verifyFacebookUserAccessToken(token) {
		var deferred = Q.defer();
		var path = 'https://graph.facebook.com/me?access_token=' + token;
		request(path, function (error, response, body) {
			var data = JSON.parse(body);
			if (!error && response && response.statusCode && response.statusCode == 200) {
				var user = {
					facebookUserId: data.id,
					username: data.username,
					firstName: data.first_name,
					lastName: data.last_name,
					email: data.email
				};
				deferred.resolve(user);
			}
			else {
				deferred.reject({code: response.statusCode, message: data.error.message});
			}
		});
		return deferred.promise;
	}
 };