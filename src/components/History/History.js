import React, { Component } from "react";
import Header from "../../commons/Header/Header";
import Menu from "../../commons/Menu/Menu";
import LoginData from "../../LoginData";
import axios from 'axios';
import SearchBar from "../SearchBar/SearchBar";
import "./History.css"
import SingleEmail from "../SingleEmail/SingleEmail";
import { useState } from 'react';
import MailItem from "../MailItem/MailItem";


class History extends Component{
    
    state = {
        data: [],
        allData: [],
        show: false,
        search: '',
        activeCategory: 'todos',
        selectedMailId: '',
        selectedMailData : [],
        inputSearch: ''
    };
   
    componentDidMount(props) { 
        
        this.getHistoryMails();
      
    };

    getHistoryMails = () => {
        
        axios.get(`http://localhost:3000/api/email/usuario/recibidos=${LoginData.userId}`).then(Response => {            
                //this.setState({ data: Response.data });
                let response_data = Response.data;
                const filteredData = response_data.filter( (data) => data.fk_estatus == 3)
                
                this.setState({data: filteredData, allData: filteredData});
            }).catch(error => {
                console.log(error.message);
            });        
    };

    inputSearch = (e) => {
        console.log(e.target.value)
       
        return this.setState({ search: e.target.value });
        
    };

    filterByDate =  (e) => {
        console.log(e.target.value);
        //console.log(this.state.data[1].fechaRecepcion);
        //console.log(this.state.activeCategory)
        const filteredData = this.state.allData.filter( (data) => data.fechaRecepcion.toString().includes(e.target.value) )
        //console.log(this.state.activeCategory);
        return this.setState({  show: false, data: filteredData });
    };

    searchData = (e) => {
        
        //console.log(this.state.data)
        const filteredData = this.state.allData.filter( 
          (data) => data.origen_user.nombre.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
          || data.origen_user.apellidoPaterno.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
          || data.origen_user.apellidoMaterno.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
        );
        console.log(filteredData);
        return this.setState({ show: false, data: filteredData });
    
      };

    
    render(){
        

        return(
            <div className="main">
            <Header />
                <div className="middle">
                  <Menu />
                   <div className="mail-box">
                        <SearchBar searchData={this.searchData} inputSearch={this.inputSearch} filterByDate={this.filterByDate}/>
                        <div className="title-page">
                           
                            Historico
                        </div>
                        <div>
                        {
                            this.state.data.map(data_mail => {
                        
                                return (
                                    <MailItem
                                    key={data_mail.id_Correspondencia}
                                    author={`${data_mail.origen_user.nombre} ${data_mail.origen_user.apellidoMaterno}`}
                                    subject={data_mail.asunto}
                                    content={data_mail.descripcion}
                                    area={'Archivado'}
                                    status={data_mail.status}
                                    id_correspondencia={'data_mail.id_Correspondencia'}
                                    viewMail ={this.viewMail}
                                    />                       
                                )
                            })
                        }
                    </div>
                    </div>
                   
                   
                    
                    
                    
                </div>
            </div>
        );
    };
};

export default History;