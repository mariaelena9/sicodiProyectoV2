/* @DIRECTORIO */

//Imports
import React, { Component,useState  } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import Sidebar from "../../commons/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import style from './Tracking.css'
import '../../App.css';
import { FaUserTie } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineMore } from "react-icons/ai";
import { BsCheckSquareFill, BsSquare } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import axios from 'axios';
import Header from "../../commons/Header/Header";
import ReactDOM from "react-dom";
import Login from '../Login/LoginForm'
import Menu from '../../commons/Menu/Menu'

class Tracking extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            reload: false
        }
        
      }

    

      componentDidMount() { //Se ejecutará al momento de montar el componente
        //console.log('props')
        //console.log(this.props.data_mail.id_Correspondencia);
        this.getEmail(this.props.data_mail.id_Correspondencia);
        
    }

    

    

    getEmail = (id) => {
        axios.get(`http://localhost:3000/api/email/find/${id}`).then(Response => {
          console.log("get email")
          this.setState({ data: Response.data[0], estatus : Response.data[0].fk_estatus});
          console.log(this.state.data)
          
          //this.setState({ allData: Response.data });
         
          //console.log(Response.data[0])
          //return Response.data;
      }).catch(error => {
          console.log(error.message);
      });
    }

    changeStatus = (e) => {
        let nuevoEstatus = parseInt(e.currentTarget.id);
        let viejo_Estatus = this.state.data.fk_estatus;

        const body = {id: this.state.data.id_Correspondencia , value : nuevoEstatus};

        if(viejo_Estatus  >= nuevoEstatus){
            console.log("no se puede")
        } else {
            if((1 + viejo_Estatus)  == nuevoEstatus){
                console.log("si")
                axios.post(`http://localhost:3000/api/tracking`, body)
                .then(res => {
                    console.log(res);
                    this.state.data.fk_estatus = nuevoEstatus;
                    this.setState({reload: true});
                })
                .catch(err => { 
                    console.log('Estatus cambiado', err);
                    
                });

            } else {
                console.log("no")
               
            }
        }



        /*
        

*/
        //this.state.data.fk_estatus = 3;
        
        //console.log(this.state);
        //this.setState({reload: true});
    }

    render() {
        return (
            

            <div className="main">
               
            <div className="middle">
                

                <div className="contentTracking">

                    <div className="direction">

                        <div className='tracking'>

                            <div onClick={this.props.back} className="buttonBack">
                                <i><IoChevronBackOutline /></i>
                                <p className="TitlePage">Volver</p>
                            </div>

                            <div className='seguimiento'>
                                <div className="numOficio">
                                    { <h2>No. Oficio: {this.state.data ? this.state.data.id_Correspondencia : null}</h2>}
                                   
                                  
                                </div>
                                    
                                <div className="data">
                                    <div className="status">
                                        <div className="enviado">
                                            <div onClick={this.changeStatus} estatus={this.state.data ? this.state.data.fk_estatus : null}  id='1' id_cor={this.state.data ? this.state.data.id_Correspondencia : null}  className="img-check"> 
                                            {this.state.data && this.state.data.fk_estatus >=1 ?  <BsCheckSquareFill />  : <BsSquare />}
                                            </div>
                                            <div className="detalle-enviado">
                                                <h3>Enviado el {this.state.data ? new Date(this.state.data.fechaEmision).getUTCDate() : null} de {this.state.data ?  new Date(this.state.data.fechaEmision).toLocaleString('default', { month: 'long' }) : null} </h3>
                                                
                                                
                                                <p>Prioridad Alta</p>
                                            </div>
                                        </div>

                                        <div className="line">
                                            <div> <AiOutlineMore /> </div>
                                        </div>

                                        <div className="proceso">
                                            <div onClick={this.changeStatus} estatus={this.state.data ? this.state.data.fk_estatus : null} id='2'id_cor={this.state.data ? this.state.data.id_Correspondencia : null} className="img-check">
                                                {this.state.data ? this.state.data.fk_estatus >=2 ?  <BsCheckSquareFill />  : <BsSquare /> : null}    
                                            </div>
                                            <div className="detalle-proceso">
                                                <p>En proceso </p>
                                                {/* <p><b>{user.nombre} {user.apellido}</b></p> */}
                                            </div>
                                        </div>

                                        <div className="line">
                                            <div> <AiOutlineMore /> </div>
                                        </div>

                                        <div className="archivado">
                                            <div onClick={this.changeStatus}  estatus={this.state.data ? this.state.data.fk_estatus : null} id='3' id_cor={this.state.data ? this.state.data.id_Correspondencia : null} className="img-check">  {this.state.data ? this.state.data.fk_estatus >=3 ?  <BsCheckSquareFill />  : <BsSquare /> : null} </div>
                                            <div className="detalle-proceso">
                                                <p>Archivado</p>
                                                {/* <p><b>{user.nombre} {user.apellido}</b></p> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pdf"> PDF</div>


                                    <div className="info-gral">
                                        <div className="info-box">
                                            <p><b>Enviado por:</b></p>
                                            {this.state.data ? this.state.data.origen_user.nombre : null}
                                            <p><b>Desde:</b></p>
                                            {this.state.data ? this.state.data.data_dependencia_origen.nombreDependencia : null}
                                        </div>

                                        <div className="info-box">
                                            <p><b>Enviado a:</b></p>
                                            {this.state.data ? this.state.data.destination_user.nombre : null}
                                            <p><b>Departamento:</b></p>
                                            {this.state.data ? this.state.data.data_dependencia_destination.nombreDependencia : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Tracking;
// ReactDOM.render(<Directorio/>);