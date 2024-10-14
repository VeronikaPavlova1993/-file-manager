import { stat } from 'fs/promises';

export const isFile = async (path) => {
 try {
  const stats = await stat(path);
  return stats.isFile();
 } catch {
  return false;
 }
};
