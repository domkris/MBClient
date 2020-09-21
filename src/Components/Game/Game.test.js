import React from 'react';
import Game from './Game';

import {shallow} from 'enzyme';

describe('Game elements', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Game />);
    });

    test('Button Create Game text value', () => {
        expect(
            wrapper.findWhere(button => button.type == "Button" && button.contains("Create Game"))
        );
    })

    test('Button Join Game text value', () => {
        expect(
            wrapper.findWhere(button => button.type == "Button" && button.contains("Join Game"))
        );
    })
});

describe('Game functions', () => {

    test("Welcome message", () => {

    });
    // welcomeMessage
    // other player joined
    // other player left
    // transaction
    // to bank transaction
    // from bank transaction
    // chat
    // web scoket io
});
