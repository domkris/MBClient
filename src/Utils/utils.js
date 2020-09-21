import {ServerUrl} from '../Services/ServerUrl';

const fetchLoginData = async (data) => {
    try {
        const response = await fetch(ServerUrl + '/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        return responseData;
    }
    catch (error) {
        return error;
    }
}

const fetchRegisterData = async (data) => {
    try{
        const response = await fetch(ServerUrl + '/users/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        return responseData;
    }
    catch(error){
        return error;
    }
}

const fetchJoinGameData = async (data) => {
    try {
        const response = await fetch(ServerUrl +  "/games/joinGame", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        return responseData;

    }catch(error){
        return error;
    }
}

const fetchCreateGameData = async (data) => {
    try {
        const response = await fetch(ServerUrl +  "/games", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        return responseData;

    }catch(error){
        return error;
    }
}

const fetchDeleteGameData = async(gameId) => {
    try{
        const response = await fetch(ServerUrl +  "/games/" + gameId, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            }
        });
        const responseData = await response.json();
        return responseData;
    }
    catch(error){
        return error;
    }
}

const fetchFindGameData = async(userId) => {
    try{
        const response = await fetch(ServerUrl +  "/games/" + userId, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            }
        });
        const responseData = await response.json();
        return responseData;
    }
    catch(error){
        return error;
    }
}

export {
    fetchLoginData, 
    fetchRegisterData, 
    fetchJoinGameData, 
    fetchCreateGameData,
    fetchDeleteGameData,
    fetchFindGameData
}; 
