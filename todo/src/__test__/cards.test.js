import {mount} from 'enzyme';
import React from 'react';
import CardTodo from '../components/cards';
import Root from '../root';
import TodoList from '../containers/todosList';


describe('Todo Information', () => {
    let wrapped;

beforeEach(()=> {
    const initialState = {
        reducer: {
            todos: [{
                _id:'5ddb49cd2476fb0ca3e8b541',
                title: 'todo test',
                status: 'urgent',
                description: 'todo test with jest',
                due_date: '2019-11-27',
                image: 'http://res.cloudinary.com/dpnjbs730/image/upload/v1574652564/ryglzhwl8...'
            }],
            detail: {
                _id:'5ddb49cd2476fb0ca3e8b541',
                title: 'todo test',
                status: 'urgent',
                description: 'todo test with jest',
                due_date: '2019-11-27',
                image: 'http://res.cloudinary.com/dpnjbs730/image/upload/v1574652564/ryglzhwl8...'
            }

           
        }
       
    }

    wrapped = mount(
        <Root initialState={initialState}>
            <TodoList >
                <CardTodo />
            </TodoList>
        </Root>
    );
})

    it('has Card Component', () => {

    expect(wrapped.find('Card').length).toEqual(1)

    })

    it('shows title properly', () => {
        
        expect(wrapped.find(CardTodo).props('title').title).toBe('todo test')
       
    })

    it('shows due date properly', () => {

        expect(wrapped.find(CardTodo).props('due_date').due_date).toBe('2019-11-27')
        
    })
})