import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

class PathItem extends Component {

    getDistance = () => {
        const { distance } = this.props;
        let valueType = distance > 1000 ? 'km' : 'm';
        let displayValue = distance > 1000 ? (distance / 1000).toFixed(2) : distance;

        return `${displayValue} ${valueType}`
    }

    render() {
        const { id, title, short_description, favorite } = this.props;
        return (
            <NavLink to={`/path/${id}`} className="path-item p-3" activeClassName="selected">
                <div className="row align-items-center">
                    <div className="col-auto d-none d-lg-block">
                        <FontAwesomeIcon className="mr-3" size="3x" icon="expand-arrows-alt" />
                    </div>
                    <div className="col">
                        <div className="d-flex align-items-center mb-2">
                            {favorite && <FontAwesomeIcon className="mr-1 favorite-star" icon="star" />}
                            <h3 className="mb-0">{title}</h3>
                        </div>
                        <div>
                            {short_description}
                        </div>
                    </div>
                    <div className="col-lg-4 col-xl-3">
                        <div className="path-distance">
                            {this.getDistance()}
                            <FontAwesomeIcon className="path-open-details" size="2x" icon="angle-right" />
                        </div>
                    </div>
                </div>
            </NavLink>
        );
    }
}

export default withRouter(PathItem);