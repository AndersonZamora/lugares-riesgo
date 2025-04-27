const { Router } = require('express');
const { check } = require('express-validator');
import { loginHero } from '../../controller/central/login-hero';
import { loginCitizen } from '../../controller/heros/login-citizen';
import { loginSerene } from '../../controller/heros/login-serene';
import { registrarCitizen } from '../../controller/heros/register-citizen';
import { registrarHero } from '../../controller/heros/register-heros';
import { revalidarToken } from '../../controller/revalidar-token';
import { validarCampos } from '../../middlewares/validar-campos';
import { validarJWT } from '../../middlewares/validar-jwt';

const router = Router();

router.post('/roguin/citizen',
    [
        check('email', 'Email es obligatorio').isEmail(),
        check('password', 'Error, revise sus credenciales').not().isEmpty().isLength({ min: 4, max: 15 }),
        validarCampos
    ],
    loginCitizen
)

router.post('/atarashi/citizen',
    [
        check('nombres', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4, max: 30 }),
        check('apellidos', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4, max: 30 }),
        check('celular', 'Este campo es obligatorio').not().isEmpty().isMobilePhone('es-PE'),
        check('correo', 'Email no válido').isEmail(),
        check('contrasenia', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4, max: 15 }),
        check('dni', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 8, max: 8 }),
        validarCampos
    ],
    registrarCitizen
);

router.post('/roguin/hero',
    [
        check('email', 'Email es obligatorio').isEmail(),
        check('password', 'Error, revise sus credenciales').not().isEmpty().isLength({ min: 4, max: 15 }),
        validarCampos
    ],
    loginHero
)

router.post('/atarashi/hero',
    [
        check('nombres', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4, max: 30 }),
        check('apellidos', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4, max: 30 }),
        check('celular', 'Este campo es obligatorio').not().isEmpty().isMobilePhone('es-PE'),
        check('correo', 'Email no válido').isEmail(),
        check('contrasenia', 'Este campo es obligatorio (minimo cuatro caracteres)').not().isEmpty().isLength({ min: 4, max: 15 }),
        check('state', 'El estado es obligatorio ').not().isEmpty(),
        validarCampos
    ],
    registrarHero
);

router.post('/roguin/serene',
    [
        check('email', 'Email es obligatorio').isEmail(),
        check('password', 'Error, revise sus credenciales').not().isEmpty().isLength({ min: 4, max: 15 }),
        validarCampos
    ],
    loginSerene
)

router.post('/renew', validarJWT, revalidarToken);

export default router;
