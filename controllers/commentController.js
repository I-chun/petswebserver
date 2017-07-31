const mongoose = require('mongoose');
const Pet      = require('../models/pet');
const Comment  = require('../models/comment');

exports.newComment =  (req, res) => {
  res.render('comments/new', { id: req.params.id });
};

exports.createComment = async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  req.body.comment.author = { id: req.user._id, name: req.user.name};
  const comment = await Comment.create(req.body.comment);
  await pet.comments.push(comment);
  await pet.save();
  req.flash('success', '成功新增留言');
  return res.redirect('/pets/' + pet._id );
};

exports.editComment = async (req, res) => {
  const foundComment = await Comment.findById(req.params.comment_id);
  res.render("comments/edit", {pet_id: req.params.id, comment: foundComment});

};

exports.updateComment = async (req, res) => {
  await Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment);
  req.flash('success', '成功修改留言');
  return res.redirect("/pets/" + req.params.id );
};

exports.deleteComment = async (req, res) => {
  await Comment.findByIdAndRemove(req.params.comment_id);
  req.flash('success', '成功刪除留言');
  return res.redirect("/pets/" + req.params.id);
};