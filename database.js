const sqlite = require("sqlite3")

const db = new sqlite.Database("jakoobishak.db")

db.run(`
    CREATE TABLE IF NOT EXISTS projects(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        linkToProject TEXT
    )
`)

db.run(`
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            message TEXT
        )
`)

db.run(`
        CREATE TABLE IF NOT EXISTS welcomeMessages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            message TEXT
        )
`)

// FOR HOME PAGE
exports.getAllWelcomeMessages = function (callback) {
    const query = "SELECT * FROM welcomeMessages ORDER BY id DESC"

    db.all(query, function (error, products) {
        callback(error, products)
    })
}

exports.createWelcomeMessage = function (title, message, callback) {
    const query = "INSERT INTO welcomeMessages (title, message) VALUES (?, ?)"
    const values = [title, message]

    db.run(query, values, function (error) {
        callback(error, this.lastID)
    })
}

exports.getWelcomeMessageById = function (id, callback) {
    const query = "SELECT * FROM welcomeMessages WHERE id = ? LIMIT 1"
    const values = [id]

    db.get(query, values, function (error, welcome) {
        callback(error, welcome)
    })
}

exports.updateWelcomeMessageById = function (id, title, message, callback) {
    const query = "UPDATE welcomeMessages SET title = ?, message = ? WHERE id = ?"
    const values = [title, message, id]

    db.run(query, values, function (error) {
        callback(error)
    })
}

exports.deleteWelcomeMessageById = function (id, callback) {
    const query = "DELETE FROM welcomeMessages WHERE id = ?"
    const values = [id]

    db.run(query, values, function (error) {
        callback(error)
    })
}

// FOR CONTACTS PAGE
exports.getAllContactMessages = function (callback) {
    const query = "SELECT * FROM contacts ORDER BY id DESC"

    db.all(query, function (error, contacts) {
        callback(error, contacts)
    })
}

exports.createContactMessage = function (name, message, callback) {
    const query = "INSERT INTO contacts (name, message) VALUES (?, ?)"
    const values = [name, message]

    db.run(query, values, function (error) {
        callback(error, this.lastID)
    })
}

exports.getContactMessagesById = function (id, callback) {
    const query = "SELECT * FROM contacts WHERE id = ? LIMIT 1"
    const values = [id]

    db.get(query, values, function (error, contacts) {
        callback(error, contacts)
    })
}

exports.updateContactById = function (id, name, message, callback) {
    const query = "UPDATE contacts SET name = ?, message = ? WHERE id = ?"
    const values = [name, message, id]

    db.run(query, values, function (error) {
        callback(error)
    })
}

exports.deleteContactById = function (id, callback) {
    const query = "DELETE FROM contacts WHERE id = ?"
    const values = [id]

    db.run(query, values, function (error) {
        callback(error)
    })
}

// FOR PROJECTS PAGE
exports.getAllProjects = function (callback) {
    const query = "SELECT * FROM projects ORDER BY id DESC"

    db.all(query, function (error, projects) {
        callback(error, projects)
    })
}

exports.createProject = function (title, description, linkToProject, callback) {
    const query = "INSERT INTO projects (title, description, linkToProject) VALUES (?, ?, ?)"
    const values = [title, description, linkToProject]

    db.run(query, values, function (error) {
        callback(error, this.lastID)
    })
}

exports.getProjectById = function (id, callback) {
    const query = "SELECT * FROM projects WHERE id = ? LIMIT 1"
    const values = [id]

    db.get(query, values, function (error, project) {
        callback(error, project)
    })
}

exports.updateProjectById = function (id, title, description, linkToProject, callback) {
    const query = "UPDATE projects SET title = ?, description = ?, linkToProject = ? WHERE id = ?"
    const values = [title, description, linkToProject, id]

    db.run(query, values, function (error) {
        callback(error)
    })
}

exports.deleteProjectById = function (id, callback) {
    const query = "DELETE FROM projects WHERE id = ?"
    const values = [id]

    db.run(query, values, function (error) {
        callback(error)
    })
}

// FOR ADMIN
exports.createAccount = function (username, password, callback) {
    const query = "INSERT INTO admin (username, password) VALUES (?, ?)"
    const values = [username, password]

    db.run(query, values, function (error) {
        callback(error)
    })
}