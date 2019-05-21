import React, { Component } from 'react';
import './ListItems.css';
import ItemDataService from '../service/ItemDataService';

class ListItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            message: null
        };
        this.refreshGroceryItems = this.refreshGroceryItems.bind(this);
        this.deleteGroceryItemClicked = this.deleteGroceryItemClicked.bind(this);
        this.updateGroceryItemClicked = this.updateGroceryItemClicked.bind(this);
        this.addGroceryItemClicked = this.addGroceryItemClicked.bind(this);
        this.refreshGroceryCategories = this.refreshGroceryCategories.bind(this);
    }

    componentDidMount() {
        this.refreshGroceryItems();
    }

    refreshGroceryItems() {
        ItemDataService.retrieveAllGroceryItems()
            .then(
                response => {
                    console.log(response);
                    this.setState({items: response.data});
                }
            );
    }

    updateGroceryItemClicked(id, name) {
        console.log('Update: ' + id + ' - ' + name);
        this.props.history.push(`/item/${id}`);
    }

    deleteGroceryItemClicked(id, name) {
        ItemDataService.deleteGroceryItem(id)
            .then(
                response => {
                    console.log(response);
                    this.setState({ message: `Grocery Item "${name}" successfully deleted` });
                    this.refreshGroceryItems()
                }
            )
    }

    addGroceryItemClicked() {
        this.props.history.push(`/item/-1`);
    }

    refreshGroceryCategories() {
        this.props.history.push(`/category`);
    }

    render() {
        return (
            <div className="container">
                <h3 className="header">All Grocery Items</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Grocery Item</th>
                        <th>Category</th>
                        <th>Update</th>
                        <th>Delete</th>
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
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick={() => this.updateGroceryItemClicked(item.itemId, item.itemName)}>
                                                Update
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning"
                                                    onClick={() => this.deleteGroceryItemClicked(item.itemId, item.itemName)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="row row1">
                    <button className="btn btn-success btn-one" onClick={this.addGroceryItemClicked}>Add a Grocery Item</button>
                </div>

                <div className="row row1">
                    <button className="btn btn-success btn-one" onClick={this.refreshGroceryCategories}>View All Categories</button>
                </div>
            </div>
        )
    }
}

export default ListItems