import mongoose from 'mongoose';

const pacienteSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
  },
  propietario: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  nombre: {
    type: Date,
    require: true,
  },
  sintomas: {
    type: String,
    require: true,
  },
  veterinario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Veterinario',
  },
}, {
  timestamps: true,
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

export default Paciente;
