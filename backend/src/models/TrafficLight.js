import mongoose from 'mongoose';


const trafficLightSchema = new mongoose.Schema({
intersectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Intersection', required: true },
state: { type: String, enum: ['RED', 'GREEN', 'YELLOW'], default: 'RED' },
timer: { type: Number, default: 30 },
updatedAt: { type: Date, default: Date.now }
});


export default mongoose.model('TrafficLight', trafficLightSchema);