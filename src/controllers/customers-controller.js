import db from "../config/database.js";
import httpStatus from "http-status";
import { postCustomerService } from "../services/customers-services.js";

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
        const customers = await db.query(`SELECT * FROM customers;`)
        res.send(customers.rows).status(httpStatus.OK);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

export async function getOneCustomer(req, res) {
    const id = Number(req.params.id);
    if (isNaN(id) || id%1 !== 0 || id <= 0) return res.sendStatus(httpStatus.BAD_REQUEST); 
    try {    
        const customer = await db.query(`
            SELECT * FROM customers
            WHERE id = $1;
        `, [id]);
        if (!customer.rows.length) return res.sendStatus(httpStatus.NOT_FOUND);
        res.send(customer.rows).status(httpStatus.OK);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}