import express, { Request, Response } from 'express'

import validateSchema from '../middleware/validateSchema'

import { getGameByIdSchema , GameInput } from '../schema/game.schema'

import { getHistory, getGameById, createGame } from '../service/game.service'


const gameHandler = express.Router()


gameHandler.post(
  '/create',
 
  async (req: Request<{}, {}, GameInput['body']>, res: Response) => {
    try {
      const gameData = req.body
      //const result = await getHistory();
      //const lastGame = result[result.length-1];
      //find max gameId from the result

      // Create game in our database
      const newGame = await createGame({
        //gameId: lastGame?lastGame.gameId + 1:0,
        boardSize: gameData.boardSize,
        board: gameData.board,
        winner: gameData.winner,
        createdAt: new Date()
      })
     
      res.status(201).json({ _id: newGame._id })
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  }
)

// Get ALL movies
gameHandler.get('/history', async (req: Request, res: Response) => {
  try {
    const result = await getHistory()
    return res.status(200).send(
      result.map((g) => ({
        gameId: g._id,
        boardSize: g.boardSize,
        board: g.board,
        winner: g.winner
      }))
    )
  } catch (err) {
    return res.status(500).send(err)
  }
})

// GET game by ID, expecting movie + session info
gameHandler.get(
  '/retrieve/:id',
  validateSchema(getGameByIdSchema),
  async (req: Request, res: Response) => {
    const id = req.params.id

    const game = await getGameById(id)
    if (!game) return res.sendStatus(404)
    return res.status(200).json(game)
  }
)

export default gameHandler
