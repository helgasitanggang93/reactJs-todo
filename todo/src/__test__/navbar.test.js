import { mount } from 'enzyme';
import React from 'react';
import Navbar from '../components/navbar';
import Root from '../root';



let wrapped;

describe('Navbar Log Out GoogleSignIn testing', () => {
    beforeEach(() => {
        const initialState = {
            reducer: {
                isGoogleSignIn: true,
                isLoginRegister: false
            }

        }

        wrapped = mount(
            <Root initialState={initialState}>
                <Navbar />
            </Root>
        );
    })

    it('has LogOut Button', () => {
        expect(wrapped.find('nav').props('Log Out').children[1].props.type).toBe('button')
    })

})

describe('Navbar Logout without GoogleSignIn testing', () => {
    beforeEach(() => {
        const initialState = {
            reducer: {
                isGoogleSignIn: false,
                isLoginRegister: false
            }

        }

        wrapped = mount(
            <Root initialState={initialState}>
                <Navbar />
            </Root>
        );
    })

    it('has LogOut Button', () => {

        expect(wrapped.find('nav').props('Log Out').children[1].type).toBe('button')
    })

})


describe('Navbar Not Login testing', () => {
    beforeEach(() => {
        const initialState = {
            reducer: {
                isGoogleSignIn: false,
                isLoginRegister: true
            }

        }

        wrapped = mount(
            <Root initialState={initialState}>
                <Navbar />
            </Root>
        );
    })

    it('has not LogOut Button', () => {
       
        expect(wrapped.find('nav').length).toEqual(1)
    })

})