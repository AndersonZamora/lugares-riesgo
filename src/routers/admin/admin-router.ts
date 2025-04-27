import { alertAllUser } from "../../controller/admin/alert-all-user";
import { createSerene } from "../../controller/admin/create-serene";
import { deleteAlert } from "../../controller/admin/delete-alert";
import { deleteSerene } from "../../controller/admin/delete-serene";
import { deleteCitizen } from "../../controller/admin/delete_citizen";
import { listCitizen } from "../../controller/citizen/list-citizen";
import { getSerene } from "../../controller/serene/get-serene";
import { listSerene } from "../../controller/serene/list-serene";
import { validarRol } from "../../middlewares/validar-rol";
import { validarJWT } from '../../middlewares/validar-jwt';
const { Router } = require('express');
const { check } = require('express-validator');
import { validarCampos } from '../../middlewares/validar-campos';

const router = Router();
router.use(validarJWT);
router.use(validarRol);

router.get('/risuto/citizen', listCitizen);

router.get('/risuto/alerts/:id', alertAllUser);

router.delete('/risuto/citizen/:id', deleteCitizen);

router.delete('/risuto/alerts/user/:id', deleteAlert);

router.post('/risuto/serene',
    [
        check('nombres', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4, max: 30 }),
        check('apellidos', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4, max: 30 }),
        check('celular', 'Este campo es obligatorio').not().isEmpty().isMobilePhone('es-PE'),
        check('correo', 'Email no válido').isEmail(),
        check('contrasenia', 'Este campo es obligatorio (minimo cuatro caracteres)').not().isEmpty().isLength({ min: 4, max: 15 }),
        validarCampos
    ],
    createSerene
);
router.get('/risuto/serene', listSerene);

router.get('/risuto/serene/:id', getSerene);

router.delete('/risuto/serene/:id', deleteSerene);

export default router;

