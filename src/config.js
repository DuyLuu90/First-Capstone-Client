export default {
    API_ENDPOINT: (process.env.NODE_ENV==='production')
                ? process.env.REACT_APP_API_BASE_URL 
                : 'http://localhost:8000/api',

    API_TOKEN: process.env.REACT_APP_API_TOKEN,
    TOKEN_KEY: 'first-capstone-client-auth-token'
}
