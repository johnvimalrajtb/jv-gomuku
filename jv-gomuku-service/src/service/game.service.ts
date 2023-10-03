import GameModel from '../model/game.model'

export async function getHistory() {
  return await GameModel.find().lean()
}

export async function getGameById(id: string) {
  return await GameModel.findById(id).lean()
}
