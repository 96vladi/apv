import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res) => {
  const { email } = req.body;
  // prevenir si un usuario esta registrado
  const existeUsuario = await Veterinario.findOne({email : email});

  //Esto es para poder detectar usuarios ya registrados
  if(existeUsuario){
    // console.log(existeUsuario);
    const error = new Error("El usuario ya esta registrado");
    return res.status(400).json({msg:error.message});
  }

  try {
    //guardar un nuevo veterinario
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();
    res.json(veterinarioGuardado);
  } catch (error) {
    console.log(`El error es : ${error}`);
  }
  
};

const perfil =  (req, res) => {
  res.json( {msg : 'mostrando perfil'});
}

export {
  registrar,
  perfil
};



// const registrar = async (req, res) => {
//   try {
//     //guardar un nuevo veterinario
//     const veterinario = new Veterinario(req.body);
//     const veterinarioGuardado = await veterinario.save();
//     res.json({msg: 'Registrando usuario...'});
//   } catch (error) {
//     console.log(`El error es : ${error}`);
//   }
  
// };
