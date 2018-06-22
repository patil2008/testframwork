import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { apiService } from '../services/apiService';
import * as Validation from '../validationHelper';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Loader from 'react-loader';
import Header from './_core/header';
import Footer from './_core/footer';
import { getUniqueFileName } from '../services/helper';
import { firestore, firebase, storage } from '../services/firebase/index';
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.css';

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
};

class Category extends Component {


    constructor(props) {
        super(props);
        this.state = { limit: 4, page: 1, oldPage: 0, pages: 0, categoryData: [], loaded: true, hasMore: true, lastVisible: false, firstVisible: false, storageRef: firebase.storage().ref() };
        this.getCategoryData = this.getCategoryData.bind(this);
        this.getNewCategoryData = this.getNewCategoryData.bind(this);
        this.saveCategory = this.saveCategory.bind(this);
        this.activeInactive = this.activeInactive.bind(this);

    }

    componentDidMount() {

        this.getCategoryData();
    }

    getNewCategoryData() {
        this.setState({ page: 1, pages: 0, categoryData: [], oldPage: 0, hasMore: true });
        let _self = this;
        setTimeout(function () {
            _self.getCategoryData();
        }, 500);

    }



    getCategoryData() {
        this.setState({ loading: true });
        let state = this.state;
        let _self = this;
        let page = this.state.page;
        console.log("page", page);
        if (this.state.oldPage != this.state.page) {

            firestore.collection("category").get().then((snap) => {
                let size = snap.size;
                let pages = Math.ceil(size / _self.state.limit);
                console.log("pages", pages);
                if (this.state.pages == 0) {
                    this.setState({ pages: pages });
                }

                if (page == 1) {
                    firestore.collection("category").orderBy("name").limit(this.state.limit).get().then((querySnapshot) => {
                        _self.setVisible(querySnapshot);

                        let data = [];
                        querySnapshot.forEach((doc) => {
                            let docData = doc.data();
                            docData['categoryId'] = doc.id;
                            data.push(docData);
                        });
                        if (pages == page) {
                            console.log("aaaa");
                            _self.setState({ hasMore: false });
                        }
                        page++;
                        this.setState({ categoryData: data, loading: false, page: page, oldPage: page - 1 });
                    });
                } else {
                    firestore.collection("category").orderBy("name").startAfter(this.state.lastVisible).limit(this.state.limit).get().then((querySnapshot) => {
                        _self.setVisible(querySnapshot);
                        let data = [];
                        querySnapshot.forEach((doc) => {
                            let docData = doc.data();
                            docData['categoryId'] = doc.id;
                            data.push(docData);
                        });
                        let categoryData = [...this.state.categoryData, ...data];

                        if (pages == page) {
                            _self.setState({ hasMore: false });
                        }
                        page++;
                        this.setState({ categoryData: categoryData, loading: false, page: page, oldPage: page - 1 });
                    });
                }


            });
        }

    }


    setVisible(querySnapshot) {
        var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        var firstVisible = querySnapshot.docs[0];
        this.setState({ lastVisible: lastVisible, firstVisible: firstVisible });

    }


    saveCategory(e) {
        e.preventDefault();
        let imagePath = "images/";
        this.form.validateAll();
        let errors = this.form.getChildContext()._errors;
        if (errors.length == 0) {
            let { name, image } = this.state;
            let _self = this;
            _self.setState({ loaded: false });

            let params = { name: name, 'image': image };
            let fireStoreParams = { name: params['name'], status: 1 };
            if (this.state.categoryId && this.state.categoryId != '') {
                if (this.state.image && this.state.image != '') {
                    let newImageName = getUniqueFileName(_self.state.imageData.name);
                    let newImagepath = imagePath + newImageName;
                    this.state.storageRef.child(newImagepath).putString(_self.state.image, 'data_url').then(function (snapshot) {
                        storage.getUrl(newImagepath).then(imageData => {
                            fireStoreParams['image'] = imageData;
                            firestore.collection("category").doc(_self.state.categoryId).update(fireStoreParams)
                                .then(function (docRef) {
                                    console.log("Document written with ID: ", docRef);
                                    _self.setState({ name: "", image: "", imageUrl: "", categoryId: '' });
                                    _self.getNewCategoryData();
                                    _self.setState({ loaded: true });
                                })
                                .catch(function (error) {
                                    console.error("Error updating document: ", error);
                                    _self.setState({ loaded: true });
                                });
                        }).catch(error => {
                            console.error("Error updating document: ", error);
                            _self.setState({ loaded: true });
                        });
                    });
                } else {
                    firestore.collection("category").doc(this.state.categoryId).update(fireStoreParams)
                        .then(function (docRef) {
                            console.log("Document written with ID: ", docRef);
                            _self.setState({ name: "", image: "", imageUrl: "", categoryId: '' });
                            _self.getNewCategoryData();
                            _self.setState({ loaded: true });
                        })
                        .catch(function (error) {
                            console.error("Error updating document: ", error);
                            _self.setState({ loaded: true });
                        });
                }
            } else {
                console.log("self", _self.state.imageData);
                let newImageName = getUniqueFileName(_self.state.imageData.name);
                let newImagepath = imagePath + newImageName;
                this.state.storageRef.child(newImagepath).putString(this.state.image, 'data_url').then(function (snapshot) {
                    storage.getUrl(newImagepath).then(imageData => {
                        fireStoreParams['image'] = imageData;
                        firestore.collection("category").add(fireStoreParams)
                            .then(function (docRef) {
                                console.log("Document written with ID: ", docRef);
                                _self.setState({ name: "", image: "", categoryId: '' });
                                _self.getNewCategoryData();
                                _self.setState({ loaded: true });
                            })
                            .catch(function (error) {
                                console.error("Error adding document: ", error);
                                _self.setState({ loaded: true });
                            });
                    }).catch(error => {



                    });

                });

            }

        }
    }

    activeInactive(event, row) {
        console.log("row", row);
        let _self = this;
        if (row) {

            // _self.setState({ loaded: false });    
            let params = { status: !row.status };
            _self.setState({ loaded: false });
            firestore.collection("category").doc(row.categoryId).update(params)
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef);
                    _self.getNewCategoryData();
                    _self.setState({ loaded: true });
                })
                .catch(function (error) {
                    console.error("Error updating document: ", error);
                    _self.setState({ loaded: true });

                });

        }
    }

    onDelete(row) {
        console.log("delete row", row);
        let _self = this;
        if (window.confirm("Are you sure?")) {
            _self.setState({ loaded: false });
            firestore.collection("category").doc(row.categoryId).delete().then(function () {
                console.log("Document successfully deleted!");
                _self.setState({ loaded: true });
                _self.getNewCategoryData(_self.state.page);
            }).catch(function (error) {
                console.log("delete response error", error);
                _self.setState({ loaded: true });
            });
            // apiService.post("/api/category/delete", params).then(function (response) {
            //     if (response.code == 200) {
            //         _self.getCategoryData(_self.state.page);
            //     }
            //     // _self.setState({ loaded: true });

            // }, function (error) {
            //     console.log("delete response error", error);
            //     // _self.setState({ loaded: true });

            // });
        }
    }

    onEdit(row) {
        console.log("edit row", row);
        this.setState({ name: row.name, imageUrl: row.image, categoryId: row.categoryId });
    }

    setFile(e) {
        let _self = this;
        console.log("e", e);
        var fr = new FileReader();

        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            //  console.log("reader.result",reader.result);

            _self.setState({ "image": reader.result, imageData: e.target.files[0] });
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };


    }


    rednerData() {

    }
    render() {
        const { categoryData, pages, loading, limit } = this.state;
        console.log("categoryData", categoryData);
        // const columns = [{
        //     Header: 'Name',
        //     accessor: 'name' // String-based value accessors!
        // }, {
        //     Header: 'Image',
        //     accessor: 'image', // String-based value accessors!
        //     Cell: props => <img src={props.value} width="200" height="200" /> // Custom cell components!
        // }, {
        //     Header: 'Status',
        //     accessor: 'status',
        //     Cell: cellInfo => (<a href="javascript:void(0)" cat-id={cellInfo.original.categoryId} onClick={(e) => this.activeInactive(e, cellInfo.original)} >{cellInfo.value == 1 ? "Active" : "Inactive"}</a>) // Custom cell components!
        // }, {
        //     Header: 'Action',
        //     Cell: cellInfo => (
        //         <div><a href="javascript:void()" onClick={(e) => this.onEdit(cellInfo.original)}>Edit</a>&nbsp;&nbsp;&nbsp;<a href="javascript:void()" onClick={(e) => this.onDelete(cellInfo.original)}>Delete</a></div>
        //     )

        // }];
        const catSection = categoryData.map((catData, i) => {
            return (
                <ul>
                    <li>{catData.name}</li>
                    <li><img src={catData.image} width="200" height="200" /></li>
                    <li><a href="javascript:void(0)" cat-id={catData.categoryId} onClick={(e) => this.activeInactive(e, catData)} >{catData.status == 1 ? "Active" : "Inactive"}</a></li>
                    <li><div><a href="javascript:void()" onClick={(e) => this.onEdit(catData)}>Edit</a>&nbsp;&nbsp;&nbsp;<a href="javascript:void()" onClick={(e) => this.onDelete(catData)}>Delete</a></div></li>
                </ul>
            );
        });
        return (
            <div>
                <Header />
            <div className="col-md-12 col-md-offset-6">
                <div className="col-md-6 col-md-offset-3">
                    <Loader loaded={this.state.loaded} zIndex={2e9}>

                        <h2>Manage Category</h2>
                        <Form name="catForm" ref={c => { this.form = c }} onSubmit={this.saveCategory}>
                            <div>

                                <Input placeholder="Enter Name" className="form-control" type="text" name="name" id="name" validations={[Validation.required]} onChange={(e) => this.setState({ name: e.target.value })} value={this.state.name} />
                            </div>
                            <div>
                                {this.state.imageUrl && <img src={this.state.imageUrl} height="50px" width="60px" />}
                                {this.state.categoryId &&
                                    <Input type="file" className="form-control" name="image" id="image" onChange={(e) => this.setFile(e)} />
                                }
                                {!this.state.categoryId &&
                                    <Input type="file" className="form-control" name="image" id="image" validations={[Validation.required]} onChange={(e) => this.setFile(e)} />
                                }
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary">{this.state.categoryId ? "Update" : "Add"}</button>
                            </div>
                        </Form>
                        <div>{this.props.loginResult && this.props.loginResult.loginStatus && <div>{this.props.loginResult.loginStatus}</div>}</div>

                    </Loader>
                </div>
                <div className="col-md-6 col-md-offset-3">
                    <h2>Categories</h2>
                    {/* <ReactTable
                        data={categoryData}
                        manual={true}
                        columns={columns}
                        pages={pages} // Display the total number of pages
                        loading={loading} // Display the loading overlay when we need it
                        onFetchData={(state, instance) => this.getCategoryData(state, instance)} // Request new data when things change
                        filterable
                        defaultPageSize={limit}
                        onChange={(state, instance) => { }}
                        showPageSizeOptions={false}
                        className="-striped -highlight"
                    /> */}
                    <div className="table">
                        {/* <ul>
                            <li>Name</li>
                            <li>Image</li>
                            <li>Status</li>
                            <li>Action</li>
                        </ul> */}
                        <InfiniteScroll
                            dataLength={categoryData.length} //This is important field to render the next data
                            next={this.getCategoryData}
                            hasMore={this.state.hasMore}
                            height={300}
                            loader={<h4>Loading...</h4>}
                            // endMessage={
                            //     <p style={{ textAlign: 'center' }}>
                            //         <b>Yay! You have seen it all</b>
                            //     </p>
                            // }
                            // below props only if you need pull down functionality
                            refreshFunction={this.getCategoryData}
                            pullDownToRefresh
                            pullDownToRefreshContent={
                                <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                            }
                            releaseToRefreshContent={
                                <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                            }
                        >

                            {catSection}



                        </InfiniteScroll>

                    </div>
                </div>
            </div>
            <Footer />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps)(Category);

