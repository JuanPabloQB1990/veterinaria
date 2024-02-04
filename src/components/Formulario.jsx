import React, { useEffect, useState } from "react";
import Error from "./Error";
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Formulario = ({ setPacientes, pacientes, paciente, setPaciente }) => {
  const [formulario, setFormulario] = useState({
    mascota: "",
    nombre: "",
    email: "",
    alta: "",
    sintomas: "",
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    if (paciente) {
        setFormulario(paciente)
    } else {
        setFormulario({})
    }
  }, [paciente]);

  const generarId = () => {
    
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)

    return random + fecha;
  }
  
  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { mascota, nombre, email, alta, sintomas } = formulario;

    if ([mascota, nombre, email, alta, sintomas].includes("")) {
      console.log("hay un campo vacio");
      setError(true);
      return;
    }

    if (paciente.id) {
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? formulario : pacienteState)
      setPacientes(pacientesActualizados);
      localStorage.setItem('pacientes', JSON.stringify(pacientesActualizados));
      setPaciente({})
      toast.success('Paciente editado satisfactoriamente', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }else{
      setPacientes([...pacientes, {...formulario, id: generarId()}]);
      toast.success('Paciente guardado satisfactoriamente', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }

    setFormulario({
      mascota: "",
      nombre: "",
      email: "",
      alta: "",
      sintomas: "",
    });
    setError(false);
  };

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h1 className="font-black text-3xl text-center">
        Seguimiento Pacientes{" "}
      </h1>
      <p className="text-xl mt-5 text-center mb-10">
        Añade Pacientes y{" "}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 m-3"
      >
        {error && <Error ><p>Todos los campos son obligatorios</p></Error>}
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Mascota
          </label>
          <input
            onChange={handleChange}
            value={formulario.mascota}
            id="mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            name="mascota"
            placeholder="Nombre de la Mascota"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Mascota
          </label>
          <input
            onChange={handleChange}
            value={formulario.nombre}
            id="nombre"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            name="nombre"
            placeholder="Nombre del Propietario"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >
            Email Propietario
          </label>
          <input
            onChange={handleChange}
            value={formulario.email}
            id="email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="email"
            name="email"
            placeholder="Email Contacto Propietario"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Alta
          </label>
          <input
            onChange={handleChange}
            value={formulario.alta}
            id="alta"
            className="border-2 w-full p-2 mt-2  rounded-md"
            type="date"
            name="alta"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            onChange={handleChange}
            value={formulario.sintomas}
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            name="sintomas"
            rows=""
            cols=""
            placeholder="Describe los Sintomas"
          ></textarea>
        </div>
        <input
          type="submit"
          value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
        />
      </form>
    </div>
  );
};

export default Formulario;
