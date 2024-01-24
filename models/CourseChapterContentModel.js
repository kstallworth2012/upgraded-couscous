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

					const result = await db.query(`INSERT INTO course_chapter_content(id,course_chapter_id,content_type_id,
						is_mandatory,time_required_in_minutes,is_open_for_free)
						VALUES($1,$2,$3,$4,$5,$6)
						 RETURNING id,course_chapter_id
						`,[data.id,data.course_chapter_id,data.content_type_id,
						data.is_mandatory,data.time_required_in_minutes,data.is_open_for_free])

					const newCourseContent = result.rows[0]

					return newCourseContent

		}catch(error){
			console.log(error)
		}
	}

	static async getAll(){
		try{
				const result = await db.query('SELECT * FROM course_chapter_content')
			    return result.rows
		}catch(error){
			console.log(error)
		}
	}


		static async getById(){
		try{

			const result = await db.query(`SELECT * FROM course_chapter_content WHERE id = $1`,[Id])
			const courseChapterContent = result.rows[0]
			if(!courseChapterContent){
				throw new NotFoundError(`course_chapter_content not found ${Id}`)

			}

			return courseChapterContent

		}catch(error){
			console.log(error)
		}
	}


		static async update(data){
		try{

			     const result = await db.query(`UPDATE course_chapter_content SET
			     								course_chapter_id=$1,
			     								content_type_id=$2,
												is_mandatory=$3,
												time_required_in_minutes=$4,
												is_open_for_free=$5
												WHERE id = $6
												RETURNING id,course_chapter_id
			     								`,[data.course_chapter_id,data.content_type_id,
						data.is_mandatory,data.time_required_in_minutes,data.is_open_for_free,data.id])
			      const updateCourseChapterContent = result.rows[0]

			      if(!updateCourseChapterContent){
			      			throw new NotFoundError(`no course_chapter_content found ${data.id}`)
			      }
			      return updateCourseChapterContent

		}catch(error){
			console.log(error)
		}
	}


		static async remove(Id){
		try{
				const result = await db.query(`DELETE FROM course_chapter_content WHERE id = $1
					RETURNING id`,[Id])
				const order = result.rows[0]
				if(!CourseChapterContent) throw new NotFoundError(`no course_chapter_content found:${Id}`)

		}catch(error){
			console.log(error)
		}
	}





}

module.exports = CourseChapterContent