import React, { Component } from 'react';
import PathItem from './PathItem';

class PathsList extends Component {
    render() {
        return (
            <div className="paths-list-wrapper">
                <PathItem />
                <PathItem />
                <PathItem />
                <PathItem />
                <PathItem />
            </div>
        );
    }
}

export default PathsList;