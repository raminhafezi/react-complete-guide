import axios from 'axios';

const instant = axios.create({
    baseURL: 'https://react-my-burger-39225.firebaseio.com/'
});
export default instant;