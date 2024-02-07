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
				const Language = Model.getById(id)
				return response.status(201).json({Language})
	}catch(e){
	return next(e)
	}
})


router.post('/', async function (request,response,next){
	try{
				const newLanguage = await Model.create(request.body)
				return response.json({newLanguage})
	}catch(e){
	return next(e)
	}
})


router.patch('/:id', async function (request,response,next){
	try{

		const {id} = request.params
		const updatedLanguage = await Model.getById(id,request.body)
		return response.json({updatedLanguage})

	}catch(e){
	return next(e)
	}
})

router.delete('/:id', async function (request,response,next){
	try{
				const {id} =request.params
				const removeLanguage = await Model.remove(id,request.body)
				return response.json({removeLanguage})
	}catch(e){
	return next(e)
	}
})



module.exports = router 