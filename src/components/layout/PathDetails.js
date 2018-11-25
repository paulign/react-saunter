import React, { Component } from 'react';

class PathDetails extends Component {

    onToggleFavorite = (e) => {
        e.preventDefault();
    }

    onRremove = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div className="path-details px-lg-3 mb-4 mb-lg-0 pb-4 pb-lg-0">
                <div className="d-flex justify-content-between mb-4">
                    <h2 className="mb-0 mr-2">
                        Path title
                    </h2>
                    <strong className="lead font-weight-bold">1.75 km</strong>
                </div>
                <div className="mb-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sagittis, felis in eleifend condimentum, quam eros molestie sapien, sed lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sagittis, felis in eleifend condimentum, quam eros molestie sapien, sed lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sagittis, felis in eleifend condimentum, quam eros molestie sapien, sed lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sagittis, felis in eleifend condimentum, quam eros molestie sapien, sed lacinia.
                </div>
                <div className="map-container mb-3" />
                <div className="text-right">
                    <a href="#toggle-favorite" className="d-block text-primary lead mb-3" onClick={this.onToggleFavorite}>Add to favorites</a>
                    <a href="#remove" className="d-block text-danger lead" onClick={this.onRremove}>Remove</a>
                </div>
            </div>
        );
    }
}

export default PathDetails;