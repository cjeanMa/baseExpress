const path = require("path");
const { v4: uuidv4 } = require("uuid");

const upload = ( files, extValidates = ["jpg", "jpeg", "gif", "png"], dir = "" ) => {

    return new Promise((resolve, reject) => {
        const { archive } = files;
        const nombrePersonalizado = archive.name.split(".");
        const extension = nombrePersonalizado[nombrePersonalizado.length - 1];
        if (!extValidates.includes(extension)) {
            return reject(`Formato no aceptable, Formatos aceptables ${extValidates}`);
        }

        const nombreTemp = uuidv4() + "." + extension;
        const uploadPath = path.join(__dirname, '../uploads/', dir, nombreTemp);

        archive.mv(uploadPath, (err) => {
            if (err) {
               return reject(err)
            }

            resolve(nombreTemp);
        });
    })


}

module.exports = {
    upload
}