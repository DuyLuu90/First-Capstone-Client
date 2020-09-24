export default {
    API_ENDPOINT: (process.env.NODE_ENV==='production')
                ? process.env.REACT_APP_API_BASE_URL 
                : 'http://localhost:8001/api',

    API_TOKEN: process.env.REACT_APP_API_TOKEN,
    TOKEN_KEY: process.env.REACT_APP_JWT_SECRET
}
