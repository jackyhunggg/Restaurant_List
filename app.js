const express = require('express');
const exhbs = require('express-handlebars');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.engine('handlebars',exhbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    res.render('index')
})
app.listen(port, () => {
    console.log(`express is running on http:// localhost: ${port}`)
})