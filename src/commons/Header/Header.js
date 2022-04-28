/* @HEADER */

//Imports
import React, {useState} from "react";
import logoSicodi from '../../assets/SICODISinFondo.png'
import logoGob from '../../assets/logosgg.png';
import header from './Header.css';

function Header(){
    return(
        <header>
            <div className="content">

                <div className="logoIzq">
                    <img src={logoSicodi} alt="SICODI"/>
                </div>

                <div className="leyendas">
                    <p> GOBIERNO DEL ESTADO DE NAYARIT  </p>
                    <p> SECRETARIA DE ADMINISITRACÓN Y FINANZAS </p>
                    <p> SISTEMA DE CORRESPONDENCIA DIGITAL </p>
                </div>

                <div className="logoDer">
                    <img src={logoGob} alt ='GOB'/>
                </div>

            </div>
        </header>
    );
}

export default Header;