import { createBrotliDecompress } from 'zlib';
import { createWriteStream, createReadStream } from 'fs';
import { parse, resolve } from 'path';
import { cwd } from 'process';
import { cmdParse } from '../../utils/cmdParse.js';
import { isFile } from '../../utils/isFile.js';
import isDir from '../../utils/isDir.js';

const decompress = async (line) => {
 const [_, ...rest] = cmdParse(line);
 if (rest.length !== 2)
  throw new Error('Error');
 const filePath = rest[0];
 const dest = rest[1];
 const pathToFile = resolve(cwd(), filePath);
 const pathToDestination = resolve(cwd(), dest);
 const isFileExist = await isFile(pathToFile);
 const isDestinationExist = await isDir(pathToDestination);
 if (!isFileExist) throw new Error("File doesn't exist");
 if (!isDestinationExist)
  throw new Error('Error');
 const { name, ext } = parse(pathToFile);
 if (ext !== '.br') throw new Error('Error');
 const pathToDestinationFile = resolve(pathToDestination, name);
 const bd = createBrotliDecompress();
 const source = createReadStream(pathToFile);
 const destination = createWriteStream(pathToDestinationFile);

 source.pipe(bd).pipe(destination);
};
export default decompress;
