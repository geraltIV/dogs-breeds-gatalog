import axios from 'axios'

const endpoint = axios.create({
    baseURL: 'https://dog.ceo/api/',
});

export default endpoint