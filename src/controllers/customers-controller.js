import httpStatus from "http-status";
import { 
    getCustomersService, 
    getOneCustomerService, 
    postCustomerService, 
} from "../services/customers-services.js";

export async function postCustomer(req, res) {
    await postCustomerService(req.body);
    res.sendStatus(httpStatus.CREATED);
}

export async function getCustomers(req, res) {  
    const customers = await getCustomersService();
    res.send(customers).status(httpStatus.OK);
}

export async function getOneCustomer(req, res) {
    const id = Number(req.params.id);   
    const customer = await getOneCustomerService(id);
    res.send(customer).status(httpStatus.OK);
}