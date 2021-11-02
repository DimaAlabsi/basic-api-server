'use strict';
const express = require('express');

const {Clothes}= require('../models/index');
// console.log(Clothes);

const clothesRouter = express.Router();

clothesRouter.get('/clothes', getClothes);
clothesRouter.get('/clothes/:id', getOneClothes);
clothesRouter.post('/clothes', createClothes);
clothesRouter.put('/clothes/:id', updateClothes);
clothesRouter.delete('/clothes/:id', deleteClothes)

async function getClothes(req, res) {
    const allClothes = await Clothes.findAll();
    res.status(200).json(allClothes);
}
async function getOneClothes(req, res) {
    const id = parseInt(req.params.id);

    const oneOfClothes = await Clothes.findOne({
        where: {
            id: id
        }
    })
    res.status(200).json(oneOfClothes)
}
async function createClothes(req, res) {
    const obj = req.body;
    let newClothes = await Clothes.create(obj);
    res.status(201).json(newClothes);

}
async function updateClothes(req, res) {
    const id = parseInt(req.params.id);
    const obj = req.body;

    const foundClothes = await Clothes.findOne({ where: { id: id } });

    let updatedClothes = await foundClothes.update(obj);
    res.status(204).json(updatedClothes);


}
async function deleteClothes(req, res) {
    const id = parseInt(req.params.id);
    const deletedClothes = await Clothes.destroy({ where: { id } });
    res.status(204).json(deletedClothes);

}


module.exports= clothesRouter;