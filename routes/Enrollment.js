const express = require("express")
const router = express.Router();
const enrollmentModel = require('../models/enrollmentModel')

router.get('/' ,async (request,response,next)=>{
	try{
		     const result =await enrollmentModel.getAll()

		     return response.json({
		     	"count" : result.length,
		     	"Enrollments":result})

	}catch(e){
	return next(e)
	}
})

router.get('/:id' ,async function (request,response,next){
	try{
				const {id} = request.params
				const result = await enrollmentModel.getById(id)
				return response.json({results})
	}catch(e){
	return next(e)
	}
})


router.post('/', async function (request,response,next){
	try{
				const newEnrollment = await enrollmentModel.create(request.body)
				return response.json({newEnrollment})
	}catch(e){
	return next(e)
	}
})


router.patch('/:id', async function (request,response,next){
	try{

		const {id} = request.params
		const updatedEnrollment = await enrollmentModel.getById(id,request.body)
		return response.json({updatedEnrollment})

	}catch(e){
	return next(e)
	}
})

router.delete('/:id', async function (request,response,next){
	try{
				const {id} =request.params
				const removeEnrollment = await enrollmentModel.remove(id,request.body)
				return response.json({removeTask})
	}catch(e){
	return next(e)
	}
})



module.exports = router 