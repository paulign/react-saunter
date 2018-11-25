import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NewPathModal extends Component {

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
        console.log(this.props);
        return (
            <div className="path-details px-lg-3 mb-4 mb-lg-0 pb-4 pb-lg-0">
                <Modal isOpen={this.props.visible} toggle={this.closeForm} className="new-path-modal">
                    <ModalHeader toggle={this.closeForm}>Add new path</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-lg-6 order-2 order-lg-1">
                                <form onSubmit={this.props.handleSubmit}>
                                    <Field name="title" type="text" component={this.renderTextInput} label="Title" />

                                    <Field name="short-description" type="text" label="Short Description" component={(props) => this.renderTextArea({ ...props, limit: 160 })} />
                                    <Field name="full-description" type="text" label="Full Description" component={(props) => this.renderTextArea({ ...props, rows: 4 })} />
                                    <div className="text-center">
                                        <div className="my-4 lead">
                                            <FontAwesomeIcon className="d-inline-block mr-2" icon="map-marked-alt" />
                                            Length 1.13 km</div>

                                        <Button outline size="lg" color="primary" type="submit">Add path</Button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-6 order-1 order-lg-2">
                                <div className="h-100 py-3">
                                    <div className="h-100 bg-light map-container">
                                        <Button color="primary" className="add-marker-button">
                                            <FontAwesomeIcon className="d-inline-block mr-2" icon="map-marker-alt" />
                                            AddMarker
                                        </Button>
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

export default reduxForm({
    form: 'newPath'
})(NewPathModal);