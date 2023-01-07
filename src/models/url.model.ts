import mongoose, { Schema } from 'mongoose';

export const UrlModel = mongoose.model(
  'Url',
  new Schema({
    originalUrl: { type: String, required: true },
    shortId: { type: String, required: true, index: { unique: true } },
  }),
);
