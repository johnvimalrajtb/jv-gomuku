import 'dotenv/config'
import connect from './connectDB'

import UserModel from '../model/user.model'
import SessionModel from '../model/session.model'
import users from '../data/user.json'
import sessions from '../data/sessions.json'
import GameModel from '../model/game.model'
import games from '../data/games.json'



const run = async () => {
  try {
    await connect()

    await UserModel.deleteMany()
    await UserModel.insertMany(users)

    await SessionModel.deleteMany()
    await SessionModel.insertMany(sessions)

    await GameModel.deleteMany()
    await GameModel.insertMany(games)

    console.log('Done')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

run()
