import axios from 'axios';

class BorrowModel {
    constructor() {
        this.api_url = 'http://127.0.0.1:8000/api/borrows';
    }

    async getAllBorrows() {
        const res = await axios.get(this.api_url);
        return res.data;
    }
    async find(id) {
        const res = await axios.get(`${this.api_url}/${id}`);
        return res.data;
    }
    

    async createBorrow(data) {
            const res = await axios.post(this.api_url, data);
            return res.data;
        } 

        async destroy(id) {
            const res = await axios.delete(`${this.api_url}/${id}`);
            return res.data;
        }
        
        async update(id,data) {
            const res = await axios.put(`${this.api_url}/${id}`, data);
            return res.data;
        } 
}

export default BorrowModel;
