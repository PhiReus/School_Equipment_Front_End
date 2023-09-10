import axios from "axios";
import axiosClient from './axiosClient';
class UserModel {
    constructor () {
        this.api_url = 'http://localhost:8000/api/users/';
    }
    async all() {
        const res = await axios.get(this.api_url);
        return res.data.data;
      }
    
      async find(id) {
        const data = await axios.get(this.api_url + id);
        return data.data;
      }
    
      async store(data) {
        const res = await axiosClient.post(this.api_url , data);
        return res;
      }
    
      async update(id, data) {
        const res = await axios.put(this.api_url + id, data);
        return res;
      }
    
      async delete(id) {
        const data = await axios.delete(this.api_url + id);
        return data;
      }
}
export default new UserModel();