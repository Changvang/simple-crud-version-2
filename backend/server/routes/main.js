import express from 'express';
import { createPerson, getAllPerson, getSinglePerson, updatePerson, deletePerson } from '../controllers/person-entity.js';

const router = express.Router();
router.post('/persons', createPerson);
router.get('/persons', getAllPerson);
router.get('/persons/:personId', getSinglePerson);
router.patch('/persons/:personId', updatePerson);
router.delete('/persons/:personId', deletePerson);

export default router;