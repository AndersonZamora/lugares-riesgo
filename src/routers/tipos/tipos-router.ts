import { createTipo } from "../../controller/tipos/create-tipos";
import { deleteTypes } from "../../controller/tipos/delete-types";
import { listTypes } from "../../controller/tipos/list-types";
import { validarCampos } from "../../middlewares/validar-campos";
import { validarJWT } from "../../middlewares/validar-jwt";
import { validarRol } from "../../middlewares/validar-rol";

const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

router.use(validarJWT);

router.get('/', listTypes);

router.use(validarRol);

router.post('/',
    [
        check('tipo', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4, max: 15 }).isAlphanumeric('es-ES'),
        check('numero', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 3, max: 12 }),
        validarCampos
    ],
    createTipo
);

router.delete('/:id', deleteTypes);


export default router;
