import mongoose, { Document } from "mongoose"

export interface SessionDocument extends Document {
  time: string;
}

const sessionSchema = new mongoose.Schema({
  time: String
})

export default mongoose.model<SessionDocument>("Session", sessionSchema)
