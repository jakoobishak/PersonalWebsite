const MIN_TITLE_LENGTH = 3
const MIN_NAME_LENGTH = 2
const MIN_LINK_LENGTH = 5
const MIN_MESSAGE_LENGTH = 10
const MAX_TITLE_LENGTH = 50
const MAX_NAME_LENGTH = 30
const MAX_LINK_LENGTH = 50
const MAX_MESSAGE_LENGTH = 200


exports.getValidationErrorsForProject = function (title, description, link) {
    const validationErrors = []

    if (title.length < MIN_TITLE_LENGTH)
        validationErrors.push("The title needs to be at least " + MIN_TITLE_LENGTH + " characters long.")
    if (description.length < MIN_MESSAGE_LENGTH)
        validationErrors.push("The description need to be at least " + MIN_MESSAGE_LENGTH + " characters long.")
    if (link.length < MIN_LINK_LENGTH)
        validationErrors.push("The link need to be at least " + MIN_LINK_LENGTH + " characters long.")
    if (title.length > MAX_TITLE_LENGTH)
        validationErrors.push("The title cannot be more than " + MAX_TITLE_LENGTH + " characters long.")
    if (description.length > MAX_MESSAGE_LENGTH)
        validationErrors.push("The description cannot be more than " + MAX_MESSAGE_LENGTH + " characters long.")
    if (link.length > MAX_LINK_LENGTH)
        validationErrors.push("The link cannot be more than " + MAX_LINK_LENGTH + " characters long.")

    return validationErrors
}

exports.getValidationErrorsForWelcome = function (title, message) {
    const validationErrors = []

    if (title.length < MIN_TITLE_LENGTH)
        validationErrors.push("The title needs to be at least " + MIN_TITLE_LENGTH + " characters long.")
    if (message.length < MIN_MESSAGE_LENGTH)
        validationErrors.push("The message need to be at least " + MIN_MESSAGE_LENGTH + " characters long.")
    if (title.length > MAX_TITLE_LENGTH)
        validationErrors.push("The title cannot be more than " + MAX_TITLE_LENGTH + " characters long.")
    if (message.length > MAX_MESSAGE_LENGTH)
        validationErrors.push("The message cannot be more than " + MAX_MESSAGE_LENGTH + " characters long.")

    return validationErrors
}

exports.getValidationErrorsForContact = function (name, text) {
    const validationErrors = []

    if (name.length < MIN_NAME_LENGTH)
        validationErrors.push("The name needs to be at least " + MIN_NAME_LENGTH + " characters long.")
    if (text.length < MIN_MESSAGE_LENGTH)
        validationErrors.push("The message need to be at least " + MIN_MESSAGE_LENGTH + " characters long.")
    if (name.length > MAX_NAME_LENGTH)
        validationErrors.push("The title cannot be more than " + MAX_NAME_LENGTH + " characters long.")
    if (text.length > MAX_MESSAGE_LENGTH)
        validationErrors.push("The title cannot be more than " + MAX_MESSAGE_LENGTH + " characters long.")

    return validationErrors
}

exports.redirectIfNotLoggedIn = function (request, response, next) {
    const loggedIn = request.session.isLoggedIn
    if (loggedIn)
        next()
    else
        response.redirect("/")
}