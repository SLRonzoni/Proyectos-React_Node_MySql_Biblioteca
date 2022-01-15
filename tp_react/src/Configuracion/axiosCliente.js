import axios from 'axios';

const axiosCliente = axios.create({
    baseURL : 'http://localhost:3000'
});

export default axiosCliente;