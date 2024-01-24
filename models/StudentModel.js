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
					const duplicateCheck = await db.query(`SELECT id FROM student WHERE id=$1`,[data.id])
			   	if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate Order details: ${data.id}`)

					const result = await db.query(`INSERT INTO student (id,firstName,lastName,email,
													registration_date,num_of_courses_enrolled,num_of_courses_completed)
													VALUES($1,$2,$3,$4,$5,$6,$7`,
													[data.id,data.firstName,data.lastName,data.email,
													data.registration_date,data.num_of_courses_enrolled,data.num_of_courses_completed])
					const newStudent = result.rows[0]


					return newStudent
		}catch(error){
			console.log(error)
		}
	}

	static async getAll(){
		try{
				const result = await db.query('SELECT * FROM student')
			    return result.rows
		}catch(error){
			console.log(error)
		}
	}


		static async getById(Id){
		try{
				const result = await db.query("SELECT * FROM student WHERE id=$1",[Id])
				const student = result.rows[0]
				if(!student){
					throw new NotFoundError(`student not found ${Id}`)
				}
				return student 

		}catch(error){
			console.log(error)
		}
	}


		static async update(){
		try{
			 const result =await db.query(`UPDATE student SET
			 	firstName=$1,lastName=$2,email=$3,
				registration_date=$4,num_of_courses_enrolled=$5,num_of_courses_completed=$6 
				WHERE id =$7
				RETURNING id
				`,[data.firstName,data.lastName,data.email,
							data.registration_date,data.num_of_courses_enrolled,data.num_of_courses_completed,data.id])

		}catch(error){
			console.log(error)
		}
	}


		static async remove(Id){
		try{
				const result = await db.query(`DELETE FROM student WHERE id = $1
					RETURNING id`,[Id])
				const student = result.rows[0]
				if(!student) throw new NotFoundError(`no student found:${Id}`)

		}catch(error){
			console.log(error)
		}
	}




}





module.exports = StudentModel


