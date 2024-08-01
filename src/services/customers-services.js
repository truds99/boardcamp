import { cpfAlreadyInUseError, invalidUrlError, notFoundError } from "../errors/errors.js";
import { getCustomerByCpfRep, getCustomerByIdRep, getCustomersRep, insertCustomerRep } from "../repositories/customers-repository.js";

export async function postCustomerService({ name, cpf, phone }) {
    const { rowCount } = await getCustomerByCpfRep(cpf);
    if (rowCount > 0) throw cpfAlreadyInUseError();
    
    await insertCustomerRep(name, cpf, phone);
}

export async function getCustomersService() {
    const customers = await getCustomersRep();
    return customers.rows;
} 

export async function getOneCustomerService(id){
    if (isNaN(id) || id%1 !== 0 || id <= 0) throw invalidUrlError();
    const customer = await getCustomerByIdRep(id);
    if (!customer.rows.length) throw notFoundError('customer');
    return customer.rows;
}
