const generarId = () => {
  return Date.now().toString(32) + Math.random().toString(35).substring(2);
}
export default generarId;
