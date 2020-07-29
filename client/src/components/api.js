import axios from 'axios';

import getendpoint from '../api-endpoint'


const endpoint = `${getendpoint()}api`;

const api = {

    getconversations: async (userid) => {

        const point = endpoint + '/conversations';

        const result = await axios.post(point, {
            userid
        });

        return result.data;
    },

    getmessages: async (conversation_id, page) => {
        const point = endpoint + '/messages';
        const result = await axios.post(point, {
            conversation_id, page
        });

        return result.data;
    },
    authenticate: async (data) => {
        console.log(endpoint + "/authenticate")

        const result = await axios.post(endpoint + "/authenticate", {
            [Number(data) ? 'mobile' : 'email']: data
        });

        return result.data;
    },

    search: async (user) => {
        const point = endpoint + '/search';

        const result = await axios.post(point, {
            user
        });

        return result.data;
    },
    startconversation: async (ids, creator) => {
        const point = endpoint + '/startconversation';

        const result = await axios.post(point, {
            ids, creator
        });

        return result.data;
    },

}

export default api;