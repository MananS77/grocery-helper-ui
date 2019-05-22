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

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
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

    validate(values) {
        let errors = {};
        if (!values.itemName) {
            errors.description = 'Enter a name';
        } else if (!values.categoryName) {
            errors.description = 'Enter a category';
        }
        return errors;
    }

    onSubmit(...values) {
        console.log(values);

        let item = {
            itemId: this.state.itemId,
            itemName: values.itemName,
            itemCategory: {
                categoryId: values.categoryId,
                categoryName: values.categoryName
            }
        };

        let newItem = {
            itemName: values.itemName,
            itemCategory: {
                categoryId: values.categoryId,
                categoryName: values.categoryName
            }
        };

        if (this.state.itemId === -1) {
            ItemDataService.createGroceryItem(newItem)
                .then(() => this.props.history.push('/item'))
        } else {
            /*ItemDataService.updateGroceryItem(this.state.itemId, this.state.categoryId, this.state.categoryName)
                .then(() => this.props.history.push('/item'))*/
        }
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
                        onSubmit={this.onSubmit(itemId, itemName, categoryId, categoryName)}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="item[0]" disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Grocery Name</label>
                                        <Field className="form-control" type="text" name="item[1]" />
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