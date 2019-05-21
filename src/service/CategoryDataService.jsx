import axios from "axios";

const GROCERY_API_URL = 'http://localhost:8080';
const CATEGORY_URI = 'grocery/category';
const ITEMS_UNDER_CATEGORY_URI = '/grocery/category/items';
const ALL_CATEGORIES_API_URL = `${GROCERY_API_URL}/${CATEGORY_URI}`;
const ALL_ITEMS_UNDER_CATEGORY_API_URL = `${GROCERY_API_URL}/${ITEMS_UNDER_CATEGORY_URI}`;

class ItemDataService {

    retrieveAllGroceryCategories() {
        return axios.get(`${ALL_CATEGORIES_API_URL}`);
    }

    retrieveSpecificGroceryCategory(id) {
        return axios.get(`${ALL_CATEGORIES_API_URL}/${id}`);
    }

    createGroceryCategory(category) {
        return axios.put(`${ALL_CATEGORIES_API_URL}`, category);
    }

    retrieveItemsUnderGroceryCategory(id) {
        return axios.get(`${ALL_ITEMS_UNDER_CATEGORY_API_URL}`, {
            params: {
                categoryId: id
            }
        });
    }
}

export default new ItemDataService()