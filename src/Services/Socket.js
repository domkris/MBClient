import io from 'socket.io-client';
import {ServerUrl} from '../Services/ServerUrl';

export const Socket = io(ServerUrl); 