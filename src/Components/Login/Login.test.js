
import React from 'react';
import Login from './Login';

import {shallow} from 'enzyme';
import { fetchLoginData, fetchLoginDataError, fetchRegisterData, fetchRegisterDataError } from '../../__mocks__/utils';

jest.mock('utils');


// describe('Login elements', () => {

//     let wrapper;

//     beforeEach(() => {
//         wrapper = shallow(<Login />);
//     });

//     test('Button login text value', () => {
//         expect(
//             wrapper.findWhere(button => button.type == "Button" && button.contains("Login"))
//         );
//     })

//     test('Button signup text value', () => {
//         expect(
//             wrapper.findWhere(button => button.type == "Button" && button.contains("Sign Up"))
//         );
//     })
// });
describe('Login functions', () => {

    test('UserData properties on login', () => {
        return fetchLoginData().then(data => {
            expect(data).toHaveProperty('success', true);
            expect(data).toHaveProperty('userData');
            expect(data).not.toHaveProperty('message');
          });
    })

    test('UserData properties on login error', () => {
        return fetchLoginDataError().then(data => {
            expect(data).toHaveProperty('success', false);
            expect(data).not.toHaveProperty('userData');
            expect(data).toHaveProperty('message');
          });
    })

    test('UserData properties on registration', () => {
        return fetchRegisterData().then(data => {
            expect(data).toHaveProperty('success', true);
            expect(data).toHaveProperty('userData');
            expect(data).not.toHaveProperty('message');
          });
    })

    test('UserData properties on registration error', () => {
        return fetchRegisterDataError().then(data => {
            expect(data).toHaveProperty('success', false);
            expect(data).not.toHaveProperty('userData');
            expect(data).toHaveProperty('message');
          });
    })
});