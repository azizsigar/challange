const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://aziz:1234@aziz.fjez7sn.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('DB live on server')
})
.catch(err => console.log('DB error'))