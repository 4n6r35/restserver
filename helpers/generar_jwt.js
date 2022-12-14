
import jwt from "jsonwebtoken"


const generarJWT = (userid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { userid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        })
    })

}

export default generarJWT