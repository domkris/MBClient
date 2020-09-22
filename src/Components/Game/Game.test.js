
import MockedSocket from 'socket.io-mock';

describe('Game functions', () => {

    test("Socket communication", () => {
        let socket = new MockedSocket();
        socket.on('message', (data) => {
            expect(data).toBe("Hello World");
        });
        socket.socketClient.emit('message', 'Hello World');
    });
});
