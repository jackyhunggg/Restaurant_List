const express = require('express');
const exhbs = require('express-handlebars');
const app = express();
const port = 3000;
const list = require('./restaurant.json')

app.use(express.static('public'));
app.engine('handlebars',exhbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// 使用者可以在首頁看到所有餐廳與它們的簡單資料
app.get('/', (req, res) => {
    res.render('index', {restaurant: list.results});
})

// 使用者可以透過搜尋餐廳名稱and類別來找到特定的餐廳
app.get('/search', (req,res) => {
    const keyword = req.query.keyword;
    const restaurants = list.results.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) 
        || restaurant.name_en.toLowerCase().includes(keyword.toLowerCase())
        || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    })
    console.log(restaurants)
    res.render('index', {restaurants: restaurants, keyword: keyword})
})

// 使用者可以點進去看餐廳的詳細資訊
app.get('/:restaurant_id', (req, res) => {
    // console.log('restaurant id: ', typeof(req.params.restaurant_id))
    const restaurant = list.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
    console.log(req.params.restaurant_id.toString())
    res.render('show', {restaurant: restaurant})
})

app.listen(port, () => {
    console.log(`express is running on http:// localhost: ${port}`)
})