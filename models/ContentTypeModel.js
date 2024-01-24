const db = require("../db")
const { BadRequestError, ExpressError, NotFoundError } = require('../expressError')

CREATE TABLE "content_type" (
    "id" number   NOT NULL,
    "content_type" varchar(20)   NOT NULL,
    CONSTRAINT "pk_content_type" PRIMARY KEY (
        "id"
     )
);
class ContentType{



	static async create(data){
		try{
					const duplicateCheck = await db.query(`SELECT id FROM content_type WHERE id=$1`,[data.id])
			   		if(duplicateCheck.rows[0])
						throw new BadRequestError(`Duplicate content_type details: ${data.id}`)
					const result = await db.query(`INSERT INTO content_type(id,content_type)
													VALUES($1,$2)
													RETURNING content_type`,[data.id,data.content_type])
					const newContentType = result.rows[0]

					return newContentType

		}catch(error){
			console.log(error)
		}
	}

	static async getAll(){
		try{
				const result = await db.query('SELECT * FROM content_type')
			    return result.rows
		}catch(error){
			console.log(error)
		}
	}


		static async getById(Id){
		try{
			  const result = await db.query(`SELECT * FROM content_type WHERE id=$1`,[Id])
			  const contentType = result.rows[0]

			  if(!contentType){
			  	   throw new NotFoundError(`ContentType NOT FOUND ${Id}`)
			  }
			  return contentType

		}catch(error){
			console.log(error)
		}
	}


		static async update(data){
		try{
			    const result = await db.query(`UPDATE content_type SET 
			    	                        content_type=$1 WHERE id=$2`,[data.content_type,data.id)

			    const updateContentType = result.rows[0]
			    if(!updateContentType){
			    	throw new NotFoundError('no content_type found')
			    }
			    return updateContentType

		}catch(error){
			console.log(error)
		}
	}


		static async remove(Id){
		try{
				const result = await db.query(`DELETE FROM content_type WHERE id = $1
					RETURNING id`,[Id])
				const content_type = result.rows[0]
				if(!content_type) throw new NotFoundError(`no content_type found:${Id}`)

		}catch(error){
			console.log(error)
		}
	}




}

module.exports = ContentType