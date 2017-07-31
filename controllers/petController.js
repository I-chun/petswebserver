const mongoose = require('mongoose');
const User     = require("../models/user");
const Pet      = require("../models/pet");

exports.homePage =  async (req, res) => {
  const allPets = await Pet.find({});
  res.render('pets/index', { allPets });
};

exports.newPet = (req, res) => {
  res.render('pets/new');
};

exports.createPet = async (req, res) => {
  req.body.author = { id: req.user._id, name: req.user.name};
  await Pet.create(req.body);
  req.flash('success', '成功新增記事');
  return res.redirect("/pets");
};

exports.showPet = async (req, res) => {
  const foundPet = await Pet.findOne({_id: req.params.id}).populate("comments").exec();
  res.render('pets/show', { pet : foundPet });
};

exports.editPet = async (req, res) => {
  const foundPet = await Pet.findById(req.params.id);
  res.render('pets/edit', { pet : foundPet });
};

exports.updatePet = async (req, res) => {
  await Pet.findByIdAndUpdate(req.params.id, req.body.pet);
  req.flash('success', '成功修改記事');
  return res.redirect(`/pets/${ req.params.id }`);
};

exports.deletePet = async (req, res) => {
  await Pet.findByIdAndRemove(req.params.id);
  req.flash('success', '成功刪除記事');  
  return res.redirect(`/pets`);
};
