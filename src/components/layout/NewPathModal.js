import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import { Field, reduxForm, Form } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import MapContainer from '../containers/MapContainer';

class NewPathModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addingMarker: false,
            markers: []
        }
    }

    renderTextInput = ({ input, label }) => {
        return (
            <FormGroup>
                {label && <Label>{label}</Label>}
                <Input {...input} />
            </FormGroup>

        )
    }

    closeForm = () => {
        this.props.reset();
        this.props.toggle();
    }

    onAddMarker = (latLng) => {
        const markers = [].concat(this.state.markers);
        markers.push(latLng);
        this.setState({markers, addingMarker: false});
    }

    renderTextArea = ({ input, rows = 2, label = null, limit = null }) => {
        return (
            <FormGroup>
                {label && <Label>{label}</Label>}
                <Input type="textarea" {...input} rows={rows} maxLength={limit} />
                {!!limit ? <small className=" d-block mt-2 text-right">Limit {input.value.length} of {limit}</small> : null}
            </FormGroup>
        )
    }

    render() {
        return (
            <div className="path-details px-lg-3 mb-4 mb-lg-0 pb-4 pb-lg-0">
                <Modal isOpen={this.props.visible} toggle={this.closeForm} className="new-path-modal">
                    <ModalHeader toggle={this.closeForm}>Add new path</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-lg-6 order-2 order-lg-1">
                                <Form onSubmit={this.props.handleSubmit}>
                                    <Field name="title" type="text" component={this.renderTextInput} label="Title" />

                                    <Field name="short-description" type="text" label="Short Description" component={(props) => this.renderTextArea({ ...props, limit: 160 })} />
                                    <Field name="full-description" type="text" label="Full Description" component={(props) => this.renderTextArea({ ...props, rows: 4 })} />
                                    <input type="hidden" name="distance" value="10" />
                                    <div className="text-center">
                                        <div className="my-4 lead">
                                            <FontAwesomeIcon className="d-inline-block mr-2" icon="map-marked-alt" />
                                            Length 1.13 km</div>

                                        <Button outline size="lg" color="primary" type="submit">Add path</Button>
                                    </div>
                                </Form>
                            </div>
                            <div className="col-lg-6 order-1 order-lg-2">
                                <div className="h-100 py-3">
                                    <div className="h-100 bg-light map-container">
                                        <Button color="primary" type="button" onClick={() => this.setState({addingMarker: true})} className="add-marker-button">
                                            <FontAwesomeIcon className="d-inline-block mr-2" icon="map-marker-alt" />
                                            AddMarker
                                        </Button>
                                        <MapContainer markers={this.state.markers} onAddMarker={this.onAddMarker} addingMarker={this.state.addingMarker} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
NewPathModal = reduxForm({
    form: 'newPath'
})(NewPathModal);

const mapStateToProps = (state) => {
    return {
    }
}
export default connect(mapStateToProps)(NewPathModal);