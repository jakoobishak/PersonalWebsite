const dummyData = require('./dummy-data')
const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

app.use(express.static("static"))

app.engine("hbs", expressHandlebars({
    defaultLayout: 'main.hbs'
}))

app.get('/', function (request, response) {
    const model = {
        humans: dummyData.humans
    }
    response.render("home.hbs", model)
})

app.get('/home', function (request, response) {
    response.render('home.hbs')
})

app.get('/contact', function (request, response) {
    response.render('contact.hbs')
})

app.get('/projects', function (request, response) {
    response.render('projects.hbs')
})

app.listen(8080)
