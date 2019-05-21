import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CategoryDataService from '../service/CategoryDataService';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryId: this.props.match.params.id,
            categoryName: ''
        };
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default Category