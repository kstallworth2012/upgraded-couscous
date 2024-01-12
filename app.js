/*
				E-LEARNING T-CODING BACK-END
*/
const express = require("express")
const app = express()
const ExpressError = require('./expressError')
const cors = require("cors")

/*

		const courseChapterRoutes = require('./routes/courseChapter')
		const courseChapterContentRoutes = require('./routes/courseChapterContent')
		const contentTypeRoutes = require('./routes/contentType')
		const InstructorRoutes = require('./routes/Instructor')
		const StudentRoutes = require('./routes/Student')
		const CourseRoutes = require('./routes/Course')
		const LanguageRoutes = require('./routes/Language')
		const EnrollmentRoutes = require('./routes/Enrollment')
		const LearningProgressRoutes = require('./routes/LearningProgress')
*/



app.use(cors())
app.use(express.json())


/*

app.use('/course-chapter',courseChapterRoutes)
app.use('/course-chapter-content',courseChapterContentRoutes)
app.use('/content-type',contentTypeRoutes)
app.use('/instructor',InstructorRoutes)
app.use('/student',StudentRoutes)
app.use('/course',CourseRoutes)
app.use('/language',LanguageRoutes)
app.use('/enrollment',EnrollmentRoutes)
app.use('/learning-progress',LearningProgressRoutes) 

*/


// 404 HANDLER 
app.use(function(request,response,next){
	const err = new ExpressError("Not Found",404);

	//pass err to the next middleware 
	return next(err)
});


// GENERAL ERROR HANDLER 

app.use(function(error, request, response, next){
	// the default status is 500 Internal Server error 
	let status = error.status || 500; 


  // set the status and alert the user 
return response.status(status).json({
		error:{
			message: error.message,
			status: status
		}
	})


})



module.exports = app