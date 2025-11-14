// Encapsulates DB operations and business logic
import Intersection from '../models/Intersection.js';
import TrafficLight from '../models/TrafficLight.js';


export default class TrafficService {
async listIntersections() {
return Intersection.find().lean();
}


async getIntersection(id) {
return Intersection.findById(id);
}


async updateCongestion(id, value) {
const doc = await Intersection.findByIdAndUpdate(
id,
{ congestionLevel: value, updatedAt: new Date() },
{ new: true }
);
return doc;
}


async listLights() {
return TrafficLight.find().populate('intersectionId').lean();
}


async setLightState(lightId, state, timer) {
return TrafficLight.findByIdAndUpdate(
lightId,
{ state, timer, updatedAt: new Date() },
{ new: true }
);
}


// Additional helpers
async createIntersection(payload) {
return Intersection.create(payload);
}


async createLight(payload) {
return TrafficLight.create(payload);
}
}