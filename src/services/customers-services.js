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