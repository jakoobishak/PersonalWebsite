const express = require("express")
const validators = require("../validators")
const db = require("../database")

const router = express.Router()

router.get('/home', function (request, response) {
    response.redirect('/')
})

router.get("/", function (request, response) {
    db.getAllWelcomeMessages(function (error, welcome) {
        const loggedIn = request.session.isLoggedIn

        if (error) {
            const model = {
                hasDatabaseError: true,
                isLoggedIn: loggedIn,
                welcome: []
            }
            response.render("home.hbs", model)
        } else {
            const model = {
                hasDatabaseError: false,
                isLoggedIn: loggedIn,
                welcome
            }
            response.render("home.hbs", model)
        }
    })
})

router.get("/create", validators.redirectIfNotLoggedIn, function (request, response) {
    response.render("create-welcome-message.hbs")
})

router.post("/create", validators.redirectIfNotLoggedIn, function (request, response) {
    const title = request.body.title
    const message = request.body.message

    const errors = validators.getValidationErrorsForWelcome(title, message)

    if (errors.length == 0) {

        db.createWelcomeMessage(title, message, function (error, id) {
            if (error) {
                errors.push("Internal server error")

                const model = {
                    errors,
                    title,
                    message

                }

                response.render("create-welcome-message.hbs", model)
            } else {
                response.redirect("/")
            }
        })
    } else {
        const model = {
            errors,
            title,
            message
        }
        response.render("create-welcome-message.hbs", model)
    }
})

router.get("/:id/update", validators.redirectIfNotLoggedIn, function (request, response) {
    const id = request.params.id

    db.getWelcomeMessageById(id, function (error, welcome) {
        if (welcome == undefined) {
            return response.render('404.hbs')
        }
        if (error) {
            const model = {
                hasDatabaseError: true,
                welcome: []
            }
            response.render("home.hbs", model)
        } else {
            const model = {
                hasDatabaseError: false,
                welcome
            }
            response.render("update-welcome-message.hbs", model)
        }
    })
})

router.post("/:id/update", validators.redirectIfNotLoggedIn, function (request, response) {
    const id = request.params.id
    const title = request.body.title
    const message = request.body.message

    const errors = validators.getValidationErrorsForWelcome(title, message)

    if (errors.length == 0) {
        db.updateWelcomeMessageById(id, title, message, function (error) {
            if (error) {
                errors.push("Internal server error.")

                const model = {
                    errors,
                    title,
                    description,
                    link
                }

                response.render('update-welcome-message.hbs', model)
            } else {
                response.redirect("/")
            }
        })
    } else {
        const model = {
            errors,
            welcome: {
                id,
                title,
                message
            }
        }
        response.render("update-welcome-message.hbs", model)
    }

})

router.get("/:id/delete", validators.redirectIfNotLoggedIn, function (request, response) {
    const id = request.params.id

    db.getWelcomeMessageById(id, function (error, welcome) {
        if (welcome == undefined) {
            return response.render('404.hbs')
        }
        if (error) {
            const model = {
                hasDatabaseError: true,
                welcome: []
            }
            response.render("delete-welcome-message.hbs", model)

        } else {
            const model = {
                hasDatabaseError: false,
                welcome
            }
            response.render("delete-welcome-message.hbs", model)
        }
    })
})

router.post("/:id/delete", validators.redirectIfNotLoggedIn, function (request, response) {
    const id = request.params.id

    const errors = []

    db.deleteWelcomeMessageById(id, function (error) {
        if (error) {
            errors.push("Internal server error.")
            const model = {
                errors,
                id,
            }
            response.render("delete-welcome-message.hbs", model)
        } else {
            response.redirect("/")
        }
    })

})

module.exports = router