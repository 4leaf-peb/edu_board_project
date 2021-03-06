import express from "express";
import {
  listController,
  writeController,
  detailController,
  editController,
  postDeleteController,
} from "../controllers/boardController";
import { dbConnectionHandler } from "../middleware/middleware";

const boardRouter = express.Router();

boardRouter.get("/list", dbConnectionHandler, listController);
boardRouter.get("/write", writeController);
boardRouter.get("/edit", editController);
boardRouter.get("/detail", dbConnectionHandler, detailController);

boardRouter.post("/delete", dbConnectionHandler, postDeleteController);

export default boardRouter;
