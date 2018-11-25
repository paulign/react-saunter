import React, { Component } from 'react';
import Header from './Header';

class RootView extends Component {
    render() {
        return (
            <div className="px-3 px-md-5">
                <Header />
                <main className="pt-3 pt-md-4">
                    Saunter
                </main>
            </div>
        );
    }
}

export default RootView;