const express = require("express")
const validators = require("../validators")
const bcrypt = require("bcrypt")
const auth = require("../authentication.json")

const router = express.Router()

router.get("/login", function (request, response) {
    const isLoggedIn = request.session.isLoggedIn

    response.render("login.hbs", isLoggedIn)
})

router.post("/login", function (request, response) {
    const username = request.body.username
    const password = request.body.password
    const hashedPassword = auth.adminAuthentication.password

    const errors = []

    if (username == auth.adminAuthentication.username) {
        bcrypt.compare(password, hashedPassword, function (error, result) {
            if (error) {
                errors.push("Internal server error.")
                response.render("login.hbs", { errors })
            } else {
                if (result == true) {
                    request.session.isLoggedIn = true
                    response.redirect("/")
                }
                if (result == false) {
                    errors.push("Incorrect login credentials! Try again.")
                    response.render("login.hbs", { errors })
                }
            }
        })
    } else {
        errors.push("Incorrect login credentials! Try again.")
        response.render("login.hbs", { errors })
    }
})

router.get("/logout", validators.redirectIfNotLoggedIn, function (request, response) {
    response.render("logout.hbs")
})

router.post('/logout', validators.redirectIfNotLoggedIn, function (request, response) {
    if (request.session) {
        request.session.destroy()
    }
    response.redirect("/")
})

module.exports = router