import {
    isDetail,
    shwoLoading,
    isGoogleSignIn,
    formModalHandler,
    isLogin,
    isRegister,
    fetchTodoData
} from '../store/actions';
import reducer from '../store/reducers';

describe('action testing', () => {
    it('isDetail has correct type', ()=> {
        const action = isDetail()
        expect(action.type).toEqual('IS_DETAIL')
    })

    it('isDetail has correct payload', ()=> {
        const action = isDetail(true)
        expect(action.payload).toEqual(true)
    })

    it('shwoLoading has correct type', ()=> {
        const action = shwoLoading()
        expect(action.type).toEqual('IS_LOADING')
    })

    it('shwoLoading has correct payload', ()=> {
        const action = shwoLoading()
        const newState = reducer({}, action)
        expect(newState.reducer.isLoading).toEqual(true)
    })
    
    it('isGoogleSignIn has correct type', ()=> {
        const action = isGoogleSignIn()
        expect(action.type).toEqual('IS_GOOGLE_SIGN_IN')
    })

    it('isGoogleSignIn has correct payload', ()=> {
        const action = isGoogleSignIn(true)
        expect(action.payload).toEqual(true)
    })
    
    it('formModalHandler has correct type', ()=> {
        const action = formModalHandler()
        expect(action.type).toEqual('FORM_MODAL_HANDLER')
    })

    it('formModalHandler has correct payload', ()=> {
        const action = formModalHandler(true)
        expect(action.payload).toEqual(true)
    })

    it('isLogin has correct type', ()=> {
        const action = isLogin()
        expect(action.type).toEqual('IS_LOGIN')
    })

    it('isLogin has correct payload', ()=> {
        const action = isLogin(true)
        expect(action.payload).toEqual(true)
    })

    it('isRegister has correct type', ()=> {
        const action = isRegister()
        expect(action.type).toEqual('IS_REGISTER')
    })

    it('isRegister has correct payload', ()=> {
        const action = isRegister(true)
        expect(action.payload).toEqual(true)
    })

    it('fetch todos correctly', () => {
        const action = fetchTodoData()
        const newState = reducer({}, action)
        expect(newState.reducer.todos).toEqual([])
    })
})