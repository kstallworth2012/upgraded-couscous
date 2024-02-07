const {BCRYPT_WORK_FACTOR,SECRET_KEY} = require("../config")
const jwt = require("jsonwebtoken")
const ExpressError = require('../ExpressError')



function authenticateJWT(request,response,next){
	try{
		const tokenFromBody = request.body._token
		const payload = jwt.verify(tokenFromBody,SECRET_KEY)
		request.user = payload
		return next()

	}catch(error){
		// error in this middleware isn't error -- continue on 
		return next()
	}
}

// ATTENTION: REQUIRE THAT A USER BE LOGGED IN WITH A VALID TOKEN 
function ensureLoggedIn(request,response,next){
	if(!request.user){ //if there is NO USER  
		const error = new ExpressError("UNAUTHORIZED", 401)
		return next(error)
	}else {
		return next()
	}
}


function ensureAdmin(request,response,next){
	if(!request.user || request.user.isadmin !== true){
		return next(new ExpressError("Must be an admin to go here!",401))

	}
	return next()
}

module.exports = {authenticateJWT,ensureLoggedIn,ensureAdmin}