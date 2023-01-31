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
})

app.get('/search', (req,res) => {
    const keyword = req.query.keyword;
    const restaurants = list.results.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    })
    console.log(restaurants)
    res.render('index', {restaurants: restaurants, keyword: keyword})
})

app.get('/:restaurant_id', (req, res) => {
    // console.log('restaurant id: ', typeof(req.params.restaurant_id))
    const restaurant = list.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
    console.log(req.params.restaurant_id.toString())
    res.render('show', {restaurant: restaurant})
})

app.listen(port, () => {
    console.log(`express is running on http:// localhost: ${port}`)
})