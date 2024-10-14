import { createReadStream, createWriteStream } from 'fs';
import { rm } from 'fs/promises';
import { resolve } from 'path';
import { cwd } from 'process';
import { pipeline } from 'stream/promises';
import { cmdParse } from '../../utils/cmdParse.js';

const move = async (line) => {
 const [_, ...rest] = cmdParse(line);
 if (rest.length !== 2) throw new Error('Error');
 const filePath = rest[0];
 const dest = rest[1];
 const fileToPath = resolve(cwd(), filePath);
 const destToPath = resolve(cwd(), dest, filePath);

 const isFileExist = await isFiles(fileToPath);
 if (!isFileExist) throw new Error("File doesn't exist");

 const rs = createReadStream(fileToPath);
 const ws = createWriteStream(destToPath);
 await pipeline(rs, ws);
 await rm(fileToPath);
};

export default move;
