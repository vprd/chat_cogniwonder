import axios from 'axios';

import getendpoint from '../api-endpoint'
import Cookies from 'universal-cookie';
import { orderBy } from 'natural-orderby';

import { setupCache } from 'axios-cache-adapter'

// Create `axios-cache-adapter` instance
const cache = setupCache({
    maxAge: 15 * 60 * 1000
})

// Create `axios` instance passing the newly created `cache.adapter`
const axios_cached_api = axios.create({
    adapter: cache.adapter
})

const endpoint = `${getendpoint()}api`;

const cookies = new Cookies();
const api = {

    getconversations: async (userid) => {

        const point = endpoint + '/conversations';

        const result = await post(point, {
            userid
        });
        if (result.data.recent_activity) {
            result.data.recent_activity = new Date(result.data.recent_activity)
        } else {
            result.data.recent_activity = new Date(0)
        }
        const sorted = orderBy(result.data, [(v) => v.recent_activity], ["desc", "asc"]);
        return sorted;
    },

    getmessages: async (conversation_id, page) => {
        const point = endpoint + '/messages';
        const result = await post(point, {
            conversation_id, page
        });
        // console.log(result.data)
        return result.data;
    },
    authenticate: async (data, id) => {

        console.log(endpoint)
        try {
            const result = await post(endpoint + "/authenticate", {
                [Number(data) ? 'mobile' : 'email']: data,

            });
            return result.data;
        } catch (error) {
            console.log('authentication failed')
            // alert('authentication failed')
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
    changeconversationname: async (ids, creator) => {
        const point = endpoint + '/startconversation';

        const result = await post(point, {
            ids, creator
        });

        return result.data;
    },

}

async function post(point, data) {
    return await axios_cached_api.post(point, { ...data, cookies: { mdn: cookies.get('mdn'), cwcc: cookies.get('cwcc') } });
}

export default api;