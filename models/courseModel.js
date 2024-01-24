const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')



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


class CourseModel{


	static async create(data){
		try{
					const duplicateCheck = await db.query(`SELECT id FROM course WHERE id=$1`,[data.id])
			   		if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate course details: ${data.id}`)

					const result = await db.query(`INSERT INTO course(id,course_title,course_brief,
												instructor_id,num_of_chapters,
												course_fee,language_id)
												VALUES($1,$2,$3,$4,$5,$6,$7)
												RETURNING id, course_title
												`,[data.id,data.course_title,data.course_brief,
												data.instructor_id,data.num_of_chapters
												,data.course_fee,data.language_id])
					const newCourse = result.rows[0]

					return newCourse

		}catch(error){
			console.log(error)
		}
	}

	static async getAll(){
		try{
				const result = await db.query('SELECT * FROM course')
			    return result.rows
		}catch(error){
			console.log(error)
		}
	}


		static async getById(Id){
		try{

				const result = await db.query(`SELECT * FROM course WHERE id=$1`,[Id])
				const course = result.rows[0]
				if(!course){
					throw new NotFoundError(`Course found ${Id}`)
				}
				return course 
		}catch(error){
			console.log(error)
		}
	}


		static async update(data){
		try{
			   const result = await db.query(`
			   					UPDATE course SET 
			   					course_title=$1,
			   					course_brief=$2,
								instructor_id=$3,
								num_of_chapters=$4,
								course_fee=$5,
								language_id=$6
			   					WHERE id = $7
			   					RETURNING id, course_title
			   	`,[data.course_title,data.course_brief,
												data.instructor_id,data.num_of_chapters
												,data.course_fee,data.language_id,data.id])

			   const updatedCourse = result.rows[0]

			   if(!updatedCourse){
			   	   throw new NotFoundError(`course not found ${data.id}`)
			   }
			   return updatedCourse

		}catch(error){
			console.log(error)
		}
	}


		static async remove(Id){
		try{
				const result = await db.query(`DELETE FROM id WHERE course = $1
					RETURNING id`,[Id])
				const course = result.rows[0]
				if(!course) throw new NotFoundError(`no course found:${Id}`)

		}catch(error){
			console.log(error)
		}
	}




}


module.exports = CourseModel