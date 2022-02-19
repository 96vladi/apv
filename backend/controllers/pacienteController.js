import Paciente from "../models/Paciente.js";

const agregarPaciente = (req, res) => {
  const paciente = new Paciente(req.body);
  console.log(paciente)
};

const obtenerPaciente = (req, res) => {

};


export {
  agregarPaciente,
  obtenerPaciente
}
