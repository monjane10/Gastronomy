import express from "express";
import OrdersControllers from "../controllers/orders.js";

const ordersRouter = express.Router();

const ordersControllers = new OrdersControllers();


ordersRouter.post("/", async (req, res) => {
  const {success, status, body} = await ordersControllers.addOrder(req.body);  
  res.status(status).json({success, status, body});
});


ordersRouter.get("/", async (req, res) => {
  const {success, status, body} = await ordersControllers.getOrders();  
  res.status(status).json({success, status, body});
});

ordersRouter.get("/:id", async (req, res) => {
  const {success, status, body} = await ordersControllers.getOrdersByUserId(req.params.id);  
  res.status(status).json({success, status, body});
});
ordersRouter.put("/:id", async (req, res) => {
    const {success, status, body} = await ordersControllers.updateOrder(req.params.id, req.body);
    res.status(status).json({success, status, body});
});

ordersRouter.delete("/:id", async (req, res) => {
    const {success, status, body} = await ordersControllers.deleteOrder(req.params.id);
    res.status(status).json({success, status, body});
});




export default ordersRouter;