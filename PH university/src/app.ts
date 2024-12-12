import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/users/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import { AcademicSemestarRoute } from './app/modules/academicSemestar/academicSemestar.route'
import { StudentRoute } from './app/modules/student/student.route'
import { AcademicFaculyRoute } from './app/modules/academicFaculty/academicFaculty.route'
import { AcademicDepertmentRoute } from './app/modules/academicDepertment/academicDepertment.route'
import { CourseRoute } from './app/modules/course/course.route'
import { SemestarRegistrationRoute } from './app/modules/semestarRegistration/semestarRegristration.route'
const app: Application = express()

//parser
app.use(express.json())
app.use(cors())

//application routes
app.use('/api/v1/users', UserRoutes)
app.use('/api/v1/students', StudentRoute)
app.use('/api/v1/acdemic-semestars', AcademicSemestarRoute)
app.use('/api/v1/acdemic-faculties', AcademicFaculyRoute)
app.use('/api/v1/acdemic-depertments', AcademicDepertmentRoute)
app.use('/api/v1/courses', CourseRoute)
app.use('/api/v1/semestar-registration', SemestarRegistrationRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('PH University Server')
})

app.use(globalErrorHandler)
app.use(notFound)
export default app
