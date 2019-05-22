import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CategoryDataService from '../service/CategoryDataService';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryId: this.props.match.params.id,
            categoryName: '',
            items: []
        };

        this.backToCategories = this.backToCategories.bind(this);
        this.backToItems = this.backToItems.bind(this);
    }

    componentDidMount() {

        CategoryDataService.retrieveSpecificGroceryCategory(this.state.categoryId)
            .then(response => this.setState({
                categoryId: response.data.categoryId,
                categoryName: response.data.categoryName
            }));

        CategoryDataService.retrieveItemsUnderGroceryCategory(this.state.categoryId)
            .then(response => this.setState({
                items: response.data
            }))
    }

    backToCategories () {
        this.props.history.push('/category');
    }

    backToItems () {
        this.props.history.push('/item');
    }


    render() {
        return (
            <div className="container">
                <h3 className="header">All groceries under "{this.state.categoryName}"</h3>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Grocery ID</th>
                        <th>Grocery Item</th>
                        <th>Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.items.map(
                            item =>
                                <tr key={item.itemId}>
                                    <td>{item.itemId}</td>
                                    <td>{item.itemName}</td>
                                    <td>{item.itemCategory.categoryName}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
                <div className="row row1">
                    <button className="btn btn-success btn-one"
                            onClick={this.backToCategories}>
                        Back to Categories
                    </button>
                </div>

                <div className="row row1">
                    <button className="btn btn-success btn-one"
                            onClick={this.backToItems}>
                        Back to Home
                    </button>
                </div>
            </div>
        )
    }
}

export default Category