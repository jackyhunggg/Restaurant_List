const express = require('express');
const exhbs = require('express-handlebars');
const app = express();
const port = 3000;
const list = require('./restaurant.json')

app.use(express.static('public'));
app.engine('handlebars',exhbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index', {restaurant: list.results});
    console.log(list.results)
})
app.listen(port, () => {
    console.log(`express is running on http:// localhost: ${port}`)
})