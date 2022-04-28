
import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import style from './SingleEmail.css'
import { IoChevronBackOutline } from "react-icons/io5";

class SingleEmail extends Component {
    render(){
        const { data_mail } = this.props;
        console.log(data_mail)
        return (
            <div className="main-correspondencia"> 
            <div onClick={this.props.back} className="buttonBack">
                <i><IoChevronBackOutline /></i>
                <p className="TitlePage">Volver</p>
            </div> 
                <div className="data-column">
                    <h3>
                        Informacion Basica
                    </h3>
                    <div className="data-info">
                        <p className="data-text">Fecha de emision:</p><span className="span-data">{data_mail.fechaEmision ? new Date(data_mail.fechaEmision).getUTCDate() : null} de {data_mail.fechaEmision ?  new Date(data_mail.fechaEmision).toLocaleString('default', { month: 'long' }) : null} del {new Date(data_mail.fechaEmision).getFullYear()}</span>
                        <br/>
                        <p className="data-text">Fecha de recepcion:</p><span className="span-data">{data_mail.fechaRecepcion ? new Date(data_mail.fechaRecepcion).getUTCDate() : null} de {data_mail.fechaRecepcion ?  new Date(data_mail.fechaRecepcion).toLocaleString('default', { month: 'long' }) : null} del {new Date(data_mail.fechaRecepcion).getFullYear()}</span>
                        <br/>
                        <p className="data-text">Tipo de correspondencia:</p><span className="span-data">{data_mail.data_tipo_correspondencia.nombre}</span>
                    </div>
                </div>
                <div className="data-column">
                    <h3>
                        Informacion del Remitente
                    </h3>
                    <div className="data-info">
                        <p className="data-text">Origen:</p><span className="span-data">{data_mail.data_dependencia_origen.nombreDependencia}</span>
                        <br/>
                        <p className="data-text">Forma de llegada:</p><span className="span-data">no aplica</span>
                        <br/>
                        <p className="data-text">Nombre del remitente:</p><span className="span-data">{data_mail.asunto}</span>
                    </div>
                </div>
                <hr/>
                <div>
                    <h4>Asunto</h4>
                    <p className="data-secondary-text">{data_mail.asunto}</p>
                    <h4>Descripcion</h4>
                    <p className="data-secondary-text">{data_mail.descripcion}</p>
                    <h4>Observaciones</h4>
                    <p className="data-secondary-text">{data_mail.observaciones}</p>
                    <h4>Archivos Adjuntos</h4>
                    <div className="file-section">
                        <div className="mail-pdf"> 
                            <FontAwesomeIcon icon={faFilePdf} className="pdf-icon" />
                            {data_mail.fileName ? 
                                <a target="_blank" href={'http://localhost:3000/pdf/'+data_mail.fileName}>{data_mail.fileName}</a>
                            :
                                <a>No hay archivo disponible</a>
                            }
                            
                        </div>
                        <div className="mail-buttons">
                            <button style={{backgroundColor: "#75a1cf"}}><a target="_blank" href={'http://localhost:3000/pdf/'+data_mail.fileName}>Descarga</a></button>
                            <button style={{backgroundColor: "#d1b173"}}>Seguimiento</button>
                            <button style={{backgroundColor: "#b5818a"}}>Asignar</button>
                            <button style={{backgroundColor: "#71b57e"}}>Responder</button>
                        </div>
                    </div>
                    
                </div>
            </div>
           
        )
    }
}


export default SingleEmail
