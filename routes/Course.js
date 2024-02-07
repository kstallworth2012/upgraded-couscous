const express = require("express")
const router = express.Router();
const Model = require('../models/Model')

router.get('/' ,async (request,response,next)=>{
	try{
		     const result =await Model.getAll()

		     return response.json({
		     	"count":result.length,
		     	"data":result})

	}catch(e){
	return next(e)
	}
})

router.get('/:id' ,async function (request,response,next){
	try{
				
				const {id} = request.params
				const Course = Model.getById(id)
				return response.status(201).json({Course})
	}catch(e){
	return next(e)
	}
})


router.post('/', async function (request,response,next){
	try{
				const newCourse = await Model.create(request.body)
				return response.json({newCourse})
	}catch(e){
	return next(e)
	}
})


router.patch('/:id', async function (request,response,next){
	try{

		const {id} = request.params
		const updatedCourse = await Model.getById(id,request.body)
		return response.json({updatedCourse})

	}catch(e){
	return next(e)
	}
})

router.delete('/:id', async function (request,response,next){
	try{
				const {id} =request.params
				const removeCourse = await Model.remove(id,request.body)
				return response.json({removeCourse})
	}catch(e){
	return next(e)
	}
})



module.exports = router 