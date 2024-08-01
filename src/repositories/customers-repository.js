import db from "../config/database.js";

export async function getCustomerByIdRep(id) {
    const customer = await db.query(`
        SELECT * FROM customers
        WHERE id = $1;
    `, [id]);
    return customer;
}