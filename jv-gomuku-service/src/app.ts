import { createServer } from 'http'
import express, { Express } from 'express'
import cors from 'cors'

import sessionHandler from './handler/session.handler'
import authHandler from './handler/auth.handler'
import gameHandler from './handler/game.handler'

const app: Express = express()

app.use(
  cors({
    origin: process.env.allowHost || true,
  })
)

app.use(express.json())

app.use('/api/sessions', sessionHandler)
app.use('/api/auth', authHandler)
app.use('/api/game', gameHandler)

export const server = createServer(app)

export default app
