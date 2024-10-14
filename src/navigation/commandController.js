import { existsSync } from 'fs';
import { readdir } from 'node:fs/promises';
import { homedir } from 'os';
import path from 'path';
import { read, create, rename, copy, move, remove } from './fs/index';
import getOs from './os/getOs';

const cd = (path, line) => {
 const pathDir = line.split(' ')[1] ?? '';
 const cdDir = path.resolve(path, pathDir);

 if (existsSync(cdDir)) {
  return cdDir;
 }
 console.log('Operation failed');
 return path;
};

const ls = async (path) => {
 try {
  const files = await readdir(path, { withFileTypes: true });
  const printFiles = files.map((item) => ({
   name: item.name,
   type: item.isDirectory() ? 'directory' : 'file',
  }));
  console.table(printFiles);
 } catch (err) {
  console.log('Operation failed');
 }
};

const state = {
 currentDir: homedir(),
};

export const commandController = async (line) => {
 const cmd = line.trim().split(' ')[0];
 try {
  switch (cmd) {
   case 'up':
    {
     const up = path.join(state.currentDir, '../');
     state.currentDir = up;
    }
    break;
   case 'ls':
    await ls(state.currentDir);
    break;
   case 'cd':
    {
     const cdDir = cd(state.currentDir, line);
     state.currentDir = cdDir;
    }
    break;
   case 'cat':
    await read(state.currentDir, line);
    break;
   case 'add':
    await create(state.currentDir, line);
    break;
   case 'rn':
    await rename(state.currentDir, line);
    break;
   case 'cp':
    await copy(state.currentDir, line);
    break;
   case 'mv':
    await move(state.currentDir, line);
    break;
   case 'rm':
    await remove(state.currentDir, line);
    break;
   case '.exit':
    rl.close();
    break;
   case 'os':
    getOs(line);
    break;
   default:
    console.log('Invalid input');
    break;
  }
 } catch (err) {
  console.log(err);
  console.error('Invalid input');
 }
};
