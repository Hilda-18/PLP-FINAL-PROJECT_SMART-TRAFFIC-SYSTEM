// Simulator drives congestion changes and adaptive light rules
import TrafficService from './TrafficService.js';


export default class Simulator {
constructor(io, opts = {}) {
this.io = io;
this.intervalMs = process.env.SIM_INTERVAL_MS ? parseInt(process.env.SIM_INTERVAL_MS) : (opts.intervalMs || 3000);
this.running = false;
this.service = new TrafficService();
}


async tick() {
const intersections = await this.service.listIntersections();


// simple simulation: random walk plus time-of-day pattern (placeholder)
const results = [];
for (const i of intersections) {
let change = Math.floor(Math.random() * 21) - 10; // -10..+10
let newVal = Math.max(0, Math.min(100, (i.congestionLevel || 0) + change));
await this.service.updateCongestion(i._id, newVal);


// Very simple adaptive rule: if congestion > 70 increase green timer on its light(s)
const lights = await this.service.listLights();
// find lights for this intersection
const myLights = lights.filter(l => String(l.intersectionId._id) === String(i._id));
for (const l of myLights) {
let newTimer = l.timer;
if (newVal > 70) newTimer = Math.min(90, l.timer + 10);
if (newVal < 30) newTimer = Math.max(15, l.timer - 5);
if (newTimer !== l.timer) await this.service.setLightState(l._id, l.state, newTimer);
}


results.push({ id: i._id, congestion: newVal });
}


// emit single batched update
this.io.emit('traffic-update', results);
}


start() {
if (this.running) return;
this.running = true;
this.handle = setInterval(() => this.tick(), this.intervalMs);
}


stop() {
if (!this.running) return;
clearInterval(this.handle);
this.running = false;
}
}