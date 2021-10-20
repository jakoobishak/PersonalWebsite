const express = require("express")
const validators = require("../validators")
const db = require("../database")

const router = express.Router()

router.get("/", function (request, response) {
    db.getAllProjects(function (error, projects) {
        const loggedIn = request.session.isLoggedIn

        if (error) {
            const model = {
                hasDatabaseError: true,
                isLoggedIn: loggedIn,
                projects: []
            }
            response.render("projects.hbs", model)
        } else {
            const model = {
                hasDatabaseError: false,
                isLoggedIn: loggedIn,
                projects
            }
            response.render('projects.hbs', model)
        }
    })
})

router.get('/create', validators.redirectIfNotLoggedIn, function (request, response) {
    response.render('create-project.hbs')

})

router.post('/create', validators.redirectIfNotLoggedIn, function (request, response) {
    const title = request.body.title
    const description = request.body.description
    let linkToProject = request.body.linkToProject

    const errors = validators.getValidationErrorsForProject(title, description, linkToProject)

    if (!linkToProject.includes("https://"))
        linkToProject = "https://" + linkToProject

    if (errors.length == 0) {

        db.createProject(title, description, linkToProject, function (error, projectId) {

            if (error) {
                errors.push("Internal server error.")

                const model = {
                    errors,
                    title,
                    description,
                    linkToProject
                }

                response.render('create-project.hbs', model)
            } else {
                response.redirect('/projects/' + projectId)
            }
        })
    } else {
        const model = {
            errors,
            title,
            description,
            linkToProject
        }
        response.render("create-project.hbs", model)
    }
})

router.get('/:id', function (request, response) {
    const id = request.params.id

    db.getProjectById(id, function (error, project) {
        const loggedIn = request.session.isLoggedIn

        if (error) {
            const model = {
                hasDatabaseError: true,
                isLoggedIn: loggedIn,
                project: []
            }
            response.render("project.hbs", model)
        } else {
            const model = {
                hasDatabaseError: false,
                isLoggedIn: loggedIn,
                project
            }
            response.render("project.hbs", model)
        }
    })
})

router.get("/:id/update", validators.redirectIfNotLoggedIn, function (request, response) {
    const id = request.params.id

    db.getProjectById(id, function (error, project) {
        if (error) {
            const model = {
                hasDatabaseError: true,
                project: [],
            }
            response.render("project.hbs", model)
        } else {
            const model = {
                hasDatabaseError: false,
                project
            }
            response.render("update-project.hbs", model)
        }
    })
})

router.post("/:id/update", validators.redirectIfNotLoggedIn, function (request, response) {
    const id = request.params.id
    const title = request.body.title
    const description = request.body.description
    const linkToProject = request.body.linkToProject

    const errors = validators.getValidationErrorsForProject(title, description, linkToProject)

    if (errors.length == 0) {

        db.updateProjectById(id, title, description, linkToProject, function (error) {

            if (error) {
                errors.push("Internal server error.")

                const model = {
                    errors,
                    title,
                    description,
                    linkToProject
                }

                response.render('update-project.hbs', model)
            } else {
                response.redirect('/projects/' + id)
            }
        })
    } else {
        const model = {
            errors,
            project: {
                id,
                title,
                description,
                linkToProject
            }
        }

        response.render("update-project.hbs", model)
    }
})

router.get("/:id/delete", validators.redirectIfNotLoggedIn, function (request, response) {
    const id = request.params.id

    db.getProjectById(id, function (error, project) {

        if (error) {
            const model = {
                hasDatabaseError: true,
                project: []
            }
            response.render("delete-project.hbs", model)

        } else {
            const model = {
                hasDatabaseError: false,
                project
            }
            response.render("delete-project.hbs", model)
        }
    })
})

router.post("/:id/delete", validators.redirectIfNotLoggedIn, function (request, response) {
    const id = request.params.id

    const errors = []

    db.deleteProjectById(id, function (error) {

        if (error) {
            errors.push("Internal server error.")
            const model = {
                errors,
                id,
            }
            response.render("delete-project.hbs", model)
        } else {
            response.redirect("/projects")
        }

    })
})

module.exports = router