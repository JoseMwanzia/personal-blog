const express = require('express');
const app = express();
const fs = require('node:fs')
const port = 3000;
const authMiddleware = require('./auth')
const logger = require('./logger.js')

app.use(express.static('./src/views'));
app.use(express.urlencoded({ extended: true })) // Middleware to parse URL-encoded form data
app.use(express.json())

app.set('view engine', 'pug');
app.set('views', './src/views')

app.get('/' , (req, res) => {
    res.redirect('/home')
})

app.get('/home', async (req, res) => {
    try {
        const readDir = fs.readdirSync('./files');

        const articles = readDir.map(article => {
            const readFiles = fs.readFileSync(`./files/${article}`, 'utf8')
            return { article, content: JSON.parse(readFiles) }
        })
        res.render('home.pug', { articles })
    } catch (error) {
        logger.error(error);
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
        res.render('readArticle.pug', { article: await JSON.parse(readFile) })
    } catch (error) {
        console.log(error)
        res.status(500).send('Failed to load the files')
    }
})

app.get('/admin', authMiddleware, async (req, res) => {
    try {
        const readDir = fs.readdirSync('./files');

        const articles = readDir.map(article => {
            const readFiles = fs.readFileSync(`./files/${article}`, 'utf8')
            return { article, content: JSON.parse(readFiles) }
        })
        res.render('adminDashboard.pug', { articles })
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to load the files!')
    }
})

app.get('/new', authMiddleware,  (req, res) => {
    res.render('newArticle.pug')
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

app.get('/edit/:articleId', authMiddleware, async (req, res) => {
    try {
        const article_id = req.params.articleId;
        const readDir = fs.readdirSync(`./files`, 'utf8');

        const article = readDir.find((article) => {
            const readFiles = fs.readFileSync(`./files/${article}`, 'utf8')
            return article_id === JSON.parse(readFiles).id
        })
        const readFiles = fs.readFileSync(`./files/${article}`, 'utf8')

        res.render('adminEditPage.pug', { article, contentDetails: JSON.parse(readFiles) })
    } catch (error) {
        console.log(error)
        res.status(500).send('Failed to load the files!')
    }
})

app.put('/edit/:articleId', authMiddleware,  (req, res) => {
    try {
        // Step 1: Get the attributes from 'req' objects
        const { title, date, content } = req.body;
        const { articleId } = req.params;

        // Step 2: Read the file-names in the directory
        const readDir = fs.readdirSync(`./files`, 'utf8');

        // Step 3:Find the specific file name
        const article = readDir.find((article) => {
            const readFiles = fs.readFileSync(`./files/${article}`, 'utf-8');
            return articleId === JSON.parse(readFiles).id
        })

        // Step 4: Read the current file content
        let readFile = fs.readFileSync(`./files/${article}`, 'utf8');
        readFile = JSON.parse(readFile)

        // Step 5: Modify the specific keys
        readFile.title = title
        readFile.publishing_date = date
        readFile.content = content

        // Step 6: Write the updated content back to the file
        fs.writeFileSync(`./files/${article}`, JSON.stringify(readFile, null, 2), 'utf-8')

        // Step 7: Send a response back to the client
        res.json({ success: true, redirectTo: `/admin` });
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to load the files!')
    }
})

app.delete(`/delete/:articleId`, authMiddleware, (req, res) => {
    // Step 1: Get the attributes from 'req' objects
    const { articleId } = req.params;

    // Step 2: Sync read the file-names in the directory
    const readDir = fs.readdirSync('./files', 'utf8')
    console.log(readDir);

    // Step 3:Find the specific file name
    const foundFileName = readDir.find((article) => {
        const readFiles = fs.readFileSync(`./files/${article}`, 'utf8')
        return JSON.parse(readFiles).id == articleId
    })
    
    // Step 4: Delete the file
    fs.unlink(`./files/${foundFileName}`, (err) => {
        if (err) {console.log(err)}
    })

    // Step 5: Send a response back to the client
    res.status(204).json({ success: true });
})

app.listen(port, () => { console.log(`App listening on port ${port}`) })