const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModel")

const getUsers = async (req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true }
    /*       const users = await UserModel.find(query)
           .skip(Number(from))
           .limit(Number(limit));
       
       const total = await UserModel.countDocuments(query); */

    const [total, users] = await Promise.all([
        UserModel.countDocuments(query),
        UserModel.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])


    res.json({
        total,
        users
    });
}

const postUsers = async (req, res = response) => {

    const { name, email, password, rol } = req.body;
    const user = new UserModel({ name, email, password, rol });

    //Validacion de email

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);



    user.save()

    res.json(
        user
    );
}

const putUsers = async (req, res = response) => {
    const { id } = req.params;
    const { password, google, ...rest } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }

    const user = await UserModel.findByIdAndUpdate(id, rest)
    res.json({
        user
    });
}

const deleteUser = async (req=request, res = response) => {
    const { id } = req.params;
    
    //const user = await UserModel.findByIdAndDelete(id);
    const userAuth = req.userAuth;
    const user = await UserModel.findByIdAndUpdate(id, {state: false})

    res.json({
        userAuth,
        user
    });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUser
}