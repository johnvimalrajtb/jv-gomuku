import * as z from 'zod'

const params = {
  params: z.object({
    id: z.string({
      required_error: 'Game id is required',
    }),
  }),
}


const gameParams = {
  body: z.object({   
    boardSize: z.number({
      required_error: 'Board size is required',
    }),
    board: z.any().refine((data) => Array.isArray(data) && data.every((row) => Array.isArray(row) && row.every((cell) => typeof cell === 'number'))),
    currentPlayer: z.string({
      required_error: 'Current player is required',
    }),
    winner: z.string({
      required_error: 'Winner is required',
    }),   
  }),
}

export const GameSchema = z.object({
  ...gameParams,
})
export type GameInput = z.TypeOf<typeof GameSchema>

export const getGameByIdSchema = z.object({
  ...params,
})

export type getGameByIdInput = z.TypeOf<typeof getGameByIdSchema>
