const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')


CREATE TABLE "student" (
    "id" number   NOT NULL,
    "firstName" varchar(50)   NOT NULL,
    "lastName" varchar(50)   NOT NULL,
    "email" varchar(50)   NOT NULL,
    "registration_date" date   NOT NULL,
    "num_of_courses_enrolled" number   NOT NULL,
    "num_of_courses_completed" number   NOT NULL,
    CONSTRAINT "pk_student" PRIMARY KEY (
        "id"
     )
);

class StudentModel{


	static async create(data){
		try{
					const duplicateCheck = await db.query(`SELECT id FROM orders WHERE id=$1`,[data.id])
			   	if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate Order details: ${data.id}`)

					const result = await db.query(``)
					const newStudent = result.rows[0]


					return newStudent
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





module.exports = StudentModel


