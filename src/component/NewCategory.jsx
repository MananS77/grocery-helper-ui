import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import CategoryDataService from '../service/CategoryDataService';

class NewCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {
                categoryName: ''
            }
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    validate(values) {
        let errors = {};
        if (!values.categoryName) {
            errors.description = 'Enter a name';
        }
        return errors;
    }

    onSubmit(categoryName) {

        let newCategory = {
            categoryName: categoryName
        };
        CategoryDataService.createGroceryCategory(newCategory)
            .then(() => this.props.history.push('/category'))
    }

    render() {
        let categoryName = this.state.categoryName || '';
        return (
            <div>
                <h3>Add a new Grocery Category</h3>
                <div className="container">
                    <Formik
                        initialValues={{
                            category: [categoryName]
                        }}
                        onSubmit={this.onSubmit(categoryName)}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label>Category ID</label>
                                        <Field className="form-control" type="text" name="category[0]" />
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

export default NewCategory