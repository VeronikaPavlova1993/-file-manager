import { createInterface } from 'readline';
import { getUsername } from './navigation/getUsername.js';
import { commandController } from './navigation/commandController.js';
import showDir from './utils/showDir.js';

const rl = createInterface({
 input: process.stdin,
 output: process.stdout,
 prompt: '> ',
});


const start = () => {
 const username = getUsername();
 console.log(`Welcome to the File Manager, ${username}!`);
 showDir();
 rl.prompt();
};

start();

const close = () => {
 const username = getUsername();
 console.log(`Thank you for using File Manager, ${username}, goodbye!`);
 process.exit(0);
};

rl.on('line', commandController).on('close', close);
