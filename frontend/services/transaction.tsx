import Client from "../models/client"
import axios from 'axios';

const TransactionService = {
    createClient
}

const backendsrc = "https://localhost:7113"

async function createClient(data: Client): Promise<any>{
    const url = `${backendsrc}/api/BankOps/client`;
    // Default options are marked with *
    console.log(data);
    return axios.post(url,data);
}

export default TransactionService;