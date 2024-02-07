const express = require("express")
const router = express.Router();
const Model = require('../models/Model')

router.get('/' ,async (request,response,next)=>{
	try{
		     const result =await Model.getAll()

		     return response.json({
		     			"count":result.length,
		     			"data":result
		     })

	}catch(e){
	return next(e)
	}
})

router.get('/:id' ,async function (request,response,next){
	try{
				const {id} = request.params
				const result = await Model.getById(id)
				return response.json({result})
	}catch(e){
	return next(e)
	}
})


router.post('/', async function (request,response,next){
	try{
				const newCourseChapterContent = await Model.create(request.body)
				return response.json({newCourseChapterContent})
	}catch(e){
	return next(e)
	}
})


router.patch('/:id', async function (request,response,next){
	try{

		const {id} = request.params
		const updatedCourseChapterContent = await Model.getById(id,request.body)
		return response.json({updatedCourseChapterContent})

	}catch(e){
	return next(e)
	}
})

router.delete('/:id', async function (request,response,next){
	try{
				const {id} =request.params
				const removeCourseChapterContent = await Model.remove(id,request.body)
				return response.json({removeCourseChapterContent})
	}catch(e){
	return next(e)
	}
})



module.exports = router 