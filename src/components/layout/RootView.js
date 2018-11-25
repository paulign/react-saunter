import React, { Component } from 'react';
import Header from './Header';
import PathList from './PathsList';
import PathDetails from './PathDetails';
import NewPathModal from './NewPathModal';
import { Switch, Route } from 'react-router'
import { connect } from 'react-redux';
import {createNewPath} from '../../actions/';

class RootView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPathModalVisible: false
        }
    }

    toggleNewPathModal = () => {
        const {newPathModalVisible} = this.state;
        this.setState({ newPathModalVisible: !newPathModalVisible})
    }

    renderEmptyDetails = () => {
        return (
            <div className="h-100 p-4 d-flex align-items-center justify-content-center lead">Select any path</div>
        );
    }

    render() {
        return (
            <div className="px-3 px-md-5">
                <Header onToggleNewPathModal={this.toggleNewPathModal} />
                <main className="py-3 py-md-4">
                    <div className="row">
                        <div className="col-lg-6 order-2 order-lg-1 paths-list-contailer">
                            <PathList />
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2">
                            <Switch>
                                <Route exact path="/" component={this.renderEmptyDetails} />
                                <Route path="/path/:id" component={PathDetails} />
                            </Switch>
                        </div>
                    </div>
                </main>
                <NewPathModal toggle={this.toggleNewPathModal} onSubmit={this.props.createNewPath} visible={this.state.newPathModalVisible} />
            </div>
        );
    }
}

export default connect(null, {createNewPath})(RootView);