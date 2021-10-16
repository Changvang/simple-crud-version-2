import express from "express";
import cors from "cors";
import {
    createPerson,
    getAllPerson,
    getSinglePerson,
    updatePerson,
    deletePerson,
} from "../controllers/person-entity.js";

const router = express.Router();

router.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

router.post("/persons/create", createPerson);
router.get("/persons", getAllPerson);
router.get("/persons/edit/:personId", getSinglePerson);
router.post("/persons/update/:personId", updatePerson);
router.delete("/persons/del/:personId", deletePerson);

export default router;
