import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


declare global {
    namespace Express {
        interface Request {
            uid?: string;
            name?: string;
            role?: string;
        }
    }
}

const validarJWT = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            er: false,
            erros: {
                msg: 'No hay token en la peticion'
            }
        });
    };

    try {

        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED!) as { uid: string, name: string, role: string };


        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            er: false,
            erros: {
                msg: 'No no válido'
            }
        });
    }

    next();
}

export { validarJWT };

