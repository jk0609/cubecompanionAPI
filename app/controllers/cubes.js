//Cube API functions

//imports model Card
const cubeModel = require('../models/cube.model.js');
const cardModel = require('../models/card.model.js');

exports.createCube = function(req, res){
  let data = [
    //placeholder user
    1,
    req.body.name,
    req.body.size,
    req.body.cards
  ];
  cubeModel.createCube(data)
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

exports.updateCube = function(req, res) {
  let data = [
                req.body.name,
                req.body.size,
                req.body.cards,
                req.params.id
              ];
  cubeModel.updateCube(data, retrieveUpdatedCube);
  res.send("Cube id "+req.params.id+" updated!");
}

exports.deleteCube = function(req, res) {
  cubeModel.deleteCube(req.params.id);
  res.send("Cube id "+req.params.id+" deleted!");
}

exports.addCards = function(req, res) {
  //Cards should be an imploded array
  cubeModel.addCards(req.body.cards, req.params.id);
  res.send("Cards added!");
}