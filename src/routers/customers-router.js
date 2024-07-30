import { Router } from "express";
import { postCustomer, getCustomers } from "../controllers/customers-controller.js";
import { customerSchema } from "../schemas/customer-schema.js";
import validateSchema from '../middlewares/schemas-middleware.js'

export const customersRouter = Router();

customersRouter.post('/customers', validateSchema(customerSchema), postCustomer);
customersRouter.get('/customers', getCustomers);
