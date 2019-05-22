import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import CategoryDataService from '../service/CategoryDataService';

class NewCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: ''
        };
        this.validateForm = this.validateForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createCategory = this.createCategory.bind(this);
    }

    createCategory(categoryName) {

        let newCategory = {
            categoryName: categoryName
        };
        CategoryDataService.createGroceryCategory(newCategory)
            .then(() => this.props.history.push('/category'))
    }

    validateForm() {
        return this.state.categoryName.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = async event => {

        event.preventDefault();

        if(this.state.categoryName.length <= 0) {
            alert(`Category name can't be empty. Please enter a name`);
            return;
        }

        this.createCategory(this.state.categoryName);
    };

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
                                        <label>Category Name</label>
                                        <Field className="form-control" type="text" name="category[0]"
                                               id="categoryName"
                                               onChange={this.handleChange}
                                               value={this.state.categoryName}
                                        />
                                    </fieldset>
                                    <button className="btn btn-success btn-one" type="submit">Save</button>
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