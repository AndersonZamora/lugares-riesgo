import { Request, Response, NextFunction } from 'express';
const { validationResult } = require('express-validator');

const validarCampos = (req: Request, res: Response, next: NextFunction) => {

    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({
            ok: false,
            er: true,
            erros: erros.mapped()
        });
    }

    next();
};

export { validarCampos };