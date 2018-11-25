import React, { Component } from 'react';
import firebase from '../../firebaseConfig';
import PathItem from './PathItem';
import Loading from '../UI/Loading';

class PathsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            isLoading: true
        }
    }
    componentDidMount() {
        this.initScreen();
    }

    componentWillUnmount() {
        if(this.ref) {
            this.ref.off(this.onLoadPaths);
        }
    }

    initScreen = () => {
        try {
            this.ref = firebase.database().ref('walking_paths');
            this.ref.on('value', this.onLoadPaths);
        } catch (error) {
            this.setState({ isLoading: false });
        }
    }

    onLoadPaths = async snapshot => {
        try {
            let list = [];
            if (snapshot.exists()) {
                list = Object.values(snapshot.val());
                list = list.sort((a, b) => {
                    if(a.favorite && !b.favorite) {
                        return -1;
                    } else if (b.favorite && !a.favorite) {
                        return 1;
                    }
                    return 0;
                });
            }
            console.log(list);
            await this.setState({ isLoading: false, list });
        } catch (error) {
            console.log(error);
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { list, isLoading } = this.state;
        return (
            <div className="paths-list-wrapper h-100">
                {!list.length && <div className="d-flex lead align-items-center justify-content-center h-100">Nothing to display...</div>}
                {list && list.length && list.map((item) => <PathItem key={item.id} {...item} />)}
                <Loading visible={isLoading} />
            </div>
        );
    }
}

export default PathsList;