import { Types } from 'mongoose';

export type TClass = {
  title: string;
  videoUrl: string;
  videoDuration: string;
  content: string;
  releaseDate: Date;
  module: Types.ObjectId;
  createdBy: Types.ObjectId;
};
