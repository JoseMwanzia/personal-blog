const express = require('express');
const app = express();
const posts = require('../files/posts')



app.use(express.static('src/views'));
app.set('view engine', 'pug');
app.set('views', './src/views')

app.get('/', (req, res) => {
    res.render('index.pug', {posts})
})

// app.get('/home', (req, res) => {
//     res.render('index.pug', {posts})
// })

app.listen(3000, () => { console.log('App listening on port 3000') })