import mongoose, { Schema } from 'mongoose';

export const UrlStatModel = mongoose.model(
  'UrlStat',
  new Schema({
    visits: { type: Number, required: true },
    shortId: { type: String, required: true, index: { unique: true } },
  }),
);
