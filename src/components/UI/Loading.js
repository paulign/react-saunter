
import React, { Component } from 'react';

class Loading extends Component {
    render() {
        if(!this.props.visible) {
            return null;
        }
    
        return (
            <div className="loading-spinner"></div>
        )
    }  
}

export default Loading