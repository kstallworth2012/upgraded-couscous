const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')


class EnrollmentModel{
// CREATE TABLE "enrollment" (
//     "id" number   NOT NULL,
//     "student_id" number   NOT NULL,
//     "course_id" number   NOT NULL,
//     "enrollment_date" date   NOT NULL,
//     "is_paid_subscription" char(1)   NOT NULL,
//     CONSTRAINT "pk_enrollment" PRIMARY KEY (
//         "id"
//      )
// );

	static async create(data){
		try{
					const duplicateCheck = await db.query(`SELECT id FROM enrollment WHERE id=$1`,data.id)
			   	if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate enrollment details: ${data.id}`)

					const result = await db.query(`INSERT INTO enrollment (id,student_id,course_id,enrollment_date,is_paid_subscription
						VALUES($1,$2,$3,$4,$5)
						RETURNING id, enrollment_date`,[data.id, data.student_id,data.course_id,data.enrollment_date,data.is_paid_subscription])

					const newEnrollment = result.rows[0]

					return newEnrollment

		}catch(error){
			console.log(error)
		}
	}

	static async getAll(){
		try{
				const result = await db.query('SELECT * FROM enrollment')
			    return result.rows
		}catch(error){
			console.log(error)
		}
	}


		static async getById(Id){
		try{
			   const result = await db.query(`SELECT * FROM enrollment WHERE id =$1`,[Id])
			   const enrollment = result.rows[0]
			   if(!enrollment){
			   	   throw new NotFoundError(`enrollment not found ${Id}`)
			   }
			   return enrollment

		}catch(error){
			console.log(error)
		}
	}


		static async update(data){
		try{


			const result = await db.query(`
						UPDATE enrollment SET 
						student_id=$1,course_id=$2,enrollment_date=$3,is_paid_subscription=$4
						WHERE id = $5
						RETURNING id
				`,[data.student_id,data.course_id,data.enrollment_date,data.is_paid_subscription,data.id])
				const updatedEnrollment = result.rows[0]
				if(!updatedEnrollment){
					throw new NotFoundError(`No enrollment found ${data.id}`)
				}
				return updatedEnrollment

		}catch(error){
			console.log(error)
		}
	}


		static async remove(Id){
		try{
				const result = await db.query(`DELETE FROM enrollment WHERE id = $1
					RETURNING id`,[Id])
				const enrollment = result.rows[0]
				if(!enrollment) throw new NotFoundError(`no enrollment found:${Id}`)

		}catch(error){
			console.log(error)
		}
	}



}


module.exports = EnrollmentModel
