const express = require('express');
const path = require('path');
const app = express();

const destpath = path.resolve("../../");

app.use('/static', express.static(path.join(destpath, 'public')))


app.listen('4000',()=>{
    console.log('start')
})