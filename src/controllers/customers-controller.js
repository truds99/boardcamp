import httpStatus from "http-status";
import { 
    getCustomersService, 
    getOneCustomerService, 
    postCustomerService, 
} from "../services/customers-services.js";

export async function postCustomer(req, res) {
    try {
        await postCustomerService(req.body);
        res.sendStatus(httpStatus.CREATED);
    } catch (e) {
        if (e.type === 'conflict') return res.status(httpStatus.CONFLICT).send(e.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    }
}

export async function getCustomers(req, res) {
    try {    
        const customers = await getCustomersService();
        res.send(customers).status(httpStatus.OK);
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    }
}

export async function getOneCustomer(req, res) {
    const id = Number(req.params.id);
    try {    
        const customer = await getOneCustomerService(id);
        res.send(customer).status(httpStatus.OK);
    } catch (e) {
        if (e.type === 'not_found') return res.status(httpStatus.NOT_FOUND).send(e.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    }
}