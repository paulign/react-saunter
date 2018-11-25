import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Header extends Component {
    render() {
        return (
            <header>
                <Navbar light expand="md">
                    <NavbarBrand href="/">
                        <FontAwesomeIcon className="mr-3" size="lg" icon="expand-arrows-alt" />
                        Saunter
                    </NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <Button onClick={this.props.onToggleNewPathModal} color="primary">Add Path</Button>
                    </Nav>
                </Navbar>
            </header>
        );
    }
}

export default Header;