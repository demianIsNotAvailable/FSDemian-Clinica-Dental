import express from "express";
import { createAppointment, listAppointments, updateAppointment, deleteAppointment } from "./controller.js";
import { auth } from "../../core/middlewares.js";
const router = express.Router();
router.post("/", auth, async (req, res, next) => {
    try {
        res.json(await createAppointment(req.body, req.payload));
    }
    catch (e) {
        next(e);
    }
});
router.get("/", auth, async (req, res, next) => {
    try {
        res.json(await listAppointments(req.query?.start, req.query?.end, req.payload));
    }
    catch (e) {
        next(e);
    }
});
router.patch('/', auth, async (req, res, next) => {
    try {
        res.json(await updateAppointment(req.body, req.payload));
    }
    catch (e) {
        next(e);
    }
});
router.delete('/:id', auth, async (req, res, next) => {
    try {
        await deleteAppointment(req.params, req.payload);
        res.json({});
    }
    catch (e) {
        next(e);
    }
});
export default router;
//# sourceMappingURL=router.js.map