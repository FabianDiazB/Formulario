import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {Table, Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt,faDatabase } from '@fortawesome/free-solid-svg-icons';




function App(){
  const baseUrl="https://localhost:44362/api/usuarios";
  const [data,setData]=useState([]);
  const[modaleditar,setmodaleditar]=useState(false);
  const[modalinsertar,setmodalinsertar]=useState(false);
  const[modaleliminar,setmodaleliminar]=useState(false);
  const[usuarioSeleccionado,setUsuarioSeleccionado]=useState({
    id: '',
    nombre: '',
    correo: '',
    telefono:''
  })

    const handleChange=e=>{
      const {name, value}=e.target;
      setUsuarioSeleccionado({
        ...usuarioSeleccionado,
        [name]: value
      });
      console.log(usuarioSeleccionado);
      }

  
  const abrircerrarmodalinsertar=()=>{
    setmodalinsertar(!modalinsertar);
  }

    const abrircerrarmodaleditar=()=>{
      setmodaleditar(!modaleditar);
    }

    const abrircerrarmodaleliminar=()=>{
      setmodaleliminar(!modaleliminar);
    }

    const peticionGet=async()=>{
      await axios.get(baseUrl)
      .then(response=>{
        setData(response.data);
      }).catch(error=>{
        console.log(error);
      })
    }

    const peticionPost=async()=>{
      delete usuarioSeleccionado.id;
      usuarioSeleccionado.telefono=parseInt(usuarioSeleccionado.telefono);
      await axios.post(baseUrl, usuarioSeleccionado)
      .then(response=>{
        setData(data.concat(response.data));
        abrircerrarmodalinsertar();
      }).catch(error=>{
        console.log(error);
      })
    }

      const peticionPut=async()=>{
        usuarioSeleccionado.telefono=parseInt(usuarioSeleccionado.telefono);
        await axios.put(baseUrl+"/"+usuarioSeleccionado.id, usuarioSeleccionado)
        .then(response=>{
          var respuesta=response.data;
          var dataAuxiliar=data;
          dataAuxiliar.map(usuario=>{
            if(usuario.id===usuarioSeleccionado.id){
              usuario.nombre=respuesta.nombre;
              usuario.correo=respuesta.correo;
              usuario.telefono=respuesta.telefono;
            }
          });
          abrircerrarmodaleditar();
        }).catch(error=>{
          console.log(error);
        })  
      } 

      const peticionDelete=async()=>{
        await axios.delete(baseUrl+"/"+usuarioSeleccionado.id)
        .then(response=>{
          setData(data.filter(usuario=>usuario.id!==response.data));
          abrircerrarmodaleliminar();
        }).catch(error=>{
          console.log(error);
          })
      }
      
      const seleccionarUsuario=(usuario, caso)=>{
        setUsuarioSeleccionado(usuario);
        (caso==="Editar")?
        abrircerrarmodaleditar(): abrircerrarmodaleliminar();
      }

        useEffect(()=>{
          peticionGet();
        },[])

        return(
        <div className="App">
          
        <button onClick={()=>abrircerrarmodalinsertar()} className="btn btn-primary"><FontAwesomeIcon icon={faDatabase}/>Agregar Usuario</button>

        <Table >
          <thead>
        <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Correo</th>
        <th>Telefono</th>
        <th>Acciones</th>
        </tr>
            </thead>
          <tbody>
        {data.map(usuario=>(
          <tr key={usuario.id}>
            <td>{usuario.id} </td>
            <td>{usuario.nombre} </td>
            <td>{usuario.correo} </td>
            <td>{usuario.telefono} </td>
        
          <td>
            <Button className="btn btn-success" onClick={()=>seleccionarUsuario(usuario, "Editar")}><FontAwesomeIcon icon={faEdit}/>Modificar</Button>{"    "}
            <Button className="btn btn-danger" onClick={()=>seleccionarUsuario(usuario, "Eliminar")}><FontAwesomeIcon icon={faTrashAlt}/>Eliminar</Button>
          </td>
          </tr>

        ))}
          </tbody>

        </Table>
            <Modal isOpen={modalinsertar}>
          <ModalHeader>Agregue Nuevo Usuario</ModalHeader>
          <ModalBody>
          <div className="form-group">
          <label>Nombre:</label>
          
          <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
          
          <label>Correo:</label>
          
          <input type="text" className="form-control" name="correo" onChange={handleChange}/>
          
          <label>Telefono:</label>
          
          <input type="number" className="form-control" name="telefono" onChange={handleChange}/>
          
          </div>
          </ModalBody>
          <ModalFooter>
          <Button className="btn btn-success" onClick={()=>peticionPost()}>Agregar</Button>{"  "}
          <Button className="btn btn-danger" onClick={()=>abrircerrarmodalinsertar()}>Cancelar</Button>
          </ModalFooter>
            </Modal>

          <Modal is isOpen={modaleditar}>
            <ModalHeader>Modificar datos</ModalHeader>
            <ModalBody>
            <div className="form-group">
            <label>ID:</label>
            
          <input type="text" className="form-control" readOnly value={usuarioSeleccionado && usuarioSeleccionado.id}/>
          
          <label>Nombre:</label>
          
          <input type="text" className="form-control" name="nombre" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.nombre} />
          
          <label>Correo:</label>
         
          <input type="text" className="form-control" name="correo" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.correo} />
          
          <label>Telefono:</label>
          
          <input type="number" className="form-control" name="telefono" onChange={handleChange} value ={usuarioSeleccionado && usuarioSeleccionado.telefono} />
         
          </div>
            </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" onClick={()=>peticionPut()}>Modificar</Button>
            <Button className="btn btn-danger" onClick={()=>abrircerrarmodaleditar()}>Cancelar</Button>
          </ModalFooter>
          </Modal>

          <Modal isOpen={modaleliminar}>
          <ModalBody>¿Deseas eliminar al usuario {usuarioSeleccionado && usuarioSeleccionado.nombre} ?
           </ModalBody>
           <ModalFooter>
             <Button className="btn btn-danger" onClick={()=>peticionDelete()}>Aceptar</Button>
             <Button className="btn btn-primary" onClick={()=>abrircerrarmodaleliminar()}>Cancelar</Button>
           </ModalFooter>
             </Modal>
             
              </div>
     );
   }
        export default App;
