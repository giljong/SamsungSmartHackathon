const createError = require('http-errors');
const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const indexRouter = require('./routes/index');
const myPageRouter = require('./routes/mypage');
const loginRouter = require('./routes/login');
const authRouter = require('./routes/auth');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');
const oxRouter = require('./routes/ox');
const testRouter = require('./routes/test');
const makeRouter = require('./routes/insertP');
const rankRouter = require('./routes/rank');
const helmet = require('helmet');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '122345564fasdfafa54fsadaf', //사용자의 세션아이디 값
  resave: false,  //재접속 시 세션아이디 재발급x
  saveUninitialized: true,  //세션 사용 전까지 세션아이디 발급x
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/mypage',myPageRouter);
app.use('/login',loginRouter);
app.use('/auth',authRouter);
app.use('/register',registerRouter);
app.use('/logout',logoutRouter);
app.use('/make',makeRouter);
app.use('/ox',oxRouter);
app.use('/rank',rankRouter);
app.use('/test',testRouter);

app.use(helmet());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.redirect('/');
});

app.listen(3000, "0.0.0.0", () => {
  console.log("connect");
});



module.exports = app;
