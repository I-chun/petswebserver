const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const mongoose       = require('mongoose');
const moment         = require('moment');
const promisify      = require('es6-promisify');
const passport       = require('passport');
const session        = require('express-session');
const methodOverride = require("method-override");
const flash          = require('connect-flash');
const User           = require("./models/user");

const routes         = require('./routes/index');
const errorHandlers  = require('./handlers/errorHandlers');
const port           = process.env.PORT || 7777;
mongoose.Promise     = global.Promise;

// 顯示中文日期
moment.locale(['zh-tw']);

// 設定 view engine
app.set('view engine', 'ejs');

// 從variables.env 檔案 import 一些比較私密的環境變數
require('dotenv').config({ path: 'variables.env' });

// 連 mlab mongodb
mongoose.connect(process.env.DATABASE, { useMongoClient: true });

// 處理session，用secret 來 encode and decode the sessions
app.use( require("express-session") ({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

// 解析POST參數
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 靜態檔案(影像、CSS 檔案和 JavaScript 檔案等)的位置
app.use(express.static(__dirname + "/public"));

// 置換template method
app.use(methodOverride("_method"));

// flash 一些，成功登入，留言失敗等等的訊息。 
app.use(flash());

// 處理 login  
app.use(passport.initialize());
app.use(passport.session());

// taking sessions encoding it (serializeUser)
// taking sessions unencoding it (deserializeUser)
// passportLocalMongoose幫我們寫好serializeUser()及deserializeUser()
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 設定變數讓所有module及template都可使用
app.use( (req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.moment = require('moment');
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// 處理所有的Routes
app.use('/', routes);

// 啟動Server
app.listen(port, () => {
  console.log('Server has started!');
});
