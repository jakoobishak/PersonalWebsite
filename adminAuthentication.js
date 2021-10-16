const inquirer = require("inquirer")
const bcrypt = require("bcrypt")
const auth = require("./authentication.json")
const fs = require("fs")

function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds)

    return hashedPassword
}

function addAdminAccount(username, password) {
    auth.adminAuthentication.username = username
    auth.adminAuthentication.password = password

    fs.writeFile("authentication.json", JSON.stringify(auth), function (error) {
        if (error)
            console.log(error)
    })
}

exports.createAdminAccount = async function () {

    if (auth.adminAuthentication.username == "") {
        await inquirer.prompt([
            { type: "input", name: "username", message: "Choose your username" },
            { type: "password", name: "password", message: "Choose your password" }
        ])
            .then((answer) => {
                const hashedPassword = hashPassword(answer.password)
                addAdminAccount(answer.username, hashedPassword)
            })
            .catch((error) => {
                console.error(error)
            });
    }

}