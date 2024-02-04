const express = require("express")
const router = express.Router();
const Model = require('../models/Model')

router.get('/' ,async (request,response,next)=>{
	try{
		     const result =await .getAll()

		     return response.json(
		     {
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
				const result = await Model.getById(id)
				return response.json({result})
	}catch(e){
	return next(e)
	}
})


router.post('/', async function (request,response,next){
	try{		
				const newInstructor = await Model.create(request.body)
				return response.json({newInstructor})
	}catch(e){
	return next(e)
	}
})


router.patch('/:id', async function (request,response,next){
	try{

		const {id} = request.params
		const updatedInstructor = await Model.update(id,request.body)
		return response.json({updatedInstructor})

	}catch(e){
	return next(e)
	}
})

router.delete('/:id', async function (request,response,next){
	try{
			const {id} = request.params
			const Instructor = await Model.update(id,request.body)
	}catch(e){
	return next(e)
	}
})



module.exports = router 