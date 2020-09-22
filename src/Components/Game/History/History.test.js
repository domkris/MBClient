import MockedSocket from 'socket.io-mock';
import {dummyMessageChat, dummyMessageTransaction, 
    dummyMessageFromBankTransaction, dummyMessageToBankTransaction, dummyWelcomeMessage, dummyUserStatusJoinedGame, dummyUserStatusLeftGame} from '../../../__mocks__/utils';

describe('HistoryContainer message types', () => {

    let socket;
    beforeEach(() => {
        socket = new MockedSocket();
    });

    test("message type: chat", () => {
        socket.on('chat', (data) => {
            expect(data).toHaveProperty('text');
            expect(data).toHaveProperty('type',"chat");
            expect(data).toHaveProperty('username');
        });
        socket.socketClient.emit('chat', dummyMessageChat);
    });

    test("message type: transaction", () => {
        socket.on('transaction', (data) => {
            expect(data).toHaveProperty('text');
            expect(data).toHaveProperty('type',"transaction");
            expect(data).toHaveProperty('username');
            expect(data).toHaveProperty('otherUser');
        });
        socket.socketClient.emit('transaction', dummyMessageTransaction);
    });

    test("message type: userStatus, (User Joined Game)", () => {
        socket.on('gameMessage', (data) => {
            expect(data).toHaveProperty('text');
            expect(data).toHaveProperty('type',"userStatus");
            expect(data).toHaveProperty('username');
        });
        socket.socketClient.emit('gameMessage', dummyUserStatusJoinedGame);
    });

    test("message type: userStatus, (User Left Game)", () => {
        socket.on('gameMessage', (data) => {
            expect(data).toHaveProperty('text');
            expect(data).toHaveProperty('type',"userStatus");
            expect(data).toHaveProperty('username');
        });
        socket.socketClient.emit('gameMessage', dummyUserStatusLeftGame);
    });

    test("message type: toBankTransaction", () => {
        socket.on('gameMessage', (data) => {
            expect(data).toHaveProperty('text');
            expect(data).toHaveProperty('type',"toBankTransaction");
            expect(data).toHaveProperty('username');
        });
        socket.socketClient.emit('toBankTransaction', dummyMessageToBankTransaction);
    });

    test("message type: fromBankTransaction", () => {
        socket.on('fromBankTransaction', (data) => {
            expect(data).toHaveProperty('text');
            expect(data).toHaveProperty('type',"fromBankTransaction");
            expect(data).toHaveProperty('username');
        });
        socket.socketClient.emit('fromBankTransaction', dummyMessageFromBankTransaction);
    });

    test("Welcome message type: message", () => {
        socket.on('welcomeMessage', (data) => {
            expect(data).toHaveProperty('text');
            expect(data).toHaveProperty('type',"message");
            expect(data).toHaveProperty('username', "BOT");
        });
        socket.socketClient.emit('welcomeMessage', dummyWelcomeMessage);
    });
});
