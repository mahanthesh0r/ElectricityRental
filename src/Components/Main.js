import React, { Component } from 'react';
import { Badge, Card, CardBody, Input, Container, Row, Col, Form } from 'reactstrap';

export default class Main extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            pricePerHour: 0.5,
            totalPrice: 0,
            duration: '',
        };
        this.handleChange = this.handleChange.bind(this);
        
    }
    
    handleChange(event) {
        this.setState({duration: event.target.duration});
        console.log("after",this.state.duration)

    }
    handleSubmit(event){
        event.preventDefault();
        alert('value' + this.state.duration);
        
    }
   
    findTotal = () => {
        var total = this.state.duration * this.state.pricePerHour;
        this.setState({totalPrice: total})
    }
    render() {
        return (
            <div>
                <h1 className="mt-5">Rent Electricity for <Badge color="secondary">{this.state.pricePerHour} ETH Per Hour</Badge></h1>
                <Container>  
                <Card>
                    <CardBody>
                       <Form onSubmit={this.handleSubmit}>

                      
                        <Row>
                        <Col md="3">Choose the Duration: </Col>
                        <Col md="3">  
                            <Input type="number" value={this.state.duration} name="hours" onChange={this.handleChange} />
                        </Col>
                        <Col md="3">
                            <h3>X 0.5 ETH =</h3>
                        </Col>
                        <Col md="3">
                         <h2><Badge color="info"> {this.state.totalPrice} ETH</Badge></h2>  
                        </Col>
                        <Input type="submit" value="submit"/>
                       
                    </Row>
                    
                    </Form>
                    </CardBody>
                </Card>


                </Container>
               

            </div>
        );
    }
}


