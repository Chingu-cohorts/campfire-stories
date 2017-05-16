import mongoose, { Schema } from 'mongoose';

/*
 * Schema
 */

const StorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: new Date()
   }
})

let Story = mongoose.model('story', StorySchema)
export default Story
