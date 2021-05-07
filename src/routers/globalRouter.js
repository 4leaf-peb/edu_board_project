import express from "express";
import { homerController } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get("/", homerController);

export default globalRouter;
