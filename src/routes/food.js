'use strict';
const express = require('express');

const {Food}= require('../models/index');
// console.log(Food);

const FoodRouter = express.Router();

FoodRouter.get('/food', getFood);
FoodRouter.get('/food/:id', getOneFood);
FoodRouter.post('/food', createFood);
FoodRouter.put('/food/:id', updateFood);
FoodRouter.delete('/food/:id', deleteFood)

async function getFood(req, res) {
    const allFood = await Food.findAll();
    res.status(200).json(allFood);
}
async function getOneFood(req, res) {
    const id = parseInt(req.params.id);

    const oneOfFood = await Food.findOne({
        where: {
            id: id
        }
    })
    res.status(200).json(oneOfFood)
}
async function createFood(req, res) {
    const obj = req.body;
    let newFood = await Food.create(obj);
    res.status(201).json(newFood);

}
async function updateFood(req, res) {
    const id = parseInt(req.params.id);
    const obj = req.body;

    const foundFood = await Food.findOne({ where: { id: id } });

    let updatedFood = await foundFood.update(obj);
    res.status(204).json(updatedFood);


}
async function deleteFood(req, res) {
    const id = parseInt(req.params.id);
    const deletedFood = await Food.destroy({ where: { id } });
    res.status(204).json(deletedFood);

}


module.exports= FoodRouter;