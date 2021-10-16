const express = require("express")
const expressHandlebars = require("express-handlebars")
const expressSession = require("express-session")
const SQLiteStore = require("connect-sqlite3")(expressSession)
const projectRouter = require("./routers/project-router")
const contactRouter = require("./routers/contact-router")
const welcomeRouter = require("./routers/welcome-router")
const authRouter = require("./routers/auth_router")
const cookieParser = require("cookie-parser")
const csrf = require("csurf")
const adminAuth = require("./adminAuthentication")

const app = express()

app.use(express.static("static"))

app.use(express.urlencoded({
    extended: false
}))

app.use(cookieParser())

app.use(csrf({ cookie: true }))

app.use(expressSession({
    secret: "hellocareatlol",
    saveUninitialized: false,
    resave: false,
    store: new SQLiteStore({
        db: "sessions.db"
    })
}))

//kod
app.use(function (request, response, next) {
    response.locals.session = request.session
    response.locals.csrfToken = request.csrfToken()
    next()
})

app.engine("hbs", expressHandlebars({
    defaultLayout: "main.hbs"
}))

app.use("/", welcomeRouter)
app.use("/projects", projectRouter)
app.use("/contact", contactRouter)
app.use(authRouter)

//Create an admin account before starting the server
async function init() {
    await adminAuth.createAdminAccount();
    app.listen(8080)
}

init()