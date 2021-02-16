const axios = require('axios');

module.exports = {
    getSiteHtml: async (url) => {
        try {
            let res = await axios.get(url);
            return res.data;
          } catch (error) {
            console.error(error)
          }
    }
    
} 



