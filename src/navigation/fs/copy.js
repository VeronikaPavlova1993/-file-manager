import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import { pipeline } from 'stream/promises';
import { cmdParse } from '../../utils/cmdParse';



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
