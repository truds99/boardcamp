import db from "../config/database.js";

export async function getCustomerByIdRep(id) {
    const customer = await db.query(`
        SELECT * FROM customers
        WHERE id = $1;
    `, [id]);
    return customer;
}

export async function getCustomerByCpfRep(cpf) {
    const customer = await db.query(`
        SELECT * FROM customers
        WHERE cpf = $1;
    `, [cpf]);
    return customer;
}

export async function insertCustomerRep(name, cpf, phone) {
    await db.query(`
        INSERT INTO customers (name, cpf, phone)
        VALUES ($1, $2, $3);
    `, [name, cpf, phone]);
}

export async function getCustomersRep() {
    const customers = await db.query(`SELECT * FROM customers;`);
    return customers;
}