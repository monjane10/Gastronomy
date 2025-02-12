import express from "express";
import UsersControllers from "../controllers/users.js";

const usersRouter = express.Router();

const usersControllers = new UsersControllers();

usersRouter.get("/", async (req, res) => {
  const {success, status, body} = await usersControllers.getUsers();  
  res.status(status).json({success, status, body});
});

usersRouter.put("/:id", async (req, res) => {
    const {success, status, body} = await usersControllers.updateUser(req.params.id, req.body);
    res.status(status).json({success, status, body});
});

usersRouter.delete("/:id", async (req, res) => {
    const {success, status, body} = await usersControllers.deleteUser(req.params.id);
    res.status(status).json({success, status, body});
});


export default usersRouter;