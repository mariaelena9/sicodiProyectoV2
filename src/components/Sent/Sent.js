import React, { Component } from "react";
import Header from "../../commons/Header/Header";
import Menu from "../../commons/Menu/Menu";
import LoginData from "../../LoginData";
import axios from 'axios';
import SearchBar from "../SearchBar/SearchBar";
import "./Sent.css"
import MailItem from "../MailItem/MailItem";
import MailStateCategory from "../MailStateCategory/MailStateCategory";


class Sent extends Component{
    
    state = {
        data: [],
        allData: [],
        show: false,
        search: '',
        activeCategory: 'todos',
        selectedMailId: '',
        selectedMailData : [],
        pageTitle : ''
        
       
    };
    /*
    constructor(props){
        super(props);
        this.state = {
            page_id : props
        };
      }
      */

    componentDidMount(props) { 
        //
        const page = this.props.id_page;
        console.log(page)
        this.setState({pageTitle: page});

        this.getSentMails();
    };

    

    getSentMails = () => {
        
        axios.get(`http://localhost:3000/api/email/usuario/enviados=${LoginData.userId}`).then(Response => {            
                //this.setState({ data: Response.data });
                let response_data = Response.data;
                //const filteredData = response_data.filter( (data) => data.fk_estatus == 3)
                
                this.setState({data: response_data, allData: response_data});
            }).catch(error => {
                console.log(error.message);
            });        
    };
    inputSearch = (e) => {
        console.log(e.target.value)
       
        return this.setState({ search: e.target.value });
        
    };

    searchData = (e) => {
        
        //console.log(this.state.data)
        const filteredData = this.state.allData.filter( 
          (data) => data.destination_user.nombre.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
          || data.destination_user.apellidoPaterno.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
          || data.destination_user.apellidoMaterno.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())
        );
        console.log(filteredData);
        return this.setState({ show: false, data: filteredData });
    
      };
      filterByDate =  (e) => {
        console.log(e.target.value);
        //console.log(this.state.data[0].fechaRecepcion);
        //console.log(this.state.activeCategory)
        const filteredData = this.state.allData.filter( (data) => data.fechaRecepcion.toString().includes(e.target.value) )
        //console.log(this.state.activeCategory);
        return this.setState({  show: false, data: filteredData });
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
                            Enviados
                            
                        </div>
                        <MailStateCategory/>
                        <div>
                        {
                            this.state.data.map(data_mail => {
                        
                                return (
                                    <MailItem
                                    key={data_mail.id_Correspondencia}
                                    author={`${data_mail.destination_user.nombre} ${data_mail.destination_user.apellidoMaterno}`}
                                    subject={data_mail.asunto}
                                    content={data_mail.descripcion}
                                    area={data_mail.data_tipo_correspondencia.nombre}
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

export default Sent;