const ExpressError = require("../ExpressError");
const db = require('../db')
const bcrypt = require('bcrypt')
const {BCRYPT_WORK_FACTOR,SECRET_KEY} = require("../config")
const jwt = require("jsonwebtoken")

class Authenticate{

	static async register(username,password,isadmin,dept_code){
		try{
				const duplicateCheck = await db.query(`SELECT username FROM authusers WHERE username=$1`,[username])
				if(duplicateCheck.rows[0]){
					throw new BadRquestError(`Duplicate User trying to register ${username}`)

				}

				const register_user = await db.query(`INSERT INTO authusers (username,password,isadmin,dept_code)
						VALUES ($1,$2,$3,$4)
						RETURNING username`,[username,hashedPassword,isadmin,dept_code])
				return response.json(result.rows[0])
			// return username ?
		}catch(error){
			return next(new ExpressError("USER NAME TAKEN"))
		}
	}

	static async login(username,password){
		try{
			const result = await db.query(`SELECT username,password,isadmin
											FROM authusers
											WHERE username = $1`,[username])
			
			const user = result.rows[0]

			if(user){ //IF THERE IS A USER 
				if(await bcrypt.compare(password,user.password) === true){
					let token = jwt.sign({username,isadmin:user.isadmin},SECRET_KEY)

					return token
				} // ELSE IF THERE IS NOT A USER
				throw new ExpressError("Username/password not found ...sorry",404)
			}
		}catch(error){
			return next(new ExpressError("YOU MUST LOGIN FIRST!")
		}
	}
}


module.exports = Authenticate