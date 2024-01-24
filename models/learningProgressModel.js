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

					const result = await db.query(`INSERT INTO learning_progress (id,enrollment_id,course_chapter_content_id
						,begin_time,completion,status)
						VALUES($1,$2,$3,$4,$5,$6)
						RETURNING id,enrollment_id`,
						[data.id,data.enrollment_id,data.course_chapter_content_id,data.begin_time,data.completion,data.status])


					const newLearningProgress = result.rows[0]

					return newLearningProgress

		}catch(error){
			console.log(error)
		}
	}

	static async getAll(){
		try{
				const result = await db.query('SELECT * FROM learning_progress')
			    return result.rows
		}catch(error){
			console.log(error)
		}
	}


		static async getById(){
		try{
               const result = await db.query(`SELECT * FROM learning_progress WHERE id =$1`,[id])

               const learningProgress = result.rows[0]
               if(!learningProgress){
               	   throw new NotFoundError('No LearningProgress Found') 
               }

               return learningProgress
		}catch(error){
			console.log(error)
		}
	}


		static async update(data){
		try{
			   const result = await db.query(`UPDATE learning_progress
			   									SET 
											    enrollment_id=$1,
											    course_chapter_content_id=$2
											    begin_time=$3,
											    completion=$4,
											    status=$5,
											    WHERE id = $6
			   									`,[data.enrollment_id,data.course_chapter_content_id,
			   										data.begin_time,data.completion,data.status,data.id])
			   const updateLearnProgress = result.rows[0]
			   if(!updateLearnProgress){
			   				//THROW SOME ERROR 
			   			  throw new NotFoundError(`Learning Progress not found ${data.id}`)
			   }
			   return updateLearnProgress

		}catch(error){
			console.log(error)
		}
	}


		static async remove(Id){
		try{
				const result = await db.query(`DELETE FROM learning_progress WHERE id = $1
					RETURNING id`,[Id])
				const learning_progress = result.rows[0]
				if(!learning_progress) throw new NotFoundError(`no learning_progress found:${id}`)

		}catch(error){
			console.log(error)
		}
	}




}


module.exports = LearningProgress

