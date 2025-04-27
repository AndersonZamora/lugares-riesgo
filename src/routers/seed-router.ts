import { seed } from "../controller/seed";

const { Router } = require('express');

const router = Router();


router.post('/', seed);

export default router;