import express from "express";
import PlatesControllers from "../controllers/plates.js";

const platesRouter = express.Router();

const platesControllers = new PlatesControllers();

platesRouter.post("/", async (req, res) => {
  const {success, status, body} = await platesControllers.addPlate(req.body);  
  res.status(status).json({success, status, body});
});


platesRouter.get("/", async (req, res) => {
  const {success, status, body} = await platesControllers.getPlates();  
  res.status(status).json({success, status, body});
});


platesRouter.get("/", async (req, res) => {
  const {success, status, body} = await platesControllers.getAvailablePlates();  
  res.status(status).json({success, status, body});
});

platesRouter.put("/:id", async (req, res) => {
    const {success, status, body} = await platesControllers.updatePlate(req.params.id, req.body);
    res.status(status).json({success, status, body});
});

platesRouter.delete("/:id", async (req, res) => {
    const {success, status, body} = await platesControllers.deletePlate(req.params.id);
    res.status(status).json({success, status, body});
});


export default usersRouter;