import { Request, Response, NextFunction } from 'express';
import { getuser } from '../helpers/getuser'

export const validarRol = (req:Request, res:Response, next:NextFunction) => {

    try {

        const { role } = getuser(req.header('x-token') || "");

        if (role != process.env.ROLE1) {
            throw new Error('Rol no valido')
        }

    } catch (error) {
        return res.status(401).json({
            ok: false,
            er: false,
            erros: {
                msg: 'Sin privilegios'
            }
        });
    }

    next();
}
