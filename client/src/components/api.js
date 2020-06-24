import axios from 'axios';


const endpoint = "http://localhost:8000/api";

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