const dummyMessageChat = {
    type : "chat",
    username: "dummy_0_test",
    text: "test"
}

const dummyMessageTransaction = {
    type : "transaction",
    username: "dummy_0_test",
    text: "test",
    otherUser: "dummy_1_test"
}

const dummyMessageToBankTransaction = {
    type : "toBankTransaction",
    username: "dummy_0_test",
    text: "test"
}

const dummyWelcomeMessage = {
    type : "message",
    username: "BOT",
    text: "test"
}

const dummyUserStatusJoinedGame = {
    type : "userStatus",
    username: "dummy_0_test",
    text: "Joined the game"
}

const dummyUserStatusLeftGame = {
    type : "userStatus",
    username: "dummy_0_test",
    text: "Left the game"
}

const dummyMessageFromBankTransaction = {
    type : "fromBankTransaction",
    username: "dummy_0_test",
    text: "test"
}

const dummyUser = {
    _id: "dummy_0_test",
        username: "test",
        password: "testesttesttesttest",
        timeCreated: "2020-09-21T09:00:39.055Z",
        __v: 0
}

const dummyOtherUser = {
    _id: "dummy_1_test",
        username: "test2",
        password: "testesttesttesttest",
        timeCreated: "2020-09-21T09:00:39.055Z",
        __v: 0
}
const dummyUsersInGame = {
    dummyUser, dummyOtherUser
};
const dummyGame = {
    _id: "dummy_0_game_test",
    timeCreated: "September 21, 2020 1:09 PM",
    password: "test",
    createdBy: "dummy_0",
    amount: 0,
    name: "testtest",
    __v: 0
}


const dummyMessage = "test_error";

const dataUserSuccess = {
    success : true,
    userData : dummyUser
}

const dataGameSuccess = {
    success : true,
    gameData : dummyGame
}

const dataUserError = {
    success : false,
    message : dummyMessage
}

const dataGameError = {
    success : false,
    message : dummyMessage
}

const dataFindGame = {
    success : true,
    games : [dummyGame, dummyGame, dummyGame]
}

const dataFindGameEmpty = {
    success : false,
    message : dummyMessage
}

const dataDeleteUser = {
    success : true,
    userData : dummyUser
}

const dataDeleteUserError = {
    success : false,
    message : dummyMessage
}

const fetchLoginData = jest.fn(() => {
    return Promise.resolve(dataUserSuccess);
});

const fetchLoginDataError = jest.fn(() => {
    return Promise.resolve(dataUserError);
});

const fetchRegisterData = jest.fn(() => {
    return Promise.resolve(dataUserSuccess);
});

const fetchRegisterDataError = jest.fn(() => {
    return Promise.resolve(dataUserError);
});

const fetchCreateGameData = jest.fn(() => {
    return Promise.resolve(dataGameSuccess);
});

const fetchCreateGameDataError = jest.fn(() => {
    return Promise.resolve(dataGameError);
});

const fetchJoinGameData = jest.fn(() => {
    return Promise.resolve(dataGameSuccess);
});

const fetchJoinGameDataError = jest.fn(() => {
    return Promise.resolve(dataGameError);
});

const fetchFindGameData = jest.fn(() => {
    return Promise.resolve(dataFindGame);
});

const fetchFindGameDataEmpty = jest.fn(() => {
    return Promise.resolve(dataFindGameEmpty);
});

const fetchDeleteUserData = jest.fn(() => {
    return Promise.resolve(dataDeleteUser);
});

const fetchDeleteUserDataError = jest.fn(() => {
    return Promise.resolve(dataDeleteUserError);
});


export {
    fetchLoginData, 
    fetchLoginDataError, 
    fetchRegisterData, 
    fetchRegisterDataError, 
    fetchCreateGameData, 
    fetchCreateGameDataError,
    fetchJoinGameData,
    fetchJoinGameDataError,
    fetchFindGameData,
    fetchFindGameDataEmpty,
    fetchDeleteUserData,
    fetchDeleteUserDataError,
    dummyUsersInGame,
    dummyMessageChat,
    dummyMessageTransaction,
    dummyMessageToBankTransaction,
    dummyMessageFromBankTransaction,
    dummyWelcomeMessage,
    dummyUserStatusJoinedGame,
    dummyUserStatusLeftGame
};