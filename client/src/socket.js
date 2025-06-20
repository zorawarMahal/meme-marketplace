import {io} from 'socket.io-client';

const socket = io("https://meme-marketplace-backend.onrender.com");

export default socket;
