import axiosTodo from '../apis/api_todo'

export const itemIsLoading = (bool) => {
    return {
        type: 'ITEM_IS_LOADING',
        payload: bool
    }
}

export const isDetail = (bool) => {
    return {
        type: 'IS_DETAIL',
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
    console.log(getState().reducer.todos)
    let newArr = getState().reducer.todos.filter(element =>{
        return element.id !== id
    })
    console.log(newArr)
    axiosTodo.patch(`/todos/${id}`,{
        type: status
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

