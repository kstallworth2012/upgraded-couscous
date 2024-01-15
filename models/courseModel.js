const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')


/*
CREATE TABLE "course" (
    "id" int   NOT NULL,
    "course_title" varchar(200)   NOT NULL,
    "course_brief" varchar(200)   NOT NULL,
    "instructor_id" int   NOT NULL,
    "num_of_chapters" int   NOT NULL,
    "course_fee" int   NOT NULL,
    "language_id" int   NOT NULL,
    CONSTRAINT "pk_course" PRIMARY KEY (
        "id"
     )
);
*/

class Course{


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


module.exports = Course