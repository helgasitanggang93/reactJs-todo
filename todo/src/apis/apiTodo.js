import axios from 'axios'

var existingApi = ''

if(process.env.NODE_ENV === 'development' || process.env.NOE_ENV === 'test'){
    existingApi = process.env.REACT_APP_API_TODO_DEVELOPMENT

}else if(process.env.NODE_ENV === 'production'){
    existingApi = process.env.REACT_APP_API_TODO_PRODUCTION
}

export default axios.create({
    baseURL: existingApi
})