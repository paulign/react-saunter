import React, { Component } from 'react';
import firebase from '../../firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MapContainer from '../containers/MapContainer';
import { connect } from 'react-redux';
import { toggleFavoriteState, removePath } from '../../actions';
import Loading from '../UI/Loading';

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
        this.loadPath(this.props.selectedID);
    }

    componentDidUpdate = async () => {
        const newID = this.props.match.params.id;
        if (this.state.selectedID !== newID) {
            await this.loadPath(newID);
        }
    }

    componentWillUnmount() {
        this.unsubscribeFromRef();
    }

    loadPath = (selectedID) => {
        this.unsubscribeFromRef();
        this.ref = firebase.database().ref(`walking_paths/${selectedID}`);
        this.ref.on('value', this.onLoadPath);
    }

    onLoadPath = async (snapshot) => {
        try {
            const selectedPath = snapshot.val();
            await this.setState({ isLoading: false, selectedPath, selectedID: selectedPath.id });
        } catch (error) {
            this.setState({ isLoading: false, selectedPath: null, selectedID: null });
        }
    }

    unsubscribeFromRef = () => {
        if (this.ref) {
            this.ref.off('value',this.onLoadPath);
            this.ref = null;
        }
    }

    onToggleFavorite = (e) => {
        e.preventDefault();
        this.props.toggleFavoriteState(this.state.selectedPath);
    }

    onRremove = (e) => {
        e.preventDefault();
        this.props.removePath(this.state.selectedPath);
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
            <div className="path-details px-lg-3 mb-4 mb-lg-0 pb-4 pb-lg-0 position-relative">
                {selectedPath && (
                    <div>
                        <div className="d-flex justify-content-between mb-4">
                            <h2 className="mb-0 mr-2 d-flex align-items-center">
                                {selectedPath.favorite && <FontAwesomeIcon className="mr-1" color="#007bff" icon="star" />}
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
                            <a href="#toggle-favorite" className="d-block text-primary lead mb-3" onClick={this.onToggleFavorite}>{selectedPath.favorite ? "Remove from favorites" : "Add to favorites"}</a>
                            <a href="#remove" className="d-block text-danger lead" onClick={this.onRremove}>Remove</a>
                        </div>
                    </div>
                )}
                <Loading visible={this.props.isUpdating || this.state.isLoading}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isUpdating: state.paths.isUpdating
    }
}

export default connect(mapStateToProps, { toggleFavoriteState, removePath })(PathDetails);