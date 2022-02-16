
const registrar = (req, res) => {
  
  const {email, password} = req.body;
  console.log(email);
  console.log(password);

  res.send({msg: 'Registrando usuario...'});
};

const perfil =  (req, res) => {
  res.send( {msg : 'mostrando perfil'});
}

export {
  registrar,
  perfil
};
