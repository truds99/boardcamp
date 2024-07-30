import db from "../config/database.js";
import httpStatus from "http-status";

export async function postCustomer(req, res) {
    const { name, cpf, phone } = req.body;

    try {
        const { rowCount } = await db.query(`
            SELECT * FROM customers
            WHERE cpf = $1;
        `, [cpf]);
        if (rowCount > 0) return res.sendStatus(httpStatus.CONFLICT)
        
        await db.query(`
            INSERT INTO customers (name, cpf, phone)
            VALUES ($1, $2, $3);
        `, [name, cpf, phone])
        res.sendStatus(httpStatus.CREATED);
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