
import React, { Component } from "react";



import MailItem from '../MailItem/MailItem';
import SingleEmail from "../SingleEmail/SingleEmail";
import Menu from '../../commons/Menu/Menu';
import Header from '../../commons/Header/Header';
import axios from 'axios';
import Categories from '../Categories/Categories';
import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import "./MailContainer.css"
import LoginData from "../../LoginData";
import Tracking from "../Tracking/Tracking";


class MailContainer extends Component {
  //data almacena los datos que van a mostrar dependiendo la categoria
  // allData son todos los datos brutos
  state = {
      data: [],
      allData: [],
      show: false,
      search: '',
      activeCategory: 'all',
      selectedMailId: '',
      selectedMailData : []
      
  }
  //Se ejecutará al momento de montar el componente
  componentDidMount() { 
      this.getMails();
  }

  //llamamos a la api para obtener los mensajes/correos
  getMails = () => {
      axios.get(`http://localhost:3000/api/email/usuario/recibidos=${LoginData.userId}`).then(Response => {
          
          this.setState({ data: Response.data });
          this.setState({ allData: Response.data });
         
          console.log(Response.data)
          //return Response.data;
      }).catch(error => {
          console.log(error.message);
      });
  };
  switchData = (e) => {
    console.log(e.target.value);
    
    if(e.target.value == 'all'){
       this.setState({ show: false, data: this.state.allData });
    } else{
      const filteredData = this.state.allData.filter( (data) => data.categoria ? data.categoria.nombre.includes(e.target.value) : null)
      
      this.state.activeCategory = e.target.value;
      return this.setState({ show: false, data: filteredData });
    }
  };

  searchData = (e) => {
    
    console.log(this.state.data)
    const filteredData = this.state.allData.filter( 
      (data) => data.origen_user.nombre.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
      || data.origen_user.apellidoPaterno.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
      || data.origen_user.apellidoMaterno.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
    );
    //console.log(filteredData);
    return this.setState({ show: false, data: filteredData });

  };

  inputSearch = (e) => {
    return this.setState({ search: e.target.value });
  }


  filterByDate =  (e) => {
    console.log(e.target.value);
    console.log(this.state.activeCategory)
    const filteredData = this.state.allData.filter( (data) => data.fechaRecepcion.includes(e.target.value) )
    //console.log(this.state.activeCategory);
    this.setState({  show: false, data: filteredData });
  };
  viewMail =  (e) => {
    //console.log(e.target.alt);
    const filteredData = this.state.allData.filter( (data) => data.id_Correspondencia == e.target.id);
    //console.log(filteredData);
    this.setState({ show: true, selectedMailId : e.target.id, selectedMailData: filteredData });
  }
  

  back=(e) => {
    console.log("nac");
    this.setState({show : false, data: this.state.allData});
  };

  
    

  

  render(){
    return (
        <div className="main">
          <Header />
              <div className="middle">
                <Menu />

                
                
                <div className="mail-box">
                {this.state.show ? null :
                  <SearchBar searchData={this.searchData} inputSearch={this.inputSearch} filterByDate={this.filterByDate}/>
                }
                {this.state.show ? null :
                <div className="title-page">
                 Recibidos
              </div>
                }
                
                {this.state.show ? null :
                  <div className="categories">
                    <Categories switchData={this.switchData} />
                  </div>
                }
                
                  {
                  this.state.show ? 
                  this.state.selectedMailData.map(data_mail => {
                    return(
                      <SingleEmail data_mail={data_mail} back={this.back} />
                    )
                  }) 
                  :
                    this.state.data.map(data_mail => {
                    
                      return (
                          <MailItem
                            author={`${data_mail.origen_user.nombre} ${data_mail.origen_user.apellidoMaterno}`}
                            subject={data_mail.asunto}
                            fecha={data_mail.fechaRecepcion}
                            area={data_mail.data_tipo_correspondencia.nombre}
                            status={data_mail.status}
                            id_correspondencia={data_mail.id_Correspondencia}
                            viewMail ={this.viewMail}
                            pdfRoute ={data_mail.fileName}
                          />                       
                      
                      );
                    })
            }
            </div>
            </div>
        </div>
      )
    }
};


export default MailContainer
