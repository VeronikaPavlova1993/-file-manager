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
