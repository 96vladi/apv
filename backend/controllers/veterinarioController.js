import Veterinario from "../models/Veterinario.js";
import jwt from 'jsonwebtoken';
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";

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
  const { veterinario } = req;
  res.json( {perfil : veterinario});
}

const confirmar = async (req, res) => {
  
  const { token } = req.params;
  const usuarioConfirmar = await Veterinario.findOne({token:token});
  if(!usuarioConfirmar){
    const error = new Error('Token no valido');
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmed = true;
    await usuarioConfirmar.save();
    res.json( {msg: 'Usuario confirmado correctamente' });
  } catch (error) {
    console.log(error)
  } 

};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Veterinario.findOne({email});
  if(!usuario){
    const error = new Error('El usuario no existe');
    return res.status(404).json({ msg: error.message });
  }

  //Confirmar si el usuario esta autenticado
  if(!usuario.confirmed){
    const error = new Error('Tu cuenta no ha sido confirmada');
    return res.status(403).json({msg: error.message});
  }

  //Autenticar al usuario
  //Revisar el password
  if(await usuario.comprobarPassword(password)){
    // console.log('password correcto');
    console.log(usuario)
    res.json({token: generarJWT(usuario.id)})
  } else {
    const error = new Error('El password es incorrecto');
    return res.status(403).json({msg: error.message});
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const existeVeterinario = await Veterinario.findOne({email});
  if(!existeVeterinario){
    const error = new Error('El usuario no existe');
    return res.status(400).json({msg: error.message});
  }

  try {
    existeVeterinario.token = generarId();
    await existeVeterinario.save();
    res.json({msg: 'Emos enviado un email con las instrucciones'});
  } catch (error) {
    
  }
};

const comprobarToken = (req, res) => {

};

const nuevoPassword = (req, res) => {

};

export {
  registrar,
  perfil,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword
};
