import React from 'react'; 
import logo from './logo.svg'; 
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter,} from 'reactstrap';
import { Tab } from 'bootstrap';



const data = [
{id: 1, nombre: 'Usuario', correo: 'prueba', telefono: '123'},


];

class App extends React.Component {
  state= {
    data: data, 
form:{
  id:'',
   nombre:'',
    correo:'',
     telefono:'' 
},
  modalInsertar: false,
  modaleditar: false,
  };

handleChange =e=>{
  this.setState({
    form:{
      ...this.state.form, 
      [e.target.name]: 
      e.target.value,
    }

  });
}

mostrarmodalin=()=>{
  this.setState({modalInsertar: true});
}

 ocultarmodalin=()=>{
   this.setState({modalInsertar: false});
 }

 mostrarmodaleditar=(registro)=>{
  this.setState({modaleditar: true, form: registro});
}

 ocultarmodaleditar=()=>{
   this.setState({modaleditar: false});

  }

 insertar=()=>{
   var nuevovalor={...this.state.form};
   nuevovalor.id=this.state.data.length+1;
   var lista=this.state.data;
   lista.push(nuevovalor);
   this.setState({data: lista, modalInsertar: false});

}

editar=(dato)=>{
var contador=0;
var lista=this.state.data;
lista.map((registro)=>{

  if(dato.id==registro.id){
    lista[contador].nombre=dato.nombre;
    lista[contador].correo=dato.correo;
    lista[contador].telefono=dato.telefono;
  }
  contador++;
});
this.setState({data: lista, modaleditar:false});

}

eliminar=(dato)=>{
  var opcion=window.confirm ("Estas seguro de eliminar al usuario  " + dato.id);
  if(opcion){
    var contador=0;
    var lista = this.state.data;
    lista.map((registro)=>{
      if(registro.id==dato.id){
        lista.splice(contador, 1);
      }
      contador++;

    })
    this.setState({data: lista});
  }
}

  render() {
    return(
      <>
      <Container>
    <br />
    <Button color="primary" onClick={()=>this.mostrarmodalin()}>Nuevo Usuario</Button>
<br /> 
<br /> 

<Table>
<thead><tr><th>Id</th>
<th>nombre</th>
<th>correo</th>
<th>telefono</th>
<th>accion</th></tr></thead>
<tbody>
      {this.state.data.map((elemento)=>(
          <tr>
            <td>{elemento.id}</td>
            <td>{elemento.nombre}</td>
            <td>{elemento.correo}</td>
            <td>{elemento.telefono}</td>
            <td><Button color="success" onClick={()=>this.mostrarmodaleditar(elemento)}>Modificar</Button>{"   "}
            <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button> </td>
            </tr>

      ))}


</tbody>


</Table>
</Container >
  
<Modal isOpen={this.state.modalInsertar}>
        <ModalHeader>
        <div><h3>Inserte Usuario</h3></div>
        </ModalHeader>
        
      <ModalBody>
        <FormGroup>
          <label>
            Id:
          </label>

        <input
        className="form-control"
        readOnly
        type="text" value={this.state.data.length+1}
        />

        </FormGroup>
<FormGroup>
          <label>
            nombre:
          </label>

        <input
        className="form-control"
        name="nombre"
        type="text" onChange={this.handleChange}
        />
</FormGroup>

<FormGroup>

<label>
            correo:
          </label>

        <input
        className="form-control"
        name="correo"
        type="text" onChange={this.handleChange}
        />

</FormGroup>

        <FormGroup>
        <label>
            telefono:
          </label>

        <input
        className="form-control"
        name="telefono"
        type="number" onChange={this.handleChange}
        />

        </FormGroup>


      </ModalBody>

      <ModalFooter>
        <Button color="success"onClick={()=>this.insertar()}>Finalizar</Button>
        <Button color="danger" onClick={()=>this.ocultarmodalin()}>Cancelar</Button> 

      </ModalFooter>
</Modal>

<Modal isOpen={this.state.modaleditar}>
<ModalHeader>
  <div>
    <h3>Editar Usuario</h3>
  </div>
</ModalHeader>

<ModalBody>

<FormGroup>
  <label>id:</label>
  <input className="form-control" readOnly type="text" value={this.state.form.id} />
</FormGroup>

<FormGroup>
<label>nombre:</label>
  <input className="form-control" name="nombre" type="text" onChange={this.handleChange}value={this.state.form.nombre} />
</FormGroup>

<FormGroup>
<label>correo:</label>
  <input className="form-control" name="correo" type="text" onChange={this.handleChange}value={this.state.form.correo} />
</FormGroup>

<FormGroup>
<label>telefono:</label>
  <input className="form-control" name="telefono" type="numb" onChange={this.handleChange} value={this.state.form.telefono} />
</FormGroup>

</ModalBody>

<ModalFooter>
        <Button color="success" onClick={()=>this.editar(this.state.form)} >Editar</Button>
        <Button color="danger"onClick={()=>this.ocultarmodaleditar()} >Cancelar</Button> 


</ModalFooter>

</Modal>


 </> );
  }

}
export default App;

