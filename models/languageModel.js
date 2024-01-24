const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')

// CREATE TABLE "language" (
//     "id" int   NOT NULL,
//     "language_name" varchar(50)   NOT NULL,
//     CONSTRAINT "pk_language" PRIMARY KEY (
//         "id"
//      )
// );

class LanguageModel{


	static async create(data){
		try{
					const duplicateCheck = await db.query(`SELECT id FROM language WHERE id=$1`,[data.id])
			   	if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate language details: ${data.id}`)

					const result = await db.query(`INSERT INTO language(id,language_name)
												VALUES($1,$2)
												RETURNING id`,[data.id,data.language_name])

					const newLanguage = result.rows[0]

					return newLanguage

		}catch(error){
			console.log(error)
		}
	}

	static async getAll(){
		try{
				const result = await db.query('SELECT * FROM language')
			    return result.rows
		}catch(error){
			console.log(error)
		}
	}


		static async getById(Id){
		try{

			const result = await db.query(`SELECT * FROM language WHERE id=$1`,[Id])
			const language = result.rows[0]
			if(!language){
				throw new NotFoundError(`no LanguageModel found ${Id}`)
			}
			return language

		}catch(error){
			console.log(error)
		}
	}


		static async update(data){
		try{
			const result = await db.query(`UPDATE language SET language_name=$1 WHERE id=$2`,[data.id])
			const updatedLanguage = result.rows[0]
			if(!updatedLanguage){
				throw new NotFoundError(`no language found ${data.id}`)
			}
			return updatedLangague

		}catch(error){
			console.log(error)
		}
	}


		static async remove(Id){
		try{
				const result = await db.query(`DELETE FROM language WHERE id = $1
					RETURNING id`,[Id])
				const language = result.rows[0]
				if(!language) throw new NotFoundError(`no language found:${Id}`)

		}catch(error){
			console.log(error)
		}
	}



}

module.exports = LanguageModel