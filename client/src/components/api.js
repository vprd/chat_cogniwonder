import axios from 'axios';

const api = {

    getconversations: async (userid) => {

        const result = await axios.post('/conversations', {
            userid
        });

        return result.data;
    },

    getmessages: async (conversationid) => {

        const result = await axios.post('/messages', {
            conversationid
        });

        return result.data;
    }

}

export default api;