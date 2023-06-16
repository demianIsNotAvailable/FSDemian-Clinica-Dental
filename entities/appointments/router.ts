import express from "express";
import { createAppointment, listAppointments, updateAppointment, deleteAppointment } from "./controller.js";
import { auth } from "../../core/middlewares.js";

const router = express.Router();

router.post("/", auth, async (req, res, next) => {
  try {
    res.json(await createAppointment(req.body, req.payload));
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const appointments = await listAppointments(req.body.start?.toString(), req.body.end?.toString(), req.payload?.id,);
    res.json(appointments);
  } catch (e) {
    next(e);
  }
});

router.patch('/:id', auth, async (req, res, next) =>{
  try {
    res.json(await updateAppointment(req.params.id, req.body, req.payload))
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', auth, async (req, res, next) =>{
  try {
    await deleteAppointment(req.params, req.payload)
    res.json({})
  } catch (e) {
    next (e)
  }
})

export default router