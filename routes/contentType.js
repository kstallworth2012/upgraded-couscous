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
				const contentType = Model.getById(id)
				return response.status(201).json({contentType})
	}catch(e){
	return next(e)
	}
})


router.post('/', async function (request,response,next){
	try{
				const contentType = await Model.create(request.body)
				return response.json({contentType})
	}catch(e){
	return next(e)
	}
})


router.patch('/:id', async function (request,response,next){
	try{

		const {id} = request.params
		const updatedContentType = await Model.getById(id,request.body)
		return response.json({updatedContentType})

	}catch(e){
	return next(e)
	}
})

router.delete('/:id', async function (request,response,next){
	try{
				const removeContentType = await Model.create(request.body)
				return response.json({removeContentType})
	}catch(e){
	return next(e)
	}
})



module.exports = router 