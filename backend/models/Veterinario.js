import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarId.js';


const veterinarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    default: null,
    trim: true,
  },
  web: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: generarId()
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

//Usamos funcion para que el this no sea global y solo para el bjeto actual
//Aqui hasheamos el password
veterinarioSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

veterinarioSchema.methods.comprobarPassword = async function(
  passwordFormulario
) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const Veterinario = mongoose.model('Veterinario', veterinarioSchema);

export default Veterinario;