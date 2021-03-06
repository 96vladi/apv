import Veterinario from "../models/Veterinario.js";
import jwt from 'jsonwebtoken';
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
  const { email, nombre } = req.body;
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

    //Enviar email
    emailRegistro({
      email,
      nombre,
      token: veterinarioGuardado.token
    });

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
    // console.log(usuario)
    // usuario.token = generarJWT(usuario.id);
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.phone,
      web: usuario.web,
      token: generarJWT(usuario.id),
    })
  } else {
    const error = new Error('El password es incorrecto');
    return res.status(403).json({msg: error.message});
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;   //informacion del formulario
  const existeVeterinario = await Veterinario.findOne({email});
  if(!existeVeterinario){
    const error = new Error('El usuario no existe');
    return res.status(400).json({msg: error.message});
  }

  try {
    existeVeterinario.token = generarId();
    await existeVeterinario.save();

    // Envias email con instrucciones 
    emailOlvidePassword({
      email,
      nombre: existeVeterinario.nombre,
      token: existeVeterinario.token
    });

    res.json({msg: 'Hemos enviado un email con las instrucciones'});
  } catch (error) {
    
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;  //informacion de la URL
  const tokenValido = await Veterinario.findOne({token});
  if(tokenValido){
    //EL token es valido
    res.json({msg: 'Token valido y el usuario existe'});
  } else {
    const error = new Error('Token no valido');
    return res.status(400).json({msg: error.message});
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const veterinario = await Veterinario.findOne({token});
  if(!veterinario){
    const error = new Error('Hubo un error');
    return res.status(400).json(({msg: error.message}));
  }

  try {
    veterinario.token = null;
    veterinario.password = password;
    console.log(veterinario);
    await veterinario.save();
    res.json({msg: 'Password modificado correctamente'});
  } catch (error) {
    console.log(error)
  }
};

const actualizarPerfil = async (req, res) => {
  const veterinario = await Veterinario.findById(req.params.id);
  if(!veterinario){
    const error = new Error('Hubo un error');
    return res.status(400).json({msg: error.message})
  }

  const {email} = req.body;
  if(veterinario.email !== req.body.email){
    const existeEmail = await Veterinario.findOne({email});
    if(existeEmail){
      const error = new Error('Ese email ya esta en uso');
      return res.status(400).json({msg: error.message})
    }
  }

  try {
    
    veterinario.nombre = req.body.nombre;
    veterinario.email = req.body.email;
    veterinario.web = req.body.web;
    veterinario.phone = req.body.telefono;

    const veterinarioActualizado = await veterinario.save();
    res.json(veterinarioActualizado);
  } catch (error) {
    console.log(error)
  }
};

const actualizarPassword = async (req, res) => {
  console.log(req.veterinario)
  console.log(req.body)
  //Leer los datos
  const { id } = req.veterinario;
  const { pwd_actual, pwd_nuevo } = req.body;
  //Comprobar existencia
  const veterinario = await Veterinario.findById(id);
  if(!veterinario){
    const error = new Error('Hubo un error');
    return res.status(400).json({msg: error.message})
  }
  //Comprobar password
  if(await veterinario.comprobarPassword(pwd_actual)){
    //Almacenar nuevo psw
    veterinario.password = pwd_nuevo;
    await veterinario.save();
    res.json({msg: 'Password almacenado correctamente'})
  } else {
    const error = new Error('El password actual es incorrecto');
    return res.status(400).json({msg: error.message})
  }
  //Almacenar el nuevo password

};

export {
  registrar,
  perfil,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  actualizarPerfil,
  actualizarPassword
};
