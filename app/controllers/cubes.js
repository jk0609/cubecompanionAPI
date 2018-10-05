//Cube API functions

//imports model Card
const cubeModel = require('../models/cube.model.js');
const cardModel = require('../models/card.model.js');

exports.createCube = function(req, res){
  //Create a cube
  //Placeholder user, Name and Size can come from request body
  cubeModel.createCube(1, req.body.name, req.body.size, req.body.cards)
  res.send("Cube created!");
}

exports.getCube = function(req, res){
  function retrieveFoundCube(cube) {
    console.log(cube);
    res.json(cube);
  }

  cubeModel.getCube(req.params.id, retrieveFoundCube);
}

exports.getAllCubes = function(req, res) {
  function retrieveAllCubes(cubes) {
    res.json(cubes);
  }

  cubeModel.getAllCubes(retrieveAllCubes);
}