const express = require("express")
const router = express.Router();
const StudentModel = require('../models/StudentModel')

router.get('/' ,async (request,response,next)=>{
	try{
		     const results =await StudentModel.getAll()

		     return response.json({
		     	"count":results.length
		     	"data":results})

	}catch(e){
	return next(e)
	}
})

router.get('/:id' ,async function (request,response,next){
	try{

				const {id} = request.params
				const Student = StudentModel.getById(id)
				return response.status(201).json({Student})
	}catch(e){
	return next(e)
	}
})


router.post('/', async function (request,response,next){
	try{
				const newStudent = await StudentModel.create(request.body)
				return response.json({newStudent})
	}catch(e){
	return next(e)
	}
})


router.patch('/:id', async function (request,response,next){
	try{

			const {id} = request.params
		const updatedStudent = await Model.getById(id,request.body)
		return response.json({updatedStudent})


	}catch(e){
	return next(e)
	}
})

router.delete('/:id', async function (request,response,next){
	try{
				const {id} =request.params
				const removeStudent = await Model.remove(id,request.body)
				return response.json({removeStudent})
	}catch(e){
	return next(e)
	}
})



module.exports = router 