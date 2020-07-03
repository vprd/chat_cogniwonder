require('dotenv').config();
export default function endpoint() {

    console.log('env is ',process.env.ENVIRONMENT);
    if (process.env.ENVIRONMENT === 'local') {
        window.API_ENDPOINT = 'http://localhost:8000/';
        return window.API_ENDPOINT;
    }else{
        window.API_ENDPOINT = 'http://chat.cogniwonder.com/';
        return window.API_ENDPOINT;
    }
}