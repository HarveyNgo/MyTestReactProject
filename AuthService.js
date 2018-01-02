var buffer = require('buffer')
var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash')

const authKey = 'auth';
const userKey = 'user';


class AuthService {

	getAuthInfo(cb){
		AsyncStorage.multiGet([authKey,userKey],(err,val)=> {
			if(err){
				return cb(err);
			}

			if(!val){
				return cb();
			}

			var zippedObj = _.zipObject([val[0][0],val[1][0]],[val[0][1],val[1][1]]);
			if(!zippedObj[authKey]){
				return cb();
			}

			var authInfo = {
				headers:{
					Authorization: 'Basic' + zippedObj[authKey]
				},
				user: JSON.parse(zippedObj[userKey])
			}
			return cb(null,authInfo)
		});
	}


	login(creds, cb){
		var b  = new buffer.Buffer(creds.username + ":" + creds.password);
		var encodeAuth = b.toString('base64');

		fetch('https://api.github.com/user',{
				headers:{
					'Authorization': 'Basic ' + encodeAuth
				}
		})
		.then((response) => {
			if(response.status >=200 && response.status < 300){
				return response;
			}
			throw{
				badCredentials: response.status == 401,
				unknowError : response.status  !=  401 
			}
		
		})
		.then((response) =>{
			return response.json();
		})
		.then((results)=> {
			AsyncStorage.multiSet([
				[authKey, encodeAuth],
				[userKey,JSON.stringify(results)]
				],(err) => {
					if(err){
						throw err;
					}
					return cb({success: true});
				})
		})
		.catch((err) => {
			return cb(err);
		})
		// .finally(() =>{
		// 	this.setState({showProgress: false});
		// });
	}
} 


module.exports = new AuthService();