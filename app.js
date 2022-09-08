const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('config')
const mongoose = require('mongoose')

const usersRouter = require('./routes/users');
const todosRouter = require('./routes/todos')

const app = express();
const PORT = config.get('port') ?? 5000

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/todos', todosRouter)

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
  res.render('error');
});

const start = async () => {
  try {
    const mongoUri = config.get('mongoUri')
    await mongoose.connect(mongoUri)
    mongoose.Promise = global.Promise;
  } catch (e) {
    console.log('Server Errors:', e.message)
    process.exit(1)
  }
}
start()
app.listen(PORT, 'localhost', () => console.log(`Server Start: port ${PORT}`))

module.exports = app;
