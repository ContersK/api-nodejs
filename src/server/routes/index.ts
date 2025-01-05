import { Router } from "express";
import { CidadesController } from "./../controllers";

const router = Router();

router.get("/", (req, res) => {
  res.send("olá mundo!");
});

router.get(
  "/cidades",
  CidadesController.GetAllValidations,
  CidadesController.GetAll
);
router.get(
  "/cidades/:id",
  CidadesController.getByIDValidation,
  CidadesController.GetByID
);

router.post(
  "/cidades",
  CidadesController.createValidation,
  CidadesController.create
);

router.put(
  "/cidades/:id",
  CidadesController.UpdateByIDValidation,
  CidadesController.UpdateByID
);

router.delete(
  "/cidades/:id",
  CidadesController.deleteByIdValidation,
  CidadesController.deleteById
);

export { router };
