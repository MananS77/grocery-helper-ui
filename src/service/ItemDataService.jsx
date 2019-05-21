import axios from "axios";

const GROCERY_API_URL = 'http://localhost:8080';
const ITEM_URI = 'grocery/item';
const ALL_ITEMS_API_URL = `${GROCERY_API_URL}/${ITEM_URI}`;

class CourseDataService {

    retrieveAllGroceryItems() {
        return axios.get(`${ALL_ITEMS_API_URL}`);
    }

    retrieveSpecificGroceryItem(id) {
        return axios.get(`${ALL_ITEMS_API_URL}/${id}`);
    }

    deleteGroceryItem(id) {
        return axios.delete(`${ALL_ITEMS_API_URL}/${id}`);
    }

    createGroceryItem(item) {
        return axios.put(`${ALL_ITEMS_API_URL}`, item);
    }

    /*
    updateGroceryItem(item, categoryId, categoryName) {
        return axios.post(`${ALL_ITEMS_API_URL}`, item);
    }
     */
}

export default new CourseDataService()