import db from "../config/database.js";
import httpStatus from "http-status";
import { 
    getCustomersService, 
    getOneCustomerService, 
    postCustomerService, 
} from "../services/customers-services.js";

export async function postCustomer(req, res) {
    try {
        const result = await postCustomerService(req.body);
        if (result) return res.sendStatus(httpStatus.OK);
        res.sendStatus(400);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

export async function getCustomers(req, res) {
    try {    
        const customers = getCustomersService();
        if (customers) return res.send(customers).status(200);
        res.sendStatus(400);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

export async function getOneCustomer(req, res) {
    const id = Number(req.params.id);
    try {    
        const customer = await getOneCustomerService(id);
        if (customer) return res.send(customer).status(200);
        res.sendStatus(400);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}