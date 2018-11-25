import React, { Component } from 'react';
import firebase from '../../firebaseConfig';
import MapContainer from '../containers/MapContainer';

class PathDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedID: props.match.params.id,
            selectedPath: null,
            isLoading: true
        }
    }
    componentDidMount() {
        this.loadPath();
    }

    componentDidUpdate = async () => {
        const newID = this.props.match.params.id;
        if (this.state.selectedID !== newID) {
            await this.setState({ selectedID: newID });
            await this.loadPath();
        }
    }

    componentWillUnmount() {
        console.log('unmount details');
    }

    loadPath = async () => {
        try {
            const { selectedID } = this.state;
            this.ref = firebase.database().ref(`walking_paths/${selectedID}`);
            const snapshot = await this.ref.once('value');

            const selectedPath = snapshot.val();
            await this.setState({ selectedPath });
        } catch (error) {
            this.setState({ isLoading: false, selectedPath: null });
        }
    }

    onToggleFavorite = (e) => {
        e.preventDefault();
    }

    onRremove = (e) => {
        e.preventDefault();
    }

    getDistance = () => {
        const { selectedPath } = this.state;
        if (selectedPath && selectedPath.distance) {
            let distance = selectedPath.distance;
            let valueType = distance > 1000 ? 'km' : 'm';
            let displayValue = distance > 1000 ? (distance / 1000).toFixed(2) : distance;

            return `${displayValue} ${valueType}`
        }
        return '0 m'
    }

    render() {

        const { selectedPath } = this.state;

        return (
            <div className="path-details px-lg-3 mb-4 mb-lg-0 pb-4 pb-lg-0">
                {selectedPath && (
                    <div>
                        <div className="d-flex justify-content-between mb-4">
                            <h2 className="mb-0 mr-2">
                                {selectedPath.title}
                            </h2>
                            <strong className="lead font-weight-bold">{this.getDistance()}</strong>
                        </div>
                        <div className="mb-3">
                            {selectedPath.full_description}
                        </div>
                        <div className="map-container mb-3" >
                            <MapContainer
                                markers={selectedPath.path}
                                changableCenter
                                selectedID={this.state.selectedID}
                            />
                        </div>
                        <div className="text-right">
                            <a href="#toggle-favorite" className="d-block text-primary lead mb-3" onClick={this.onToggleFavorite}>Add to favorites</a>
                            <a href="#remove" className="d-block text-danger lead" onClick={this.onRremove}>Remove</a>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default PathDetails;