export const getUsername = () => {
 const arrUsers = process.argv
  .slice(2)
  .filter((elem) => elem.startsWith('--username='));
 return arrUsers.length > 0
  ? arrUsers[0].replace('--username=', '')
  : 'Unknown User';
};
