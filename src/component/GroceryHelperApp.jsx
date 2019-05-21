import React, {Component} from "react";
import ListItems from "./ListItems";
import Item from "./Item";
import ListCategories from "./ListCategories";
import Category from "./Category";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";

class GroceryHelperApp extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={ListItems}/>
                        <Route path="/item" exact component={ListItems}/>
                        <Route path="/item/:id" exact component={Item}/>
                        <Route path="/category" exact component={ListCategories}/>
                        <Route path="/category/:id" exact component={Category}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default GroceryHelperApp
