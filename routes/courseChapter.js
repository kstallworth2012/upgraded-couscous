const express = require("express")
const router = express.Router();
const Model = require('../models/Model')

router.get('/' ,async (request,response,next)=>{
	try{
		     const result =await Model.getAll()

		     return response.json({
		     	"count":result.length
		     	"data":result
		     })

	}catch(e){
	return next(e)
	}
})

router.get('/:id' ,async function (request,response,next){
	try{


				const {id} = request.params
				const courseChapter = Model.getById(id)
				return response.status(201).json({courseChapter})
				
	}catch(e){
	return next(e)
	}
})


router.post('/', async function (request,response,next){
	try{
				const newCourseChapter = await Model.create(request.body)
				return response.json({newCourseChapter})
	}catch(e){
	return next(e)
	}
})


router.patch('/:id', async function (request,response,next){
	try{

		const {id} = request.params
		const updatedCourseChapter = await Model.getById(id,request.body)
		return response.json({updatedCourseChapter})

	}catch(e){
	return next(e)
	}
})

router.delete('/:id', async function (request,response,next){
	try{
				const {id} =request.params
				const removeCourseChapter = await Model.remove(id,request.body)
				return response.json({removeCourseChapter})
	}catch(e){
	return next(e)
	}
})



module.exports = router 