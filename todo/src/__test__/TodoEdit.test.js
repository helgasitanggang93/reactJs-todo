import {mount} from 'enzyme';
import React from 'react';
import TodoEdit from '../components/todoEdit';
import Root from '../root';



describe('Form Edit testing', () => {
    let wrapped;

beforeEach(()=> {
    const initialState = {
        reducer: {
            todos: [{
                _id:'5ddb49cd2476fb0ca3e8b541',
                title: 'todo test',
                description: 'todo test with jest',
                due_date: '2019-11-27',
                image: 'http://res.cloudinary.com/dpnjbs730/image/upload/v1574652564/ryglzhwl8...'
            },{
                _id:'5ddb49cd2476fb0ca3e8b541',
                title: 'todo development',
                description: 'todo react',
                due_date: '2019-11-27',
                image: 'http://res.cloudinary.com/dpnjbs730/image/upload/v1574652564/ryglzhwl8...'
            }],
            detail: {
                _id:'5ddb49cd2476fb0ca3e8b541',
                title: 'todo test',
                description: 'todo test with jest',
                due_date: '2019-11-27',
                image: 'http://res.cloudinary.com/dpnjbs730/image/upload/v1574652564/ryglzhwl8...'
            }

           
        }
       
    }

    wrapped = mount(
        <Root initialState={initialState}>
            <TodoEdit />
        </Root>
    );
})

    it('has FormTodo Component', () => {
    expect(wrapped.find('FormTodo').length).toEqual(1)
   
    })
    it('has Button Submit', () => {
        expect(wrapped.find('Button').length).toEqual(1)
       
        })

})