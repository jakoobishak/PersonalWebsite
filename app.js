const dummyData = require('./dummy-data')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const sqlite = require("sqlite3")

const app = express()

app.use(express.static("static"))

app.use(express.urlencoded({
    extended: false
}));

app.engine("hbs", expressHandlebars({
    defaultLayout: 'main.hbs'
}))

app.get('/', function (request, response) {
    const model = {
        welcome: dummyData.welcome
    }
    response.render("home.hbs", model)
})

app.get('/home', function (request, response) {
    const model = {
        welcome: dummyData.welcome
    }
    response.render('home.hbs', model)
})

app.get('/contact', function (request, response) {
    const model = {
        id: id,
        names: allMsg.name,
        messages: allMsg
    }
    response.render('contact.hbs', model)
})

app.get('/login', function (request, response) {
    response.render('login.hbs')
})

app.get('/projects', function (request, response) {
    const model = {
        projects: dummyData.projects
    }
    console.log(model)
    response.render('projects.hbs', model)
})

app.get('/projects/:id', function (request, response) {
    const id = request.params.id
    const project = dummyData.projects.find((p) => p.id == id)
    const model = { project }
    response.render("project.hbs", model)
})


var allMsg = []
var id = 0
app.post('/contact', function (request, response) {
    const name = request.body.name
    const message = request.body.text

    allMsg.push({
        id: id,
        names: name,
        messages: message
    })

    const model = {
        id: id,
        names: name,
        messages: allMsg
    }

    id += 1
    console.log(model)

    //console.log(allMsg)

    response.render('contact.hbs', model)
})

app.listen(8080)
