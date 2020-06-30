import axios from 'axios';


let endpoint = window.location.protocol + '//' + window.location.hostname + ':' + (window.location.port === '3000' ? '8000' : window.location.port) + '/api';
if (window.location.hostname === "chatappinprogress.herokuapp.com") {
    endpoint =
        "https://chatappinprogress.herokuapp.com/api";
}

const api = {

    getconversations: async (id) => {

        const point = endpoint + '/conversations';

        const result = await axios.post(point, {
            id
        });

        return result.data;
    },

    getmessages: async (conversation_id) => {
        const point = endpoint + '/messages';
        const result = await axios.post(point, {
            conversation_id
        });
<<<<<<< HEAD
        console.log('this is message',result.data)
=======
        console.log(result.data);
>>>>>>> parent of b7f84ab... deploying-server-and-client
        return result.data;
    },
    authenticate: async (username, id,) => {

        if (!window.AUTHENTICATION) {
            const result = await axios.post(endpoint + "/authenticate", {
                username,
                id,
            });
            window.AUTHENTICATION = true;
            return result.data;
        } return window.AUTHENTICATION;

    }
}

export default api;