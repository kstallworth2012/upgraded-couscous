const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')

class CourseChapter{

// CREATE TABLE "course_chapter" (
//     "id" int   NOT NULL,
//     "course_id" int   NOT NULL,
//     "chapter_title" varchar(100)   NOT NULL,
//     "num_of_reading" number   NOT NULL,
//     "num_of_video" number   NOT NULL,
//     "num_of_assignment" number   NOT NULL,
//     CONSTRAINT "pk_course_chapter" PRIMARY KEY (
//         "id"
//      )
// );


	static async create(data){
		try{
					const duplicateCheck = await db.query(`SELECT id FROM course_chapter WHERE id=$1`,[data.id])
			   		if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate course_chapter details: ${data.id}`)

					const result = await db.query(`INSERT INTO course_chapter(id,course_id,chapter_title,
													num_of_reading,num_of_video,num_of_assignment)
													VALUES($1,$2,$3,$4,$5,$6)
													RETURNING id, chapter_title
													`,[data.id,data.course_id,data.chapter_title,
													data.num_of_reading,data.num_of_video,data.num_of_assignment])
					const newCourseChapter = result.rows[0]

					return newCourseChapter

		}catch(error){
			console.log(error)
		}
	}

	static async getAll(){
		try{
				const result = await db.query('SELECT * FROM course_chapter')
			    return result.rows
		}catch(error){
			console.log(error)
		}
	}


		static async getById(Id){
		try{
				const result = await db.query(`SELECT * FROM course_chapter WHERE id=$1`,[Id])
				const courseChapter = result.rows[0]

				if(!courseChapter){
					throw new NotFoundError(`NO course CHAPTER ${Id}`)
				}

				return courseChapter
		}catch(error){
			console.log(error)
		}
	}


		static async update(data){
		try{
			const result = await db.query(`UPDATE course_chapter SET 
											course_id=$1,
											chapter_title=$2,
											num_of_reading=$3,
											num_of_video=$4,
											num_of_assignment=$5,
											WHERE id =$6
											RETURNING id,course_id,

										`,[data.course_id,data.chapter_title,
													data.num_of_reading,data.num_of_video,data.num_of_assignment,data.id])
			const updatedCourseChapter = result.rows[0]
			if(!updatedCourseChapter){
				throw new NotFoundError(`CourseChapter NOT FOUND ${data.id}`)
			}
		    return updatedCourseChapter
		    
		}catch(error){
			console.log(error)
		}
	}


		static async remove(Id){
		try{
				const result = await db.query(`DELETE FROM course_chapter WHERE id = $1
					RETURNING id`,[Id])
				const course_chapter = result.rows[0]
				if(!course_chapter) throw new NotFoundError(`no course_chapter found:${Id}`)

		}catch(error){
			console.log(error)
		}
	}

		




}
module.exports = CourseChapter