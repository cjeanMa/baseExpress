const mongoose = require("mongoose");

const dbConnection = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_DB),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
        console.log("Conexion a BD exitosa")
    }
    catch(err){
        console.log(err);
        throw new Error("Error al conectar con la base de datos")
    }
}

module.exports = {
    dbConnection
}