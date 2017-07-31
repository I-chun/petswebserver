const mongoose  = require('mongoose');
const promisify = require('es6-promisify');
const passport  = require('passport');
const User      = require('../models/user');
const Pet       = require('../models/pet');
const Comment   = require('../models/comment');


exports.registerForm =  (req, res) => {
   res.render("register"); 
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  // 讓 register 可以使用 promise
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next();
};

exports.loginForm = (req, res) => {
   res.render("login"); 
};

exports.login = passport.authenticate("local", {
  failureRedirect: '/login',
  failureFlash: '登入失敗',
  successRedirect: '/pets',
  successFlash: '成功登入'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', '成功登出');
  return res.redirect("/pets"); 
};

exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  req.flash('error', '必須先登入帳號');
  return res.redirect("/login");
};

exports.isOwner = async (req, res, next) => {
  if(req.isAuthenticated()){
    const foundPet = await Pet.findById(req.params.id);
    if(foundPet.author.id.equals(req.user._id)) {
      return next();      
    }
    req.flash('error', '您無權限修改');
    res.redirect("back");
  }
  req.flash('error', '必須先登入帳號');
  return res.redirect("back");
};

exports.isCommentOwner = async (req, res, next) => {
  if(req.isAuthenticated()){
    const foundComment = await Comment.findById(req.params.comment_id);
    if(foundComment.author.id.equals(req.user._id)) {
      return next();
    }
    req.flash('error', '您無權限修改');
    return res.redirect("back");
  }
  req.flash('error', '必須先登入帳號');
  return res.redirect("back");
};
