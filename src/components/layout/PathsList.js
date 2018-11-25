import React, { Component } from 'react';
import { FormGroup, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from '../../firebaseConfig';
import PathItem from './PathItem';
import Loading from '../UI/Loading';

class PathsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            isLoading: true,
            filterQuery: '',
            filteredList: null
        }
    }
    componentDidMount() {
        this.initScreen();
    }

    componentWillUnmount() {
        if (this.ref) {
            this.ref.off(this.onLoadPaths);
        }
    }

    activeSearch = null;

    onChangeFilterQuery = (e) => {
        const filterQuery = e.target.value;
        if (this.activeSearch) {
            clearTimeout(this.activeSearch);
            this.activeSearch = null;
        }
        const callback = () => {
            this.filterList();
        }
        this.setState({ filterQuery }, () => {
            this.activeSearch = setTimeout(callback, 1000);
        })

    }

    filterList = () => {
        const { filterQuery } = this.state;
        let filteredList = null;

        if (filterQuery) {
            filteredList = [];
            const fullList = [].concat(this.state.list);
            filteredList = fullList.filter(path => {
                return path.title.toLowerCase().search(filterQuery.toLowerCase()) !== -1 ||
                    path.full_description.toLowerCase().search(filterQuery.toLowerCase()) !== -1;
            });
        }
        this.setState({ filteredList });
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
                    if (a.favorite && !b.favorite) {
                        return -1;
                    } else if (b.favorite && !a.favorite) {
                        return 1;
                    }
                    return 0;
                });
            }
            await this.setState({ isLoading: false, list });
            this.filterList();
        } catch (error) {
            console.log(error);
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { list, filteredList, isLoading } = this.state;

        const displayList = filteredList ? filteredList : list;
        return (
            <div className="d-flex flex-column h-100">
                <FormGroup className="position-relative search-group mb-4">
                    <Input type="search" value={this.state.filterQuery} onChange={this.onChangeFilterQuery} placeholder="Type to search..." />
                    <FontAwesomeIcon className="search-icon" icon="search" />
                </FormGroup>
                <div className="paths-list-wrapper h-100">
                    {!displayList.length && <div className="d-flex lead align-items-center justify-content-center h-100">Nothing to display...</div>}
                    {!!displayList && !!displayList.length &&
                        displayList.map((item) => <PathItem key={item.id} {...item} />)}
                    <Loading visible={isLoading} />
                </div>
            </div>
        );
    }
}

export default PathsList;