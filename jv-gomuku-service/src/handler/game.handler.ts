import express, { Request, Response } from 'express'

import validateSchema from '../middleware/validateSchema'

import { getGameByIdSchema } from '../schema/game.schema'

import { getHistory, getGameById } from '../service/game.service'


const gameHandler = express.Router()

// Get ALL movies
gameHandler.get('/', async (req: Request, res: Response) => {
  try {
    const result = await getHistory()
    return res.status(200).send(
      /** gameId: number;
    boardSize: number;
    board: number[][];
    currentPlayer: string;
    winner: string;
    moves: number; */
      result.map((g) => ({
        gameId: g.gameId,
        boardSize: g.boardSize,
        board: g.board,
        currentPlayer: g.currentPlayer,
        winner: g.winner,
        moves: g.moves
      }))
    )
  } catch (err) {
    return res.status(500).send(err)
  }
})

// GET movie by ID, expecting movie + session info
gameHandler.get(
  '/:id',
  validateSchema(getGameByIdSchema),
  async (req: Request, res: Response) => {
    const gameId = req.params.id

    const game = await getGameById(gameId)
    if (!game) return res.sendStatus(404)
    return res.status(200).json(game)
  }
)

export default gameHandler
