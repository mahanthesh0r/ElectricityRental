import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbars';
//import Web3 from 'web3'
import {PythonShell} from 'python-shell';


import { Badge, Card, CardBody, Input, Container, Row, Col, Form, Alert } from 'reactstrap';

export default class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      pricePerHour: 0.5,
      totalPrice: 0,
      duration: '',
      Address: '0x3e834D49b863057F5d67DaeCB111588bE7Ce987d',
      flag: false,
      hash: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.findTotal = this.findTotal.bind(this);
    this.handleChangeHash = this.handleChangeHash.bind(this);
    this.sendHash = this.sendHash.bind(this);
    this.loadWeb3 = this.loadWeb3.bind(this);
  }

  handleChange(event) {
    this.setState({ flag: false });
    this.setState({ duration: event.target.value });

  }
  handleChangeHash(e){
    this.setState({ hash: e.target.value})

  }

  handleSubmit(event) {
    event.preventDefault();
    var tots = this.state.duration
    // alert('value' + this.state.duration);
    this.findTotal(tots)

  }

  findTotal(tots) {
    var total = tots * this.state.pricePerHour;
    this.setState({ totalPrice: total })
    this.setState({ flag: true })
  }

  sendHash(e){
    e.preventDefault();
    var txHash = this.state.hash
    localStorage.setItem('txHash', txHash)
    this.loadWeb3(txHash)
  }

  loadWeb3(txH){
    // var Web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/d57c3252e3fb4280947117891e659ac6'));
    // const account = '0x3e834D49b863057F5d67DaeCB111588bE7Ce987d'.toLowerCase();

    // return async function checkLastBlock(){
    //   let block = await Web3.eth.getBlock('latest');
    //   console.log('Searching block');
    //   if(block && block.transactions){
    //     for(let txHash of block.transactions){
    //       if(txHash === txH){
    //         return true;
    //       }
    //       else {
    //         return false
    //       }
    //     }
    //   }
    // }

    PythonShell.run('relay_script.py', null, function(err){
      if(err) throw err;
      console.log('finished')
    })



  }


  render() {
    return (
      <div>
        <Navbar />
        <Container className="text-center">
        <h1 className="mt-5">Rent Electricity for <Badge color="secondary">{this.state.pricePerHour} ETH Per Hour</Badge></h1>
        </Container>
       
        <Container>
          <Card>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>


                <Row>
                  <Col md="4">Choose the Duration in hours: </Col>
                  <Col md="4">
                    <Input type="number" value={this.state.duration} name="hours" onChange={this.handleChange} />
                  </Col>
                  <Col md="4">
                    <h3>X {this.state.pricePerHour} ETH </h3>
                  </Col>
                  <Container className="text-center m-5">
                    <Input type="submit" value="submit" />
                  </Container>
                </Row>
              </Form>
              <Container className="text-center">

                <h2 className="mt-4 ml-4">You have to pay <Badge color="info"> {this.state.totalPrice} ETH</Badge></h2>
                {this.state.flag 
                ? <div>
                  <img style={{ width: "40%" }} src={require("./assets/qrcode.jpeg")} />
                <Alert color="primary">
                  {this.state.Address}
                 </Alert>
                 <Form onSubmit={this.sendHash}>
                   <Input type="text" placeholder="Enter your transaction hash " value={this.state.hash} onChange={this.handleChangeHash} />
                   <Input type="submit" value="Send Hash"/>
                 </Form>
                </div>
                 : ''
              }

               

              </Container>
            </CardBody>
          </Card>
        </Container>

      </div>


    )
  }
}
