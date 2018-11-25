import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom'

class PathItem extends Component {
    render() {
        return (
            <NavLink to="/path/1" className="path-item p-3" activeClassName="selected">
                <div className="row align-items-center">
                    <div className="col-auto d-none d-lg-block">
                        <FontAwesomeIcon className="mr-3" size="3x" icon="expand-arrows-alt" />
                    </div>
                    <div className="col">
                        <h3 className="mb-2">Path title</h3>
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sagittis, felis in eleifend condimentum, quam eros molestie sapien, sed lacinia.
                            </div>
                    </div>
                    <div className="col-lg-4 col-xl-3">
                        <div className="path-distance">
                            1.75 km
                            <FontAwesomeIcon className="path-open-details" size="2x" icon="angle-right" />
                        </div>
                    </div>
                </div>
            </NavLink>
        );
    }
}

export default PathItem;