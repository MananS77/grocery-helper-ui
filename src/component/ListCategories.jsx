import React, { Component } from 'react';
import './ListCategories.css';
import CategoryDataService from '../service/CategoryDataService';

class ListCategories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            message: null
        };
        this.refreshGroceryCategories = this.refreshGroceryCategories.bind(this);
        this.addGroceryCategoryClicked = this.addGroceryCategoryClicked.bind(this);
    }

    componentDidMount() {
        this.refreshGroceryCategories();
    }

    refreshGroceryCategories() {
        CategoryDataService.retrieveAllGroceryCategories()
            .then(
                response => {
                    console.log(response);
                    this.setState({categories: response.data});
                }
            );
    }

    addGroceryCategoryClicked() {
        this.props.history.push(`/category/-1`)
    }

    render() {
        return (
            <div className="container">
                <h3 className="header">All Grocery Categories</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Grocery Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.categories.map(
                            category =>
                                <tr key={category.categoryId}>
                                    <td>{category.categoryId}</td>
                                    <td>{category.categoryName}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
                <div className="row row1">
                    <button className="btn btn-success btn-one" onClick={this.addGroceryCategoryClicked}>Add a Grocery Category</button>
                </div>

                <div className="row row1">
                    <button className="btn btn-success btn-one" onClick={this.addGroceryItemClicked}>View Items Category Wise</button>
                </div>
            </div>
        )
    }
}

export default ListCategories