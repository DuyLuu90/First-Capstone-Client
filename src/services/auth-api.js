import config from '../config'

const AuthApiServices={
    postLogin(credentials){
        return fetch(`${config.API_ENDPOINT}/auth/login`,{
            method: `POST`,
            headers: {
                'Authorization': `Basic ${config.API_TOKEN}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })
        .then(res=>(!res.ok)
            ? res.json().then(e=>Promise.reject(e))
            : res.json())
    },
}
export default AuthApiServices