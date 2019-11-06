import axiosTodo from '../apis/api_todo'

export const sortByDue = () => (dispatch, getState) => {
   
    let sorted = getState().reducer.todos.sort((a, b) =>{
        let firstDate = new Date(a.due_date).getTime()
        let secondDate = new Date(b.due_date).getTime()

        return firstDate - secondDate
    })

    dispatch({
        type: 'FETCH_TODO_DATA',
        payload: sorted
    })
}

export const isDetail = (bool) => {
    return {
        type: 'IS_DETAIL',
        payload: bool
    }
}

export const formModalHandler = (bool) => {
    return {
        type: 'FORM_MODAL_HANDLER',
        payload: bool
    }
}

export const headerCollor = (color) => {
    return {
        type: 'HEADER_DETAIL_COLLOR',
        payload: color
    }
}

export const fetchTodoData = () => dispatch => {
    axiosTodo.get('/todos')
    .then(({data})=>{
        dispatch({
            type: 'FETCH_TODO_DATA',
            payload: data
        })
    })
    .catch(err =>{
        dispatch({
            type:'ITEM_ERROR',
            payload: err
        })
    })
}

export const updateDoneTodo = (id, status) => (dispatch, getState) => {
    let newArr = getState().reducer.todos.filter(element =>{
        return element.id !== id
    })
    axiosTodo.patch(`/todos/${id}`,{
        type: status,
        updatedAt: new Date()
    })
    .then(({data})=>{
        dispatch({
            type: 'FETCH_TODO_DATA',
            payload: [...newArr, data],
        })

        dispatch({
            type: 'FETCH_DETAIL_TODO',
            payload: data,
        })
        
    })
    .catch(err=>{
        dispatch({
            type:'ITEM_ERROR',
            payload: err
        })
    })
}

export const fetchDetailTodo = (id) => dispatch =>{
   axiosTodo.get(`/todos/${id}`)
   .then(({data})=>{
       dispatch({
           type: 'FETCH_DETAIL_TODO',
           payload: data
       })
   })
   .catch(err=>{
    dispatch({
        type:'ITEM_ERROR',
        payload: err
    })
   })
}

export const createTodo = (values) => (dispatch, getState) => {
    const {title, description, due_date} = values
    axiosTodo.post(`/todos`, {
        title: title,
        description: description,
        due_date: due_date,
        type: 'urgent',
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(({data})=>{
        dispatch({
            type:'FETCH_TODO_DATA',
            payload: [...getState().reducer.todos, data]
        })
    })
    .catch(err=> {
        dispatch({
            type:'ITEM_ERROR',
            payload: err
        })
    })
}

export const updateTodo = (id, values) => (dispatch, getState) =>{
    let newArr = getState().reducer.todos.filter(element =>{
        return element.id !== id
    })
    axiosTodo.patch(`/todos/${id}`,{
        title: values.title,
        description: values.description,
        due_date: values.due_date,
        updatedAt: new Date()
    })

    .then(({data})=>{
        dispatch({
            type: 'FETCH_TODO_DATA',
            payload: [...newArr, data],
        })        
    })
    .catch(err=>{
        dispatch({
            type:'ITEM_ERROR',
            payload: err
        })
    })
}

export const deleteTodo = (id) => (dispatch, getState) => {
    let newArr = getState().reducer.todos.filter(element=> element.id !== id)
    axiosTodo.delete(`/todos/${id}`)
    .then(() => {
        dispatch({
            type:'FETCH_TODO_DATA',
            payload: newArr
        })
    })
    .catch(err=> {
        dispatch({
            type:'ITEM_ERROR',
            payload: err
        })
    })
}
