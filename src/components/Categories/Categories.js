
import React, { Component } from "react";
import { PropTypes } from "@mui/material";
import { useState } from 'react';
import "./Categories.css"
import { color } from "@mui/system";



class Categories extends Component {
  render(){
    const { switchData } = this.props;
    
    return(
      <div className="btn-group">
           <button value='all' onClick={switchData} className='middleButtons' style={{backgroundColor : 'rgb(116 116 116)'}}>
             Todos
          </button>
          <button value='copia' onClick={switchData} className='middleButtons'  style={{backgroundColor : '#559c70'}}>
            Copia
          </button>
          <button value='requerimiento' onClick={switchData} className='middleButtons'  style={{backgroundColor : '#6999d0'}}>
            Requerimiento 
          </button>
          
          <button value='informativo' onClick={switchData} className='middleButtons' style={{backgroundColor : '#d56598'}}>
            Informativo
          </button>
          
      </div>
     
    )
  }
}

export default Categories;