import axios from 'axios';


<<<<<<< HEAD
let endpoint = window.location.protocol + '//' + window.location.hostname + ':' + (window.location.port === '3000' ? '8000' : window.location.port) + '/api';
if (window.location.hostname === "chatappinprogress.herokuapp.com") {
    endpoint =
        "https://chatappinprogress.herokuapp.com/api";
}
=======
const endpoint = window.location.href === "http://localhost:3000/"
    ? "http://localhost:8000/api"
    : window.location.href+'api';
>>>>>>> parent of 6fba08a... deploying-server-and-client

const api = {

    getconversations: async (userid) => {

        const point = endpoint + '/conversations';

        const result = await axios.post(point, {
            userid
        });

        return result.data;
    },

    getmessages: async (conversation_id) => {
        const point = endpoint + '/messages';
        const result = await axios.post(point, {
            conversation_id
        });

        return result.data;
    },
    authenticate: async (username, password) => {

        const result = await axios.post(endpoint + "/authenticate", {
            username,
            password,
        });
        return result.data;
    }
}

export default api;