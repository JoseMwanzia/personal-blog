const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './src/views')

app.get('/home',  (req, res) => {
    res.render('index.pug')
})

app.listen(3000, () => { console.log('App listening on port 3000') })