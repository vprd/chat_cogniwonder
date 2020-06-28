import axios from 'axios';


let endpoint = window.location.protocol + '//' + window.location.hostname + ':' + (window.location.port === '3000' ? '8000' : window.location.port) + '/api';
if (window.location.hostname === "herokuapp") {
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
        console.log('this is message',result.data)
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