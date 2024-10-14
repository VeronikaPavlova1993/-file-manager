import { existsSync } from "fs";
import { unlink } from "fs/promises";
import { rm } from "fs/promises";
import { cmdParse } from "../../utils/cmdParse.js";

const remove = async (line) => {
  const [_, ...rest] = cmdParse(line);
  if (rest.length > 1) throw new Error('Error');
  const filePath = rest[0];
  const pathToFile = resolve(cwd(), filePath);
  const isFileExist = await isFile(pathToFile);
  if (!isFileExist) throw new Error("Invalid file path");
  await rm(pathToFile);
  try {
    if (!existsSync(filePath)) throw new Error("FS operation failed");
    await unlink(filePath);
  } catch (err) {
    console.log("Operation failed");
  }
};
export default remove;
