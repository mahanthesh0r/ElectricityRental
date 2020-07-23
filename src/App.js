import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbars';
import Web3 from 'web3'
import {PythonShell} from 'python-shell';


import { Badge, Card, CardBody, Input, Container, Row, Col, Form, Alert } from 'reactstrap';
import { render } from '@testing-library/react';

export default class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      pricePerHour: 0.5,
      totalPrice: 0,
      duration: '',
      Address: '0x3e834D49b863057F5d67DaeCB111588bE7Ce987d',
      flag: false,
      hash: '',
      blockNumber: '',
      error: false,
      errMessage : "",
      apiResponse: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.findTotal = this.findTotal.bind(this);
    this.handleChangeHash = this.handleChangeHash.bind(this);
    this.sendHash = this.sendHash.bind(this);
    this.loadWeb3 = this.loadWeb3.bind(this);
    this.handleChangeBlockNumber = this.handleChangeBlockNumber.bind(this);
    this.callAPI = this.callAPI.bind(this)
  }

  handleChange(event) {
    this.setState({ flag: false });
    this.setState({ duration: event.target.value });

  }
  handleChangeHash(e){
    this.setState({ hash: e.target.value})

  }
  handleChangeBlockNumber(e){
    this.setState({ blockNumber: e.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    var tots = this.state.duration
    // alert('value' + this.state.duration);
    this.findTotal(tots)

  }

  callAPI(){
    fetch("https://clever-lionfish-27.serverless.social/rent")
    .then(res => res.text())
    .then(res => this.setState({apiResponse: res}));
  }

  findTotal(tots) {
    var total = tots * this.state.pricePerHour;
    this.setState({ totalPrice: total })
    this.setState({ flag: true })
  }

  sendHash(e){
    e.preventDefault();
    var txHash = this.state.hash
    var blockNo = this.state.blockNumber
    var totTime = this.state.duration
    localStorage.setItem('txHash', txHash)
    this.loadWeb3(txHash,blockNo,totTime)
  }

   checkLastBlock =  async (txH,blockNo,totTime) => {
    var web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/d57c3252e3fb4280947117891e659ac6'));
    const account = '0x3e834D49b863057F5d67DaeCB111588bE7Ce987d'.toLowerCase();
    let block = await web3.eth.getBlock(blockNo);
    console.log('Searching block', block);
    if(!block){
     this.setState({ error: true}) 
     this.setState({errMessage: "Error! Not a valid Block Number "})
    }else{
      this.setState({error: false})
    }
     
     if(block && block.transactions){
       for(let txHash of block.transactions){
         if(txH === txHash){
          let tx = await web3.eth.getTransaction(txHash);
         console.log(tx)
         if(account === tx.to.toLowerCase()){
           console.log("found")
        
          console.log("validated")
          this.callAPI()
           return true;
         } 
         }
         else {
           this.setState({error: true})
           this.setState({errMessage: "Incorrect Details, Please try again."})
           console.log("Not validated")
           return false
         }
       }
     }
   }

  loadWeb3(txH,blockNo,totTime){
    this.checkLastBlock(txH,blockNo,totTime);
    

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
                 {this.state.error
                 ?  <Alert color="danger">
                     {this.state.errMessage}
                   </Alert>
                   : null }
                 <Form onSubmit={this.sendHash}>
                   <Row className="mt-4 mb-3">
                   <Col md="6">
                     <Input type="text" placeholder="Enter your Block Number" value={this.state.blockNumber} onChange={this.handleChangeBlockNumber} />
                     </Col>
                     
                   <Col md="6">
                     <Input type="text" placeholder="Enter your transaction hash " value={this.state.hash} onChange={this.handleChangeHash} />
                     </Col>
                   </Row>
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
