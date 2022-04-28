
import React, { Component } from "react";
import { PropTypes } from "@mui/material";
import { useState } from 'react';
import "./MailStateCategory.css"
import { color } from "@mui/system";



class MailStateCategory extends Component {
  render(){
    const { switchData } = this.props;
    
    return(
      <div className="btn-group">
          <button value='all' onClick={switchData} className='middleButtons'  style={{backgroundColor : 'rgb(42 95 155)'}}>
            Todos
          </button>
          <button value='process' onClick={switchData} className='middleButtons'  style={{backgroundColor : 'rgb(87 6 29)'}}>
            En Proceso
          </button>
          <button value='send' onClick={switchData} className='middleButtons'  style={{backgroundColor : '#a17637'}}>
            Enviado
          </button>
          
         
          
      </div>
     
    )
  }
}

export default MailStateCategory;