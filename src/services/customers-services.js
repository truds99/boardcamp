import db from "../config/database.js";
import { getCustomerByCpfRep, getCustomerByIdRep, getCustomersRep, insertCustomerRep } from "../repositories/customers-repository.js";

export async function postCustomerService({ name, cpf, phone }) {
    const { rowCount } = await getCustomerByCpfRep(cpf);
    if (rowCount > 0) throw {
        type: 'conflict',
        message: 'this cpf is already in use'
    }
    
    await insertCustomerRep(name, cpf, phone);
}

export async function getCustomersService() {
    const customers = await getCustomersRep();
    return customers.rows;
} 

export async function getOneCustomerService(id){
    if (isNaN(id) || id%1 !== 0 || id <= 0) return null; 
    const customer = await getCustomerByIdRep(id);
    if (!customer.rows.length) throw {
        type: 'not_found',
        message: 'customer not found'
    }
    return customer.rows;
}
