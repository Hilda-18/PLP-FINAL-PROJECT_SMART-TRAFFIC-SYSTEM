import mongoose from 'mongoose';


const intersectionSchema = new mongoose.Schema({
name: { type: String, required: true },
coords: {
// optional for map visualization
lat: { type: Number },
lng: { type: Number }
},
laneCount: { type: Number, default: 4 },
congestionLevel: { type: Number, default: 0 }, // 0-100
updatedAt: { type: Date, default: Date.now }
});


export default mongoose.model('Intersection', intersectionSchema);