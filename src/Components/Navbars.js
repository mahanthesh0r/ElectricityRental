import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

class Navbars extends Component {
    render() {
        return (
            <div>
                <Navbar color="primary" light>
                    <NavbarBrand href="/"  style={{color:"#ffff"}} className="mr-auto">Rent Block</NavbarBrand>
                    
                    
                </Navbar>

            </div>
        );
    }
}

export default Navbars;