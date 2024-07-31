import { Router } from "express";
import validateSchema from '../middlewares/schemas-middleware.js';
import { postRental, getRentals, endRental, deleteRental } from "../controllers/rentals-controller.js";
import { rentalSchema } from "../schemas/rental-schema.js";

export const rentalsRouter = Router();

rentalsRouter.post('/rentals', validateSchema(rentalSchema), postRental);
rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals/:id/return', endRental);
rentalsRouter.delete('/rentals/:id', deleteRental);