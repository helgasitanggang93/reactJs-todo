import {mount} from 'enzyme';
import React from 'react';
import CardDetail from '../components/cards';
import Root from '../root';
import TodoList from '../containers/todosList';


describe('Todo Details Testing', () => {
    let wrapped;

beforeEach(()=> {
    const initialState = {
        reducer: {
            isDetail:true,
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
                <CardDetail />
            </TodoList>
        </Root>
    );
})

    it('has Card Component', () => {

    expect(wrapped.find('.detail-todo').length).toEqual(1)

    })

    it('shows title properly', () => {

        expect(wrapped.find('#title-detail-todo').props('title').children).toBe('todo test')

    })

    it('shows image properly', () => {

        expect(wrapped.find('#image-detail-todo').props('image').children.props.src).toBe('http://res.cloudinary.com/dpnjbs730/image/upload/v1574652564/ryglzhwl8...')
        expect(wrapped.find('#image-detail-todo').props('image').children.props.style.maxWidth).toBe('300px')
        expect(wrapped.find('#image-detail-todo').props('image').children.props.style.maxHeight).toBe('200px')

    })

    it('shows due_date properly', () => {
      expect(wrapped.find('#duedate-detail-todo').props('due_date').children[1]).toBe('Wed, 27 November 2019')
    })

    it('shows description properly', () => {
        expect(wrapped.find('#description-detail-todo').props('description').children).toBe('todo test with jest')
    })

    it('show button done properly', ()=>{
        expect(wrapped.find('#buttondone-detail-todo').props('Done').children.props.type).toBe('button')
    })

    it('show button delete properly', () => {
       
        expect(wrapped.find('#buttondelete-detail-todo').props('delete').children.props.type).toBe('button')
    })

    it('show button close properly', () => {

        expect(wrapped.find('#buttondelete-detail-todo').props('delete').children.props.type).toBe('button')
    })

})