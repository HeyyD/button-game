import { WinData } from "./win-data";

import * as mongoose from 'mongoose';

export interface WinModel extends mongoose.Document{
  username: string;
  data: WinData;
}

let schema = new mongoose.Schema({
  username: String,
  data: {
    score: Number,
    prize: String
  }
})

export let WinDbModel = mongoose.model<WinModel>('WinModel', schema)