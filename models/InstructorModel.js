const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')



CREATE TABLE "instructor" (
    "id" int   NOT NULL,
    "firstName" varchar(50)   NOT NULL,
    "lastName" varchar(50)   NOT NULL,
    "email" varchar(50)   NOT NULL,
    "registration_date" date   NOT NULL,
    "qualification" varchar(200)   NOT NULL,
    "intro_brief" varchar(1000)   NOT NULL,
    "image" blob   NOT NULL,
    "num_of_published_courses" number   NOT NULL,
    "num_of_enrolled_students" number   NOT NULL,
    "average_review_rating" number   NOT NULL,
    "num_of_reviews" number   NOT NULL,
    CONSTRAINT "pk_instructor" PRIMARY KEY (
        "id"
     )
);


class Instructor{


	static async create(){
		try{
					const duplicateCheck = await db.query(`SELECT __________ FROM orders WHERE __________=$1`)
			   	if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate Order details: ${data.order_id}`)

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

module.exports = Instructor