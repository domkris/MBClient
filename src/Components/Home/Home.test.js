import React from 'react';
import Home from './Home';

import {shallow} from 'enzyme';
import { fetchCreateGameData, fetchCreateGameDataError, fetchJoinGameData, 
    fetchJoinGameDataError, fetchFindGameData, fetchFindGameDataEmpty, fetchDeleteUserData, fetchDeleteUserDataError} from '../../__mocks__/utils';



describe('Home functions', () => {

    test('GameData properties on create game', () => {
        return fetchCreateGameData().then(data => {
            expect(data).toHaveProperty('success', true);
            expect(data).toHaveProperty('gameData');
            expect(data).not.toHaveProperty('message');
          });
    })

    test('GameData properties on create game error', () => {
        return fetchCreateGameDataError().then(data => {
            expect(data).toHaveProperty('success', false);
            expect(data).not.toHaveProperty('gameData');
            expect(data).toHaveProperty('message');
          });
    })

    test('GameData properties on join game', () => {
        return fetchJoinGameData().then(data => {
            expect(data).toHaveProperty('success', true);
            expect(data).toHaveProperty('gameData');
            expect(data).not.toHaveProperty('message');
          });
    })

    test('GameData properties on join game error', () => {
        return fetchJoinGameDataError().then(data => {
            expect(data).toHaveProperty('success', false);
            expect(data).not.toHaveProperty('gameData');
            expect(data).toHaveProperty('message');
          });
    })

    test('GameData properties on find game ', () => {
        return fetchFindGameData().then(data => {
            expect(data).toHaveProperty('success', true);
            expect(data).toHaveProperty('games');
            expect(data).not.toHaveProperty('message');
          });
    })

    test('GameData properties on find game empty', () => {
        return fetchFindGameDataEmpty().then(data => {
            expect(data).toHaveProperty('success', false);
            expect(data).not.toHaveProperty('games');
            expect(data).toHaveProperty('message');
          });
    })

    test('User delete ', () => {
        return fetchDeleteUserData().then(data => {
            expect(data).toHaveProperty('success', true);
            expect(data).toHaveProperty('userData');
            expect(data).not.toHaveProperty('message');
          });
    })

    test('User delete error', () => {
        return fetchDeleteUserDataError().then(data => {
            expect(data).toHaveProperty('success', false);
            expect(data).not.toHaveProperty('userData');
            expect(data).toHaveProperty('message');
          });
    })
});