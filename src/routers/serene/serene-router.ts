import { alertUpdate } from "../../controller/alerts/alert-update";
import { listAlertSerene } from "../../controller/serene/list-alert-serene";
import { validarJWT } from "../../middlewares/validar-jwt";
const { Router } = require('express');

const router = Router();

router.use(validarJWT);

router.get('/risuto', listAlertSerene);

router.post('/risuto/up', alertUpdate);

export default router;