import { Request, Response, } from 'express';
import { getuser } from '../helpers/getuser';
import { generarJWT } from '../helpers/jwt';


export const revalidarToken = async (req: Request, res: Response) => {
    try {

        const { uid, name } = req

        const { role } = getuser(req.header('x-token') || "-");

        if(!uid || !name){
            res.status(400).json({
                message: 'Token no valido',
            });
            return;
        }

        const token = await generarJWT(uid, name, role);

        return res.json({
            ok: true,
            uid,
            name,
            token,
            role
        });

    } catch (error) {

        const errorMessage = error instanceof Error ? error.message : "Error no controlado"

        res.status(404).json({
            ok: false,
            msg: errorMessage
        });
    }
}
