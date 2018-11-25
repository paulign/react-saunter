import React, { Component } from 'react';
import Header from './Header';
import PathList from './PathsList';

class RootView extends Component {
    render() {
        return (
            <div className="px-3 px-md-5">
                <Header />
                <main className="py-3 py-md-4">
                    <div className="row">
                        <div className="col-lg-6">
                            <PathList />
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default RootView;