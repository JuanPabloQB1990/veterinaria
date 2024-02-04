import { useEffect, useState } from 'react';
import './App.css'
import Formulario from './components/Formulario'
import Header from './components/Header'
import ListadoPacientes from './components/ListadoPacientes'
import { Bounce, ToastContainer, toast } from 'react-toastify';

function App() {
  
  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) || []);
  const [paciente, setPaciente] = useState({});
  
  useEffect(() => {
    console.log("cambio de pacientes o render");
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes]);
  
  const eliminarPaciente = (id) => {
    
    const pacientesActuales = pacientes.filter(paciente => paciente.id !== id)
    setPacientes(pacientesActuales)
    toast.success('Paciente ha sido eliminado', {
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

  return (
    <div className='container mx-auto mt-20'>
      <Header/>
      <ToastContainer />
      <div className='md:flex mt-12'>
        <Formulario setPacientes={setPacientes} pacientes={pacientes} paciente={paciente} setPaciente={setPaciente}/>
        <ListadoPacientes pacientes={pacientes} setPaciente={setPaciente} eliminarPaciente={eliminarPaciente}/>

      </div>
    </div>
  )
}

export default App
