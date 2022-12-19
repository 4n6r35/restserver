
import path from "path";
import { v4 } from "uuid"
const uuidvv4 = v4
const subirArchivo = (files, extesionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]
        //Validar extension 
        if (!extesionesValidas.includes(extension)) {
            return reject(`la extension ${extension} no permitida_(${extesionesValidas})`);
        }
        const nombretemp = uuidvv4() + '.' + extension;
        const uploadPath = path.join(process.cwd(), './uploads/', carpeta, nombretemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(nombretemp);
        });

    });

}

export {
    subirArchivo
}