import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ItemDataService from '../service/ItemDataService';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemId: this.props.match.params.id,
            itemName: '',
            categoryId: '',
            categoryName: ''
        };

        this.validateForm = this.validateForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    componentDidMount() {

        // eslint-disable-next-line
        if (this.state.itemId == -1) {
            return;
        }

        ItemDataService.retrieveSpecificGroceryItem(this.state.itemId)
            .then(response => this.setState({
                itemName: response.data.itemName,
                categoryId: response.data.itemCategory.categoryId,
                categoryName: response.data.itemCategory.categoryName
            }))
    }

    validateForm() {
        return this.state.itemName.length > 0;
    }

    handleChange = event => {
        this.setState({
            itemName: event.target.value
        });
    };

    handleSubmit = async event => {

        event.preventDefault();
        if(this.state.itemName.length <= 0) {
            alert(`Item Name can't be empty. Please enter a name`);
            return;
        }

        this.updateItem(this.state.itemId, this.state.itemName);
    };

    updateItem(id, itemName) {
        ItemDataService.updateGroceryItem(id, itemName)
            .then(() => this.props.history.push('/item'))
    }
    
    render() {
        let itemId = this.state.itemId || '';
        if (itemId == -1) {
            itemId = '';
        }
        let itemName = this.state.itemName || '';
        let categoryId = this.state.categoryId || '';
        let categoryName = this.state.categoryName || '';

        return (
            <div>
                <h3>Grocery Item</h3>
                <div className="container">
                    <Formik
                        initialValues={{
                            item: [itemId, itemName],
                            category: [categoryId, categoryName]
                        }}
                        onSubmit={this.handleSubmit}
                        validateOnChange={this.handleChange}
                        validateOnBlur={false}
                        validate={this.validateForm}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form onSubmit={this.handleSubmit}>
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="item[0]" disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Grocery Name</label>
                                        <Field className="form-control" type="text" name="item[1]" autoFocus
                                               onChange={this.handleChange}
                                               value={this.state.itemName}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Category</label>
                                        <Field className="form-control" type="text" name="category[1]" disabled/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Category ID</label>
                                        <Field className="form-control" type="text" name="category[0]" disabled/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }

}

export default Item