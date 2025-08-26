import mongoose from 'mongoose';
const { Schema } = mongoose;
const newsroomSchema = new Schema(
  {
    title: {
      type: String,
    },
    previewText: {
      type: String,
    },
    image: {
      type: String, 
    },
    newsLink: {
      type: String,
    },
    Keyword: {
      type: String,
    },
    startDate :{
type: String,
    },
    endDate:{
type: String,
    },
    startTime:{
type: String,
    },
    endTime :{
type: String,
    },
    shortDescription:{
      type: String,
    }
  },
  
  {
    timestamps: true,
    collection: 'Events',
  }
);
const Events =mongoose.models.Events || mongoose.model('Events', newsroomSchema);
export default Events;
