import React, { Component } from "react";
import "./SearchBar.css";
//import lupa from "../../assets/magnifying-glass.png";
import Container from "react-bootstrap/Container";

//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
//import preferences from "../../assets/equalizer.png";



class SearchBar extends Component {

  
  render(){
    const { searchData, inputSearch, filterByDate } = this.props;
      return (
        <Container fluid className="search">
          <p onClick={searchData} className="icon-search"><FontAwesomeIcon icon={faMagnifyingGlass}/></p>
          <input onChange={inputSearch} className="search-input" type="search" id="gsearch" name="gsearch" placeholder="Buscar remitente en la correspondencia"></input>
          <input onChange={filterByDate} className="date-picker" type="date" id="birthday" name="birthday"></input>
          
      </Container>
      )
    
  }
};

export default SearchBar;