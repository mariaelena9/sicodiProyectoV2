//Imports
import React, { Component } from "react";
import {useState} from "react";
import ReactDOM from 'react-dom';
import Sidebar from "../../commons/Sidebar/Sidebar";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5";
import axios from 'axios';
import Header from "../../commons/Header/Header";
import Directorio from "../Directory/Directorio";
import "./Correspondence.css"
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Menu from "../../commons/Menu/Menu";

class Correspondence extends Component {
    state = {
        data: [],
        dependencias: [],
        usuarios: [],
        tipos: [],
        categorias: [],
        selectedFile: [],
        form: {
            id_Correspondencia: '',
            fechaEmision: '',
            fechaRecepcion: '',
            fechaLimite: '',
            fk_DependenciaO: '',
            fk_UsuarioO: '',
            fk_DependenciaD: '',
            fk_UsuarioD: '',
            fk_TipoCo: '',
            asunto: '',
            descripcion: '',
            observaciones: '',
            fileName: '',
            fk_catcorrespo: ''
        }
    }



    //Se ejecutará al momento de montar el componente
    componentDidMount() {
        this.getDependences();
        this.getUsers();
        this.getTipoCo();
        this.getCategories();
    }

    //Funcion para registrar la correspondencia en la BD
    handleSubmit = (e) => {
        e.preventDefault();
        this.insertCorrespondence();
    }

    //Funcion base para manipular un objeto formulario, ayuda a controlar las modificaciones
    handleChange = async e => {
        e.persist();
        await this.setState({
        form:{
            ...this.state.form,
            [e.target.name]: e.target.value
        }
        });
        console.log(this.state.form);
    }

    selectFile = async e => {
        console.log(e.target.files[0]);
        this.state.selectedFile[0] = e.target.files[0];
        console.log(this.state.selectedFile);
        let fileName =  e.target.files[0].name.replaceAll(' ','_');
        this.state.form.fileName = fileName
        //this.insertFiles(e.target.files[0], fileName);
        
    }

    //Funcion para insertar en la BD la correspondencia
    //Consumo del metodo INSERT de la API
    insertCorrespondence=async()=>{
        //console.log(this.state.form.fileName)
        
        delete this.state.form.id_Correspondencia;
        await axios.post("http://localhost:3000/api/correspondence/insert",this.state.form).then(response=>{
        this.insertFiles(this.state.selectedFile[0], this.state.form.fileName);
        this.state.form.fechaEmision = '';
        this.state.form.fechaRecepcion = '';
        this.state.form.fechaLimite = '';
        this.state.form.fk_DependenciaO = '';
        this.state.form.fk_UsuarioO = '';
        this.state.form.fk_DependenciaD = '';
        this.state.form.fk_UsuarioD = '';
        this.state.form.fk_TipoCo = '';
        this.state.form.asunto = '';
        this.state.form.descripcion = '';
        this.state.form.observaciones = '';
        this.state.selectedFile = [];
        this.state.form.fileName = '';
        document.getElementById("correspondencia-form").reset();
        }).catch(error=>{
            console.log(error.message);
        })
    }

    async insertFiles(file, name){
        //console.log(id);
        const formData = new FormData(); 
        formData.append( 
            "file", 
            file,
            name
          ); 
        await axios.post("http://localhost:3000/api/correspondence/insert/file",formData).then(response=>{
        }).catch(error=>{
            console.log(error.message);
        });
    }

    //Consultar las dependencias de la BD
    getDependences() {
        axios.get("http://localhost:3000/api/dependences/").then(Response => {
            this.setState({ dependencias: Response.data });
            //console.log(Response.data);
        }).catch(error => {
            console.log(error.message);
        });
    }

    //consultar categoria de la bd
    getCategories() {
        axios.get("http://localhost:3000/api/correspondence/categorias/").then(Response => {
            this.setState({ categorias: Response.data });

            console.log("categorias ", Response.data);
        }).catch(error => {
            console.log(error.message);
        });
    }

    //Consultar los usuarios de la BD
    
    getUsers(){
        axios.get("http://localhost:3000/api/user/getuser").then(Response => {
            this.setState({ usuarios: Response.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    //Consultar los tipos de correspondencia de la BD
    getTipoCo(){
        axios.get("http://localhost:3000/api/correspondence/").then(Response => {
            this.setState({ tipos: Response.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    render() {
        return(
            <div className="body">
                <Header/>
                <div className="middle">
                    <Menu/>
                    <div className="correspondencecontent">
                        <div className="buttonBack">
                            <i><IoChevronBackOutline/></i>
                            <p className="TitlePage">Nueva Correspondencia</p>
                        </div>
                        <br/>
                        <h3>Informacion básica</h3>
                        <form id="correspondencia-form">
                            <div className="dates">
                                <TextField InputLabelProps={{ shrink: true }} name="fechaEmision" required type="date" id="fechaEmision" label="Fecha de emision" onChange={this.handleChange} value={this.state.form?this.state.form.fechaEmision: ''}></TextField>
                                <TextField InputLabelProps={{ shrink: true }} name="fechaRecepcion" required type="date" id="fechaRecepcion" label="Fecha de recepcion" onChange={this.handleChange} value={this.state.form?this.state.form.fechaRecepcion: ''}></TextField>
                                <TextField InputLabelProps={{ shrink: true }} name="fechaLimite" required type="date" id="fechaLimite" label="Fecha limite de respuesta" onChange={this.handleChange} value={this.state.form?this.state.form.fechaLimite: ''}></TextField>
                            </div>

                            <h3>Informacion de origen</h3>
                            <div className="originInfo">
                                <select className="select" id="fk_DependenciaO" name="fk_DependenciaO" onChange={this.handleChange} value={this.state.form?this.state.form.fk_DependenciaO: ''}>
                                    <option value="invalido">Elige la dependencia origen</option>
                                    {this.state.dependencias.map( elemento => (
                                        <option key={elemento.id_Dependencia} value={elemento.id_Dependencia}>{elemento.nombreDependencia}</option>
                                    ))}
                                </select>
                                <br/>
                                <select className="select" id="fechaRecepcion" name="fk_UsuarioO" onChange={this.handleChange} value={this.state.form?this.state.form.fk_UsuarioO: ''}>
                                    <option value="invalido">Elige un remitente</option>
                                    {this.state.usuarios.map( elemento => (
                                        <option key={elemento.id_Usuario} value={elemento.id_Usuario}>{elemento.nombre} {elemento.apellidoMaterno} {elemento.apellidoPaterno}</option>
                                    ))}
                                </select>
                            </div>
                            <br/>
                            <h3>Informacion de destinatario</h3>
                            <div className="originInfo">
                                <select className="select" id="fk_DependenciaD" name="fk_DependenciaD" onChange={this.handleChange} value={this.state.form?this.state.form.fk_DependenciaD: ''}>
                                    <option value="invalido">Elige la dependencia destino</option>
                                    {this.state.dependencias.map( elemento => (
                                        <option key={elemento.id_Dependencia} value={elemento.id_Dependencia}>{elemento.nombreDependencia}</option>
                                    ))}
                                </select>
                                <br/>
                                <select className="select" id="fk_UsuarioD" name="fk_UsuarioD" onChange={this.handleChange} value={this.state.form?this.state.form.fk_UsuarioD: ''}>
                                    <option value="invalido">Elige un destinatario</option>
                                    {this.state.usuarios.map( elemento => (
                                        <option key={elemento.id_Usuario} value={elemento.id_Usuario}>{elemento.nombre} {elemento.apellidoMaterno} {elemento.apellidoPaterno}</option>
                                    ))}
                                </select>
                            </div>
                            <br/>
                            <h3>Informacion de correspondencia</h3>
                            <div className="originInfo">
                                <select className="select" id="fk_TipoCo" name="fk_TipoCo" onChange={this.handleChange} value={this.state.form?this.state.form.fk_TipoCo: ''}>
                                    <option value="invalido">Elige un tipo de correspondencia</option>
                                    {this.state.tipos.map( elemento => (
                                        <option key={elemento.id_Tipo} value={elemento.id_Tipo}>{elemento.nombre}</option>
                                    ))}
                                </select>
                                <br/>
                                <select className="select" id="fk_catcorrespo" name="fk_catcorrespo" onChange={this.handleChange} value={this.state.form?this.state.form.fk_catcorrespo: ''}>
                                    <option value="invalido">Elige una categoria de correspondencia</option>
                                    {this.state.categorias.map( elemento => (
                                        <option key={elemento.id} value={elemento.id}>{elemento.nombre}</option>
                                    ))}
                                </select>
                                <br/>
                                <TextField required name="asunto" id="asunto" label="Asunto:" onChange={this.handleChange} value={this.state.form?this.state.form.asunto: ''}></TextField>
                                <br/>
                                <TextField multiline name="descripcion" rows={10} required id="descripcion" label="Descripcion:" onChange={this.handleChange} value={this.state.form?this.state.form.descripcion: ''}></TextField>
                                <br/>
                                <TextField multiline name="observaciones" rows={5} required id="observaciones" label="Observaciones:" onChange={this.handleChange} value={this.state.form?this.state.form.fechaobservaciones: ''}></TextField>
                                <br/>
                                <p>
                                    Subir archivos: 
                                    <br/>
                                    <input onChange={this.selectFile} type="file" accept="application/pdf,application/vnd.ms-excel" ></input>
                                </p>
                                <br/>
                                <button type="submit" onClick={this.handleSubmit}>Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Correspondence;