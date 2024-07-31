import db from "../config/database.js";

export async function postCustomerService({ name, cpf, phone }) {
    const { rowCount } = await db.query(`
        SELECT * FROM customers
        WHERE cpf = $1;
    `, [cpf]);
    if (rowCount > 0) return null;
    
    await db.query(`
        INSERT INTO customers (name, cpf, phone)
        VALUES ($1, $2, $3);
    `, [name, cpf, phone]);

    return true;
}

export async function getCustomersService() {
    const customers = await db.query(`SELECT * FROM customers;`);
    return customers.rows;
}

export async function getOneCustomerService(id){
    if (isNaN(id) || id%1 !== 0 || id <= 0) return null; 
    const customer = await db.query(`
        SELECT * FROM customers
        WHERE id = $1;
    `, [id]);
    if (!customer.rows.length) return null;
    return customer.rows;
}
