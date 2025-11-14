import dotenv from 'dotenv';
dotenv.config();


import mongoose from 'mongoose';
import Intersection from './src/models/Intersection.js';
import TrafficLight from './src/models/TrafficLight.js';


const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/smart-traffic';


async function seed() {
await mongoose.connect(uri);
console.log('connected to db for seeding');


// wipe
await Intersection.deleteMany({});
await TrafficLight.deleteMany({});


const intersections = [
{ name: 'Main & 1st', coords: { lat: -1.1, lng: 36.8 }, laneCount: 4, congestionLevel: 20 },
{ name: 'Main & 2nd', coords: { lat: -1.101, lng: 36.801 }, laneCount: 4, congestionLevel: 40 },
{ name: 'Ring Rd & Airport', coords: { lat: -1.2, lng: 36.9 }, laneCount: 6, congestionLevel: 10 }
];


const created = await Intersection.insertMany(intersections);


const lights = [];
for (const i of created) {
// create two lights per intersection for demonstration
lights.push({ intersectionId: i._id, state: 'GREEN', timer: 30 });
lights.push({ intersectionId: i._id, state: 'RED', timer: 30 });
}


await TrafficLight.insertMany(lights);


console.log('seeded intersections and lights');
process.exit(0);
}


seed().catch(err => {
console.error(err);
process.exit(1);
});