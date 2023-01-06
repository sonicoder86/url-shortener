import mongoose, { Schema } from 'mongoose';

export const Url = mongoose.model(
  'Url',
  new Schema({
    originalUrl: { type: String, required: true },
    shortId: { type: String, required: true },
  }),
);
