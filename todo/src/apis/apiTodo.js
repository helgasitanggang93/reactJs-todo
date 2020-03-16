import axios from 'axios'

var existingApi = ''
console.log(process.env);

if(process.env.NODE_ENV === 'development' || process.env.NOE_ENV === 'test'){
    console.log('masuuuk')
    existingApi = process.env.REACT_APP_API_TODO_DEVELOPMENT

}else if(process.env.NODE_ENV === 'production'){
    existingApi = process.env.REACT_APP_API_TODO_PRODUCTION
}

console.log(existingApi)

export default axios.create({
    baseURL: existingApi
})