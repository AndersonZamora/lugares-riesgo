import { alertAllUser } from "../../controller/admin/alert-all-user";
import { alertRegister } from "../../controller/alerts/alert-register";
import { validarCampos } from "../../middlewares/validar-campos";
import { validarJWT } from "../../middlewares/validar-jwt";

const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

router.use(validarJWT);

router.use('/suru-tame', 
    [
        check('fecha', 'Este campo es obligatorio').not().isEmpty(),
        check('longitud', 'Campo requerido (sólo números, puntos, comas y guiones)').not().isEmpty().isDecimal(),
        check('latitud', 'Campo requerido (sólo números, puntos, comas y guiones)').not().isEmpty().isDecimal(),
        validarCampos
    ],
    alertRegister
)

router.get('/risuto-suru', alertAllUser);

export default router;

