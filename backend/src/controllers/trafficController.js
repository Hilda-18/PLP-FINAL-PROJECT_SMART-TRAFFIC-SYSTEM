import TrafficService from '../services/TrafficService.js';


const service = new TrafficService();


export const getIntersections = async (req, res) => {
const list = await service.listIntersections();
res.json(list);
};


export const getLights = async (req, res) => {
const list = await service.listLights();
res.json(list);
};


export const patchLight = async (req, res) => {
const { id } = req.params;
const { state, timer } = req.body;
const updated = await service.setLightState(id, state, timer);
res.json(updated);
};


export const postIntersection = async (req, res) => {
const payload = req.body;
const created = await service.createIntersection(payload);
res.status(201).json(created);
};