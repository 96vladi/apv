import mongoose from 'mongoose';

const veterinarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true
  },
  password: {
    type: String,
    require: true
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
    trim: true
  },
  wem: {
    type: null,
    default: null
  },
  token: {
    type: String
  },
  confirmed: {
    type: Boolean,
    default: false
  }
});

const Veterinario = mongoose.model("Veterinario", veterinarioSchema);

export default Veterinario;
