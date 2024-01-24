const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')



// CREATE TABLE "instructor" (
//     "id" int   NOT NULL,
//     "firstName" varchar(50)   NOT NULL,
//     "lastName" varchar(50)   NOT NULL,
//     "email" varchar(50)   NOT NULL,
//     "registration_date" date   NOT NULL,
//     "qualification" varchar(200)   NOT NULL,
//     "intro_brief" varchar(1000)   NOT NULL,
//     "image" blob   NOT NULL,
//     "num_of_published_courses" number   NOT NULL,
//     "num_of_enrolled_students" number   NOT NULL,
//     "average_review_rating" number   NOT NULL,
//     "num_of_reviews" number   NOT NULL,
//     CONSTRAINT "pk_instructor" PRIMARY KEY (
//         "id"
//      )
// );


class InstructorModel{


	static async create(){
		try{
					const duplicateCheck = await db.query(`SELECT id FROM instructor WHERE is=$1`,[data.id])
			   	if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate instructor details: ${data.order_id}`)
					const result =await db.query(`INSERT INTO instructor(id,firstName,lastName,email,r
						egistration_date,qualification,intro_brief,image,num_of_published_courses,num_of_enrolled_students,average_review_rating
						,num_of_reviews)
						VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
						RETURNING id, registration_date`,
						[data.id,data.firstName,data.lastName,data.email,data.registration_data,data.qualification,data.intro_brief,
							data.image,data.num_of_published_courses,data.num_of_enrolled_students,
							data.average_review_rating,data.num_of_reviews])

					const newInstructor = result.rows[0]

					return newInstructor

		}catch(error){
			console.log(error)
		}
	}

	static async getAll(){
		try{
				const result = await db.query('SELECT * FROM instructor')
			    return result.rows
		}catch(error){
			console.log(error)
		}
	}


		static async getById(Id){
		try{
				const result = await db.query(`SELECT * FROM WHERE id=$1`,[Id])
				const instructor = result.rows[0]
				if(!instructor){
					throw new NotFoundError(`Instructor not found ${Id}`)
				}
				return instructor

		}catch(error){
			console.log(error)
		}
	}


		static async update(data){
		try{
			  const result = await db.query(`
			  	UPDATE instructor SET 
			  	firstName=$1,
			  	lastName=$2,
			  	email=$3,
			  	registration_date=$4,
			  	qualification=$5,
			  	intro_brief=$6,
			  	image=$7,
			  	num_of_published_courses=$8,
			  	num_of_enrolled_students=$9,
			  	average_review_rating=$10,
				num_of_reviews=$11
					WHERE id = $12
			  	`,[data.firstName,data.lastName,data.email,data.registration_data,data.qualification,data.intro_brief,
							data.image,data.num_of_published_courses,data.num_of_enrolled_students,
							data.average_review_rating,data.num_of_reviews,data.id])
			  const updatedInstructor = result.rows[0]
			  if(!updatedInstructor){
			  	  throw new NotFoundError(`Instructor not found ${data.id}`)
			  }
			  return updatedInstructor

		}catch(error){
			console.log(error)
		}
	}


		static async remove(Id){
		try{
				const result = await db.query(`DELETE FROM instructor WHERE id = $1
					RETURNING id`,[Id])
				const instructor = result.rows[0]
				if(!instructor) throw new NotFoundError(`no instructor found:${Id}`)

		}catch(error){
			console.log(error)
		}
	}





}

module.exports = InstructorModel