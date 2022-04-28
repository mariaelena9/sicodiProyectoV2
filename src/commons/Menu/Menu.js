//Imports
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import * as ImIcons from 'react-icons/im';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import Directorio from "../../components/Directory/Directorio";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './Menu.css';
import Correspondence from "../../components/Correspondence/Correspondence";
import MailContainer from "../../components/MailContainer/MailContainer";
import Inicio from "../../components/Home/Inicio";
import App from "../../App";
import AuthContext from "../../context/AuthContext";
import History from "../../components/History/History";
import Sent from "../../components/Sent/Sent";

const page = "";
// const [auth, handleAuth] = useContext(AuthContext);

class Menu extends Component{

    handleMenu(e) {
        e.preventDefault();
        console.log(e.target.id);
        if(e.target.id == '/home'){
            ReactDOM.render(<App/>, document.getElementById('root'));
        } else if(e.target.id == '/directory'){
            ReactDOM.render(<Directorio/>, document.getElementById('root'));
        } else if(e.target.id == '/correspondence'){
            ReactDOM.render(<Correspondence/>, document.getElementById('root'));
        } else if(e.target.id == '/sent'){
            ReactDOM.render(<Sent />, document.getElementById('root'));
        } else if(e.target.id == '/receipt'){
            ReactDOM.render(<MailContainer/>, document.getElementById('root'));
        } else if(e.target.id == '/history'){
            ReactDOM.render(<History/>, document.getElementById('root'));
        } else if(e.target.id == '/report'){

        }
        
    }

    

    render(){
        return(
            <Router className="contenido">
                    <nav className="izq">
                        <div className="infocuenta">
                            <ImIcons.ImUser/>
                            <p className="name">Manuela Michelle Salinas Tirado</p>
                            <br></br>
                            <p className="rol">Dirección Gral de Sistemas y Tec. informatica</p>
                        </div>
                        <hr/>

                        <ul>
                            <li><a id="/home" onClick={this.handleMenu}><AiIcons.AiFillHome/> Inicio</a></li>
                            <li><a id="/directory" onClick={this.handleMenu}><MdIcons.MdImportContacts/> Directorio</a></li>
                            <li><a id="/correspondence"  onClick={this.handleMenu}><ImIcons.ImFileText2/> Nueva Correspondencia</a></li>
                            <li><a id="/sent"  onClick={this.handleMenu}><ImIcons.ImBoxRemove/> Enviados</a></li>
                            <li><a id="/receipt"  onClick={this.handleMenu}><ImIcons.ImBoxAdd/> Recibidos</a></li>
                            <li><a id="/history" onClick={this.handleMenu}><ImIcons.ImHistory/> Historico</a></li>
                            <li><a onClick={this.handleSubmit}><ImIcons.ImStatsDots/> Reportes</a></li>
                            <li><a><ImIcons.ImExit/> Salir</a></li>
                        </ul>
                    </nav>

                    <div id="root"></div>
            </Router>
        );
    }
}

export default Menu;