const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')

// CREATE TABLE "language" (
//     "id" int   NOT NULL,
//     "language_name" varchar(50)   NOT NULL,
//     CONSTRAINT "pk_language" PRIMARY KEY (
//         "id"
//      )
// );

class Language{


	static async create(data){
		try{
					const duplicateCheck = await db.query(`SELECT id FROM language WHERE id=$1`,[data.id])
			   	if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate language details: ${data.id}`)

					const result = await db.query(``)

					const newLanguage = result.rows[0]

					return newLanguage

		}catch(error){
			console.log(error)
		}
	}

	static async getAll(){
		try{
				const result = await db.query('SELECT * FROM _____________')
			    return result.rows
		}catch(error){
			console.log(error)
		}
	}


		static async getById(){
		try{

		}catch(error){
			console.log(error)
		}
	}


		static async update(){
		try{

		}catch(error){
			console.log(error)
		}
	}


		static async remove(Id){
		try{
				const result = await db.query(`DELETE FROM _____ WHERE ___ = $1
					RETURNING ___`,[Id])
				const order = result.rows[0]
				if(!___) throw new NotFoundError(`no ___ found:${___}`)

		}catch(error){
			console.log(error)
		}
	}

		static async save(){
		try{

		}catch(error){
			console.log(error)
		}
	}

}

module.exports = Language