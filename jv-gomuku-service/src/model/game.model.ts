//generate code from the game.json
import mongoose, { Document } from "mongoose";

export interface GameDocument extends Document {
    boardSize: number;
    board: number[][];
    winner: string;
    createdAt: Date;
}

const gameSchema = new mongoose.Schema<GameDocument>({
    boardSize: { type: Number, required: true },
    board: { type: [[Number]], required: true },
    winner: { type: String },
    createdAt: { type: Date, default: Date.now},
});

const GameModel = mongoose.model<GameDocument>("Game", gameSchema);

export default GameModel;
