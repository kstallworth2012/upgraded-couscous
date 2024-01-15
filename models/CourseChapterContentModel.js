const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')

class CourseChapterContent{


// CREATE TABLE "course_chapter_content" (
//     "id" int   NOT NULL,
//     "course_chapter_id" int   NOT NULL,
//     "content_type_id" number   NOT NULL,
//     "is_mandatory" char(1)   NOT NULL,
//     "time_required_in_minutes" number   NOT NULL,
//     "is_open_for_free" char(1)   NOT NULL,
//     CONSTRAINT "pk_course_chapter_content" PRIMARY KEY (
//         "id"
//      )
// );


	static async create(data){
		try{
					const duplicateCheck = await db.query(`SELECT course_chapter_id FROM course_chapter_content
															 WHERE course_chapter_id=$1`,[data.id])
			   	if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate course chapter content details: ${data.course_chapter_id}`)

					const result = await db.query(``,[])

					const newCourseContent = result.rows[0]

					return newCourseContent

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

module.exports = CourseChapterContent