import { stat } from 'fs/promises';

const isDir = async (path) => {
 try {
  const stats = await stat(path);
  return stats.isDirectory();
 } catch {
  return false;
 }
};

export default isDir;
