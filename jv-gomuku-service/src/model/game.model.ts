//generate code from the game.json
import mongoose, { Document } from "mongoose";

export interface GameDocument extends Document {
    gameId: number;
    boardSize: number;
    board: number[][];
    currentPlayer: string;
    winner: string;
    moves: number;
    createdAt: Date;
    updatedAt: Date;
}

const gameSchema = new mongoose.Schema<GameDocument>({
    gameId: { type: Number, required: true ,autoIncrement: true },
    boardSize: { type: Number, required: true },
    board: { type: [[Number]], required: true },
    currentPlayer: { type: String, required: true },
    winner: { type: String },
    moves: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

const GameModel = mongoose.model<GameDocument>("Game", gameSchema);

export default GameModel;
