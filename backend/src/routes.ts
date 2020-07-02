import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";

import multer from "multer";
import multerConfig from "./config/multer";

const routes = Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get("/items", itemsController.index);
routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);
routes.post(
  "/points",
  upload.single("image"),
  //testes de verificação
  //   celebrate(
  //     {
  //       body: Joi.object().keys({
  //         name: Joi.string().required(),
  //         // .error((err) => new Error("Nome obrigatório")),
  //         email: Joi.string().required().email(),
  //       }),
  //     },
  //     {
  //       abortEarly: false,
  //     }
  //   ),
  pointsController.create
);
routes.get("/all", pointsController.list);
routes.delete("/points/:id", pointsController.destroy);

export default routes;
