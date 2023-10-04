import GameModel, { GameDocument } from '../model/game.model'
import mongoose, { DocumentDefinition } from 'mongoose'

export async function getHistory() {
  return await GameModel.find().lean()
}

export async function getGameById(id: string) {
  return await GameModel.findById(id).lean()
}

export async function createGame(game: DocumentDefinition<GameDocument>) {
  return GameModel.create(game)
}