import React, { Component } from "react";
import "./MailItem.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import eye from "../../assets/eye.png";


class MailItem extends Component {
  
  render(){
    const { author, subject, fecha,area,status, id_correspondencia , viewMail, pdfRoute } = this.props;
    return(
        <Container fluid className="item">
        <Row>
          <Col className="mail-header">
          
            <p  id={id_correspondencia} onClick={viewMail} className="author ">{author}</p>
            <p className="text-end">{area}</p>
           
          </Col>
        </Row>
        <Row>
          <Col>
          <div><p className="subject " id={id_correspondencia} onClick={viewMail}>{subject}</p>
            

            {!pdfRoute ? <div className="icon-div"><img alt={id_correspondencia} className='imgStatus opacity' src={eye} /></div> : <div className="icon-div"><a target="_blank" href={'http://localhost:3000/pdf/'+pdfRoute}><img alt={id_correspondencia} className='imgStatus' src={eye} /></a></div>}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={10}>
            <p id={id_correspondencia} onClick={viewMail} className="contentM ">{new Date(fecha).getUTCDate()} de {new Date(fecha).toLocaleString('default', { month: 'long' })} del {new Date(fecha).getFullYear()}</p>
          </Col>
        
        </Row>
      </Container>
    )
  }
}
export default MailItem;

