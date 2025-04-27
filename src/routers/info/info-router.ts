import { createInfo } from "../../controller/information/create-info";
import { deleteInformation } from "../../controller/information/delete-information";
import { listInformation } from "../../controller/information/list-information";
import { validarCampos } from "../../middlewares/validar-campos";
import { validarJWT } from "../../middlewares/validar-jwt";
import { validarRol } from "../../middlewares/validar-rol";
const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

router.use(validarJWT);

router.get('/', listInformation)

router.use(validarRol);

router.post('/',
    [
        check('datos', 'Campo requerido (sólo letras, números y puntos)').not().isEmpty().isLength({ mi: 5, nax: 255 }).isAlphanumeric('es-ES', { ignore: ' .:),(' }),
        check('link', 'Ingrese un link valido').not().isEmpty().isURL(),
        check('fecha', 'Fecha no valida').not().isEmpty().isLength({ mi: 5, max: 25 }).isAlphanumeric('es-ES', { ignore: ' -:' }),
        validarCampos
    ],
    createInfo
);

router.delete('/:id', deleteInformation);

export default router;