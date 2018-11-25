import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import { Field, reduxForm, Form } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import geolib from 'geolib';
import Loading from '../UI/Loading';

import MapContainer from '../containers/MapContainer';
import { addMapMarker } from '../../actions';

class NewPathModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addingMarker: false
        }
    }

    closeForm = () => {
        this.props.reset();
        this.props.toggle();
    }

    updatePath = (path) => {
        const distance = geolib.getPathLength(path);
        this.props.addMapMarker({ path, distance });
    }

    onAddMarker = (latLng) => {
        const path = [].concat(this.props.path);
        path.push(latLng);
        this.updatePath(path);
        this.setState({ addingMarker: false });
    }

    onMarkerDrag = (index, latLng) => {
        const path = [].concat(this.props.path);
        path[index] = latLng;
        this.updatePath(path);
    }

    getDistance = () => {
        const { distance } = this.props;
        let valueType = distance > 1000 ? 'km' : 'm';
        let displayValue = distance > 1000 ? (distance / 1000).toFixed(2) : distance;

        return `${displayValue} ${valueType}`
    }

    renderTextInput = ({ input, label }) => {
        return (
            <FormGroup>
                {label && <Label>{label}</Label>}
                <Input {...input} />
            </FormGroup>

        )
    }

    renderTextArea = ({
        input,
        rows = 2,
        label = null,
        limit = null
    }) => {
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
                                    <Field name="short_description" type="text" label="Short Description" component={(props) => this.renderTextArea({ ...props, limit: 160 })} />
                                    <Field name="full_description" type="text" label="Full Description" component={(props) => this.renderTextArea({ ...props, rows: 4 })} />
                                    <Field name="path" type="hidden" component="input" />
                                    <Field name="distance" type="hidden" component="input" />
                                    <div className="text-center">
                                        <div className="my-4 lead">
                                            <FontAwesomeIcon className="d-inline-block mr-2" icon="map-marked-alt" />
                                            Length {this.getDistance()}</div>
                                        <Button disabled={!this.props.valid || !this.props.path.length} outline size="lg" color="primary" type="submit">Add path</Button>
                                    </div>
                                </Form>
                            </div>
                            <div className="col-lg-6 order-1 order-lg-2">
                                <div className="h-100 py-3">
                                    <div className="h-100 bg-light map-container">
                                        <Button color="primary" type="button" onClick={() => this.setState({ addingMarker: true })} className="add-marker-button">
                                            <FontAwesomeIcon className="d-inline-block mr-2" icon="map-marker-alt" />
                                            AddMarker
                                        </Button>
                                        <MapContainer
                                            editable
                                            markers={this.props.path}
                                            onMarkerDrag={this.onMarkerDrag}
                                            onAddMarker={this.onAddMarker}
                                            addingMarker={this.state.addingMarker}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <Loading visible={this.props.isSubmitting}/>
                </Modal>
            </div>
        );
    }
}

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Required';
    }

    if (!values.short_description) {
        errors.short_description = 'Required';
    }

    if (!values.full_description) {
        errors.full_description = 'Required';
    }

    return errors;
}

NewPathModal = reduxForm({
    form: 'newPath',
    validate
})(NewPathModal);

const mapStateToProps = (state) => {
    const path = state.form.newPath && state.form.newPath.values ? state.form.newPath.values.path : [];
    const distance = state.form.newPath && state.form.newPath.values ? state.form.newPath.values.distance : 0
    return {
        path: path || [],
        distance: distance || 0,
        isSubmitting: state.paths.isSubmitting
    }
}
export default connect(mapStateToProps, { addMapMarker })(NewPathModal);