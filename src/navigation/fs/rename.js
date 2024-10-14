import fs from "fs/promises";
import { cmdParse } from "../../utils/cmdParse";
import isExist from "../../utils/isExit";
const rename = async (line) => {
    const [_, ...rest] = cmdParse(line);
    if (rest.length !== 2)
        throw new Error("Error");
  const oldFileName = rest[0];
  const newFileName = rest[1];;
  const pathToOldFile = resolve(cwd(), oldFileName);
    const pathToNewFile = resolve(cwd(), newFileName);
    const isExistOldFile = await isExist(pathToOldFile);
    const isExistNewFile = await isExist(pathToNewFile);
  
    if (!isExistOldFile || isExistNewFile) throw new Error("Error");
    else await fs.rename(pathToOldFile, pathToNewFile);
  };

 
export default rename;
