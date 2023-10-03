import express, { Request, Response } from 'express'

import { getSessionByIdSchema } from '../schema/session.schema'
import validateSchema from '../middleware/validateSchema'
import { getSessionById } from '../service/session.service'
import { deserializeUser } from '../middleware/deserializeUser'

const sessionHandler = express.Router()

sessionHandler.use(deserializeUser)

// Get session details, expecting movie, session, theatre, booked seats and occupied seats
sessionHandler.get(
  '/:id',
  validateSchema(getSessionByIdSchema),
  async (req: Request, res: Response) => {
    const sessionId = req.params.id
   // const userId = req.userId

    const session = await getSessionById(sessionId)
    if (!session) return res.sendStatus(404)



    return res.status(200).json({
      ...session
    })
  }
)

export default sessionHandler
