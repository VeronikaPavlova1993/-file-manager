import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import { pipeline } from 'stream/promises';
import { stat } from 'fs/promises';

export const cmdParse = (arg) => {
 const str = arg.replace(/'/g, '"');
 const regex = /[^\s"]+|"([^"]*)"/gi;
 let newData;
 const parsedArr = [];

 do {
  newData = regex.exec(str);
  if (newData !== null) parsedArr.push(newData[1] ? newData[1] : newData[0]);
 } while (newData !== null);

 return parsedArr;
};

const isFile = async (path) => {
 try {
  const stats = await stat(path);
  return stats.isFile();
 } catch {
  return false;
 }
};

const copy = async (arg) => {
 const [_, ...rest] = cmdParse(arg);
 if (rest.length !== 2)
  throw new Error('Error');

 const fileDir = rest[0];
 const target = rest[1];

 const fileToPath = resolve(cwd(), fileDir);
 const destToPath = resolve(cwd(), target, fileDir);

 const isFileExist = await isFile(fileToPath);
 if (!isFileExist) throw new Error('Error');

 const rs = createReadStream(fileToPath);
 const ws = createWriteStream(destToPath);
 await pipeline(rs, ws);
};

export default copy;
