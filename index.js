const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

app.use(logger);

app.get('/', (req, res) => {
    res.send('<h1>Hello Worldz<h/h1>');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: false }));


app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server stated on port ${PORT}`));