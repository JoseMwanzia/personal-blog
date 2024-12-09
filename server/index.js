const express = require('express');
const app = express();
const fs = require('node:fs')
const port = 3000;

app.use(express.static('./src/views'));
app.use(express.urlencoded({ extended: true })) // Middleware to parse URL-encoded form data

app.set('view engine', 'pug');
app.set('views', './src/views')

app.get('/home', async (req, res) => {
    try {
        const readDir = fs.readdirSync('./files');

        const articles = readDir.map(article => {
            const readFiles = fs.readFileSync(`./files/${article}`, 'utf8')
            return { article, content: JSON.parse(readFiles) }
        })
        res.render('index.pug', { articles })
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to load the files!')
    }
})

app.get('/article/:artcleId', async (req, res) => {
    try {
        const article_id = req.params.artcleId

        const readDir = await fs.readdirSync('./files');

        const article = readDir.find(async article => {
            const readFile = await fs.readFileSync(`./files/${article}`, 'utf8')
            return article_id === JSON.parse(readFile).id
        })

        const readFile = await fs.readFileSync(`./files/${article}`, 'utf8')
        res.render('article.pug', { article: await JSON.parse(readFile) })
    } catch (error) {
        console.log(error)
        res.status(500).send('Failed to load the files')
    }
})

app.get('/admin', async (req, res) => {
    try {
        const readDir = fs.readdirSync('./files');

        const articles = readDir.map(article => {
            const readFiles = fs.readFileSync(`./files/${article}`, 'utf8')
            return { article, content: JSON.parse(readFiles) }
        })
        res.render('dashboard.pug', { articles })
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to load the files!')
    }
})

app.get('/new', (req, res) => {
    res.render('addArticle.pug')
})

app.post('/new', (req, res) => {
    const { title, date, content } = req.body;

    let nextId = () => {
        const readDir = fs.readdirSync('./files')
        return readDir.length + 1
    }

    let data = {
        id: nextId(),
        title,
        publishing_date: date,
        content
    }

    fs.writeFile(`./files/${title}.json`, JSON.stringify(data, null, 2), (err, data) => {
        if (err) { console.log(err) }
        console.log('Succefully saved the file!');
    })
    res.send('Data received successfully!');
})

app.listen(port, () => { console.log(`App listening on port ${port}`) })