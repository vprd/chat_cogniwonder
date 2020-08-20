import axios from 'axios';

import getendpoint from '../api-endpoint'
import Cookies from 'universal-cookie';


const endpoint = `${getendpoint()}api`;

const cookies = new Cookies();
const api = {

    getconversations: async (userid) => {

        const point = endpoint + '/conversations';

        const result = await post(point, {
            userid
        });

        return result.data;
    },

    getmessages: async (conversation_id, page) => {
        const point = endpoint + '/messages';
        const result = await post(point, {
            conversation_id, page
        });

        return result.data;
    },
    authenticate: async (data, id) => {

        console.log(endpoint + id)
        try {
            const result = await post(endpoint + "/authenticate", {
                [Number(data) ? 'mobile' : 'email']: data,

            });
            return result.data;
        } catch (error) {
            console.log('authentication failed')
            return false
        }


    },

    search: async (user) => {
        const point = endpoint + '/search';

        const result = await post(point, {
            user
        });

        return result.data;
    },
    startconversation: async (ids, creator) => {
        const point = endpoint + '/startconversation';

        const result = await post(point, {
            ids, creator
        });

        return result.data;
    },

}

async function post(point, data) {
    return await axios.post(point, { ...data, cookies: { mdn: cookies.get('mdn'), cwcc: cookies.get('cwcc') } });
}

export default api;