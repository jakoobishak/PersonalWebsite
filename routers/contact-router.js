const express = require("express")
const validators = require("../validators")
const db = require("../database")

const router = express.Router()

router.get("/", function (request, response) {
    const loggedIn = request.session.isLoggedIn
    db.getAllContactMessages(function (error, contacts) {

        if (error) {
            const model = {
                hasDatabaseError: true,
                isLoggedIn: loggedIn,
                contacts: []
            }
            response.render("contact.hbs", model)
        } else {
            const model = {
                hasDatabaseError: false,
                isLoggedIn: loggedIn,
                contacts
            }
            response.render("contact.hbs", model)
        }
    })
})

router.post("/", function (request, response) {
    const name = request.body.name
    const message = request.body.message
    const loggedIn = request.session.isLoggedIn

    const errors = validators.getValidationErrorsForContact(name, message)

    if (errors.length == 0) {
        db.createContactMessage(name, message, function (error) {
            if (error) {
                errors.push("Internal server error.")

                const model = {
                    errors,
                    name,
                    message
                }

                response.render('contact.hbs', model)
            } else {
                response.redirect("/contact")
            }
        })
    } else {
        db.getAllContactMessages(function (error, contacts) {
            if (error) {
                errors.push("Internal server error.")
                const model = {
                    errors,
                    isLoggedIn: loggedIn,
                    name,
                    message,
                    contacts
                }
                response.render("contact.hbs", model)
            } else {
                const model = {
                    errors,
                    isLoggedIn: loggedIn,
                    name,
                    message,
                    contacts

                }
                response.render("contact.hbs", model)
            }
        })

    }
})

router.get("/:id/update", validators.redirectIfNotLoggedIn, function (request, response) {
    const id = request.params.id

    db.getContactMessagesById(id, function (error, contact) {
        if (error) {
            console.log('contact error', error)
            const model = {
                hasDatabaseError: true,
                contact: []
            }
            response.render("contact.hbs", model)
        } else {
            const model = {
                hasDatabaseError: false,
                contact
            }
            response.render("update-contact.hbs", model)
        }
    })
})

router.post("/:id/update", validators.redirectIfNotLoggedIn, function (request, response) {
    const id = request.params.id
    const name = request.body.name
    const message = request.body.message

    const errors = validators.getValidationErrorsForContact(name, message)

    if (errors.length == 0) {
        db.updateContactById(id, name, message, function (error) {

            if (error) {
                errors.push("Internal server error.")

                const model = {
                    errors,
                    name,
                    message
                }
                response.render("update-contact.hbs", model)
            } else {
                response.redirect("/contact")
            }
        })
    } else {
        const model = {
            errors,
            contact: {
                id,
                name,
                message
            }
        }
        response.render("update-contact.hbs", model)
    }

})


router.get("/:id/delete", validators.redirectIfNotLoggedIn, function (request, response) {
    const id = request.params.id

    db.getContactMessagesById(id, function (error, contact) {

        if (error) {
            const model = {
                hasDatabaseError: true,
                contact: []
            }
            response.render("delete-contact.hbs", model)

        } else {
            const model = {
                hasDatabaseError: false,
                contact
            }
            response.render("delete-contact.hbs", model)
        }
    })
})

router.post("/:id/delete", validators.redirectIfNotLoggedIn, function (request, response) {
    const id = request.params.id

    const errors = []

    db.deleteContactById(id, function (error) {
        errors.push("Internal server error.")

        if (error) {
            const model = {
                errors,
                id
            }
            response.render("delete-contact.hbs", model)
        } else {
            response.redirect("/contact")
        }
    })

})

module.exports = router