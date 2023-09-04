const express = require('express');
const route  = require('./config/routes');
const app = express();
require('./config/mongoose');

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));

app.use(route);
app.listen(2001, ()=> console.log('server is live on 2000'))