import { existsSync } from 'fs';
import { readdir } from 'node:fs/promises';
import { homedir } from 'os';

const cd = (path, line) => {
 const pathDir = line.split(' ')[1] ?? '';
 const cdDir = path.resolve(path, pathDir);

 if (existsSync(cdDir)) {
  return cdDir;
 }
 console.log("Operation failed");
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
  console.log("Operation failed");
 }
};

const state = {
 currentDir: homedir(),
};

export const commandController = async (line) => {
 try {
  switch (line.trim().split(' ')[0]) {
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
   case '.exit':
    rl.close();
    break;
   default:
    console.log("Invalid input");
    break;
  }
 } catch (err) {
  console.log(err);
  console.error("Invalid input");
 }
};
