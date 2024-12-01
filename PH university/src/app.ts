import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/users/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import { AcademicSemestarRoute } from './app/modules/academicSemestar/academicSemestar.route'
const app: Application = express()

//parser
app.use(express.json())
app.use(cors())

//application routes
app.use('/api/v1/students', UserRoutes)
app.use('/api/v1/acdemic-semestar', AcademicSemestarRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('PH University Server')
})

app.use(globalErrorHandler)
app.use(notFound)
export default app
