const { response } = require("express");

const getUsers = (req, res = response) => {
    res.json("Hello from get - Controller");
}

const postUsers = (req, res = response) => {
    const body = req.body;
    console.log(body)
    res.json({
        message: "Hola desde post",
        body
    });
}

const putUsers = (req, res = response) => {
    const { id } = req.params;
    const query = req.query;
    res.json({
        message: "Hola desde put",
        id,
        query
    });
}

const deleteUser = (req, res = response) => {
    res.json("Hello from delete - Controller");
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUser
}