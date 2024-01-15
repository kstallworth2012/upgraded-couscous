const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')


class LearningProgress{
// 	CREATE TABLE "learning_progress" (
//     "id" number   NOT NULL,
//     "enrollment_id" number   NOT NULL,
//     "course_chapter_content_id" int   NOT NULL,
//     "begin_time" timestamp   NOT NULL,
//     "completion" timestamp   NOT NULL,
//     "status" char(1)   NOT NULL,
//     CONSTRAINT "pk_learning_progress" PRIMARY KEY (
//         "id"
//      )
// );

	static async create(data){
		try{
					const duplicateCheck = await db.query(`SELECT id FROM learning_progress WHERE id=$1`,[data.id])
			   	if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate learning_progress details: ${data.id}`)


					const newLearningProgress = result.rows[0]

					return newLearningProgress

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




}


module.exports = LearningProgress

