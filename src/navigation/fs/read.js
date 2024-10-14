import { createReadStream } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import { cmdParse } from '../../utils/cmdParse.js';
import { isFile } from '../../utils/isFile.js';
import showDir from '../../utils/showDir.js';

const read = async (line) => {
 const [_, ...rest] = cmdParse(line);
 if (rest.length > 1) throw new Error(`Error`);
 const filePath = rest[0];
 const pathToFile = resolve(cwd(), filePath);
 const isFileExist = await isFile(pathToFile);
 if (!isFileExist) throw new Error('Invalid file path');
 const readableStream = createReadStream(pathToFile);
 readableStream.on('data', (chunk) => {
  console.log('\n' + chunk.toString());
 });
 readableStream.on('error', () => {
  console.log('Operation failed');
 });
 readableStream.on('end', () => {
  showDir();
 });
};
export default read;
